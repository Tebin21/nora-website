export type Language = 'ku' | 'ar' | 'en';

export interface TranslationSchema {
  dir: 'rtl' | 'ltr';
  langName: string;
  langShort: string;
  nav: {
    home: string;
    features: string;
    downloadApp: string;
    contact: string;
    privacy: string;
    terms: string;
    story: string;
    simulator: string;
    providers: string;
    specialists: string;
    partner: string;
    downloadBtn: string;
    liveStatus: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: {
      bookingTimeVal: string;
      bookingTimeLabel: string;
      waitingTimeVal: string;
      waitingTimeLabel: string;
      citiesVal: string;
      citiesLabel: string;
    };
    mockupTabs: {
      dual: string;
      customer: string;
      provider: string;
    };
    floatingCards: {
      newBookingTitle: string;
      newBookingSub: string;
      revenueTitle: string;
      revenueSub: string;
      ratingTitle: string;
    };
  };
  storySplit: {
    badge: string;
    title: string;
    subtitle: string;
    quote: string;
    withoutNora: {
      tag: string;
      title: string;
      timeBadge: string;
      dialogueCustomer: string;
      dialogueBarber: string;
      points: string[];
      mood: string;
    };
    withNora: {
      tag: string;
      title: string;
      timeBadge: string;
      dialogueBarber: string;
      dialogueCustomer: string;
      points: string[];
      mood: string;
    };
  };
  simulator: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      step1: string;
      step2: string;
      step3: string;
    };
    categories: {
      all: string;
      barber: string;
      salon: string;
      nails: string;
    };
    selectService: string;
    selectTime: string;
    confirmBtn: string;
    resetBtn: string;
    bookedSuccessTitle: string;
    bookedSuccessSub: string;
    ticketLabels: {
      specialist: string;
      service: string;
      time: string;
      price: string;
      status: string;
      statusConfirmed: string;
    };
  };
  providerSection: {
    badge: string;
    title: string;
    subtitle: string;
    metrics: {
      dailyRev: string;
      confirmed: string;
      pending: string;
    };
    features: {
      f1Title: string;
      f1Desc: string;
      f2Title: string;
      f2Desc: string;
      f3Title: string;
      f3Desc: string;
      f4Title: string;
      f4Desc: string;
    };
  };
  specialistsSection: {
    badge: string;
    title: string;
    subtitle: string;
    bookNow: string;
    reviews: string;
  };
  partnerSection: {
    badge: string;
    title: string;
    subtitle: string;
    note: string;
    fields: {
      fullName: string;
      fullNamePlaceholder: string;
      shopName: string;
      shopNamePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      address: string;
      addressPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      category: string;
    };
    submitBtn: string;
    successMsg: string;
    successSub: string;
    requirementsTitle: string;
    requirementsList: string[];
  };
  downloadSection: {
    badge: string;
    title: string;
    subtitle: string;
    appStore: string;
    googlePlay: string;
    scanQr: string;
  };
  footer: {
    slogan: string;
    description: string;
    quickLinks: string;
    citiesTitle: string;
    cities: string[];
    rights: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  ku: {
    dir: 'rtl',
    langName: 'کوردی',
    langShort: 'کو',
    nav: {
      home: 'سەرەکی',
      features: 'تایبەتمەندییەکان',
      downloadApp: 'داگرتنی ئەپ',
      contact: 'پەیوەندی',
      privacy: 'پاراستنی نهێنی',
      terms: 'مەرجەکان',
      story: 'جیاوازی نۆرە',
      simulator: 'تاقیکردنەوەی ٣ چرکە',
      providers: 'بۆ وەستا و خاوەن کار',
      specialists: 'پسپۆڕەکان',
      partner: 'تۆمارکردنی دوکان',
      downloadBtn: 'داگرتنی ئەپ',
      liveStatus: 'چالاکە لە کوردستان',
    },
    hero: {
      badge: 'NORA • کاتی تۆ، بەڕێوەبردنی تۆ',
      titleLine1: 'بە ٣ چرکە نۆرەکەت حجز بکە،',
      titleHighlight: 'بێ یەک چرکە چاوەڕوانی!',
      titleLine2: 'نە کاتی تۆ دەڕوات و نە سەری وەستاش دێشێت.',
      subtitle:
        'ئەپی نۆرە (NORA) زیرەکترین پلاتفۆرمی نۆرەگرتن و بەڕێوەبردنی سەرتاشخانە، سالۆن و سەنتەرەکانی جوانکارییە. لە ماڵەوە کاتەکەت دیاری بکە و ڕاستەوخۆ لە کاتی خۆتدا لەسەر کورسی خزمەتگوزاری دابنیشە.',
      primaryCta: 'ئێستا نۆرە تاقی بکەرەوە',
      secondaryCta: 'دوکانەکەت تۆمار بکە',
      stats: {
        bookingTimeVal: '٣ چرکە',
        bookingTimeLabel: 'کاتی حجزکردنی نۆرە',
        waitingTimeVal: '٠ خولەک',
        waitingTimeLabel: 'چاوەڕوانی لە دوکان',
        citiesVal: '+١٥٠',
        citiesLabel: 'دەلاک و سالۆنی پێشەنگ',
      },
      mockupTabs: {
        dual: 'دیمەنی دووانە',
        customer: 'ئەپی موشتەری',
        provider: 'داشبۆردی وەستا',
      },
      floatingCards: {
        newBookingTitle: 'نۆرەی نوێ دڵنیاکرایەوە ✓',
        newBookingSub: 'ئەمڕۆ کاتژمێر ٤:٣٠ • سەرچاککردن',
        revenueTitle: '85,000 IQD',
        revenueSub: 'داهاتی ئەمڕۆ لە خشتەی وەستا',
        ratingTitle: '٤.٩ ★ هەڵسەنگاندنی موشتەری',
      },
    },
    storySplit: {
      badge: 'هەمان پیشە، بەڵام دوو جیهانی جیاواز',
      title: 'جیاوازی بەڕێوەبردنی کاروبار بەبێ NORA و لەگەڵ NORA',
      subtitle:
        'سەیری جیاوازی نێوان شێوازی کۆنی چاوەڕوانی و تەلەفۆنکردن بکە بەرامبەر سیستەمی ڕێکخراو و ئارامی نۆرە.',
      quote: '«هەمان پیشە، هەمان کار، بەڵام دوو شێوازی جیاوازی بەڕێوەبردن. ئەی تۆ کامەیان هەڵدەبژێریت؟»',
      withoutNora: {
        tag: 'شێوازی کۆن • بەبێ NORA',
        title: 'قەرەباڵغی، بێزاری و کات بەفیڕۆدان',
        timeBadge: '٢ کاتژمێر چاوەڕوانی بێهوودە',
        dialogueCustomer: 'گەنجەکە: "سڵاو وەستا گیان، چەند کەسم لە پێشە؟ پەلەمە شتێکم بۆ بکە!"',
        dialogueBarber: 'وەستا (بە ماندوێتی): "وەڵا کاکە گیان زۆر قەرەباڵغە، بڕۆ دوای دوو سەعاتی تر وەرەوە..."',
        points: [
          '٦ کەس لەسەر کورسی چاوەڕوانی دانیشتوون و بێزارن',
          'تەلەفۆنی وەستا بەردەوام زەنگ لێدەدات و فریای وەڵامدانەوە ناکەوێت',
          'دوای ٢ کاتژمێر دەگەڕێیتەوە و هێشتا ٣-٤ کەس لە پێشتن!',
          'موشتەری نائومێد دەبێت و دوکانەکە جێدەهێڵێت',
        ],
        mood: 'ژینگەیەکی پڕ لە سترێس و نائارامی',
      },
      withNora: {
        tag: 'شێوازی نوێ • لەگەڵ NORA',
        title: 'ڕێکخستنی زیرەک، ئارامی و ڕێزگرتن لە کات',
        timeBadge: 'حجزکردن بە ٣ چرکە لە مۆبایلەوە',
        dialogueBarber: 'وەستا (بە زەردەخەنەوە): "بەخێربێیت کاکە گیان، ڕێک لە کاتی خۆتدا (٤:٣٠) گەیشتیت!"',
        dialogueCustomer: 'گەنجەکە: "دەستخۆش وەستا، بە ئەپی نۆرە نە کاتی من دەڕوات و نە سەری تۆش دێشێت."',
        points: [
          'لە ماڵەوە بە ٣ چرکە سەرتاشخانە و کاتەکەت (٤:٣٠) هەڵدەبژێریت',
          'مۆبایلی وەستا زەنگێکی نەرمی ئاگادارکردنەوەی بۆ دەچێت بێ دابڕان لە کار',
          'کاتژمێر ٤:٢٨ دوکانەکە ئارامە و هیچ قەرەباڵغییەکی بێزارکەری لێ نییە',
          'ڕاستەوخۆ لەسەر کورسی دادەنیشیت بێ یەک چرکە چاوەڕوانی!',
        ],
        mood: 'ئەزموونێکی مۆدێرن، ئارام و پڕ لە متمانە',
      },
    },
    simulator: {
      badge: 'ئەزموونی ڕاستەقینەی ئەپەکە',
      title: 'ئێستا بە ٣ هەنگاو نۆرەگرتن تاقی بکەرەوە',
      subtitle: 'ببینە چۆن کڕیار لە ئەپی NORA لە ماوەی چەند چرکەیەکدا پسپۆڕ و خزمەتگوزاری و کاتی گونجاو هەڵدەبژێرێت.',
      steps: {
        step1: '١. هەڵبژاردنی پسپۆڕ',
        step2: '٢. خزمەتگوزاری و کات',
        step3: '٣. پسوولەی نۆرە',
      },
      categories: {
        all: 'هەموو',
        barber: 'دەلاک',
        salon: 'سالۆن',
        nails: 'نینۆک و سپا',
      },
      selectService: 'خزمەتگوزاری هەڵبژێرە',
      selectTime: 'کاتی بەردەست هەڵبژێرە',
      confirmBtn: 'ئێستا نۆرەکە حجز بکە',
      resetBtn: 'تاقیکردنەوەی نۆرەیەکی نوێ',
      bookedSuccessTitle: 'نۆرەکەت بە سەرکەوتوویی حجز کرا!',
      bookedSuccessSub: 'ئاگادارکردنەوەی دەستبەجێ بۆ مۆبایلی وەستا نێردرا.',
      ticketLabels: {
        specialist: 'شوێن / پسپۆڕ',
        service: 'خزمەتگوزاری',
        time: 'کاتی نۆرە',
        price: 'نرخ',
        status: 'دۆخی نۆرە',
        statusConfirmed: 'دڵنیاکراوە ✓',
      },
    },
    providerSection: {
      badge: 'تایبەت بە وەستا، دەلاک و خاوەن سالۆنەکان',
      title: 'تەواوی کاروباری دوکانەکەت لە ناو مۆبایلەکەتدا',
      subtitle:
        'نۆرە تەنها ئەپێکی حجزکردن نییە، بەڵکو سیستەمێکی تەواوی بەڕێوەبردنی خشتەی ڕۆژانە، ژمێریاری داهات و ڕێکخستنی کاتی کارکردنە.',
      metrics: {
        dailyRev: 'داهاتی ئەمڕۆ: 85,000 IQD',
        confirmed: 'دڵنیاکراوە: ١٤ نۆرە',
        pending: 'چاوەڕوانی پەسەندکردن: ٢',
      },
      features: {
        f1Title: 'خشتەی زیرەک و هێڵی کات (Timeline)',
        f1Desc: 'بینینی نۆرەکانی ئەمڕۆ و مانگانە بە شێوازی هێڵی کات، دیمەنی تۆڕ یان لیست بە ئاسانی.',
        f2Title: 'هەژمارکردنی داهات بە دینار (IQD)',
        f2Desc: 'بە شێوەیەکی خۆکار داهاتی ڕۆژانە، هەفتانە و مانگانەی خزمەتگوزارییەکانت بۆ کۆدەکاتەوە.',
        f3Title: 'کۆتاییهێنان بە زەنگی تەلەفۆنی بێزارکەر',
        f3Desc: 'چیتر لە کاتی کارکردندا پێویست ناکات وەڵامی دەیان تەلەفۆن بدەیتەوە بۆ دانانی سەرە.',
        f4Title: 'پڕۆفایلی پیشەیی و هەڵسەنگاندن',
        f4Desc: 'پیشاندانی وێنەی کارەکانت، نرخەکان، ناونیشانی سەر نەخشە و هەڵسەنگاندنی موشتەرییەکانت.',
      },
    },
    specialistsSection: {
      badge: 'پسپۆڕە هەڵبژێردراوەکان',
      title: 'باشترینەکان هەڵبژێرە لەگەڵ نۆرە',
      subtitle: 'بەشێک لەو سەرتاشخانە و سەنتەری جوانکارییانەی لە ئەپی NORA خزمەتگوزاری پێشکەش دەکەن.',
      bookNow: 'ئێستا حجز بکە',
      reviews: 'پێداچوونەوەکان',
    },
    partnerSection: {
      badge: 'ببە بە هاوبەشی نۆرە',
      title: 'ئەکاونتی دوکان یان سەنتەرەکەت بۆ دروست دەکەین',
      subtitle:
        'ئەگەر خوازیاریت دوکان یان سەنتەرەکەت لە ئەپی NORA زیاد بکەین، ئەم زانیارییانەمان بۆ بنێرە و بە زووترین کات ئەکاونتەکەت بۆ بەردەست دەکەین.',
      note: 'بێبەرامبەر دەست پێ بکە و کاروبارەکەت بکە بە دیجیتاڵی',
      fields: {
        fullName: '١- ناوی سیانی',
        fullNamePlaceholder: 'بۆ نموونە: هۆشەنگ ئەحمەد کەریم',
        shopName: '٢- ناوی دوکانەکەت لە ئەپلیکەیشنەکە',
        shopNamePlaceholder: 'بۆ نموونە: سەرتاشخانەی ڕاویار / سالۆن ژوان',
        email: '٣- ئیمەیڵێک',
        emailPlaceholder: 'name@example.com',
        address: '٤- ناونیشانی دوکانەکەت',
        addressPlaceholder: 'شار - گەڕەک - نزیکترین شوێنی دیار',
        phone: '٥- ژمارەی مۆبایل',
        phonePlaceholder: '0770 000 0000 / 0750 000 0000',
        category: 'جۆری کار / سەنتەر',
      },
      submitBtn: 'ناردنی زانیارییەکان بۆ تۆمارکردن',
      successMsg: 'زانیارییەکانت بە سەرکەوتوویی تۆمار کران!',
      successSub: 'تیمی نۆرە بە زووترین کات ئەکاونتەکەت چالاک دەکات و پەیوەندیت پێوە دەکات.',
      requirementsTitle: 'پێداویستییەکانی دروستکردنی ئەکاونت:',
      requirementsList: [
        '١- ناوی سیانی خاوەن کار یان وەستا.',
        '٢- ناوی دوکانەکەت — واتە بە ناوی چییەوە بێت لە ئەپلیکەیشنەکە.',
        '٣- ئیمەیڵێکی کارا بۆ پاراستنی هەژمارەکەت.',
        '٤- ناونیشانی تەواوی دوکانەکەت لەسەر نەخشە.',
        '٥- ژمارەی مۆبایلی بەردەست بۆ پەیوەندی و ئاگادارکردنەوە.',
      ],
    },
    downloadSection: {
      badge: 'ئێستا بەردەستە بۆ iOS و Android',
      title: 'لەگەڵ نۆرە، لەمەودوا نموونەیی بە',
      subtitle: 'ئەپی NORA دابگرە یان کۆدی QR سکان بکە و بۆ هەمیشە ماڵئاوایی لە چاوەڕوانی بکە.',
      appStore: 'داگرتن لە App Store',
      googlePlay: 'داگرتن لە Google Play',
      scanQr: 'سکانی کۆدی QR بکە بۆ داگرتنی ڕاستەوخۆ',
    },
    footer: {
      slogan: 'NORA — کاتی تۆ، بەڕێوەبردنی تۆ.',
      description:
        'پلاتفۆرمی زیرەک بۆ نۆرەگرتن و بەڕێوەبردنی سەرتاشخانە، سالۆن و سەنتەرەکانی جوانکاری.',
      quickLinks: 'بەشەکان',
      citiesTitle: 'شارە چالاکەکان',
      cities: ['سلێمانی', 'هەولێر', 'دهۆک', 'هەڵەبجە'],
      rights: 'هەموو مافەکان پارێزراوە بۆ NORA © ٢٠٢٦',
    },
  },
  ar: {
    dir: 'rtl',
    langName: 'العربية',
    langShort: 'ع',
    nav: {
      home: 'الرئيسية',
      features: 'المميزات',
      downloadApp: 'تحميل التطبيق',
      contact: 'اتصل بنا',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      story: 'الفرق مع نورا',
      simulator: 'تجربة الحجز بـ ٣ ثوانٍ',
      providers: 'لأصحاب الصالونات',
      specialists: 'المختصون',
      partner: 'تسجيل صالونك',
      downloadBtn: 'تحميل التطبيق',
      liveStatus: 'متاح الآن في العراق وكردستان',
    },
    hero: {
      badge: 'NORA • وقتك، إدارتك الذكية',
      titleLine1: 'احجز موعدك خلال ٣ ثوانٍ فقط،',
      titleHighlight: 'بدون ثانية انتظار واحدة!',
      titleLine2: 'لا يضيع وقتك ولا ينشغل بال الحلاق أو الخبير.',
      subtitle:
        'تطبيق نورا (NORA) هو المنصة الأذكى لحجز المواعيد وإدارة صالونات الحلاقة ومراكز التجميل والعناية. اختر وقتك المناسب من منزلك واجلس مباشرة على كرسي الخدمة في موعدك المحدد.',
      primaryCta: 'جرّب الحجز التفاعلي الآن',
      secondaryCta: 'سجّل صالونك معنا',
      stats: {
        bookingTimeVal: '٣ ثوانٍ',
        bookingTimeLabel: 'سرعة تأكيد الحجز',
        waitingTimeVal: '٠ دقيقة',
        waitingTimeLabel: 'وقت الانتظار في الصالون',
        citiesVal: '+١٥٠',
        citiesLabel: 'صالون وحلاق متميز',
      },
      mockupTabs: {
        dual: 'العرض المزدوج',
        customer: 'تطبيق الزبون',
        provider: 'لوحة تحكم الحلاق',
      },
      floatingCards: {
        newBookingTitle: 'تم تأكيد حجز جديد ✓',
        newBookingSub: 'اليوم الساعة ٤:٣٠ • قص وتصفيف',
        revenueTitle: '85,000 IQD',
        revenueSub: 'أرباح اليوم في جدول المختص',
        ratingTitle: '٤.٩ ★ تقييم الزبائن',
      },
    },
    storySplit: {
      badge: 'نفس المهنة، ولكن أسلوبان مختلفان تماماً',
      title: 'الفرق في إدارة العمل بدون NORA ومع NORA',
      subtitle:
        'شاهد الفرق الواضح بين الفوضى والانتظار لساعات بالطريقة التقليدية وبين النظام والراحة التامة مع تطبيق نورا.',
      quote: '«نفس المهنة، نفس العمل، ولكن طريقتان مختلفتان للإدارة.. أيهما تختار؟»',
      withoutNora: {
        tag: 'الطريقة التقليدية • بدون NORA',
        title: 'ازدحام، إرهاق وإضاعة للوقت',
        timeBadge: 'ساعتان من الانتظار الممل',
        dialogueCustomer: 'الزبون: "مرحباً أستاذ، كم شخصاً قبلي؟ أنا مستعجل أرجوك دبر لي موعداً!"',
        dialogueBarber: 'الحلاق (بتعب وإحراج): "والله يا أخي الصالون مزدحم جداً، اذهب وارجع بعد ساعتين..."',
        points: [
          '٦ أشخاص ينتظرون في الصالون ويشعرون بالملل والانزعاج',
          'هاتف الحلاق يرن باستمرار ولا يستطيع التركيز في عمله',
          'تعود بعد ساعتين لتتفاجأ بوجود ٣-٤ أشخاص ما زالوا بالانتظار!',
          'يغادر الزبون الصالون بخيبة أمل وخسارة للطرفين',
        ],
        mood: 'بيئة عمل مزدحمة ومليئة بالتوتر',
      },
      withNora: {
        tag: 'الأسلوب الحديث • مع NORA',
        title: 'تنظيم ذكي، هدوء واحترام تام للوقت',
        timeBadge: 'حجز خلال ٣ ثوانٍ من الهاتف',
        dialogueBarber: 'الحلاق (بابتسامة): "أهلاً بك يا غالي، وصلت في موعدك تماماً (٤:٣٠)!"',
        dialogueCustomer: 'الزبون: "عاشت إيدك، مع تطبيق نورا لا يضيع وقتي ولا يتعب رأسك."',
        points: [
          'يختار الزبون الصالون والوقت المناسب (٤:٣٠) من هاتفه خلال ٣ ثوانٍ',
          'يصل إشعار هادئ لهاتف الحلاق فوراً دون مقاطعة عمله',
          'الصالون هادئ ومنظم في تمام الساعة ٤:٢٨ بلا أي ازدحام',
          'يجلس الزبون مباشرة على الكرسي بدون ثانية انتظار واحدة!',
        ],
        mood: 'تجربة راقية، هادئة واحترافية',
      },
    },
    simulator: {
      badge: 'محاكاة حية للتطبيق',
      title: 'جرّب حجز موعدك الآن بـ ٣ خطوات بسيطة',
      subtitle: 'اكتشف مدى سهولة اختيار الصالون والخدمة والوقت المتاح عبر واجهة NORA التفاعلية.',
      steps: {
        step1: '١. اختر المختص',
        step2: '٢. الخدمة والوقت',
        step3: '٣. تذكرة الحجز',
      },
      categories: {
        all: 'الكل',
        barber: 'حلاقة رجالية',
        salon: 'صالون تجميل',
        nails: 'أظافر وسبا',
      },
      selectService: 'اختر الخدمة المطلوبة',
      selectTime: 'اختر الوقت المتاح',
      confirmBtn: 'تأكيد الحجز الآن',
      resetBtn: 'تجربة حجز جديد',
      bookedSuccessTitle: 'تم تأكيد حجزك بنجاح!',
      bookedSuccessSub: 'تم إرسال إشعار فوري إلى هاتف المختص.',
      ticketLabels: {
        specialist: 'الصالون / المختص',
        service: 'الخدمة',
        time: 'وقت الموعد',
        price: 'السعر',
        status: 'حالة الموعد',
        statusConfirmed: 'مؤكد ✓',
      },
    },
    providerSection: {
      badge: 'مصمم للحلاقين وأصحاب الصالونات والمراكز',
      title: 'إدارة كاملة لعملك وأرباحك من شاشة هاتفك',
      subtitle:
        'نورا ليس مجرد تطبيق حجز، بل هو نظام متكامل لإدارة جدول المواعيد، حساب الأرباح اليومية والشهرية، وتنظيم أوقات العمل.',
      metrics: {
        dailyRev: 'أرباح اليوم: 85,000 IQD',
        confirmed: 'مواعيد مؤكدة: ١٤',
        pending: 'بانتظار التأكيد: ٢',
      },
      features: {
        f1Title: 'جدول ذكي وخط زمني (Timeline)',
        f1Desc: 'استعرض مواعيد اليوم والشهر بطريقة الخط الزمني، الشبكة أو القائمة بمرونة عالية.',
        f2Title: 'حساب الأرباح بالدينار العراقي (IQD)',
        f2Desc: 'متابعة دقيقة وتلقائية لإيراداتك اليومية والأسبوعية والشهرية لكل خدمة.',
        f3Title: 'وداعاً للمكالمات الهاتفية المزعجة أثناء العمل',
        f3Desc: 'تفرغ لإبداعك في العمل بينما يتولى نورا تنظيم حجوزات زبائنك تلقائياً.',
        f4Title: 'ملف احترافي وتقييمات موثوقة',
        f4Desc: 'اعرض أعمالك، قائمة الأسعار، موقعك على الخريطة وتقييمات الزبائن لجذب المزيد من العملاء.',
      },
    },
    specialistsSection: {
      badge: 'نخبة المختصين والصالونات',
      title: 'اختر الأفضل دائماً مع نورا',
      subtitle: 'نماذج من أفضل صالونات الحلاقة ومراكز التجميل المتاحة للحجز الفوري عبر تطبيق NORA.',
      bookNow: 'احجز الآن',
      reviews: 'تقييمات',
    },
    partnerSection: {
      badge: 'انضم إلى شركاء النجاح في نورا',
      title: 'ننشئ حساب صالونك أو مركزك فوراً',
      subtitle:
        'إذا كنت ترغب بإضافة صالونك أو مركزك إلى تطبيق NORA، أرسل لنا هذه المعلومات وسنقوم بتفعيل حسابك في أسرع وقت.',
      note: 'ابدأ مجاناً وحوّل إدارة صالونك إلى النظام الرقمي الذكي',
      fields: {
        fullName: '١- الاسم الثلاثي',
        fullNamePlaceholder: 'مثال: هوشنك أحمد كريم',
        shopName: '٢- اسم الصالون أو المركز في التطبيق',
        shopNamePlaceholder: 'مثال: صالون راويار / مركز جوان للتجميل',
        email: '٣- البريد الإلكتروني',
        emailPlaceholder: 'name@example.com',
        address: '٤- عنوان الصالون بالتفصيل',
        addressPlaceholder: 'المدينة - الحي - أقرب نقطة دالة',
        phone: '٥- رقم الهاتف المحمول',
        phonePlaceholder: '0770 000 0000 / 0750 000 0000',
        category: 'نوع النشاط / المركز',
      },
      submitBtn: 'إرسال البيانات لتفعيل الحساب',
      successMsg: 'تم استلام بيانات صالونك بنجاح!',
      successSub: 'سيقوم فريق نورا بتجهيز وتفعيل حسابك والتواصل معك بأسرع وقت.',
      requirementsTitle: 'المعلومات المطلوبة لإنشاء الحساب:',
      requirementsList: [
        '١- الاسم الثلاثي لصاحب العمل أو المختص.',
        '٢- اسم الصالون كما ترغب بظهوره داخل تطبيق NORA.',
        '٣- بريد إلكتروني فعال لحماية وإدارة حسابك.',
        '٤- العنوان الكامل للصالون لتحديده للزبائن.',
        '٥- رقم الهاتف المحمول للتواصل والإشعارات الفورية.',
      ],
    },
    downloadSection: {
      badge: 'متوفر الآن على iOS و Android',
      title: 'مع نورا، كن دائماً في الصدارة',
      subtitle: 'حمّل تطبيق NORA الآن أو امسح رمز QR وودّع الانتظار الطويل إلى الأبد.',
      appStore: 'التحميل من App Store',
      googlePlay: 'التحميل من Google Play',
      scanQr: 'امسح رمز QR للتحميل المباشر',
    },
    footer: {
      slogan: 'NORA — وقتك، إدارتك.',
      description:
        'المنصة الذكية لحجز المواعيد وإدارة صالونات الحلاقة ومراكز التجميل.',
      quickLinks: 'الأقسام',
      citiesTitle: 'المدن المتاحة',
      cities: ['السليمانية', 'أربيل', 'دهوك', 'حلبجة'],
      rights: 'جميع الحقوق محفوظة لمنصة NORA © ٢٠٢٦',
    },
  },
  en: {
    dir: 'ltr',
    langName: 'English',
    langShort: 'EN',
    nav: {
      home: 'Home',
      features: 'Features',
      downloadApp: 'Download App',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms',
      story: 'Why NORA',
      simulator: '3-Sec Demo',
      providers: 'For Businesses',
      specialists: 'Specialists',
      partner: 'Register Shop',
      downloadBtn: 'Get the App',
      liveStatus: 'Live Across Kurdistan & Iraq',
    },
    hero: {
      badge: 'NORA • Your Time, Your Management',
      titleLine1: 'Book Your Turn in 3 Seconds,',
      titleHighlight: 'Zero Waiting Time!',
      titleLine2: 'Save your time and give specialists complete peace of mind.',
      subtitle:
        'NORA is the smartest appointment booking and salon management ecosystem for barbershops, beauty salons, and nail studios. Pick your slot from home and walk straight to the chair right on time.',
      primaryCta: 'Try 3-Second Booking',
      secondaryCta: 'Register Your Business',
      stats: {
        bookingTimeVal: '3 Sec',
        bookingTimeLabel: 'Instant Booking Speed',
        waitingTimeVal: '0 Min',
        waitingTimeLabel: 'Shop Waiting Room Time',
        citiesVal: '150+',
        citiesLabel: 'Top Barbers & Salons',
      },
      mockupTabs: {
        dual: 'Dual Showcase',
        customer: 'Customer App',
        provider: 'Provider Dashboard',
      },
      floatingCards: {
        newBookingTitle: 'New Booking Confirmed ✓',
        newBookingSub: 'Today at 4:30 PM • Haircut & Styling',
        revenueTitle: '85,000 IQD',
        revenueSub: 'Today’s Revenue in Provider Schedule',
        ratingTitle: '4.9 ★ Verified Client Rating',
      },
    },
    storySplit: {
      badge: 'Same Profession, Two Completely Different Worlds',
      title: 'The Difference Between Managing Without NORA vs. With NORA',
      subtitle:
        'Compare the stress of crowded waiting chairs and non-stop phone calls against the calm, automated precision of NORA.',
      quote: '“Same profession, same craft, but two completely different ways of managing. Which one do you choose?”',
      withoutNora: {
        tag: 'The Old Way • Without NORA',
        title: 'Crowds, Frustration & Wasted Hours',
        timeBadge: '2 Hours of Pointless Waiting',
        dialogueCustomer: 'Customer: "Hello master, how many people are ahead of me? I’m in a rush, please squeeze me in!"',
        dialogueBarber: 'Barber (Exhausted): "Honestly brother, it’s packed right now. Come back in two hours..."',
        points: [
          '6 customers stuck waiting on chairs, constantly checking their watches',
          'The barber’s phone rings non-stop while trying to focus on a haircut',
          'Coming back 2 hours later only to find 3–4 people still waiting ahead!',
          'Frustrated clients walk out the door and never return',
        ],
        mood: 'Stressful, chaotic, and exhausting environment',
      },
      withNora: {
        tag: 'The Smart Way • With NORA',
        title: 'Smart Scheduling, Calm Focus & Zero Waiting',
        timeBadge: 'Booked in 3 Seconds on Mobile',
        dialogueBarber: 'Barber (Smiling): "Welcome my friend, you arrived right on your 4:30 PM appointment!"',
        dialogueCustomer: 'Customer: "Thank you master! With NORA, neither my time is wasted nor do you get a headache."',
        points: [
          'Customer picks the barbershop, service, and 4:30 PM slot from home in 3 seconds',
          'Barber receives a gentle instant notification without interrupting his work',
          'At 4:28 PM the shop is calm, organized, and completely crowd-free',
          'Walks straight in at 4:30 PM and sits directly in the chair with zero wait!',
        ],
        mood: 'Calm, premium, and effortlessly organized',
      },
    },
    simulator: {
      badge: 'Interactive Live App Experience',
      title: 'Test the 3-Second Booking Flow Right Now',
      subtitle: 'Experience how customers select a top specialist, service, and time slot in seconds with NORA.',
      steps: {
        step1: '1. Choose Specialist',
        step2: '2. Service & Time',
        step3: '3. Instant Ticket',
      },
      categories: {
        all: 'All',
        barber: 'Barbers',
        salon: 'Beauty Salons',
        nails: 'Nails & Spa',
      },
      selectService: 'Select Service',
      selectTime: 'Select Available Time Slot',
      confirmBtn: 'Confirm Appointment Now',
      resetBtn: 'Book Another Demo Slot',
      bookedSuccessTitle: 'Your Appointment is Confirmed!',
      bookedSuccessSub: 'An instant notification has been sent to the specialist’s NORA dashboard.',
      ticketLabels: {
        specialist: 'Specialist / Studio',
        service: 'Selected Service',
        time: 'Appointment Time',
        price: 'Service Price',
        status: 'Booking Status',
        statusConfirmed: 'Confirmed ✓',
      },
    },
    providerSection: {
      badge: 'Built for Barbers, Stylists & Salon Owners',
      title: 'Your Entire Salon & Revenue Dashboard in Your Pocket',
      subtitle:
        'NORA is more than a booking app—it is a complete operating system for your daily schedule, IQD revenue tracking, and client retention.',
      metrics: {
        dailyRev: 'Today’s Revenue: 85,000 IQD',
        confirmed: 'Confirmed Today: 14',
        pending: 'Pending Approval: 2',
      },
      features: {
        f1Title: 'Smart Calendar & Timeline Views',
        f1Desc: 'Switch effortlessly between Timeline, Grid, and List views for daily and monthly schedules.',
        f2Title: 'Automated IQD Revenue Tracking',
        f2Desc: 'Track daily, weekly, and monthly earnings in Iraqi Dinar (IQD) automatically for every completed turn.',
        f3Title: 'End Disruptive Phone Calls Forever',
        f3Desc: 'Focus 100% on your craft while NORA fills your calendar and sends automated reminders to clients.',
        f4Title: 'Showcase Portfolio & Verified Reviews',
        f4Desc: 'Display your best looks, service prices, map location, and real client ratings to attract new bookings.',
      },
    },
    specialistsSection: {
      badge: 'Featured Partners on NORA',
      title: 'Discover Top Barbers & Salons',
      subtitle: 'Explore some of the premier grooming studios and beauty salons powered by the NORA platform.',
      bookNow: 'Book Now',
      reviews: 'Reviews',
    },
    partnerSection: {
      badge: 'Become a NORA Partner',
      title: 'Get Your Shop or Salon Account Created',
      subtitle:
        'Want us to set up your business account on the NORA app? Send us the 5 details below and our team will activate your studio right away.',
      note: 'Fast onboarding & dedicated support for barbershops and beauty centers',
      fields: {
        fullName: '1. Full Name (Triple Name)',
        fullNamePlaceholder: 'e.g., Hoshang Ahmad Karim',
        shopName: '2. Shop / Salon Name in the App',
        shopNamePlaceholder: 'e.g., Rawyar Barber / Zhwan Beauty Salon',
        email: '3. Email Address',
        emailPlaceholder: 'name@example.com',
        address: '4. Shop Address & Location',
        addressPlaceholder: 'City - Neighborhood - Nearest Landmark',
        phone: '5. Mobile Phone Number',
        phonePlaceholder: '0770 000 0000 / 0750 000 0000',
        category: 'Business Category',
      },
      submitBtn: 'Submit Details to Create Account',
      successMsg: 'Your Partner Request Has Been Received!',
      successSub: 'The NORA onboarding team will activate your account and contact you shortly.',
      requirementsTitle: 'Required Information for Account Setup:',
      requirementsList: [
        '1. Full Name of the business owner or specialist.',
        '2. Shop / Salon Name exactly as it should appear in the NORA app.',
        '3. Active Email Address for your account credentials.',
        '4. Shop Address & City so nearby clients can find you.',
        '5. Mobile Number for instant booking notifications.',
      ],
    },
    downloadSection: {
      badge: 'Available on iOS & Android',
      title: 'With NORA, Be Exceptional From Now On',
      subtitle: 'Download the NORA app or scan the QR code to book your next appointment in 3 seconds.',
      appStore: 'Download on App Store',
      googlePlay: 'Get it on Google Play',
      scanQr: 'Scan QR code for direct download',
    },
    footer: {
      slogan: 'NORA — Your Time, Your Management.',
      description:
        'Smart appointment booking and management platform for barbershops, salons, and beauty centers.',
      quickLinks: 'Links',
      citiesTitle: 'Active Cities',
      cities: ['Sulaymaniyah', 'Erbil', 'Duhok', 'Halabja'],
      rights: 'All rights reserved for NORA Platform © 2026',
    },
  },
};
