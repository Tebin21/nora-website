import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scissors,
  Sparkles,
  Clock,
  CheckCircle2,
  MapPin,
  Star,
  Calendar,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Heart,
  Gem,
} from 'lucide-react';
import { Language, TranslationSchema } from '../i18n/translations';

interface BookingSimulatorProps {
  t: TranslationSchema;
  lang: Language;
}

interface ServiceItem {
  id: string;
  name: Record<Language, string>;
  price: string;
  duration: string;
}

interface SpecialistItem {
  id: string;
  name: Record<Language, string>;
  city: Record<Language, string>;
  category: 'barber' | 'salon' | 'nails';
  rating: string;
  image?: string;
  services: ServiceItem[];
}

const DEMO_SPECIALISTS: SpecialistItem[] = [
  // ================= 4 BARBERS =================
  {
    id: 'hallo',
    name: {
      ku: 'هەڵۆ باربەر (Hallo Barber)',
      ar: 'هلو باربر (Hallo Barber)',
      en: 'Hallo Barber',
    },
    city: {
      ku: 'سلێمانی • بەختیاری',
      ar: 'السليمانية • بختياري',
      en: 'Sulaymaniyah • Bakhtiari',
    },
    category: 'barber',
    rating: '5.0',
    image: '/assets/barbers/hallo.jpg',
    services: [
      {
        id: 'haircut',
        name: { ku: 'سەرچاککردن و ستایل', ar: 'قص شعر وتصفيف كامل', en: 'Signature Haircut & Styling' },
        price: '15,000 IQD',
        duration: '30m',
      },
      {
        id: 'beard',
        name: { ku: 'چاککردنی ڕیش و هەڵم', ar: 'تحديد اللحية بالبخار', en: 'Hot Towel Beard Ritual' },
        price: '10,000 IQD',
        duration: '20m',
      },
      {
        id: 'vip',
        name: { ku: 'پاکێجی VIP (سەر و ڕیش و پێست)', ar: 'باقة VIP المتكاملة', en: 'VIP Full Grooming Package' },
        price: '25,000 IQD',
        duration: '45m',
      },
    ],
  },
  {
    id: 'zhira',
    name: {
      ku: 'ژیرا هێرکەت (Zhira HairCut)',
      ar: 'جيرا هيركت (Zhira HairCut)',
      en: 'Zhira HairCut',
    },
    city: {
      ku: 'سلێمانی • دەروازە ستی ٤',
      ar: 'السليمانية • دروازة سيتي ٤',
      en: 'Sulaymaniyah • Darwaza City 4',
    },
    category: 'barber',
    rating: '5.0',
    image: '/assets/barbers/zhira.jpg',
    services: [
      {
        id: 'fade',
        name: { ku: 'سکین فەید و ستایل', ar: 'قص تدريج وتحديد', en: 'Skin Fade & Styling' },
        price: '15,000 IQD',
        duration: '30m',
      },
      {
        id: 'full',
        name: { ku: 'سەر و ڕیش و ماسکی دەموچاو', ar: 'شعر ولحية وقناع وجه', en: 'Haircut, Beard & Facial Mask' },
        price: '25,000 IQD',
        duration: '45m',
      },
    ],
  },
  {
    id: 'mustafa',
    name: {
      ku: 'مستەفای دەلاک (Mustafa Barber)',
      ar: 'مصطفى الحلاق (Mustafa Barber)',
      en: 'Mustafa Barber',
    },
    city: {
      ku: 'سلێمانی • شەهیدانی زەرگەتە',
      ar: 'السليمانية • شهيداني زرگتة',
      en: 'Sulaymaniyah • Shahidani Zargata',
    },
    category: 'barber',
    rating: '4.9',
    image: '/assets/barbers/mustafa.jpg',
    services: [
      {
        id: 'classic',
        name: { ku: 'سەرچاککردنی کلاسیک و مۆدێرن', ar: 'قص شعر كلاسيك وعصري', en: 'Classic & Modern Haircut' },
        price: '15,000 IQD',
        duration: '30m',
      },
      {
        id: 'groom',
        name: { ku: 'سەر و ڕیش چاککردن', ar: 'قص شعر وتحديد اللحية', en: 'Haircut & Beard Trim' },
        price: '20,000 IQD',
        duration: '40m',
      },
    ],
  },
  {
    id: 'harwn',
    name: {
      ku: 'هارون هێرکەت (Harwn Haircut)',
      ar: 'هارون هيركت (Harwn Haircut)',
      en: 'Harwn Haircut',
    },
    city: {
      ku: 'هەڵەبجە • بازاڕی کڵاش فرۆشەکان',
      ar: 'حلبجة • سوق الكلاش',
      en: 'Halabja • Klash Market',
    },
    category: 'barber',
    rating: '5.0',
    image: '/assets/barbers/harwn.jpg',
    services: [
      {
        id: 'style',
        name: { ku: 'سەرچاککردن و شۆردن', ar: 'قص وغسيل وتصفيف الشعر', en: 'Haircut, Wash & Style' },
        price: '15,000 IQD',
        duration: '30m',
      },
      {
        id: 'vip-harwn',
        name: { ku: 'خزمەتگوزاری تەواوی VIP', ar: 'خدمة VIP الشاملة', en: 'Full VIP Grooming' },
        price: '25,000 IQD',
        duration: '45m',
      },
    ],
  },

  // ================= 4 SALONS =================
  {
    id: 'salon-zhwan',
    name: {
      ku: 'سالۆنی جوانکاری ژوان (Zhwan Salon)',
      ar: 'صالون جوان للتجميل (Zhwan Salon)',
      en: 'Zhwan Beauty Salon',
    },
    city: {
      ku: 'سلێمانی • شەهیدانی سەرچنار',
      ar: 'السليمانية • سرجنار',
      en: 'Sulaymaniyah • Sarchnar',
    },
    category: 'salon',
    rating: '5.0',
    image: '/assets/barbers/salon2.jpg',
    services: [
      {
        id: 'hair-style',
        name: { ku: 'بڕین و فۆن و ستایلی قژ', ar: 'قص وسشوار وتصفيف الشعر', en: 'Haircut, Blowout & Styling' },
        price: '35,000 IQD',
        duration: '45m',
      },
      {
        id: 'makeup',
        name: { ku: 'مەیکئەپ و جوانکاری بۆنەکان', ar: 'مكياج مناسبات احترافي', en: 'Evening & Event Makeup' },
        price: '60,000 IQD',
        duration: '60m',
      },
      {
        id: 'protein',
        name: { ku: 'پڕۆتین و کیراتینی قژ', ar: 'بروتين وكيراتين الشعر', en: 'Keratin & Protein Hair Treatment' },
        price: '85,000 IQD',
        duration: '90m',
      },
    ],
  },
  {
    id: 'salon-vian',
    name: {
      ku: 'ڤیان سالۆن (Vian Beauty Salon)',
      ar: 'فيان صالون (Vian Beauty Salon)',
      en: 'Vian Beauty Salon',
    },
    city: {
      ku: 'سلێمانی • شەقامی سالم',
      ar: 'السليمانية • شارع سالم',
      en: 'Sulaymaniyah • Salim St.',
    },
    category: 'salon',
    rating: '4.9',
    image: '/assets/barbers/salon3.jpg',
    services: [
      {
        id: 'color',
        name: { ku: 'ڕەنگکردن و هایلایتی قژ', ar: 'صبغ وهايلايت الشعر', en: 'Hair Coloring & Highlights' },
        price: '50,000 IQD',
        duration: '60m',
      },
      {
        id: 'hydrafacial',
        name: { ku: 'پاککردنەوەی پێست (HydraFacial)', ar: 'تنظيف البشرة العميق (HydraFacial)', en: 'Deep HydraFacial Glow' },
        price: '45,000 IQD',
        duration: '45m',
      },
    ],
  },
  {
    id: 'salon-sarezh',
    name: {
      ku: 'سالۆن سارێژ (Salon Sarezh)',
      ar: 'صالون ساريج (Salon Sarezh)',
      en: 'Salon Sarezh',
    },
    city: {
      ku: 'هەولێر • ئیمپێریاڵ',
      ar: 'أربيل • إمبيريال',
      en: 'Erbil • Empire World',
    },
    category: 'salon',
    rating: '5.0',
    image: '/assets/barbers/salon1.jpg',
    services: [
      {
        id: 'bridal',
        name: { ku: 'پاکێجی تایبەتی بووک و ئاهەنگ', ar: 'باقة العروس والمناسبات', en: 'Bridal & Glamour Package' },
        price: '120,000 IQD',
        duration: '90m',
      },
      {
        id: 'brows',
        name: { ku: 'دیزاینی برۆ و لامینەیشن', ar: 'تصميم ورفع الحواجب', en: 'Brow Lamination & Shaping' },
        price: '25,000 IQD',
        duration: '30m',
      },
    ],
  },
  {
    id: 'salon-loya',
    name: {
      ku: 'لۆیا بیوتی سەنتەر (Loya Beauty)',
      ar: 'لويا بيوتي سنتر (Loya Beauty)',
      en: 'Loya Beauty Center',
    },
    city: {
      ku: 'دهۆک • سەنتەری شار',
      ar: 'دهوك • المركز',
      en: 'Duhok • City Center',
    },
    category: 'salon',
    rating: '4.9',
    image: '/assets/barbers/salon4.jpg',
    services: [
      {
        id: 'blowdry',
        name: { ku: 'شۆردن و فۆنی قژ', ar: 'غسيل وسشوار الشعر', en: 'Signature Wash & Blowout' },
        price: '25,000 IQD',
        duration: '35m',
      },
      {
        id: 'skin-care',
        name: { ku: 'چاودێری و ماسکی پێست', ar: 'عناية ونضارة البشرة', en: 'Luxury Skin Care Session' },
        price: '40,000 IQD',
        duration: '45m',
      },
    ],
  },

  // ================= 4 NAILS & SPA (DEMO) =================
  {
    id: 'nails-diamond',
    name: {
      ku: 'دایمۆند نەیلز و سپا (Diamond Nails)',
      ar: 'دايموند نيلز وسبا (Diamond Nails)',
      en: 'Diamond Nails & Spa',
    },
    city: {
      ku: 'سلێمانی • شەقامی سالم',
      ar: 'السليمانية • شارع سالم',
      en: 'Sulaymaniyah • Salim St.',
    },
    category: 'nails',
    rating: '5.0',
    image: '/assets/barbers/nails1.jpg',
    services: [
      {
        id: 'gel-ext',
        name: { ku: 'جێڵ و درێژکردنەوەی نینۆک', ar: 'جل وتركيب الأظافر', en: 'Full Gel Nail Extensions' },
        price: '35,000 IQD',
        duration: '50m',
      },
      {
        id: 'pedicure',
        name: { ku: 'پێدیکیور و سپای قاچ', ar: 'باديكير وسبا القدمين', en: 'Deluxe Spa Pedicure' },
        price: '25,000 IQD',
        duration: '40m',
      },
    ],
  },
  {
    id: 'nails-aura',
    name: {
      ku: 'ئۆرا نەیل ستۆدیۆ (Aura Nail Studio)',
      ar: 'أورا نيل ستوديو (Aura Nail Studio)',
      en: 'Aura Nail Studio',
    },
    city: {
      ku: 'هەولێر • دریم ستی',
      ar: 'أربيل • دريم سيتي',
      en: 'Erbil • Dream City',
    },
    category: 'nails',
    rating: '4.9',
    image: '/assets/barbers/nails2.jpg',
    services: [
      {
        id: 'biab',
        name: { ku: 'مەنیکیور و بەهێزکردنی نینۆک (BIAB)', ar: 'مانيكير وتقوية الأظافر (BIAB)', en: 'BIAB Builder Gel Manicure' },
        price: '30,000 IQD',
        duration: '45m',
      },
      {
        id: 'nail-art',
        name: { ku: 'دیزاینی تایبەت و فرێنچ نەیل', ar: 'فرنش وتصميم الأظافر', en: 'French Tip & Custom Nail Art' },
        price: '25,000 IQD',
        duration: '35m',
      },
    ],
  },
  {
    id: 'nails-bella',
    name: {
      ku: 'بێلا نەیل ئارت (Bella Nail Art)',
      ar: 'بيلا نيل آرت (Bella Nail Art)',
      en: 'Bella Nail Art',
    },
    city: {
      ku: 'سلێمانی • بەختیاری',
      ar: 'السليمانية • بختياري',
      en: 'Sulaymaniyah • Bakhtiari',
    },
    category: 'nails',
    rating: '5.0',
    image: '/assets/barbers/nails3.jpg',
    services: [
      {
        id: 'acrylic',
        name: { ku: 'ئەکریلیک و نەخشاندنی نینۆک', ar: 'أكريليك وفن الأظافر', en: 'Acrylic Sculpt & Nail Art' },
        price: '40,000 IQD',
        duration: '60m',
      },
      {
        id: 'russian-mani',
        name: { ku: 'مەنیکیوری ڕووسی و جێڵ پۆڵیش', ar: 'مانيكير روسي وجل بولش', en: 'Russian Manicure & Gel Polish' },
        price: '25,000 IQD',
        duration: '40m',
      },
    ],
  },
  {
    id: 'nails-rose',
    name: {
      ku: 'ڕۆز گڵۆ نەیلز (Rose Glow Nails)',
      ar: 'روز غلو نيلز (Rose Glow Nails)',
      en: 'Rose Glow Nails & Spa',
    },
    city: {
      ku: 'دهۆک • ماسیک',
      ar: 'دهوك • ماسيك',
      en: 'Duhok • Masik',
    },
    category: 'nails',
    rating: '4.9',
    image: '/assets/barbers/nails4.jpg',
    services: [
      {
        id: 'combo-nails',
        name: { ku: 'پاکێجی مەنیکیور و پێدیکیور', ar: 'باقة مانيكير وباديكير', en: 'Manicure & Pedicure Combo' },
        price: '45,000 IQD',
        duration: '60m',
      },
      {
        id: 'gel-polish',
        name: { ku: 'بۆیەی هەمیشەیی جێڵ', ar: 'طلاء جل دائم للأظافر', en: 'Classic Gel Polish' },
        price: '20,000 IQD',
        duration: '30m',
      },
    ],
  },
];

const TIME_SLOTS = ['04:30 PM', '05:00 PM', '05:30 PM', '06:15 PM', '07:00 PM', '08:00 PM'];

const STEP_LABELS: Record<
  Language,
  {
    back: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    step4Title: string;
  }
> = {
  ku: {
    back: 'گەڕانەوە',
    step1Title: '١. سەرەتا پسپۆڕ یان سەنتەرەکە هەڵبژێرە',
    step2Title: '٢. جۆری خزمەتگوزارییەکە هەڵبژێرە',
    step3Title: '٣. کاتی گونجاوی نۆرەکەت دیاری بکە',
    step4Title: '٤. ئەنجامی حجزکردنی نۆرەکەت',
  },
  ar: {
    back: 'رجوع',
    step1Title: '١. اختر المختص أو الصالون أولاً',
    step2Title: '٢. اختر الخدمة المطلوبة',
    step3Title: '٣. حدد الوقت المناسب للموعد',
    step4Title: '٤. تأكيد وتذكرة الموعد',
  },
  en: {
    back: 'Back',
    step1Title: '1. Select a Specialist or Studio',
    step2Title: '2. Choose Your Service',
    step3Title: '3. Pick Your Appointment Time',
    step4Title: '4. Your Confirmed Booking Ticket',
  },
};

export const BookingSimulator: React.FC<BookingSimulatorProps> = ({ t, lang }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [categoryFilter, setCategoryFilter] = useState<'barber' | 'salon' | 'nails'>('barber');
  const [selectedSpec, setSelectedSpec] = useState<SpecialistItem>(DEMO_SPECIALISTS[0]);
  const [selectedService, setSelectedService] = useState<ServiceItem>(DEMO_SPECIALISTS[0].services[0]);
  const [selectedTime, setSelectedTime] = useState<string>('04:30 PM');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const labels = STEP_LABELS[lang] || STEP_LABELS.ku;
  const isRtl = lang !== 'en';
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Automatically cycle category every 5 seconds when on step 1 and visible
  useEffect(() => {
    if (step !== 1 || !isVisible) return;
    const order: ('barber' | 'salon' | 'nails')[] = ['barber', 'salon', 'nails'];
    const timer = setInterval(() => {
      setCategoryFilter((prev) => {
        const nextIdx = (order.indexOf(prev) + 1) % order.length;
        return order[nextIdx];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [step, categoryFilter, isVisible]);

  const filteredSpecialists = DEMO_SPECIALISTS.filter(
    (s) => s.category === categoryFilter
  );

  const handleSelectSpecialist = (spec: SpecialistItem) => {
    setSelectedSpec(spec);
    setSelectedService(spec.services[0]);
    setStep(2);
  };

  const handleSelectService = (srv: ServiceItem) => {
    setSelectedService(srv);
    setStep(3);
  };

  const handleSelectTime = (slot: string) => {
    setSelectedTime(slot);
    setStep(4);
  };

  const renderCategoryAvatar = (spec: SpecialistItem) => {
    if (spec.image) {
      return (
        <img
          src={spec.image}
          alt={spec.name[lang]}
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="h-14 w-14 rounded-2xl object-cover object-top border border-zinc-700 shrink-0"
        />
      );
    }
    if (spec.category === 'salon') {
      return (
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-500/15 border border-pink-400/30 text-pink-300">
          <Heart className="h-6 w-6" />
        </div>
      );
    }
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-300">
        <Gem className="h-6 w-6" />
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="simulator" className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            {t.simulator.title}
          </h2>
          <p className="mt-2.5 text-xs sm:text-base text-slate-300/80">
            {t.simulator.subtitle}
          </p>
        </div>

        {/* Step-by-Step Screen Wizard Console */}
        <div className="rounded-[28px] p-5 sm:p-8 bg-[#0d0f14] border border-zinc-800 shadow-2xl">
          {/* Top Step Progress Bar (1 -> 2 -> 3 -> 4) */}
          <div className="flex items-center justify-between gap-2 pb-5 mb-6 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : 1))}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#14171f] hover:bg-zinc-800 border border-zinc-700 px-3 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  <BackArrow className="h-3.5 w-3.5 text-amber-400" />
                  <span>{labels.back}</span>
                </button>
              )}
              <span className="text-xs sm:text-sm font-extrabold text-amber-400">
                {step === 1 && labels.step1Title}
                {step === 2 && labels.step2Title}
                {step === 3 && labels.step3Title}
                {step === 4 && labels.step4Title}
              </span>
            </div>

            {/* 4 Step Dots */}
            <div dir="ltr" className="flex items-center gap-1.5 shrink-0">
              {[1, 2, 3, 4].map((n) => (
                <span
                  key={n}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === n
                      ? 'w-6 bg-amber-400'
                      : step > n
                      ? 'w-2 bg-emerald-400'
                      : 'w-2 bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Animated Screen Content */}
          <AnimatePresence mode="wait">
            {/* ================= SCREEN 1: CHOOSE SPECIALIST ================= */}
            {step === 1 && (
              <motion.div
                key="screen-1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                {/* Category Filter Tabs (No 'All' tab — Auto-cycles every 5s) */}
                <div className="grid grid-cols-3 gap-2 mb-5 max-w-md">
                  {(
                    [
                      { id: 'barber', label: t.simulator.categories.barber },
                      { id: 'salon', label: t.simulator.categories.salon },
                      { id: 'nails', label: t.simulator.categories.nails },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`rounded-xl px-3 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer truncate ${
                        categoryFilter === cat.id
                          ? 'bg-amber-500 text-zinc-950'
                          : 'bg-[#14171f] border border-zinc-800 text-zinc-300 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Grid of Specialists (4 Barbers, 4 Salons, 4 Nails) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pe-1">
                  {filteredSpecialists.map((spec) => (
                    <button
                      key={spec.id}
                      type="button"
                      onClick={() => handleSelectSpecialist(spec)}
                      className="w-full flex items-center gap-3.5 rounded-2xl p-3.5 text-start bg-[#14171f] hover:bg-[#191d28] border border-zinc-800 hover:border-amber-400/50 transition-all cursor-pointer group"
                    >
                      {renderCategoryAvatar(spec)}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors truncate">
                            {spec.name[lang]}
                          </h4>
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-bold text-amber-300 shrink-0">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {spec.rating}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] sm:text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-amber-400 shrink-0" />
                          <span className="truncate">{spec.city[lang]}</span>
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ================= SCREEN 2: CHOOSE SERVICE ================= */}
            {step === 2 && (
              <motion.div
                key="screen-2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* Selected Specialist Summary Bar */}
                <div className="flex items-center justify-between rounded-2xl p-3.5 bg-[#14171f] border border-zinc-800">
                  <div className="flex items-center gap-3 min-w-0">
                    {renderCategoryAvatar(selectedSpec)}
                    <div className="min-w-0 text-start">
                      <div className="text-sm font-extrabold text-white truncate">
                        {selectedSpec.name[lang]}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {selectedSpec.city[lang]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedSpec.services.map((srv) => (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => handleSelectService(srv)}
                      className="rounded-2xl p-4 text-start bg-[#14171f] hover:bg-[#191d28] border border-zinc-800 hover:border-amber-400/50 transition-all cursor-pointer flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-extrabold text-white">
                          {srv.name[lang]}
                        </span>
                        <span className="text-xs font-extrabold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 rounded-full px-2.5 py-0.5 shrink-0">
                          {srv.price}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Scissors className="h-3.5 w-3.5 text-amber-400" />
                        <span>{srv.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ================= SCREEN 3: CHOOSE TIME SLOT ================= */}
            {step === 3 && (
              <motion.div
                key="screen-3"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Selected Specialist & Service Summary */}
                <div className="rounded-2xl p-4 bg-[#14171f] border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-start">
                  <div>
                    <div className="text-xs text-slate-400">
                      {selectedSpec.name[lang]}
                    </div>
                    <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                      {selectedService.name[lang]}
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-xs font-extrabold text-emerald-300">
                    {selectedService.price}
                  </span>
                </div>

                {/* Time Slots Grid */}
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-300 mb-3 text-start flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span>{t.simulator.selectTime}</span>
                  </h4>
                  <div dir="ltr" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => handleSelectTime(slot)}
                        className="rounded-2xl py-3.5 px-4 text-sm font-extrabold bg-[#14171f] hover:bg-amber-500 hover:text-zinc-950 border border-zinc-800 text-white transition-all cursor-pointer"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= SCREEN 4: CONFIRMED APPOINTMENT RESULT ================= */}
            {step === 4 && (
              <motion.div
                key="screen-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28 }}
                className="max-w-md mx-auto"
              >
                <div className="rounded-3xl p-6 bg-[#14171f] border border-emerald-500/35 text-start">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                    <img
                      src="/assets/nora-logo.png"
                      alt="NORA"
                      className="h-5 w-auto object-contain invert brightness-200"
                    />
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/35 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {t.simulator.ticketLabels.statusConfirmed}
                    </span>
                  </div>

                  <div className="text-center py-2 mb-4">
                    <div className="text-base sm:text-lg font-extrabold text-white">
                      {t.simulator.bookedSuccessTitle}
                    </div>
                    <div className="text-xs text-emerald-300/90 mt-1">
                      {t.simulator.bookedSuccessSub}
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl p-4 bg-[#0d0f14] border border-zinc-800 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">{t.simulator.ticketLabels.specialist}:</span>
                      <span className="font-extrabold text-white">{selectedSpec.name[lang]}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">{t.simulator.ticketLabels.service}:</span>
                      <span className="font-bold text-amber-300">{selectedService.name[lang]}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-400">{t.simulator.ticketLabels.time}:</span>
                      <span dir="ltr" className="font-extrabold text-white flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-amber-400" />
                        {selectedTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800">
                      <span className="text-slate-400">{t.simulator.ticketLabels.price}:</span>
                      <span className="text-sm font-extrabold text-emerald-400">
                        {selectedService.price}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs sm:text-sm font-extrabold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>{t.simulator.resetBtn}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
