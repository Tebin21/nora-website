import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldCheck, FileText, Check } from 'lucide-react';
import { Language, TranslationSchema } from '../i18n/translations';

interface LiquidGlassNavProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationSchema;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

/* =========================================================
   CIRCULAR SVG FLAGS (Kurdistan, Arabic/Iraq, English/UK)
   ========================================================= */
const KurdistanFlagSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="33.4" y="0" fill="#E52521" />
    <rect width="100" height="33.4" y="33.3" fill="#FFFFFF" />
    <rect width="100" height="33.4" y="66.6" fill="#1E9645" />
    {/* 21-Ray Golden Sun Emblem */}
    <g transform="translate(50, 50)">
      {Array.from({ length: 21 }).map((_, i) => (
        <polygon
          key={i}
          points="0,-19 -2.3,-8 2.3,-8"
          fill="#F7B500"
          transform={`rotate(${(i * 360) / 21})`}
        />
      ))}
      <circle cx="0" cy="0" r="9.5" fill="#F7B500" />
    </g>
  </svg>
);

const ArabicFlagSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="33.4" y="0" fill="#CE1126" />
    <rect width="100" height="33.4" y="33.3" fill="#FFFFFF" />
    <rect width="100" height="33.4" y="66.6" fill="#000000" />
    <text
      x="50"
      y="55"
      textAnchor="middle"
      fill="#007A3D"
      fontSize="15"
      fontWeight="bold"
      fontFamily="sans-serif"
    >
      الله أكبر
    </text>
  </svg>
);

const EnglishFlagSVG: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="#012169" />
    <path d="M0,0 L100,100 M100,0 L0,100" stroke="#FFFFFF" strokeWidth="16" />
    <path d="M0,0 L100,100 M100,0 L0,100" stroke="#C8102E" strokeWidth="9" />
    <path d="M50,0 L50,100 M0,50 L100,50" stroke="#FFFFFF" strokeWidth="24" />
    <path d="M50,0 L50,100 M0,50 L100,50" stroke="#C8102E" strokeWidth="14" />
  </svg>
);

export const LiquidGlassNav: React.FC<LiquidGlassNavProps> = ({
  lang,
  setLang,
  t,
  activeSection,
  setActiveSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, active: false });
  const navRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y, active: true });
  };

  // Exact 6 links matching the user's screenshot order:
  // سەرەکی | تایبەتمەندییەکان | داگرتنی ئەپ | پەیوەندی | پاراستنی نهێنی | مەرجەکان
  const navLinks = [
    { id: 'home', label: t.nav.home, type: 'scroll' as const, target: 'home' },
    { id: 'features', label: t.nav.features, type: 'scroll' as const, target: 'providers' },
    { id: 'download', label: t.nav.downloadApp, type: 'scroll' as const, target: 'download' },
    { id: 'contact', label: t.nav.contact, type: 'scroll' as const, target: 'partner' },
    { id: 'privacy', label: t.nav.privacy, type: 'modal' as const, modal: 'privacy' as const },
    { id: 'terms', label: t.nav.terms, type: 'modal' as const, modal: 'terms' as const },
  ];

  const handleNavClick = (item: (typeof navLinks)[number]) => {
    setMobileMenuOpen(false);
    if (item.type === 'modal') {
      setLegalModal(item.modal);
      return;
    }
    setActiveSection(item.id);
    const el = document.getElementById(item.target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const languages: { code: Language; label: string; Flag: React.FC<{ className?: string }> }[] = [
    { code: 'ku', label: 'کوردی', Flag: KurdistanFlagSVG },
    { code: 'ar', label: 'العربية', Flag: ArabicFlagSVG },
    { code: 'en', label: 'English', Flag: EnglishFlagSVG },
  ];

  const ActiveFlag = languages.find((l) => l.code === lang)?.Flag || KurdistanFlagSVG;

  return (
    <>
      {/* TOP FLOATING FULL LIQUID GLASS PILL NAVBAR (Matching uploaded reference image) */}
      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-4 sm:pt-6 pointer-events-none">
        <motion.div
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos((prev) => ({ ...prev, active: false }))}
          initial={{ y: -32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className={`Frostedglass pointer-events-auto mx-auto max-w-[1080px] rounded-full transition-all duration-500 relative ${
            scrolled ? 'py-2 px-3 sm:px-5' : 'py-2.5 px-3.5 sm:px-5'
          }`}
          style={{
            background: mousePos.active
              ? `radial-gradient(360px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.14), transparent 70%), linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255, 255, 255, 0.07) 100%)`
              : undefined,
          }}
        >
          {/* Subtle top specular glass reflection line */}
          <div className="pointer-events-none absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent" />

          {/* Main Horizontal Layout (Always LTR so Logo is always on the Left):
              - Left side: Clean, Large NORA Logo
              - Center (Desktop): Clean text links
              - Right side: Circular Flag Button (Desktop only) + Hamburger Button (Mobile only)
          */}
          <div dir="ltr" className="relative z-10 flex items-center justify-between gap-4">
            {/* LEFT SIDE: Clean, Large NORA Logo */}
            <button
              onClick={() => handleNavClick(navLinks[0])}
              aria-label="NORA Home"
              className="group relative flex shrink-0 items-center justify-center px-3 py-1 transition-transform duration-300 hover:scale-105 focus:outline-none cursor-pointer"
            >
              <img
                src="/assets/nora-logo.png"
                alt="NORA"
                className="h-7 sm:h-8 md:h-9 w-auto object-contain invert brightness-200 drop-shadow-[0_2px_12px_rgba(255,255,255,0.28)] transition-transform duration-300"
              />
            </button>

            {/* CENTER: Clean Text Links (Desktop) */}
            <nav
              dir={t.dir}
              aria-label="Primary Navigation"
              className="hidden md:flex items-center justify-center gap-6 lg:gap-9 px-2"
            >
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative py-1.5 text-sm lg:text-[15px] font-bold tracking-normal transition-all duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]'
                        : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT SIDE: Circular Flag Language Selector (Desktop Only) + Mobile Hamburger (Mobile Only) */}
            <div className="flex items-center gap-2.5 shrink-0" ref={langDropdownRef}>
              {/* Desktop Circular Flag Button */}
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setLangMenuOpen((v) => !v)}
                  aria-label="Change Language"
                  title={
                    lang === 'ku'
                      ? 'گۆڕینی زمان (کوردی / العربية / English)'
                      : 'Switch Language'
                  }
                  className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 focus:outline-none cursor-pointer"
                  style={{
                    border: '2px solid rgba(255, 255, 255, 0.22)',
                    boxShadow:
                      '0 4px 14px rgba(0, 0, 0, 0.65), inset 0 2px 4px rgba(255, 255, 255, 0.35)',
                  }}
                >
                  <ActiveFlag className="w-full h-full object-cover" />
                  {/* Glossy 3D spherical glass lens highlight over the flag */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.02) 48%, rgba(0,0,0,0.28) 100%)',
                    }}
                  />
                </button>

                {/* Floating Frosted Glass 3-Language Dropdown when Flag is Clicked */}
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      dir={t.dir}
                      initial={{ opacity: 0, y: 10, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.94 }}
                      transition={{ duration: 0.18 }}
                      className="Frostedglass absolute top-14 right-0 w-44 rounded-2xl p-1.5 z-50"
                    >
                      {languages.map((item) => {
                        const ItemFlag = item.Flag;
                        const active = lang === item.code;
                        return (
                          <button
                            key={item.code}
                            onClick={() => {
                              setLang(item.code);
                              setLangMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                              active
                                ? 'bg-white/15 text-white'
                                : 'text-white/75 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="h-6 w-6 rounded-full overflow-hidden border border-white/25 shrink-0 block">
                                <ItemFlag />
                              </span>
                              <span>{item.label}</span>
                            </div>
                            {active && <Check className="h-4 w-4 text-amber-400" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button (Only on small screens) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle Menu"
                className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white cursor-pointer"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Dropdown Pill Menu (Includes Navigation Links + Language Switcher inside) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              dir={t.dir}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="Frostedglass pointer-events-auto md:hidden mx-auto mt-2 max-w-[1080px] rounded-3xl p-4"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`w-full text-start rounded-2xl px-4 py-2.5 text-sm font-bold transition-colors cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-white/15 text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Language Switcher inside the mobile menu */}
              <div className="mt-3 pt-3 border-t border-white/15 grid grid-cols-3 gap-2">
                {languages.map((item) => {
                  const ItemFlag = item.Flag;
                  const active = lang === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-center gap-2 rounded-2xl py-2 px-2.5 text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-white/20 text-white border border-white/30'
                          : 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="h-5 w-5 rounded-full overflow-hidden border border-white/25 shrink-0 block">
                        <ItemFlag />
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* PRIVACY POLICY & TERMS LIQUID GLASS MODAL */}
      <AnimatePresence>
        {legalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLegalModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-3xl p-6 sm:p-8 liquid-glass-shell text-start"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  {legalModal === 'privacy' ? (
                    <ShieldCheck className="h-5 w-5 text-amber-400" />
                  ) : (
                    <FileText className="h-5 w-5 text-amber-400" />
                  )}
                  <h3 className="text-lg font-extrabold text-white">
                    {legalModal === 'privacy' ? t.nav.privacy : t.nav.terms}
                  </h3>
                </div>
                <button
                  onClick={() => setLegalModal(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {legalModal === 'privacy' ? (
                  <>
                    <p>
                      لە پلاتفۆرمی <strong>NORA (نۆرە)</strong>، پاراستنی زانیارییە کەسییەکانی کڕیار و خاوەن کارەکان لە پێشینەی کارەکانمانە.
                    </p>
                    <p>
                      ژمارەی مۆبایل، ناو و کاتی حجزکردنەکان تەنها بۆ مەبەستی ڕێکخستنی نۆرە و ناردنی ئاگادارکردنەوەی نێوان کڕیار و پسپۆڕ بەکاردەهێنرێن و بە هیچ شێوەیەک لەگەڵ لایەنی سێیەم هاوبەش ناکرێن.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      بەکارهێنانی ئەپی <strong>NORA (نۆرە)</strong> واتای پابەندبوونە بە کاتی دیاریکراوی نۆرەکان بۆ ڕێزگرتن لە کاتی وەستا و کڕیارانی تر.
                    </p>
                    <p>
                      کڕیار دەتوانێت لە ڕێگەی ئەپەکەوە کاتی نۆرەکەی هەڵبژێرێت یان پێش وادەی دیاریکراو دوای بخات، و خاوەن دوکانەکانیش پابەندن بە پێشکەشکردنی خزمەتگوزاری لە کاتی حجزکراودا.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
