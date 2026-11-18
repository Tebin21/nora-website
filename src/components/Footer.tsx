import React from 'react';
import { Language, TranslationSchema } from '../i18n/translations';

interface FooterProps {
  t: TranslationSchema;
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ t, lang, setLang, onNavigate }) => {
  return (
    <footer className="relative mt-12 border-t border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Main Responsive Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 text-center lg:text-start">
          {/* Brand & Short Description */}
          <div className="flex flex-col items-center lg:items-start space-y-2.5 max-w-sm">
            <img
              src="/assets/nora-logo.png"
              alt="NORA"
              className="h-7 sm:h-8 w-auto object-contain invert brightness-200"
            />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Navigation Links (Simple & Responsive) */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-slate-300"
          >
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => onNavigate('providers')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.features}
            </button>
            <button
              onClick={() => onNavigate('download')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.downloadApp}
            </button>
            <button
              onClick={() => onNavigate('partner')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.contact}
            </button>
          </nav>
        </div>

        {/* Bottom Bar: Copyright Only */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};
