import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoveHorizontal, Pause, Play } from 'lucide-react';
import { SpeakerProfile } from '../../data/programData';

/**
 * Full-bleed concave "curved strip" carousel used in Scene 05 (Speakers).
 *
 * Cards sit on the inside of a cylinder: the centre card is flat and the
 * cards toward the edges come closer and tilt toward the centre. One
 * requestAnimationFrame loop per strip handles drag with momentum, trackpad
 * swipes, arrow buttons/keys and a slow auto-drift that pauses on hover,
 * focus, an open profile drawer, an active search or prefers-reduced-motion.
 *
 * Card transforms are written straight to the DOM every frame (no React
 * re-render per frame); React only re-renders when the centred card changes.
 * Mirrors the vanilla implementation in public/app-3d-bundle.js.
 */

export type SpeakerArcVariant = 'ws' | 'sem';

const ARC_GEO: Record<SpeakerArcVariant, { W: number; gap: number }> = {
  ws: { W: 200, gap: 28 },
  sem: { W: 168, gap: 22 },
};
const HIDE_RAD = 1.22; // cards beyond ~70° are hidden (off-screen anyway)
const FADE_RAD = 1.04; // start fading at ~60°
const SEC_PER_CARD = 4; // auto-drift speed
const TONES = ['a', 'b', 'c'] as const;

interface Placement {
  transform: string;
  opacity: string;
  zIndex: number;
}

interface DragState {
  x: number;
  y: number;
  id: number;
  startPos: number;
  moved: boolean;
  lastX: number;
  lastT: number;
  v: number;
}

interface StripPhysics {
  pos: number | null;
  vel: number;
  target: number | null;
  drag: DragState | null;
  center: number;
  loop: boolean;
  force: boolean;
  lastN: number;
  hover: boolean;
  focusIn: boolean;
  lastTouch: number;
  visible: boolean;
}

function isLoop(variant: SpeakerArcVariant, n: number, R: number): boolean {
  const g = ARC_GEO[variant];
  const stepRad = (g.W + g.gap) / R;
  // Only wrap around when the strip is long enough that the seam stays off-screen.
  return n * stepRad > 2 * HIDE_RAD + stepRad;
}

function initialPos(loop: boolean, n: number): number {
  return loop ? 0 : (n - 1) / 2;
}

function place(variant: SpeakerArcVariant, n: number, pos: number, R: number) {
  const g = ARC_GEO[variant];
  const stepRad = (g.W + g.gap) / R;
  const loop = isLoop(variant, n, R);
  const list: (Placement | null)[] = [];
  for (let i = 0; i < n; i++) {
    let d = i - pos;
    if (loop) {
      d = ((d % n) + n) % n;
      if (d >= n / 2) d -= n;
    }
    const th = d * stepRad;
    const a = Math.abs(th);
    if (a > HIDE_RAD) {
      list.push(null);
      continue;
    }
    const x = R * Math.sin(th);
    const z = R * (1 - Math.cos(th));
    list.push({
      transform: `translate3d(${x.toFixed(2)}px, 0px, ${z.toFixed(2)}px) rotateY(${(-th * 57.29578).toFixed(3)}deg)`,
      opacity: a > FADE_RAD ? ((HIDE_RAD - a) / (HIDE_RAD - FADE_RAD)).toFixed(3) : '1',
      zIndex: 500 + Math.round(z),
    });
  }
  return { list, loop };
}

const pad2 = (n: number) => String(n).padStart(2, '0');

const Silhouette: React.FC = () => (
  <svg viewBox="0 0 120 160" aria-hidden="true">
    <circle cx="60" cy="52" r="27" fill="#DDBE82" fillOpacity="0.28" />
    <path d="M8 160 C8 116 32 92 60 92 C88 92 112 116 112 160 Z" fill="#DDBE82" fillOpacity="0.22" />
  </svg>
);

export interface SpeakerArcCarouselLabels {
  people: string;
  of: string;
  dragHint: string;
  pause: string;
  resume: string;
  prev: string;
  next: string;
  viewProfile: string;
  empty: string;
}

interface SpeakerArcCarouselProps {
  variant: SpeakerArcVariant;
  speakers: SpeakerProfile[];
  total: number;
  eyebrow: string;
  title: string;
  searchTerm: string;
  /** Pause the auto-drift (e.g. while the detail drawer is open). */
  suspended: boolean;
  labels: SpeakerArcCarouselLabels;
  onSelectSpeaker: (speaker: SpeakerProfile) => void;
}

export const SpeakerArcCarousel: React.FC<SpeakerArcCarouselProps> = ({
  variant,
  speakers,
  total,
  eyebrow,
  title,
  searchTerm,
  suspended,
  labels,
  onSelectSpeaker,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const physics = useRef<StripPhysics>({
    pos: null,
    vel: 0,
    target: null,
    drag: null,
    center: -1,
    loop: true,
    force: true,
    lastN: -1,
    hover: false,
    focusIn: false,
    lastTouch: 0,
    visible: true,
  });
  const lastPointerRef = useRef(0);
  const dragEndRef = useRef(0);

  const [R, setR] = useState(800);
  const RRef = useRef(800);
  const [center, setCenter] = useState(-1);
  const [paused, setPaused] = useState(false);

  // Values the animation loop reads without re-subscribing.
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;
  const searchingRef = useRef(Boolean(searchTerm.trim()));
  searchingRef.current = Boolean(searchTerm.trim());

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const n = speakers.length;
  const hasItems = n > 0;
  const loop = isLoop(variant, n, R);
  // First-paint placement; the animation loop takes over right after mount.
  const initial = useMemo(() => place(variant, n, initialPos(loop, n), R), [variant, n, loop, R]);
  const listKey = useMemo(() => speakers.map((s) => s.id).join('|'), [speakers]);

  // A new result set (search) restarts the strip from its initial position.
  useEffect(() => {
    const p = physics.current;
    p.pos = null;
    p.target = null;
    p.vel = 0;
    p.drag = null;
    p.center = -1;
    p.force = true;
  }, [listKey]);

  // Radius follows the stage width: gentler curve on desktop, tighter on phones.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const measure = () => {
      const w = stage.clientWidth;
      if (!w) return;
      const next = Math.round(Math.max(420, Math.min(800, w * 0.58)));
      if (next !== RRef.current) {
        RRef.current = next;
        physics.current.force = true;
        setR(next);
      }
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(stage);
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [hasItems]);

  // Skip work while the strip is scrolled out of view.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const p = physics.current;
        p.visible = entries.some((e) => e.isIntersecting);
        if (p.visible) p.force = true;
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [hasItems]);

  // Animation loop.
  useEffect(() => {
    let raf = 0;
    let last = 0;

    const apply = (cards: NodeListOf<HTMLElement>, count: number) => {
      const p = physics.current;
      const placed = place(variant, count, p.pos ?? 0, RRef.current);
      for (let i = 0; i < count; i++) {
        const el = cards[i];
        const pl = placed.list[i];
        if (!pl) {
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
          continue;
        }
        el.style.transform = pl.transform;
        el.style.opacity = pl.opacity;
        el.style.zIndex = String(pl.zIndex);
        el.style.visibility = 'visible';
      }
      let c = Math.round(p.pos ?? 0);
      c = placed.loop ? ((c % count) + count) % count : Math.max(0, Math.min(count - 1, c));
      if (c !== p.center) {
        p.center = c;
        setCenter(c);
      }
    };

    const autoRunning = () => {
      const p = physics.current;
      if (reducedMotion || pausedRef.current || suspendedRef.current || searchingRef.current) return false;
      if (p.hover || p.focusIn || !p.visible) return false;
      if (Date.now() - p.lastTouch < 2500) return false;
      return !document.hidden;
    };

    const step = (dt: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const cards = stage.querySelectorAll<HTMLElement>('.iomu-arc-card');
      const count = cards.length;
      if (!count) return;
      const p = physics.current;
      const isLooping = isLoop(variant, count, RRef.current);
      p.loop = isLooping;
      if (p.pos === null) {
        p.pos = initialPos(isLooping, count);
        p.force = true;
      }
      const before = p.pos;
      if (p.drag && p.drag.moved) {
        // position follows the pointer (set in onPointerMove)
      } else if (p.target !== null) {
        const diff = p.target - p.pos;
        if (reducedMotion || Math.abs(diff) < 0.001) {
          p.pos = p.target;
          p.target = null;
        } else {
          p.pos += diff * (1 - Math.exp(-dt * 7));
        }
      } else if (Math.abs(p.vel) > 0.01) {
        p.pos += p.vel * dt;
        p.vel *= Math.exp(-dt * 2.8);
        if (Math.abs(p.vel) < 0.05) p.vel = 0;
      } else if (isLooping && autoRunning()) {
        p.pos += dt / SEC_PER_CARD;
      }
      if (!isLooping) {
        const clamped = Math.max(0, Math.min(count - 1, p.pos));
        if (clamped !== p.pos) {
          p.pos = clamped;
          p.vel = 0;
        }
        if (p.target !== null) p.target = Math.max(0, Math.min(count - 1, p.target));
      } else if (!p.drag && p.target === null) {
        p.pos = ((p.pos % count) + count) % count;
      }
      if (p.force || p.pos !== before || p.lastN !== count) {
        if (!p.visible) {
          p.force = true; // repaint once the strip scrolls back into view
          return;
        }
        p.force = false;
        p.lastN = count;
        apply(cards, count);
      }
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min(0.05, Math.max(0, (t - last) / 1000)) : 0;
      last = t;
      step(dt);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [variant, reducedMotion]);

  const touch = () => {
    physics.current.lastTouch = Date.now();
  };

  const nudge = useCallback((dir: number) => {
    const p = physics.current;
    if (p.pos === null) return;
    p.lastTouch = Date.now();
    p.vel = 0;
    const base = p.target !== null ? p.target : Math.round(p.pos);
    p.target = base + dir;
  }, []);

  const px = ARC_GEO[variant].W + ARC_GEO[variant].gap;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointerRef.current = Date.now();
    touch();
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const p = physics.current;
    if (p.pos === null) return;
    p.vel = 0;
    p.target = null;
    p.drag = {
      x: e.clientX,
      y: e.clientY,
      id: e.pointerId,
      startPos: p.pos,
      moved: false,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const p = physics.current;
    const d = p.drag;
    const stage = stageRef.current;
    if (!d || !stage) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved) {
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy)) return;
      d.moved = true;
      stage.classList.add('is-dragging');
      try {
        stage.setPointerCapture(d.id);
      } catch {
        /* pointer already released */
      }
    }
    p.pos = d.startPos - dx / px;
    const now = performance.now();
    const ddt = (now - d.lastT) / 1000;
    if (ddt > 0) {
      const inst = -(e.clientX - d.lastX) / px / ddt;
      d.v = d.v * 0.6 + inst * 0.4;
    }
    d.lastX = e.clientX;
    d.lastT = now;
    touch();
  };

  const endDrag = () => {
    const p = physics.current;
    const d = p.drag;
    if (!d) return;
    p.drag = null;
    if (!d.moved) return;
    const stage = stageRef.current;
    if (stage) {
      stage.classList.remove('is-dragging');
      try {
        stage.releasePointerCapture(d.id);
      } catch {
        /* pointer already released */
      }
    }
    dragEndRef.current = Date.now();
    touch();
    if (performance.now() - d.lastT > 120) d.v = 0;
    p.vel = Math.max(-14, Math.min(14, d.v));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const p = physics.current;
    if (p.pos === null || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    p.target = null;
    p.vel = 0;
    p.pos += e.deltaX / px;
    touch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    nudge(e.key === 'ArrowRight' ? 1 : -1);
    const p = physics.current;
    const stage = stageRef.current;
    if (!stage || p.target === null) return;
    const cards = stage.querySelectorAll<HTMLElement>('.iomu-arc-card');
    const count = cards.length;
    if (!count) return;
    let idx = Math.round(p.target);
    idx = p.loop ? ((idx % count) + count) % count : Math.max(0, Math.min(count - 1, idx));
    const card = cards[idx];
    window.setTimeout(() => card.focus({ preventScroll: true }), 60);
  };

  // Keep the clipped stage from being scrolled by focus() on an edge card.
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollLeft || el.scrollTop) {
      el.scrollLeft = 0;
      el.scrollTop = 0;
    }
  };

  // Tabbing onto a card glides it to the centre.
  const handleCardFocus = (index: number) => {
    if (Date.now() - lastPointerRef.current < 600) return;
    const p = physics.current;
    if (p.pos === null) return;
    let diff = index - p.pos;
    if (p.loop) {
      diff = ((diff % n) + n) % n;
      if (diff >= n / 2) diff -= n;
    }
    p.vel = 0;
    p.target = p.pos + diff;
    touch();
  };

  const handleCardClick = (speaker: SpeakerProfile) => {
    if (Date.now() - dragEndRef.current < 300) return;
    onSelectSpeaker(speaker);
  };

  const shownCenter = center >= 0 && center < n ? center : Math.round(initialPos(loop, n));
  const toggleLabel = paused ? labels.resume : labels.pause;
  const trimmedSearch = searchTerm.trim();

  return (
    <div
      ref={rowRef}
      className="iomu-sp-row"
      onMouseEnter={() => {
        physics.current.hover = true;
      }}
      onMouseLeave={() => {
        physics.current.hover = false;
      }}
      onFocus={() => {
        physics.current.focusIn = true;
      }}
      onBlur={(e) => {
        if (!rowRef.current?.contains(e.relatedTarget as Node | null)) physics.current.focusIn = false;
      }}
    >
      <div className="iomu-sp-rowhead">
        <div>
          <span className="iomu-sp-eyebrow">{eyebrow}</span>
          <div className="iomu-sp-titleline">
            <h3 className="iomu-sp-rowtitle">{title}</h3>
            <span className="iomu-sp-count">
              {trimmedSearch ? `${n} ${labels.of} ${total}` : `${total} ${labels.people}`}
            </span>
          </div>
        </div>
        <div className="iomu-sp-controls">
          <span className="iomu-sp-range">{hasItems ? `${pad2(shownCenter + 1)} / ${pad2(n)}` : '00 / 00'}</span>
          {loop && !reducedMotion && (
            <button
              type="button"
              className="iomu-sp-nav iomu-sp-nav--soft"
              onClick={() => setPaused((prev) => !prev)}
              aria-label={toggleLabel}
              title={toggleLabel}
            >
              {paused ? <Play className="h-4 w-4" fill="currentColor" /> : <Pause className="h-4 w-4" fill="currentColor" />}
            </button>
          )}
          <button type="button" className="iomu-sp-nav" onClick={() => nudge(-2)} aria-label={`${labels.prev} — ${title}`}>
            <ChevronLeft />
          </button>
          <button type="button" className="iomu-sp-nav" onClick={() => nudge(2)} aria-label={`${labels.next} — ${title}`}>
            <ChevronRight />
          </button>
        </div>
      </div>

      {hasItems ? (
        <div
          ref={stageRef}
          className={`iomu-arc-stage iomu-arc-stage--${variant}`}
          role="group"
          aria-roledescription="carousel"
          aria-label={title}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
        >
          <div className="iomu-arc-ring">
            {speakers.map((sp, i) => {
              const pl = initial.list[i];
              const style: React.CSSProperties = pl
                ? { transform: pl.transform, opacity: pl.opacity, zIndex: pl.zIndex, visibility: 'visible' }
                : { opacity: 0, visibility: 'hidden' };
              const num = (sp.id.match(/(\d+)$/) || [])[1] ?? pad2(i + 1);
              const tone = TONES[(i + (variant === 'sem' ? 1 : 0)) % 3];
              return (
                <button
                  key={sp.id}
                  type="button"
                  className={`iomu-arc-card iomu-arc-card--${variant}`}
                  data-arc-index={i}
                  aria-label={`${labels.viewProfile}: ${sp.fullName}, ${sp.positionTitle}`}
                  style={style}
                  onClick={() => handleCardClick(sp)}
                  onFocus={() => handleCardFocus(i)}
                >
                  <span className={`iomu-arc-photo iomu-arc-tone-${tone}`}>
                    {sp.photo ? <img src={sp.photo} alt="" loading="lazy" draggable={false} /> : <Silhouette />}
                  </span>
                  <span className="iomu-arc-caption">
                    <span className="iomu-arc-label">
                      {variant === 'ws' ? 'Workshop' : 'Seminar'} · {num}
                    </span>
                    <span className="iomu-arc-name">{sp.fullName}</span>
                    <span className="iomu-arc-role">{sp.positionTitle}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="iomu-sp-empty">
          {labels.empty} “{trimmedSearch}”.
        </p>
      )}

      <div className="iomu-sp-progress">
        <div className="iomu-sp-track">
          <span
            className="iomu-sp-bar"
            style={{ transform: `scaleX(${hasItems ? ((shownCenter + 1) / n).toFixed(4) : 0})` }}
          />
        </div>
        <span className="iomu-sp-hint">
          <MoveHorizontal className="text-kawung-gold" />
          {labels.dragHint}
        </span>
      </div>
    </div>
  );
};
