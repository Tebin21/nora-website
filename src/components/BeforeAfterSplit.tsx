import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  Users,
  UserCheck,
  Sparkles,
  Clock,
  CalendarCheck2,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { Language, TranslationSchema } from '../i18n/translations';

interface BeforeAfterSplitProps {
  t: TranslationSchema;
  lang?: Language;
}

interface MissionContent {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  pillars: {
    id: string;
    tag: string;
    capacityBadge: string;
    title: string;
    desc: string;
    highlights: string[];
  }[];
  liveVisual: {
    orbitLabel: string;
    stat1Val: string;
    stat1Label: string;
    stat2Val: string;
    stat2Label: string;
    stat3Val: string;
    stat3Label: string;
  };
}

const MISSION_DATA: Record<Language, MissionContent> = {
  ku: {
    badge: 'ئامانج و فەلسەفەی نۆرە',
    titleLine1: 'ئامانجی نۆرە چییە و',
    titleLine2: 'بۆ کێ و بۆ چەند کەس دروست کراوە؟',
    lead: 'ئامانجی سەرەکی NORA گۆڕینی شێوازی نەریتی و کۆنی چاوەڕوانییە بۆ سیستەمێکی دیجیتاڵی و ستانداردی جیهانی؛ تا هەم کاتی موشتەری پارێزراو بێت و هەم خاوەن کارەکانیش بە ئارامی و پڕۆفیشناڵی کارەکانیان بەڕێوە ببەن.',
    pillars: [
      {
        id: 'purpose',
        tag: 'ئامانجی سەرەکی',
        capacityBadge: 'بۆ هەموو بەشداربووان',
        title: 'ڕێزگرتن لە کات و کۆتاییهێنان بە چاوەڕوانی',
        desc: 'نۆرە وەک پردێکی زیرەک لە نێوان موشتەری و پسپۆڕەکان کار دەکات؛ بۆ ئەوەی هیچ کەسێک کاتژمێرەکان لەسەر کورسی چاوەڕوانی بەفیڕۆ نەدات و هیچ وەستایەکیش بە زەنگی تەلەفۆنی بەردەوام لە کارەکەی دانەبڕێت.',
        highlights: [
          'دیاریکردنی کاتی وردی سەردان بە چەند چرکەیەک',
          'ئاگادارکردنەوەی خۆکار و بیرخەرەوە پێش کاتی نۆرە',
          'کەمکردنەوەی قەرەباڵغی و دروستکردنی ژینگەیەکی ئارام',
        ],
      },
      {
        id: 'solo',
        tag: 'بۆ تاکە پسپۆڕ',
        capacityBadge: '١ وەستا / پسپۆڕی سەربەخۆ',
        title: 'یاریدەدەرێکی دیجیتاڵی بۆ هەر وەستایەک بە تەنیا',
        desc: 'ئەگەر بە تەنیا لە دوکانەکەت کار دەکەیت، نۆرە تەواوی خشتەی ڕۆژانە و مانگانەت بۆ ڕێکدەخات، نۆرەکان وەردەگرێت و داهاتی ڕۆژانەت بە دینار بۆ هەژمار دەکات بێ ئەوەی پێویستت بە سکرتێر یان وەڵامدانەوەی تەلەفۆن بێت.',
        highlights: [
          'تایبەت بە ١ وەستا بە پڕۆفایل و خشتەی سەربەخۆ',
          'هەژمارکردنی خۆکاری داهاتی ڕۆژانە و مانگانە',
          'تۆماری تەواوی موشتەرییەکان و مێژووی سەردانەکانیان',
        ],
      },
      {
        id: 'team',
        tag: 'بۆ تیم و سەنتەرەکان',
        capacityBadge: 'لە ٢ تا +٢٠ پسپۆڕ لە یەک شوێن',
        title: 'بەڕێوەبردنی ستاف و سەنتەرە گەورەکان پێکەوە',
        desc: 'بۆ ئەو سەرتاشخانە، سالۆن و سەنتەری جوانکارییانەی چەندین وەستا و کارمەندیان هەیە؛ هەر پسپۆڕێک خشتە و نۆرەی تایبەت بە خۆی دەبێت و خاوەن کاریش لە یەک داشبۆردەوە سەرپەرشتی هەموویان دەکات.',
        highlights: [
          'گونجاو بۆ ٢ تا زیاتر لە ٢٠ کورسی و پسپۆڕی جیاواز',
          'جیاکردنەوەی خزمەتگوزاری، کات و داهاتی هەر کارمەندێک',
          'پێدانی دەسەڵاتی جیاواز بە بەڕێوەبەر و ستاف',
        ],
      },
    ],
    liveVisual: {
      orbitLabel: 'سیستەمی زیرەکی نۆرە',
      stat1Val: '١ تا +٢٠',
      stat1Label: 'پسپۆڕ لە هەر سەنتەرێک',
      stat2Val: '٢٤/٧',
      stat2Label: 'وەرگرتنی نۆرەی ئۆنلاین',
      stat3Val: '%١٠٠',
      stat3Label: 'ڕێکخستنی کات و داهات',
    },
  },
  ar: {
    badge: 'رؤية وهدف نورا',
    titleLine1: 'ما هو هدف نورا،',
    titleLine2: 'ولمن ولأي حجم من الأعمال صُمم؟',
    lead: 'هدف NORA الأساسي هو تحويل تجربة الانتظار التقليدية إلى نظام رقمي بمعايير عالمية؛ لحفظ وقت الزبون وتمكين أصحاب الصالونات والمراكز من إدارة أعمالهم بهدوء واحترافية تامة.',
    pillars: [
      {
        id: 'purpose',
        tag: 'الهدف الأساسي',
        capacityBadge: 'لكل الزبائن والمختصين',
        title: 'احترام الوقت وإنهاء الانتظار العشوائي',
        desc: 'يعمل نورا كحلقة وصل ذكية بين الزبون والمختص؛ فلا يضيع الزبون ساعات في قاعات الانتظار، ولا ينشغل الحلاق أو الخبير بالرد على المكالمات أثناء العمل.',
        highlights: [
          'تحديد دقيق لموعد الزيارة خلال ثوانٍ معدودة',
          'إشعارات وتذكيرات تلقائية قبل موعد الحجز',
          'إنهاء الازدحام وتوفير بيئة عمل هادئة وراقية',
        ],
      },
      {
        id: 'solo',
        tag: 'للمختص المستقل',
        capacityBadge: 'حلاق أو خبير واحد (١)',
        title: 'مساعد رقمي متكامل للحلاق المستقل',
        desc: 'إذا كنت تعمل بمفردك، يتولى نورا تنظيم جدولك اليومي والشهري واستقبال الحجوزات وحساب أرباحك تلقائياً دون الحاجة للرد على الهاتف أثناء العمل.',
        highlights: [
          'مصمم لخبير واحد بملف وجدول مستقل بالكامل',
          'حساب تلقائي للإيرادات اليومية والشهرية',
          'أرشيف متكامل لبيانات الزبائن وزياراتهم السابقة',
        ],
      },
      {
        id: 'team',
        tag: 'للأفرقة والمراكز',
        capacityBadge: 'من ٢ إلى +٢٠ مختصاً في مكان واحد',
        title: 'إدارة الصالونات والمراكز متعددة الطاقم',
        desc: 'للصالونات ومراكز التجميل التي تضم عدة حلاقين أو خبيرات؛ يحصل كل مختص على جدوله الخاص بينما يتابع صاحب العمل الأداء العام من لوحة تحكم موحدة.',
        highlights: [
          'يدعم من ٢ إلى أكثر من ٢٠ كرسياً ومختصاً',
          'فصل مواعيد وخدمات وأرباح كل فرد في الفريق',
          'صلاحيات مخصصة للإدارة وأعضاء الطاقم',
        ],
      },
    ],
    liveVisual: {
      orbitLabel: 'منظومة نورا الذكية',
      stat1Val: '١ إلى +٢٠',
      stat1Label: 'مختص في كل مركز',
      stat2Val: '24/7',
      stat2Label: 'استقبال حجوزات مستمر',
      stat3Val: '100%',
      stat3Label: 'تنظيم الوقت والأرباح',
    },
  },
  en: {
    badge: 'Our Mission & Purpose',
    titleLine1: 'What NORA Stands For &',
    titleLine2: 'Who It Is Built To Serve',
    lead: 'NORA’s mission is to replace crowded waiting rooms and phone-call chaos with a world-class digital booking standard—protecting every client’s time while giving solo specialists and multi-staff salons effortless control.',
    pillars: [
      {
        id: 'purpose',
        tag: 'Core Mission',
        capacityBadge: 'Clients & Businesses',
        title: 'Respecting Time & Eliminating Waiting Rooms',
        desc: 'NORA bridges clients and specialists seamlessly so customers never waste hours waiting in line, and professionals never lose focus answering phone calls mid-service.',
        highlights: [
          'Instant online slot reservation in seconds',
          'Automated smart reminders before every appointment',
          'Calm, crowd-free studios and predictable schedules',
        ],
      },
      {
        id: 'solo',
        tag: 'Solo Specialist',
        capacityBadge: '1 Independent Barber / Stylist',
        title: 'A 24/7 Digital Assistant for Solo Professionals',
        desc: 'Working solo? NORA manages your entire calendar, accepts bookings around the clock, and tracks your daily and monthly revenue automatically.',
        highlights: [
          'Tailored for 1 independent barber or specialist',
          'Automated daily, weekly, and monthly revenue tracking',
          'Complete client history and retention insights',
        ],
      },
      {
        id: 'team',
        tag: 'Growing Teams',
        capacityBadge: '2 to 20+ Specialists Per Studio',
        title: 'Scalable Management for Multi-Staff Salons',
        desc: 'Built for busy barbershops and beauty centers with multiple chairs—each team member gets their own calendar and analytics under one unified studio profile.',
        highlights: [
          'Scales from 2 up to 20+ chairs and specialists',
          'Individual schedules, services, and revenue per staff',
          'Role-based permissions for owners and team members',
        ],
      },
    ],
    liveVisual: {
      orbitLabel: 'NORA Smart Ecosystem',
      stat1Val: '1 to 20+',
      stat1Label: 'Specialists Per Studio',
      stat2Val: '24/7',
      stat2Label: 'Automated Booking',
      stat3Val: '100%',
      stat3Label: 'Time & Revenue Clarity',
    },
  },
};

export const BeforeAfterSplit: React.FC<BeforeAfterSplitProps> = ({
  lang = 'ku',
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const data = MISSION_DATA[lang] || MISSION_DATA.ku;

  // Auto-cycle through the 3 mission pillars every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % data.pillars.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [data.pillars.length]);

  const activePillar = data.pillars[activeIdx];

  const pillarIcons = [Target, UserCheck, Users];

  return (
    <section id="story" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-white leading-[1.25] text-balance">
            <span className="block">{data.titleLine1}</span>
            <span className="block mt-1 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              {data.titleLine2}
            </span>
          </h2>

          <p className="mt-4 text-xs sm:text-base text-slate-300/85 leading-relaxed max-w-2xl mx-auto text-balance">
            {data.lead}
          </p>
        </div>

        {/* Main Interactive Grid: Animated Visual Hub + 3 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Start: Solid Matte NORA Ecosystem Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0d0f14] border border-zinc-800 rounded-[28px] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              {/* Animated Orbital Rings */}
              <div className="relative h-64 sm:h-72 flex items-center justify-center">
                {/* Outer Rotating Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-56 w-56 sm:h-64 sm:w-64 rounded-full border border-dashed border-zinc-700"
                >
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-amber-400" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-zinc-300" />
                </motion.div>

                {/* Middle Counter-Rotating Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute h-40 w-40 sm:h-44 sm:w-44 rounded-full border border-amber-500/35"
                >
                  <div className="absolute top-1/2 -start-1.5 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </motion.div>

                {/* Center NORA Logo Only (No box or label) */}
                <div className="relative z-10 flex items-center justify-center">
                  <img
                    src="/assets/nora-logo.png"
                    alt="NORA"
                    className="w-24 sm:w-28 h-auto object-contain invert brightness-200"
                  />
                </div>
              </div>

              {/* 3 Compact Solid Capacity & Purpose Metrics */}
              <div className="mt-4 pt-5 border-t border-zinc-800 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl p-2.5 bg-[#14171f] border border-zinc-800">
                  <div className="text-sm sm:text-base font-extrabold text-amber-400">
                    {data.liveVisual.stat1Val}
                  </div>
                  <div className="mt-0.5 text-[10px] sm:text-[11px] text-zinc-400">
                    {data.liveVisual.stat1Label}
                  </div>
                </div>

                <div className="rounded-xl p-2.5 bg-[#14171f] border border-zinc-800">
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {data.liveVisual.stat2Val}
                  </div>
                  <div className="mt-0.5 text-[10px] sm:text-[11px] text-zinc-400">
                    {data.liveVisual.stat2Label}
                  </div>
                </div>

                <div className="rounded-xl p-2.5 bg-[#14171f] border border-zinc-800">
                  <div className="text-sm sm:text-base font-extrabold text-emerald-400">
                    {data.liveVisual.stat3Val}
                  </div>
                  <div className="mt-0.5 text-[10px] sm:text-[11px] text-zinc-400">
                    {data.liveVisual.stat3Label}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right / End: 3 Solid Mission & Capacity Cards */}
          <div className="lg:col-span-7 space-y-4">
            {/* Selector Tabs — Always Side-by-Side on One Row */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {data.pillars.map((pillar, idx) => {
                const Icon = pillarIcons[idx] || Layers;
                const active = activeIdx === idx;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`relative flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-2 py-2.5 sm:px-4 text-[11px] sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap truncate ${active
                      ? 'text-zinc-950 bg-white'
                      : 'bg-[#12151d] border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                      }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${active ? 'text-amber-600' : 'text-amber-400'
                        }`}
                    />
                    <span className="truncate">{pillar.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Detailed Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="bg-[#0d0f14] border border-zinc-800 rounded-[24px] p-6 sm:p-8 text-start shadow-2xl"
              >
                <div className="inline-flex items-center gap-2 rounded-lg bg-[#161922] border border-zinc-800 px-3.5 py-1 text-xs font-extrabold text-amber-400 mb-4">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>{activePillar.capacityBadge}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  {activePillar.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
                  {activePillar.desc}
                </p>

                <div className="mt-6 pt-5 border-t border-zinc-800 space-y-3">
                  {activePillar.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs sm:text-sm font-bold text-zinc-100"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
