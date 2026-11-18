import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Language, TranslationSchema } from '../i18n/translations';

interface HeroSectionProps {
  t: TranslationSchema;
  lang?: Language;
  onNavigate: (sectionId: string) => void;
}

const TYPEWRITER_DATA: Record<
  Language,
  {
    prefix: string;
    phrases: string[];
    shortDesc: string;
  }
> = {
  ku: {
    prefix: 'لەگەڵ نۆرە ،',
    phrases: [
      'نۆرە بگرە',
      'نۆرە ئاسانتر دابنێ',
      'نۆرە بۆ کاتەکانت دابنێ',
    ],
    shortDesc:
      'لە ڕێگەی نۆرەوە، بە ئاسانی نۆرەی دەلاک، سالۆن، سەنتەرەکانی جوانکاری، نینۆک و چەندین بەشی تر لە کاتی گونجاوی خۆتدا دابنێ.',
  },
  ar: {
    prefix: 'مع نورا ،',
    phrases: [
      'احجز موعدك',
      'حدد موعدك بسهولة أكبر',
      'نظّم مواعيدك لأوقاتك',
    ],
    shortDesc:
      'من خلال نورا، احجز موعدك بسهولة لدى الحلاقين، الصالونات، مراكز التجميل، العناية بالأظافر والعديد من الأقسام الأخرى في الوقت الذي يناسبك.',
  },
  en: {
    prefix: 'With NORA,',
    phrases: [
      'Book Your Turn',
      'Schedule More Easily',
      'Set Appointments for Your Time',
    ],
    shortDesc:
      'Through NORA, effortlessly book your appointments for barbers, salons, beauty centers, nail studios, and many other services at your preferred time.',
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  lang = 'ku',
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const sharpSpanRef = useRef<HTMLSpanElement>(null);
  const blurSpanRef = useRef<HTMLSpanElement>(null);

  const currentLangData = TYPEWRITER_DATA[lang] || TYPEWRITER_DATA.ku;
  const phrases = currentLangData.phrases;
  const activePhrase = phrases[phraseIndex % phrases.length];
  const isRtl = t.dir === 'rtl';

  // Reset phrase index when language changes
  useEffect(() => {
    setPhraseIndex(0);
  }, [lang]);

  // Direct DOM mask update (0 React re-renders per frame) + paused when offscreen
  useEffect(() => {
    let rafId = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let progress = 0;
    let phase: 'typing' | 'pausing' | 'deleting' = 'typing';
    let lastTime = performance.now();
    let isVisible = true;

    const charFactor = Math.max(10, activePhrase.length);
    const typeSpeedPerSec = 1150 / charFactor;
    const deleteSpeedPerSec = 1750 / charFactor;
    const dirGradient = isRtl ? 'to left' : 'to right';

    const applyMask = (p: number) => {
      const sharpStop = Math.max(0, p - 20);
      const fadeStop = Math.max(0, p);
      const blurLeadStop = Math.min(130, p + 12);

      const sharpMask = `linear-gradient(${dirGradient}, #000 ${sharpStop}%, rgba(0,0,0,0.25) ${fadeStop}%, transparent ${blurLeadStop}%)`;
      const blurMask = `linear-gradient(${dirGradient}, transparent ${Math.max(0, sharpStop - 8)}%, #000 ${fadeStop}%, transparent ${blurLeadStop}%)`;

      if (sharpSpanRef.current) {
        sharpSpanRef.current.style.webkitMaskImage = sharpMask;
        sharpSpanRef.current.style.maskImage = sharpMask;
      }
      if (blurSpanRef.current) {
        blurSpanRef.current.style.webkitMaskImage = blurMask;
        blurSpanRef.current.style.maskImage = blurMask;
      }
    };

    applyMask(0);

    const step = (now: number) => {
      if (!isVisible) {
        lastTime = now;
        rafId = requestAnimationFrame(step);
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (phase === 'typing') {
        progress += typeSpeedPerSec * dt;
        if (progress >= 122) {
          progress = 122;
          applyMask(progress);
          phase = 'pausing';
          timeoutId = setTimeout(() => {
            phase = 'deleting';
            lastTime = performance.now();
            rafId = requestAnimationFrame(step);
          }, 1700);
          return;
        }
        applyMask(progress);
      } else if (phase === 'deleting') {
        progress -= deleteSpeedPerSec * dt;
        if (progress <= 0) {
          progress = 0;
          applyMask(0);
          setPhraseIndex((idx) => (idx + 1) % phrases.length);
          return;
        }
        applyMask(progress);
      }

      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [activePhrase.length, phrases.length, isRtl, phraseIndex, lang]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen pt-28 sm:pt-32 pb-16 overflow-hidden flex items-center"
    >
      {/* Subtle Ambient Glow using zero-cost radial gradients instead of heavy blur-[160px] filters */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 start-1/6 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.13) 0%, rgba(245, 158, 11, 0.04) 45%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/6 end-1/6 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(251, 191, 36, 0.11) 0%, rgba(251, 191, 36, 0.03) 45%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Minimalist Text Column — Centered on Mobile, Start-aligned on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 flex flex-col items-center text-center lg:items-start lg:text-start"
          >
            {/* Main Heading with Letter-by-Letter Blur Reveal (No cursor bar) */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.3] tracking-tight text-white">
              <span className="block text-white/95 mb-2">
                {currentLangData.prefix}
              </span>

              {/* Progressive Letter-by-Letter Unblur Container */}
              <span className="relative inline-grid min-h-[1.35em] items-center justify-items-center lg:justify-items-start">
                {/* Invisible sizing reference so layout never shifts */}
                <span className="invisible col-start-1 row-start-1 select-none pointer-events-none py-1">
                  {activePhrase}
                </span>

                {/* Sharp Revealed Letters Layer */}
                <span
                  ref={sharpSpanRef}
                  className="col-start-1 row-start-1 py-1 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent will-change-[mask-image]"
                >
                  {activePhrase}
                </span>

                {/* Soft Blurred Leading-Edge Letters Layer */}
                <span
                  ref={blurSpanRef}
                  aria-hidden="true"
                  className="col-start-1 row-start-1 py-1 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent pointer-events-none select-none will-change-[mask-image]"
                  style={{
                    filter: 'blur(6px)',
                    opacity: 0.9,
                  }}
                >
                  {activePhrase}
                </span>
              </span>
            </h1>

            {/* Clean, concise description */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300/85 max-w-lg">
              {currentLangData.shortDesc}
            </p>
          </motion.div>

          {/* Dual Phone Mockup Only — Extra Large on Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative flex items-center justify-center overflow-visible"
          >
            <div className="relative w-full max-w-[760px] lg:max-w-[840px] h-[420px] sm:h-[560px] lg:h-[650px] flex items-center justify-center overflow-visible">
              <img
                src="/assets/mockup-dual.webp"
                alt="NORA App Dual Showcase"
                width={1800}
                height={1350}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.85)] scale-[1.85] sm:scale-[1.55] lg:scale-[1.45] pointer-events-none select-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
