import React, { useState, useEffect } from 'react';
import { Language, translations } from './i18n/translations';
import { LiquidGlassNav } from './components/LiquidGlassNav';
import { HeroSection } from './components/HeroSection';
import { BeforeAfterSplit } from './components/BeforeAfterSplit';
import { BookingSimulator } from './components/BookingSimulator';
import { ProviderShowcase } from './components/ProviderShowcase';
import { PricingSection } from './components/PricingSection';
import { PartnerOnboarding } from './components/PartnerOnboarding';
import { Footer } from './components/Footer';
import MoltenMetal from './components/MoltenMetal';

const SectionDivider = () => (
  <div aria-hidden="true" className="mx-auto max-w-5xl px-6">
    <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent">
      <div className="absolute left-1/2 -translate-x-1/2 -top-px h-[2px] w-28 bg-gradient-to-r from-transparent via-amber-300/35 to-transparent blur-[1px]" />
    </div>
  </div>
);

export function App() {
  const [lang, setLang] = useState<Language>('ku');
  const [activeSection, setActiveSection] = useState<string>('home');

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      dir={t.dir}
      className="min-h-screen bg-[#05060a] text-slate-100 relative selection:bg-amber-500/30 selection:text-amber-200"
    >
      {/* Full-Screen WebGL2 MoltenMetal Motion Background (Softly Blurred) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden blur-[22px] sm:blur-[30px] opacity-60"
      >
        <MoltenMetal
          colors={['#475569', '#CBD5E1']}
          coreColor="#FFFFFF"
          speed={0.28}
          scale={3.8}
          detail={3}
          glow={1.4}
          thickness={1}
          swirl={1}
          turbulence={0.2}
          haze={0.75}
          brightness={1.1}
          colorMode="frost"
          opacity={0.75}
          intro={true}
          mouseInteraction={true}
          mouseStrength={0.45}
          flareOnClick={true}
        />
      </div>

      {/* Full Liquid Glass Navigation Bar (Top + Mobile Menu) */}
      <LiquidGlassNav
        lang={lang}
        setLang={setLang}
        t={t}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection t={t} lang={lang} onNavigate={handleNavigate} />
        <SectionDivider />
        <BeforeAfterSplit t={t} lang={lang} />
        <SectionDivider />
        <BookingSimulator t={t} lang={lang} />
        <SectionDivider />
        <ProviderShowcase t={t} />
        <SectionDivider />
        <PricingSection
          lang={lang}
          onSelectPlan={() => handleNavigate('partner')}
        />
        <SectionDivider />
        <PartnerOnboarding t={t} lang={lang} />
      </main>

      {/* Liquid Glass Footer */}
      <Footer
        t={t}
        lang={lang}
        setLang={setLang}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
