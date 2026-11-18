import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import {
  CalendarRange,
  Wallet,
  BellOff,
  Award,
} from 'lucide-react';
import { TranslationSchema } from '../i18n/translations';

interface ProviderShowcaseProps {
  t: TranslationSchema;
}

export const ProviderShowcase: React.FC<ProviderShowcaseProps> = ({ t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const features = [
    {
      icon: CalendarRange,
      title: t.providerSection.features.f1Title,
      desc: t.providerSection.features.f1Desc,
      accent: 'text-amber-400 bg-amber-500/15 border-amber-400/30',
    },
    {
      icon: Wallet,
      title: t.providerSection.features.f2Title,
      desc: t.providerSection.features.f2Desc,
      accent: 'text-emerald-400 bg-emerald-500/15 border-emerald-400/30',
    },
    {
      icon: BellOff,
      title: t.providerSection.features.f3Title,
      desc: t.providerSection.features.f3Desc,
      accent: 'text-sky-400 bg-sky-500/15 border-sky-400/30',
    },
    {
      icon: Award,
      title: t.providerSection.features.f4Title,
      desc: t.providerSection.features.f4Desc,
      accent: 'text-purple-400 bg-purple-500/15 border-purple-400/30',
    },
  ];

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length, currentIndex]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % features.length);
    } else if (info.offset.x > swipeThreshold) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    }
  };

  const activeFeature = features[currentIndex];
  const ActiveIcon = activeFeature.icon;

  return (
    <section id="providers" className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Top / First: Heading + Auto-Sliding & Draggable Feature Card */}
          <div className="lg:col-span-7 text-start">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight text-balance">
              {t.providerSection.title}
            </h2>

            <p className="mt-3 text-xs sm:text-base text-slate-300/80 leading-relaxed max-w-xl">
              {t.providerSection.subtitle}
            </p>

            {/* Simple Auto-Sliding & Swipeable Card (No Left/Right Buttons) */}
            <div className="mt-8 relative">
              <div className="bg-[#0d0f14] border border-zinc-800 shadow-2xl rounded-3xl p-6 sm:p-8 min-h-[175px] flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.35}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0, x: direction > 0 ? 45 : -45 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -45 : 45 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    className="flex items-start gap-4 touch-pan-y"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${activeFeature.accent}`}
                    >
                      <ActiveIcon className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-extrabold text-white">
                        {activeFeature.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-300/85 leading-relaxed">
                        {activeFeature.desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Minimal Centered Progress Dots */}
                <div
                  dir="ltr"
                  className="mt-5 flex items-center justify-center gap-2"
                >
                  {features.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex
                          ? 'w-6 bg-amber-400'
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom / Second: Larger Provider Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex items-center justify-center pt-6 lg:pt-0 overflow-visible"
          >
            <div className="relative w-full max-w-[460px] sm:max-w-[520px] flex items-center justify-center overflow-visible">
              <img
                src="/assets/mockup-provider.png"
                alt="NORA Provider Schedule & IQD Revenue Dashboard"
                className="w-full h-auto object-contain drop-shadow-[0_35px_65px_rgba(0,0,0,0.9)] scale-[1.45] sm:scale-[1.32] select-none pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
