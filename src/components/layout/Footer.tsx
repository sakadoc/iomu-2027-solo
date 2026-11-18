import React, { useState } from 'react';
import { ExternalLink, Globe, Info, X } from 'lucide-react';
import { EVENT_CONFIG } from '../../config/eventConfig';

export const Footer: React.FC = () => {
  const [showCompliance, setShowCompliance] = useState(false);

  return (
    <footer className="relative z-20 overflow-hidden border-t border-kawung-gold/40 bg-keraton text-ivory">
      {/* Subtle Kawung Background */}
      <div className="bg-kawung-gold-subtle pointer-events-none absolute inset-0 opacity-10" />

      {/* Solo Skyline Cream Silhouette */}
      <div className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        <img
          src={EVENT_CONFIG.assets.skylineCream}
          alt="Stylized skyline of Surakarta featuring Pasar Gede clock tower, Pendopo Mangkunegaran, Masjid Raya Sheikh Zayed, Panggung Sangga Buwana, Gapura Gladag, and Tugu Pamandengan"
          className="mx-auto w-full max-w-5xl object-contain opacity-90"
        />
      </div>

      {/* Cream Footer Strip Matching Design Master Social Bar */}
      <div className="relative border-t-2 border-kawung-gold bg-ivory text-keraton">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold sm:gap-6">
            {EVENT_CONFIG.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-keraton transition hover:text-dark-gold"
              >
                <Globe className="h-3.5 w-3.5 text-dark-gold" />
                <span>{social.handle}</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {EVENT_CONFIG.hashtags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-kawung-gold/60 bg-white/80 px-2.5 py-0.5 text-[11px] font-semibold text-dark-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Credits & Compliance Row */}
        <div className="border-t border-kawung-gold/30 bg-white/60 px-4 py-3 text-[11px] text-emerald sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <p>
              {EVENT_CONFIG.fullName} · {EVENT_CONFIG.dates} · {EVENT_CONFIG.city} · Venue:{' '}
              <strong>{EVENT_CONFIG.venue}</strong>
            </p>
            <button
              type="button"
              onClick={() => setShowCompliance(true)}
              className="inline-flex items-center gap-1 font-semibold text-dark-gold underline-offset-2 hover:underline"
            >
              <Info className="h-3.5 w-3.5" />
              Photo Credits & Asset Notes
            </button>
          </div>
        </div>
      </div>

      {/* Photo Credits & Asset Documentation Modal */}
      {showCompliance && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo Credits and Asset Documentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-keraton/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-xl rounded-3xl border-2 border-kawung-gold bg-ivory p-6 text-keraton shadow-keraton">
            <div className="flex items-center justify-between border-b border-kawung-gold/40 pb-3">
              <h3 className="font-display text-base font-extrabold text-keraton">
                Media Credits & Official Asset Status
              </h3>
              <button
                type="button"
                onClick={() => setShowCompliance(false)}
                aria-label="Close dialog"
                className="rounded-full border border-dark-gold/40 p-1.5 hover:bg-kawung-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <h4 className="font-display font-bold uppercase tracking-wider text-dark-gold">
                  Licensed Photography & Media Credits
                </h4>
                <ul className="mt-2 space-y-2">
                  {EVENT_CONFIG.photoCredits.map((credit) => (
                    <li
                      key={credit.id}
                      className="rounded-xl border border-kawung-gold/40 bg-white/80 p-3"
                    >
                      <p className="font-bold text-keraton">{credit.title}</p>
                      <p className="text-emerald">
                        Author: {credit.author} · License: {credit.license}
                      </p>
                      <p className="mt-0.5 text-[11px] text-dark-gold">{credit.usage}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-display font-bold uppercase tracking-wider text-dark-gold">
                  Asset & Placeholder Documentation
                </h4>
                <ul className="mt-2 space-y-2">
                  {EVENT_CONFIG.assetDocumentation.map((item) => (
                    <li
                      key={item.asset}
                      className="rounded-xl border border-kawung-gold/40 bg-white/80 p-3"
                    >
                      <p className="font-bold text-keraton">
                        {item.asset}{' '}
                        <span className="font-semibold text-dark-gold">({item.status})</span>
                      </p>
                      <p className="mt-0.5 text-emerald">{item.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
