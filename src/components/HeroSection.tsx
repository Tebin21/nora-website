import React, { useState, useEffect } from 'react';
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
  // progress from 0 to 120 (0 = hidden, 120 = fully sharp)
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  const currentLangData = TYPEWRITER_DATA[lang] || TYPEWRITER_DATA.ku;
  const phrases = currentLangData.phrases;
  const activePhrase = phrases[phraseIndex % phrases.length];
  const isRtl = t.dir === 'rtl';

  // Reset animation when language changes
  useEffect(() => {
    setPhraseIndex(0);
    setProgress(0);
    setPhase('typing');
  }, [lang]);

  // Smooth letter-by-letter progressive blur reveal & erase
  useEffect(() => {
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    let lastTime = performance.now();

    // Speed scales gently with phrase length so every letter unblurs at a natural cadence
    const charFactor = Math.max(10, activePhrase.length);
    const typeSpeedPerSec = 1150 / charFactor; // % per second during reveal
    const deleteSpeedPerSec = 1750 / charFactor; // % per second during erase

    if (phase === 'pausing') {
      timeoutId = setTimeout(() => {
        setPhase('deleting');
      }, 1700);
      return () => clearTimeout(timeoutId);
    }

    const step = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setProgress((prev) => {
        if (phase === 'typing') {
          const next = prev + typeSpeedPerSec * dt;
          if (next >= 122) {
            setPhase('pausing');
            return 122;
          }
          return next;
        } else {
          const next = prev - deleteSpeedPerSec * dt;
          if (next <= 0) {
            setPhase('typing');
            setPhraseIndex((idx) => (idx + 1) % phrases.length);
            return 0;
          }
          return next;
        }
      });

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [phase, activePhrase.length, phrases.length]);

  // Directional mask gradients so each letter emerges from blur into crisp focus
  const dirGradient = isRtl ? 'to left' : 'to right';
  const sharpStop = Math.max(0, progress - 20);
  const fadeStop = Math.max(0, progress);
  const blurLeadStop = Math.min(130, progress + 12);

  const sharpMask = `linear-gradient(${dirGradient}, #000 ${sharpStop}%, rgba(0,0,0,0.25) ${fadeStop}%, transparent ${blurLeadStop}%)`;
  const blurMask = `linear-gradient(${dirGradient}, transparent ${Math.max(0, sharpStop - 8)}%, #000 ${fadeStop}%, transparent ${blurLeadStop}%)`;

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 sm:pt-32 pb-16 overflow-hidden flex items-center"
    >
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute top-1/3 start-1/4 h-[420px] w-[420px] rounded-full bg-amber-500/12 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 end-1/4 h-[420px] w-[420px] rounded-full bg-amber-400/10 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Minimalist Text Column — Centered on Mobile, Start-aligned on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                  className="col-start-1 row-start-1 py-1 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent"
                  style={{
                    WebkitMaskImage: sharpMask,
                    maskImage: sharpMask,
                  }}
                >
                  {activePhrase}
                </span>

                {/* Soft Blurred Leading-Edge Letters Layer */}
                <span
                  aria-hidden="true"
                  className="col-start-1 row-start-1 py-1 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent pointer-events-none select-none"
                  style={{
                    filter: 'blur(7px)',
                    opacity: 0.9,
                    WebkitMaskImage: blurMask,
                    maskImage: blurMask,
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
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative flex items-center justify-center overflow-visible"
          >
            <div className="relative w-full max-w-[760px] lg:max-w-[840px] h-[420px] sm:h-[560px] lg:h-[650px] flex items-center justify-center overflow-visible">
              <img
                src="/assets/mockup-dual.png"
                alt="NORA App Dual Showcase"
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain drop-shadow-[0_35px_70px_rgba(0,0,0,0.9)] scale-[1.85] sm:scale-[1.55] lg:scale-[1.45] pointer-events-none select-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
