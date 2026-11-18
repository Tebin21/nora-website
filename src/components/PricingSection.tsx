import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Percent,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from 'lucide-react';
import { Language } from '../i18n/translations';

interface PricingSectionProps {
  lang: Language;
  onSelectPlan: () => void;
}

interface PricingTranslations {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  specialOfferBadge: string;
  specialOfferTitle: string;
  specialOfferDesc: string;
  specialOfferPrice: string;
  specialOfferPeriod: string;
  afterOfferNote: string;
  popular: string;
  andMore: string;
  plan1: {
    name: string;
    desc: string;
    priceIqd: string;
    priceUsd: string;
    period: string;
    cta: string;
    features: string[];
  };
  plan2: {
    name: string;
    desc: string;
    price: string;
    period: string;
    cta: string;
    features: string[];
  };
  enterprise: {
    name: string;
    desc: string;
    price: string;
    period: string;
    cta: string;
    features: string[];
  };
}

const PRICING_DATA: Record<Language, PricingTranslations> = {
  ku: {
    titleLine1: 'ئۆفەر و پلانەکانی نۆرە',
    titleLine2: 'گونجاو بۆ هەموو دەلاک و سالۆنێک',
    subtitle:
      'بە کەمترین تێچوو دەست بە بەکارهێنانی پێشکەوتووترین سیستەمی نۆرەگرتن بکە.',
    specialOfferBadge: 'ئۆفەر بۆ ئەندامانی نوێ',
    specialOfferTitle: 'ئەگەر ئەندامی نوێیت، ئەم ئۆفەرە بۆ تۆیە!',
    specialOfferDesc:
      'بۆ ماوەی ٣ مانگی یەکەم، تەنها 10,000 دینار بۆ تەواوی سێ مانگ بدە و دەست بە بەکارهێنانی NORA بکە. دوای تەواوبوونی ئۆفەرەکەش، دەتوانیت یەکێک لەم دوو پلانەی خوارەوە هەڵبژێریت.',
    specialOfferPrice: '10,000 دینار / بۆ ٣ مانگ',
    specialOfferPeriod: 'وەرگرتنی ئۆفەر',
    afterOfferNote: 'دوو پلانە سەرەکییەکەی نۆرە:',
    popular: 'پڕفرۆشترین',
    andMore: 'زیاتر ببینە',
    plan1: {
      name: '١. پلانی مانگانە',
      desc: 'بڕێکی جێگیر و دیاریکراو بۆ هەر مانگێک بێ سنووردارکردنی ژمارەی نۆرەکان.',
      priceIqd: '10,000 دینار',
      priceUsd: '$7',
      period: 'بۆ هەر مانگێک',
      cta: 'ئۆفەری ٣ مانگەکە وەربگرە',
      features: [
        'نۆرەگرتنی ئۆنلاینی بێسنوور لە مانگەکەدا',
        'پڕۆفایلی تایبەت و خشتەی ڕۆژانە و مانگانە',
        'ئاگادارکردنەوە و بیرخەرەوەی خۆکاری کاتی نۆرە',
        'هەژمارکردنی تەواوی داهاتی ڕۆژانە و مانگانە',
      ],
    },
    plan2: {
      name: '٢. پلانی ڕێژەی سەدی',
      desc: 'تەنها لە کاتی تەواوبوونی نۆرەکاندا ڕێژەیەکی کەم دەدەیت بێ کرێی مانگانەی جێگیر.',
      price: '%3',
      period: 'لە نرخی هەر حجزکردنێکی تەواوبوو',
      cta: 'ئێستا دەست پێ بکە',
      features: [
        'تەنها %3 لە نرخی هەر حجزکردنێکی تەواوبوو',
        'هیچ بڕە پارەیەک نادەیت ئەگەر حجزکردن نەبێت',
        'بەڕێوەبردنی خشتەی وەستا و ستاف و داهات',
        'پاڵپشتی تەکنیکی بەردەوام ٢٤/٧',
      ],
    },
    enterprise: {
      name: 'سەنتەرە گەورەکان (VIP)',
      desc: 'بۆ زنجیرە سەنتەر و بڕاندە گەورەکان.',
      price: 'بەم زووانە',
      period: 'پاکێجی تایبەت',
      cta: 'بەم زووانە بەردەست دەبێت',
      features: [
        'بەڕێوەبردنی چەندین لق لە یەک داشبۆرد',
        'ڕاپۆرتی دارایی و ژمێریاری پێشکەوتوو',
        'بەڕێوەبەری تایبەتی هەژمار',
        'گرێدانی سیستەمی تایبەت (API)',
      ],
    },
  },
  ar: {
    titleLine1: 'عروض وخطط نورا',
    titleLine2: 'مصممة لكل حلاق وصالون',
    subtitle:
      'ابدأ باستخدام أحدث نظام رقمي لحجز المواعيد وإدارة الصالونات بأقل تكلفة.',
    specialOfferBadge: 'عرض للأعضاء الجدد',
    specialOfferTitle: 'إذا كنت عضواً جديداً، فهذا العرض لك!',
    specialOfferDesc:
      'لمدة الأشهر الثلاثة الأولى، ادفع 10,000 دينار فقط لكامل الـ ٣ أشهر وابدأ باستخدام NORA. وبعد انتهاء العرض يمكنك اختيار إحدى الخطتين أدناه.',
    specialOfferPrice: '10,000 دينار / لـ ٣ أشهر',
    specialOfferPeriod: 'احصل على العرض',
    afterOfferNote: 'خطط الاشتراك الأساسية:',
    popular: 'الأكثر اختياراً',
    andMore: 'المزيد',
    plan1: {
      name: '١. الخطة الشهرية',
      desc: 'اشتراك شهري ثابت ومناسب مع حجوزات غير محدودة طوال الشهر.',
      priceIqd: '10,000 دينار',
      priceUsd: '$7',
      period: 'لكل شهر',
      cta: 'احصل على عرض الـ ٣ أشهر',
      features: [
        'حجوزات إلكترونية غير محدودة شهرياً',
        'ملف احترافي وجدول مواعيد يومي وشهري',
        'إشعارات وتذكيرات تلقائية بمواعيد الزبائن',
        'حساب تلقائي للأرباح اليومية والشهرية',
      ],
    },
    plan2: {
      name: '٢. خطة النسبة المئوية',
      desc: 'ادفع نسبة بسيطة فقط عن كل حجز مكتمل دون أي التزام شهري ثابت.',
      price: '%3',
      period: 'من سعر كل حجز مكتمل فقط',
      cta: 'ابدأ الآن',
      features: [
        'فقط %3 من قيمة كل حجز مكتمل',
        'لا تدفع أي رسوم في حال عدم وجود حجوزات',
        'إدارة كاملة للجدول والطاقم والأرباح',
        'دعم فني متواصل على مدار الساعة 24/7',
      ],
    },
    enterprise: {
      name: 'المراكز الكبرى (VIP)',
      desc: 'للمراكز الكبرى وسلاسل الصالونات.',
      price: 'قريباً',
      period: 'حلول مخصصة',
      cta: 'قريباً جداً',
      features: [
        'إدارة عدة فروع من لوحة واحدة',
        'تقارير مالية ومحاسبية متقدمة',
        'مدير حساب مخصص لمركزك',
        'تكامل مخصص للأنظمة',
      ],
    },
  },
  en: {
    titleLine1: 'NORA Offers & Plans',
    titleLine2: 'Tailored for Every Barber & Salon',
    subtitle:
      'Start using the smartest booking and salon management platform with our special new-member offer.',
    specialOfferBadge: 'Offer for New Members',
    specialOfferTitle: 'If You Are a New Member, This Offer Is for You!',
    specialOfferDesc:
      'For your first 3 months, pay only 10,000 IQD total for all three months and start using NORA. After the offer ends, simply choose one of the two plans below.',
    specialOfferPrice: '10,000 IQD / for 3 Months',
    specialOfferPeriod: 'Claim Offer',
    afterOfferNote: 'Our Two Core Plans:',
    popular: 'Most Popular',
    andMore: 'and more',
    plan1: {
      name: '1. Monthly Plan',
      desc: 'A flat, predictable monthly fee with unlimited appointments.',
      priceIqd: '10,000 IQD',
      priceUsd: '$7',
      period: 'per month',
      cta: 'Claim 3-Month Offer',
      features: [
        'Unlimited online bookings every month',
        'Dedicated profile & smart daily calendar',
        'Automated client appointment reminders',
        'Full daily & monthly IQD revenue tracking',
      ],
    },
    plan2: {
      name: '2. Percentage Plan',
      desc: 'Pay a small percentage only on completed bookings with zero fixed monthly fee.',
      price: '%3',
      period: 'of each completed booking price',
      cta: 'Get Started',
      features: [
        'Only 3% per completed appointment',
        'Pay nothing when you have no bookings',
        'Full schedule, staff & revenue insights',
        '24/7 priority technical support',
      ],
    },
    enterprise: {
      name: 'Business VIP',
      desc: 'For large salons and multi-branch chains.',
      price: 'Coming Soon',
      period: 'custom plan',
      cta: 'Coming Soon',
      features: [
        'Multi-Location Management',
        'Custom Branding & Analytics',
        'Dedicated Account Manager',
        'Custom API Integrations',
      ],
    },
  },
};

export const PricingSection: React.FC<PricingSectionProps> = ({
  lang,
  onSelectPlan,
}) => {
  const [offerOpen, setOfferOpen] = useState(false);

  const d = PRICING_DATA[lang] || PRICING_DATA.ku;
  const isRtl = lang !== 'en';
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">
            <span className="block">{d.titleLine1}</span>
            <span className="block mt-1 bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              {d.titleLine2}
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-base text-zinc-400 leading-relaxed max-w-lg mx-auto">
            {d.subtitle}
          </p>
        </div>

        {/* INTERACTIVE NEW MEMBER OFFER BUTTON (Simple, no sparkle icon) */}
        <div className="mt-7 max-w-xl mx-auto flex flex-col items-center">
          <button
            type="button"
            onClick={() => setOfferOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#14171f] hover:bg-zinc-800 border border-zinc-800 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer"
          >
            <span>{d.specialOfferBadge}</span>
            <ChevronDown
              className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${
                offerOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {offerOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="w-full overflow-hidden"
              >
                <div className="mt-3 rounded-2xl p-5 sm:p-6 bg-[#0e0f12] border border-amber-500/35 text-center space-y-3 shadow-2xl">
                  <div className="inline-block rounded-lg bg-amber-500/15 border border-amber-400/30 px-3 py-1 text-xs font-extrabold text-amber-300">
                    {d.specialOfferPrice}
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    {d.specialOfferTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
                    {d.specialOfferDesc}
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={onSelectPlan}
                      className="rounded-xl px-5 py-2.5 text-xs font-extrabold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                    >
                      {d.specialOfferPeriod}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Cards Grid (2 Centered Cards, Always in IQD) */}
        <div className="mt-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* CARD 1: Plan 1 — Monthly Plan (10,000 IQD / month) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl p-7 sm:p-8 bg-[#0e0f12] border border-zinc-800 flex flex-col justify-between text-start shadow-2xl"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  {d.plan1.name}
                </h3>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {d.plan1.desc}
              </p>

              {/* Price (Always IQD) */}
              <div className="mt-6">
                <div className="text-3xl sm:text-[38px] font-extrabold text-white tracking-tight leading-none">
                  {d.plan1.priceIqd}
                </div>
                <div className="mt-2 text-xs text-zinc-400 font-medium">
                  {d.plan1.period}
                </div>
              </div>

              {/* Dark CTA Button */}
              <button
                type="button"
                onClick={onSelectPlan}
                className="mt-6 w-full rounded-xl py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 transition-all cursor-pointer"
              >
                {d.plan1.cta}
              </button>

              {/* Features List */}
              <ul className="mt-8 space-y-3.5">
                {d.plan1.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-zinc-300 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-2">
              <button
                type="button"
                onClick={onSelectPlan}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>{d.andMore}</span>
                <ChevronIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>

          {/* CARD 2: Plan 2 — Percentage Plan (3% per completed booking) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="relative rounded-2xl p-7 sm:p-8 bg-gradient-to-b from-[#171920] via-[#111318] to-[#0e0f12] border border-zinc-700 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] flex flex-col justify-between text-start lg:-translate-y-2"
          >
            <div className="relative z-10">
              {/* Card Header with Popular Pill */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-white">
                    <Percent className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white">
                    {d.plan2.name}
                  </h3>
                </div>

                <span className="rounded-full bg-zinc-800 border border-zinc-700 px-3 py-1 text-[11px] font-bold text-zinc-200">
                  {d.popular}
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {d.plan2.desc}
              </p>

              {/* Price */}
              <div className="mt-6">
                <div className="text-4xl sm:text-[42px] font-extrabold text-white tracking-tight leading-none">
                  {d.plan2.price}
                </div>
                <div className="mt-2 text-xs text-zinc-400 font-medium">
                  {d.plan2.period}
                </div>
              </div>

              {/* Bright White Primary Button */}
              <button
                type="button"
                onClick={onSelectPlan}
                className="mt-6 w-full rounded-xl py-3.5 px-4 text-xs sm:text-sm font-extrabold text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-[0_8px_25px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                {d.plan2.cta}
              </button>

              {/* Features List */}
              <ul className="mt-8 space-y-3.5">
                {d.plan2.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200"
                  >
                    <CheckCircle2 className="h-4 w-4 text-white shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 mt-8 pt-2">
              <button
                type="button"
                onClick={onSelectPlan}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>{d.andMore}</span>
                <ChevronIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
