import React from 'react';
import { motion } from 'framer-motion';
import { Language, TranslationSchema } from '../i18n/translations';

interface SpecialistsGridProps {
  t: TranslationSchema;
  lang: Language;
  onBookClick?: () => void;
}

const STATS_BANNER: Record<
  Language,
  {
    number: string;
    title: string;
    subtitle: string;
  }
> = {
  ku: {
    number: '+٥٠',
    title: 'زیاتر لە ٥٠ دەلاک و سالۆن لە ماوەیەکی کورتدا پەیوەندییان پێوە کردووین و ئێستا ئەپی نۆرە بەکاردەهێنن',
    subtitle:
      'لە سلێمانی، هەولێر، دهۆک و هەڵەبجە ڕۆژانە دەیان سەرتاشخانە و سەنتەری جوانکاری کاروبار و نۆرەکانیان لە ڕێگەی NORA بەڕێوە دەبەن.',
  },
  ar: {
    number: '+٥٠',
    title: 'أكثر من ٥٠ حلاقاً وصالوناً انضموا إلينا في فترة قصيرة ويستخدمون تطبيق نورا الآن',
    subtitle:
      'في السليمانية، أربيل، دهوك وحلبجة يعتمد عشرات الحلاقين ومراكز التجميل يومياً على تطبيق NORA لتنظيم مواعيدهم.',
  },
  en: {
    number: '50+',
    title: 'Over 50 Barbers & Salons Joined Us in a Short Time and Are Now Using the NORA App',
    subtitle:
      'Across Sulaymaniyah, Erbil, Duhok, and Halabja, barbershops and beauty studios manage their daily appointments with NORA.',
  },
};

export const SpecialistsGrid: React.FC<SpecialistsGridProps> = ({ lang }) => {
  const content = STATS_BANNER[lang] || STATS_BANNER.ku;

  return (
    <section id="specialists" className="relative py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="Frostedglass rounded-3xl p-8 sm:p-10 text-center"
        >
          <div className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            {content.number}
          </div>
          <h2 className="mt-4 text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug max-w-2xl mx-auto">
            {content.title}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300/80 max-w-xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
