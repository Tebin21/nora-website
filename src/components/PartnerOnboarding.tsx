import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  User,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { Language, TranslationSchema } from '../i18n/translations';

interface PartnerOnboardingProps {
  t: TranslationSchema;
  lang?: Language;
}

const WHATSAPP_NUMBER = '9647708229696';

const ONBOARDING_TEXT: Record<
  Language,
  {
    title: string;
    guide: string;
    whatsappBtn: string;
  }
> = {
  ku: {
    title: 'دروستکردنی ئەکاونت بۆ بزنسەکەت',
    guide:
      'ئێمە خۆمان دەتوانین ئەکاونت بۆ دوکان و بزنسەکەت لە ئەپی نۆرە دروست بکەین. تەنها ئەم زانیارییانەی خوارەوە پڕ بکەرەوە و بینێرە تا ڕاستەوخۆ بچێت بۆ واتسئەپی تیمی نۆرە و بە زووترین کات ئەکاونتەکەت بۆ بەردەست بکەین.',
    whatsappBtn: 'ناردنی زانیارییەکان بۆ واتسئەپ',
  },
  ar: {
    title: 'إنشاء حساب لعملك أو صالونك',
    guide:
      'يمكننا إنشاء حساب عملك في تطبيق نورا مباشرة. فقط املأ المعلومات التالية وأرسلها ليتم تحويلها فوراً إلى واتساب فريق نورا وتفعيل حسابك بأسرع وقت.',
    whatsappBtn: 'إرسال المعلومات عبر واتساب',
  },
  en: {
    title: 'Get Your Business Account Created',
    guide:
      'We can create your business account on the NORA app for you. Simply fill in the details below and tap send to forward them directly to our WhatsApp team.',
    whatsappBtn: 'Send Details via WhatsApp',
  },
};

const DOWNLOAD_CONTENT: Record<
  Language,
  {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    iosSub: string;
    iosTitle: string;
    androidSub: string;
    androidTitle: string;
  }
> = {
  ku: {
    titleLine1: 'ئیتر لەگەڵ نۆرە،',
    titleLine2: 'بزنسەکەت بەرەو پێش ببە',
    subtitle:
      'هێز بدە بە کارەکەت، خۆت پڕۆفیشناڵ بکە و بە شێوازێکی مۆدێرن کات و نۆرەکانت ڕێکبخە. ئێستا ئەپی NORA بۆ ئایفۆن و ئەندرۆید بەردەستە.',
    iosSub: 'داگرتن بۆ ئایفۆن لە',
    iosTitle: 'App Store',
    androidSub: 'داگرتن بۆ ئەندرۆید لە',
    androidTitle: 'Google Play',
  },
  ar: {
    titleLine1: 'مع نورا،',
    titleLine2: 'طوّر عملك وانطلق نحو الاحتراف',
    subtitle:
      'امنح عملك قوة أكبر، اجعل إدارتك احترافية ونظّم مواعيدك بأسلوب عصري. تطبيق NORA متوفر الآن لأجهزة آيفون وأندرويد.',
    iosSub: 'حمّل للآيفون من',
    iosTitle: 'App Store',
    androidSub: 'حمّل للأندرويد من',
    androidTitle: 'Google Play',
  },
  en: {
    titleLine1: 'With NORA,',
    titleLine2: 'Move Your Business Forward',
    subtitle:
      'Empower your work, go professional, and manage your appointments effortlessly. Download the NORA app today on iPhone and Android.',
    iosSub: 'Download on the',
    iosTitle: 'App Store',
    androidSub: 'Get it on',
    androidTitle: 'Google Play',
  },
};

export const PartnerOnboarding: React.FC<PartnerOnboardingProps> = ({
  t,
  lang = 'ku',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    shopName: '',
    email: '',
    address: '',
    phone: '',
  });

  const info = ONBOARDING_TEXT[lang] || ONBOARDING_TEXT.ku;
  const dl = DOWNLOAD_CONTENT[lang] || DOWNLOAD_CONTENT.ku;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.shopName || !formData.phone) return;

    const messageLines = [
      'سڵاو تیمی NORA، دەمەوێت ئەکاونتی بزنسەکەم بۆ دروست بکەن:',
      '',
      `١- ناوی سیانی: ${formData.fullName}`,
      `٢- ناوی دوکان/سەنتەر: ${formData.shopName}`,
      `٣- ئیمەیڵ: ${formData.email}`,
      `٤- ناونیشان: ${formData.address}`,
      `٥- ژمارەی مۆبایل: ${formData.phone}`,
    ];

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      messageLines.join('\n')
    )}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="partner" className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clean Header & Guidance */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {info.title}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300/85 leading-relaxed">
            {info.guide}
          </p>
        </div>

        {/* Desktop Side-by-Side Grid: Form (7 cols) + Compact Download Card (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Card 1: Business Account Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 bg-[#0d0f14] border border-zinc-800 shadow-2xl rounded-3xl p-5 sm:p-7"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs font-bold text-white/90 mb-1.5">
                    {t.partnerSection.fields.fullName}
                  </label>
                  <div className="relative">
                    <User className="h-4 w-4 text-amber-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder={t.partnerSection.fields.fullNamePlaceholder}
                      className="w-full rounded-2xl ps-10 pe-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-400 bg-[#14171f] border border-zinc-800 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>
                </div>

                {/* 2. Shop Name in App */}
                <div>
                  <label className="block text-xs font-bold text-white/90 mb-1.5">
                    {t.partnerSection.fields.shopName}
                  </label>
                  <div className="relative">
                    <Store className="h-4 w-4 text-amber-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.shopName}
                      onChange={(e) =>
                        setFormData({ ...formData, shopName: e.target.value })
                      }
                      placeholder={t.partnerSection.fields.shopNamePlaceholder}
                      className="w-full rounded-2xl ps-10 pe-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-400 bg-[#14171f] border border-zinc-800 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 3. Email */}
                <div>
                  <label className="block text-xs font-bold text-white/90 mb-1.5">
                    {t.partnerSection.fields.email}
                  </label>
                  <div className="relative">
                    <Mail className="h-4 w-4 text-amber-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={t.partnerSection.fields.emailPlaceholder}
                      className="w-full rounded-2xl ps-10 pe-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-400 bg-[#14171f] border border-zinc-800 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>
                </div>

                {/* 5. Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-white/90 mb-1.5">
                    {t.partnerSection.fields.phone}
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-amber-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder={t.partnerSection.fields.phonePlaceholder}
                      className="w-full rounded-2xl ps-10 pe-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-400 bg-[#14171f] border border-zinc-800 focus:outline-none focus:border-amber-400/60"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Full Shop Address */}
              <div>
                <label className="block text-xs font-bold text-white/90 mb-1.5">
                  {t.partnerSection.fields.address}
                </label>
                <div className="relative">
                  <MapPin className="h-4 w-4 text-amber-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder={t.partnerSection.fields.addressPlaceholder}
                    className="w-full rounded-2xl ps-10 pe-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-400 bg-[#14171f] border border-zinc-800 focus:outline-none focus:border-amber-400/60"
                  />
                </div>
              </div>

              {/* Submit directly to WhatsApp 07708229696 */}
              <button
                type="submit"
                className="mt-2 w-full flex items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm sm:text-base font-extrabold bg-amber-500 hover:bg-amber-400 text-zinc-950 transition-colors cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{info.whatsappBtn}</span>
              </button>
            </form>
          </motion.div>

          {/* Card 2: Compact App Download Card (Side-by-Side on Desktop) */}
          <motion.div
            id="download"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-5 bg-[#0d0f14] border border-zinc-800 shadow-2xl rounded-3xl px-5 py-6 sm:px-6 sm:py-7 text-center relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-base sm:text-xl font-extrabold text-white leading-snug text-balance">
                <span className="block">{dl.titleLine1}</span>
                <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent mt-0.5">
                  {dl.titleLine2}
                </span>
              </h3>

              <p className="mt-2.5 text-xs text-slate-300/80 leading-relaxed text-balance">
                {dl.subtitle}
              </p>

              {/* Two Store Buttons Always Side-by-Side */}
              <div
                dir="ltr"
                className="mt-5 grid grid-cols-2 gap-2.5"
              >
                {/* Apple App Store Button */}
                <a
                  href="https://apps.apple.com/app/id6773474853"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-2.5 py-2.5 bg-white text-slate-950 hover:bg-amber-50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg
                    className="h-5 w-5 shrink-0 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.96 6.33c.67-.81 1.12-1.94 1-3.08-.96.04-2.13.64-2.82 1.45-.61.7-.11 1.86-.99 2.98 1.08.08 2.15-.54 2.81-1.35z" />
                  </svg>
                  <div className="text-left min-w-0">
                    <div className="text-[9px] font-medium text-slate-600 leading-none truncate">
                      {dl.iosSub}
                    </div>
                    <div className="text-xs font-extrabold tracking-tight text-slate-950 mt-0.5 leading-none">
                      {dl.iosTitle}
                    </div>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.norakrd.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-2.5 py-2.5 bg-[#14171f] border border-zinc-800 hover:border-zinc-700 text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M3.61 1.814L13.793 12 3.61 22.186a1.96 1.96 0 0 1-.61-1.424V3.238c0-.55.23-1.055.61-1.424z"
                    />
                    <path
                      fill="#34A853"
                      d="M17.218 8.575L5.255 1.662c-.61-.352-1.28-.266-1.645.152L13.793 12l3.425-3.425z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M17.218 15.425L13.793 12l6.495-3.75c.91.525.91 1.385 0 1.91l-3.07 5.265z"
                    />
                    <path
                      fill="#EA4335"
                      d="M3.61 22.186c.365.418 1.035.504 1.645.152l11.963-6.913L13.793 12 3.61 22.186z"
                    />
                  </svg>
                  <div className="text-left min-w-0">
                    <div className="text-[9px] font-medium text-slate-300 leading-none truncate">
                      {dl.androidSub}
                    </div>
                    <div className="text-xs font-extrabold tracking-tight text-white mt-0.5 leading-none">
                      {dl.androidTitle}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
