import { RefObject, useEffect } from 'react';

/**
 * Scroll FX for the chapter panels — mirrors the vanilla engine in
 * public/app-3d-bundle.js (initScrollFx). Styles live in src/styles/index.css.
 *
 *  • Entrance (replays when you scroll back up past a panel):
 *      rise · zoom · left/right (3D swing) · tilt (rises out of the 3D world) · clip (wipe)
 *  • Zoom on scroll: panels grow to full size as they reach the viewport and
 *    settle back slightly as they leave; the hero band zooms through and fades.
 *  • Staggered contents: headings, cards, tabs and form rows cascade in.
 *  • Gold underline draws under section headings.
 *  • Parallax photos inside frames; cursor-follow 3D tilt + gold glare on cards.
 *
 * Uses the independent CSS `translate` / `rotate` / `scale` properties so it
 * never fights existing `transform`s (diagonal hero band, Tailwind hover lifts).
 * Does nothing under prefers-reduced-motion.
 */

interface FxPlanEntry {
  sel: string;
  fx: 'rise' | 'zoom' | 'alt' | 'tilt' | 'clip';
  stagger?: number;
  noScale?: boolean;
  minScale?: number;
  exit?: 'zoomfade';
}

const FX_PLAN: FxPlanEntry[] = [
  { sel: '#home .iomu-diagonal-band', fx: 'zoom', minScale: 0.84, exit: 'zoomfade' },
  { sel: '#home article', fx: 'alt', stagger: 160 },
  { sel: '#about > div > .pointer-events-auto', fx: 'alt', stagger: 160 },
  { sel: '#conference > .pointer-events-auto', fx: 'tilt' },
  { sel: '#workshops > .pointer-events-auto', fx: 'rise' },
  { sel: '#speakers .iomu-sp-head', fx: 'rise', noScale: true },
  { sel: '#speakers .iomu-sp-row', fx: 'rise', noScale: true, stagger: 140 },
  { sel: '#program > .pointer-events-auto', fx: 'tilt' },
  { sel: '#explore-solo > .pointer-events-auto', fx: 'clip' },
  { sel: '#accommodation > .pointer-events-auto', fx: 'zoom', minScale: 0.88 },
  { sel: '#registration > .pointer-events-auto', fx: 'rise' },
];
const FX_CARD_SEL = 'article, figure, form > div, .grid > div, .grid > button, .grid > article';
const FX_HEAD_SEL = '.font-script, h2, .iomu-sp-pill, .iomu-sp-script, .iomu-sp-desc, .iomu-sp-search';
const FX_TILT_SEL = 'article, figure, .grid > button';
const FX_EASE = 'cubic-bezier(.16,1,.3,1)';

interface FxItem {
  el: HTMLElement;
  in: boolean;
  noScale: boolean;
  minScale: number;
  exit: string;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);

export function initScrollFx(root: HTMLElement | null, options: { instant?: boolean } = {}): () => void {
  if (!root || typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const items: FxItem[] = [];
  const parallax: HTMLElement[] = [];
  const cleanups: Array<() => void> = [];
  const touched = new Set<HTMLElement>();
  const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const addClass = (el: HTMLElement, ...cls: string[]) => {
    el.classList.add(...cls);
    touched.add(el);
  };

  const bindTilt = (card: HTMLElement) => {
    if (card.classList.contains('iomu-fx')) return;
    addClass(card, 'iomu-tilt');
    if (card.parentElement) addClass(card.parentElement, 'iomu-tilt-group');
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = card.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const px = clamp01((e.clientX - r.left) / r.width);
      const py = clamp01((e.clientY - r.top) / r.height);
      const max = Math.max(2, Math.min(7, (7 * 320) / r.width));
      const rx = (0.5 - py) * 2 * max;
      const ry = (px - 0.5) * 2 * max;
      const angle = Math.hypot(rx, ry);
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      card.classList.add('is-tilting');
      card.style.rotate = angle < 0.01 ? '' : `${(rx / angle).toFixed(4)} ${(ry / angle).toFixed(4)} 0 ${angle.toFixed(2)}deg`;
    };
    const onLeave = () => {
      card.classList.remove('is-tilting');
      const from = card.style.rotate;
      card.style.rotate = '';
      if (from && card.animate) {
        card.animate([{ rotate: from }, { rotate: '0 1 0 0deg' }] as Keyframe[], { duration: 450, easing: FX_EASE });
      }
    };
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
      card.style.rotate = '';
    });
  };

  FX_PLAN.forEach((plan) => {
    const els = Array.from(root.querySelectorAll<HTMLElement>(plan.sel));
    els.forEach((el, idx) => {
      if (items.some((it) => it.el === el)) return;
      let fx: string = plan.fx;
      if (fx === 'alt') fx = idx % 2 === 0 ? 'left' : 'right';
      addClass(el, 'iomu-fx', `iomu-fx--${fx}`);
      if (el.parentElement && /^(left|right|tilt)$/.test(fx)) addClass(el.parentElement, 'iomu-fx-stage');
      el.style.setProperty('--fx-d', String(idx * (plan.stagger || 0)));

      // Cards (outermost wins over nested cards) and headings cascade in.
      const cardCands = Array.from(el.querySelectorAll<HTMLElement>(FX_CARD_SEL));
      const cards = cardCands.filter((c) => !cardCands.some((o) => o !== c && c.contains(o)));
      const heads = Array.from(el.querySelectorAll<HTMLElement>(FX_HEAD_SEL)).filter((h) => !cards.some((c) => c.contains(h)));
      const kids = cards
        .concat(heads)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      kids.forEach((kid, k) => {
        addClass(kid, 'iomu-fx-child');
        kid.style.setProperty('--fx-i', String(Math.min(k, 12)));
      });

      // Gold underline under the section heading.
      el.querySelectorAll<HTMLElement>('h2').forEach((h) => {
        const cls = typeof h.className === 'string' ? h.className : '';
        if (!/sm:text-3xl|sm:text-4xl|text-3xl|iomu-sp-title/.test(cls)) return;
        addClass(h, 'iomu-fx-title');
        if (window.getComputedStyle(h).textAlign === 'center') addClass(h, 'iomu-fx-title--center');
      });

      el.querySelectorAll<HTMLElement>('figure img, .iomu-arch-frame img').forEach((img) => {
        addClass(img, 'iomu-fx-parallax');
        parallax.push(img);
      });

      if (canTilt) {
        cards
          .filter((c) => c.matches(FX_TILT_SEL) && !c.closest('form') && !c.closest('#program'))
          .forEach(bindTilt);
      }

      items.push({ el, in: false, noScale: !!plan.noScale, minScale: plan.minScale || 0.94, exit: plan.exit || '' });
    });
  });

  const setIn = (it: FxItem, on: boolean) => {
    if (it.in === on) return;
    it.in = on;
    it.el.classList.toggle('is-in', on);
    if (on) it.el.dispatchEvent(new CustomEvent('iomufx:in', { bubbles: false }));
  };

  // Layout position (ignores our own translate/rotate/scale, so a panel that is
  // still offset by its entrance pose is measured where it will land).
  const layoutRect = (el: HTMLElement, scrollY: number) => {
    let y = 0;
    for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
    const top = y - scrollY;
    return { top, bottom: top + el.offsetHeight, height: el.offsetHeight };
  };

  let raf = 0;
  const update = () => {
    raf = 0;
    const vh = window.innerHeight || 1;
    const sy = window.scrollY || window.pageYOffset || 0;
    const rects = items.map((it) => layoutRect(it.el, sy));
    const imgRects = parallax.map((img) => (img.parentElement || img).getBoundingClientRect());
    items.forEach((it, k) => {
      const r = rects[k];
      if (!it.in && r.top < vh * 0.88 && r.bottom > vh * 0.06) setIn(it, true);
      else if (it.in && r.top > vh * 1.02) setIn(it, false);
      if (it.noScale) return;
      const enter = easeOut(clamp01((vh - r.top) / (vh * 0.7)));
      let s = it.minScale + (1 - it.minScale) * enter;
      if (it.exit === 'zoomfade') {
        const e = clamp01((vh * 0.45 - (r.top + r.height / 2)) / (vh * 0.55));
        s *= 1 + 0.1 * e;
        it.el.style.filter = e > 0.001 ? `opacity(${(1 - 0.75 * e).toFixed(3)})` : '';
      } else {
        const exit = clamp01((vh * 0.3 - r.bottom) / (vh * 0.3));
        s *= 1 - 0.04 * exit;
      }
      it.el.style.scale = s.toFixed(4);
    });
    parallax.forEach((img, k) => {
      const r = imgRects[k];
      const offset = r.top + r.height / 2 - vh / 2;
      const y = Math.max(-22, Math.min(22, -offset * 0.06));
      img.style.translate = `0 ${y.toFixed(1)}px`;
    });
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  // Keyboard users never land on an invisible panel.
  const onFocusIn = (e: FocusEvent) => {
    const it = items.find((i) => i.el.contains(e.target as Node));
    if (it) setIn(it, true);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  root.addEventListener('focusin', onFocusIn);

  if (options.instant) {
    root.classList.add('iomu-fx-instant');
    update();
    void root.offsetHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('iomu-fx-instant')));
  } else {
    update();
  }

  return () => {
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    root.removeEventListener('focusin', onFocusIn);
    cleanups.forEach((fn) => fn());
    touched.forEach((el) => {
      el.classList.remove(
        'iomu-fx',
        'is-in',
        'iomu-fx-child',
        'iomu-fx-title',
        'iomu-fx-title--center',
        'iomu-fx-parallax',
        'iomu-fx-stage',
        'iomu-tilt',
        'iomu-tilt-group',
        'is-tilting'
      );
      Array.from(el.classList)
        .filter((c) => c.startsWith('iomu-fx--'))
        .forEach((c) => el.classList.remove(c));
      ['scale', 'translate', 'filter', '--fx-d', '--fx-i', '--mx', '--my'].forEach((p) => el.style.removeProperty(p));
    });
  };
}

/** Runs the scroll FX on the chapter overlay root once it has mounted. */
export function useScrollFx(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    let destroy: () => void = () => {};
    // Wait one frame so lists rendered in the same commit are in the DOM.
    const id = requestAnimationFrame(() => {
      destroy = initScrollFx(rootRef.current);
    });
    return () => {
      cancelAnimationFrame(id);
      destroy();
    };
  }, [rootRef]);
}
