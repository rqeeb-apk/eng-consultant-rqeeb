import { PlatformConfig, CountryCode } from '../types';

export const TARGET_EMAIL = 'a***********@gmail.com';
export const TARGET_PHONE_LOCAL = '7××××××12';

export const COMMON_COUNTRIES: CountryCode[] = [
  {
    country: 'YE',
    nameAr: 'اليمن (يمن موبايل / سبأفون / يو)',
    code: '+967',
    flag: '🇾🇪',
    example: '+967 7××××××12',
  },
  {
    country: 'IQ',
    nameAr: 'العراق (آسيا سيل / زين / كورك)',
    code: '+964',
    flag: '🇮🇶',
    example: '+964 7××××××12',
  },
  {
    country: 'JO',
    nameAr: 'الأردن (أمنية / زين / أورنج)',
    code: '+962',
    flag: '🇯🇴',
    example: '+962 7××××××12',
  },
  {
    country: 'SA',
    nameAr: 'المملكة العربية السعودية',
    code: '+966',
    flag: '🇸🇦',
    example: '+966 7××××××12',
  },
  {
    country: 'EG',
    nameAr: 'مصر',
    code: '+20',
    flag: '🇪🇬',
    example: '+20 7××××××12',
  },
  {
    country: 'SD',
    nameAr: 'السودان',
    code: '+249',
    flag: '🇸🇩',
    example: '+249 7××××××12',
  },
  {
    country: 'DZ',
    nameAr: 'الجزائر',
    code: '+213',
    flag: '🇩🇿',
    example: '+213 7××××××12',
  },
  {
    country: 'MA',
    nameAr: 'المغرب',
    code: '+212',
    flag: '🇲🇦',
    example: '+212 7××××××12',
  },
];

export const PLATFORMS_DATA: Record<string, PlatformConfig> = {
  google: {
    id: 'google',
    nameAr: 'جوجل و جيميل',
    nameEn: 'Google & Gmail',
    tagline: 'تجاوز مفاتيح الأمان Passkey واستلام كود SMS على هاتفك',
    colorClass: 'text-red-600',
    badgeColor: 'bg-red-100 text-red-700 border-red-200',
    activeTabClass: 'bg-red-600 text-white shadow-sm',
    iconName: 'google',
    targetAccountHint: 'البريد: a***********@gmail.com | الهاتف: 7××××××12',
    primaryHackedTitle: 'طلب مني "رموز المفتاح" أو "مفتاح الأمان" (Passkey / Security Key)',
    primaryHackedExplanation: 'قام المخترق فور اختراق الحساب بتفعيل "مفتاح مرور" أو ربط جهازه كمفتاح أمان مادي ليمنعك من الدخول بكلمة المرور القديمة.',
    officialRecoveryUrl: `https://accounts.google.com/signin/recovery?email=${encodeURIComponent('a***********@gmail.com')}`,
    bypassGoldenTrick: {
      title: 'الحل الذهبي لتجاوز شاشة المفتاح:',
      description: 'لا تدخل أي رموز عشوائية، بل استخدم الرابط المخصص لطرق التحقق البديلة المسجلة.',
      buttonLabel: 'تجربة طريقة أخرى (Try another way)',
      steps: [
        {
          stepTitle: 'الضغط على "تجربة طريقة أخرى"',
          stepDesc: 'في شاشة طلب المفتاح، ابحث في الأسفل عن رابط باللون الأزرق: "تجربة طريقة أخرى" (Try another way).',
          highlight: 'Try another way'
        },
        {
          stepTitle: 'اختيار رمز رسالة SMS إلى هاتفك',
          stepDesc: 'اختر: إرسال رسالة SMS أو مكالمة صوتية إلى رقم هاتفك المنتهي بـ 12 (رقمك 7××××××12).',
          highlight: 'إرسال رسالة SMS إلى 7××××××12'
        },
        {
          stepTitle: 'إدخال آخر كلمة سر أو بريد بديل',
          stepDesc: 'إذا كان المخترق قد بدل الرقم، اختر "إدخال آخر كلمة مرور تتذكرها قبل الاختراق" ثم ضع بريدك الحالي للتواصل.',
          highlight: 'آخر كلمة مرور تتذكرها'
        }
      ]
    },
    troubleshootIssues: [
      {
        id: 'passkey_security_key',
        title: 'شاشة طلب مفتاح الأمان أو الرموز الاحتياطية',
        badge: 'الحالة الأكثر شيوعاً',
        severity: 'critical',
        description: 'تظهر شاشة تطلب توصيل مفتاح أمان USB أو إدخال رمز مكون من 8 أرقام وضعه المخترق.',
        whyHappens: 'تفعيل ميزة Passkey أو الرموز الاحتياطية من قبل المخترق لغلق الحساب.',
        solutionSteps: [
          'اضغط أسفل الشاشة على "تجربة طريقة أخرى" (Try another way).',
          'اختر استلام رمز التحقق عبر رسالة SMS أو مكالمة إلى رقم هاتفك 7××××××12.',
          'إذا لم تصل الرسالة، اختر المكالمة الصوتية الفورية (Call me).',
          'إذا تم استبدال الرقم، اختر كتابة آخر كلمة مرور تتذكرها.'
        ],
        tips: [
          'يجب المحاولة من هاتفك أو جهازك القديم المعتاد ومن نفس شبكة الواي فاي المنزلية.',
          'لا تستخدم متصفح التصفح المتخفي (Incognito) أو برامج VPN.'
        ],
        screenName: 'شاشة مفتاح الأمان / التحقق بخطوتين'
      },
      {
        id: 'sms_delayed',
        title: 'تأخر وصول رمز التحقق SMS على الهاتف',
        badge: 'مشاكل شبكة الاتصال',
        severity: 'high',
        description: 'طلبت إرسال رمز التحقق إلى 7××××××12 ولكن الرسالة تأخرت ولم تصل.',
        whyHappens: 'ضغط في بوابات الرسائل الدولية التابعة لمزود الخدمة، أو عدم كتابة الرمز الدولي بشكل صحيح.',
        solutionSteps: [
          'تأكد من اختيار الدولة الصحيحة وكتابة الرمز الدولي (+967 لليمن، +964 للعراق، +962 للأردن).',
          'انتظر دقيقة ثم اضغط على "إجراء مكالمة هاتفية" للاستماع للرمز عبر اتصال فوري مجاني.',
          'أعد تشغيل هاتفك لتحديث اتصال الشريحة بأبراج الشبكة.'
        ],
        tips: [
          'لا تضغط على إعادة إرسال الكود أكثر من 3 مرات متتالية حتى لا يتم حظرك مؤقتاً لمدة 24 ساعة.'
        ],
        screenName: 'شاشة التحقق من رقم الهاتف'
      },
      {
        id: 'all_info_changed',
        title: 'المخترق غيّر رقم الهاتف والبريد البديل تماماً',
        badge: 'اختراق متقدم',
        severity: 'critical',
        description: 'عند الضغط على "تجربة طريقة أخرى" تظهر أرقام غريبة لا تخصك مطلقاً.',
        whyHappens: 'قام المخترق بحذف بياناتك واستبدالها ببياناته الخاصة.',
        solutionSteps: [
          'انتقل فوراً إلى بوابة الاسترداد الرسمية من نفس هاتفك القديم حصراً.',
          'اضغط "تجربة طريقة أخرى" ثم اختر "إدخال آخر كلمة مرور تتذكرها".',
          'أدخل بريداً إلكترونياً جديداً شغالاً معك الآن لتستلم عليه رمز التحقق.',
          'نظام Google الآلي سيطابق بصمة جهازك (Device Fingerprint) والموقع الجغرافي وتاريخ إنشاء الحساب لإعادة الملكية لك.'
        ],
        tips: [
          'نسبة نجاح هذه الخطوة تتجاوز 85% إذا طُبقت من الجهاز الذي كان يعمل به الحساب لعدة أشهر.'
        ],
        screenName: 'صفحة استرداد الحساب المخترق'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'افتح صفحة استرداد Google من جهازك القديم المعتاد',
        summary: 'خطوة أساسية لإثبات هويتك تلقائياً',
        details: [
          'استخدم الهاتف أو الكمبيوتر الذي كان الحساب مفتوحاً عليه دائماً.',
          'اتصل بنفس شبكة الواي فاي المنزلية.',
          'انتقل إلى الرابط الرسمي المباشر للاسترداد.'
        ],
        actionButton: {
          label: 'فتح صفحة استرداد Google',
          url: 'https://accounts.google.com/signin/recovery',
          isExternal: true
        }
      },
      {
        stepNumber: 2,
        title: 'تجاوز شاشة مفتاح الأمان Passkey',
        summary: 'تخطي القفل الذي وضعه المخترق',
        details: [
          'اضغط في أسفل شاشة المفتاح على رابط "تجربة طريقة أخرى" (Try another way).',
          'لا تقم بإدخال أي رموز عشوائية حتى لا يتم إغلاق المحاولة مؤقتاً.'
        ]
      },
      {
        stepNumber: 3,
        title: 'اختر استلام الرمز عبر رقم هاتفك 7××××××12',
        summary: 'إثبات الملكية برقم الهاتف المنتهي بـ 12',
        details: [
          'اختر رسالة نصية SMS إلى رقمك.',
          'إذا لم تصل الرسالة خلال دقيقة، اضغط خيار "الاتصال بي" لتلقي اتصال صوتي يملي الرمز.',
          'اكتب الرمز المكون من 6 أرقام (G-XXXXXX).'
        ]
      },
      {
        stepNumber: 4,
        title: 'تعيين كلمة مرور جديدة قوية',
        summary: 'قفل الحساب في وجه المخترق',
        details: [
          'اختر كلمة مرور مكونة من 12 حرفاً على الأقل تحتوي على رموز وأرقام وحروف كبيرة وصغيرة.',
          'لا تستخدم نفس كلمة المرور القديمة إطلاقاً.'
        ]
      },
      {
        stepNumber: 5,
        title: 'طرد المخترق وحذف مفاتيح المرور الغريبة',
        summary: 'حماية وتأمين الحساب فوراً',
        details: [
          'ادخل إلى صفحة الأجهزة المتصلة واضغط "تسجيل الخروج" من كافة الأجهزة الغريبة.',
          'احذف أي مفاتيح مرور (Passkeys) أضافها المخترق.',
          'تأكد من أن رقم هاتفك الأصلي هو الرقم الوحيد المسجل للاسترداد.'
        ],
        actionButton: {
          label: 'فحص أمان Google وطرد الأجهزة',
          url: 'https://myaccount.google.com/security-checkup',
          isExternal: true
        }
      }
    ],
    officialLinks: [
      {
        title: 'بوابة استرداد حساب Google الرسمية (Recovery)',
        desc: 'الرابط الأساسي المباشر لإعادة تعيين كلمة المرور وتجاوز مفاتيح المخترق.',
        url: 'https://accounts.google.com/signin/recovery',
        badge: 'الرابط المباشر',
        isPrimary: true
      },
      {
        title: 'دليل استعادة حساب Google المخترق الرسمي',
        desc: 'صفحة الدعم المعتمدة لحالات تغيير المخترق لبيانات الأمان.',
        url: 'https://support.google.com/accounts/answer/6294825',
        badge: 'دعم الاختراق'
      },
      {
        title: 'إدارة الأجهزة المتصلة بالحساب (Device Activity)',
        desc: 'فصل المخترق وتسجيل الخروج من هاتفه فور استعادة الحساب.',
        url: 'https://myaccount.google.com/device-activity',
        badge: 'طرد الأجهزة'
      },
      {
        title: 'إدارة مفاتيح المرور Passkeys',
        desc: 'حذف أي مفتاح أمان أو بصمة قام المخترق بربطها بالحساب.',
        url: 'https://myaccount.google.com/signinoptions/passkeys',
        badge: 'حذف المفاتيح'
      }
    ],
    postSecurityChecklist: [
      {
        id: 'g_logout',
        title: 'طرد المخترق من كافة الأجهزة المسجلة',
        description: 'تسجيل الخروج من الجلسات المفتوحة على هواتف أو حواسيب غريبة.',
        link: 'https://myaccount.google.com/device-activity'
      },
      {
        id: 'g_passkeys',
        title: 'حذف مفاتيح المرور (Passkeys) التي أنشأها المخترق',
        description: 'إلغاء أي مفتاح أمان إلكتروني تم إنشاؤه أثناء فترة الاختراق.',
        link: 'https://myaccount.google.com/signinoptions/passkeys'
      },
      {
        id: 'g_verify_info',
        title: 'تأكيد رقم هاتفك 7××××××12 وإضافة بريد بديل آمن',
        description: 'التأكد من خلو الحساب من أي أرقام أو إيميلات مجهولة.',
        link: 'https://myaccount.google.com/signinoptions/rescuephone'
      },
      {
        id: 'g_backup_codes',
        title: 'توليد رموز احتياطية رسمية وحفظها في ورقة خارجية',
        description: '10 رموز للطوارئ لتسجيل الدخول الفوري دون الحاجة إلى SMS.',
        link: 'https://myaccount.google.com/two-step-verification/backup-codes'
      }
    ]
  },

  facebook: {
    id: 'facebook',
    nameAr: 'فيسبوك',
    nameEn: 'Facebook',
    tagline: 'بوابة facebook.com/hacked الرسمية وتأكيد الهوية عبر كلمة المرور القديمة أو الهوية الشخصية',
    colorClass: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    activeTabClass: 'bg-blue-600 text-white shadow-sm',
    iconName: 'facebook',
    targetAccountHint: 'البحث عبر الإيميل a***********@gmail.com أو @hotmail أو الهاتف 7××××××12',
    primaryHackedTitle: 'المخترق قام بتغيير كلمة المرور والإيميل أو فعل تطبيق المصادقة الثنائية 2FA',
    primaryHackedExplanation: 'فيسبوك تمتلك بوابة طوارئ مخصصة للمخترقين (facebook.com/hacked) تتيح استرداد الحساب حتى لو غير المخترق كل بياناتك، عبر استخدام كلمة المرور القديمة أو رفع الهوية الشخصية.',
    officialRecoveryUrl: 'https://www.facebook.com/hacked',
    bypassGoldenTrick: {
      title: 'الحل الذهبي لاختراق فيسبوك وتجاوز كود المصادقة 2FA:',
      description: 'استخدم صفحة الاختراق الرسمية مع إدخال كلمة المرور السابقة التي يعرفها فيسبوك في سجلاته.',
      buttonLabel: 'الانتقال إلى facebook.com/hacked',
      steps: [
        {
          stepTitle: 'افتح صفحة facebook.com/hacked',
          stepDesc: 'اضغط على خيار "تم اختراق حسابي" (My account is compromised).',
          highlight: 'My account is compromised'
        },
        {
          stepTitle: 'ابحث عن حسابك برقم الهاتف أو الإيميل',
          stepDesc: 'اكتب 7××××××12 أو a***********@gmail.com أو اسم حسابك أو رابط بروفايلك الشخصي.',
          highlight: 'البحث عن الحساب'
        },
        {
          stepTitle: 'أدخل كلمة المرور الحالية أو كلمة المرور القديمة!',
          stepDesc: 'إذا قال فيسبوك "لقد أدخلت كلمة سر قديمة"، اضغط "نعم أنا المالك" لبدء استعادة الحساب فوراً.',
          highlight: 'كلمة المرور القديمة'
        },
        {
          stepTitle: 'تجاوز كود 2FA إذا كان مفعلاً من المخترق',
          stepDesc: 'اضغط "هل تواجه مشكلة؟" ثم اختر "تأكيد الهوية" لرفع صورة بطاقتك الشخصية وسيعيد فيسبوك الحساب خلال 24 ساعة.',
          highlight: 'تأكيد الهوية عبر البطاقة'
        }
      ]
    },
    troubleshootIssues: [
      {
        id: 'fb_email_changed',
        title: 'المخترق غيّر الإيميل ورقم الهاتف ورسائل الاسترداد تصل إليه',
        badge: 'حالة اختراق كامل',
        severity: 'critical',
        description: 'عند الضغط على نسيان كلمة السر، يظهر إيميل غريب ينتهي بـ @mail.ru لا يخصك.',
        whyHappens: 'قام المخترق باستبدال جهات الاتصال الخاصة بك بحسابه الخاص.',
        solutionSteps: [
          'افتح بريدك a***********@gmail.com (أو Hotmail) وابحث عن رسالة من security@facebookmail.com بعنوان: "تم تغيير عنوان بريدك الإلكتروني".',
          'اضغط داخل الرسالة على زر: "تأمين حسابك" (Secure your account) أو "لم أقم بهذا التغيير" لإلغاء إيميل المخترق فوراً.',
          'إذا لم تجد الرسالة، ادخل إلى facebook.com/login/identify واضغط في الأسفل على: "لم يعد بإمكانك الوصول إلى هذه المعلومات؟" (No longer have access to these?).',
          'سيطلب منك فيسبوك إدخال إيميل جديد لم يتم استخدامه من قبل، ثم رفع صورة بطاقة هويتك الشخصية.'
        ],
        tips: [
          'تأكد من أن الاسم وتاريخ الميلاد على بطاقتك مطابقان للاسم على حسابك في فيسبوك.',
          'التقط صورة واضحة للهوية في إضاءة جيدة بدون فلاش ساطع.'
        ],
        screenName: 'صفحة البحث عن الحساب وتأمين البريد'
      },
      {
        id: 'fb_2fa_locked',
        title: 'يطلب كود تطبيق المصادقة الثنائية (Code Generator) وضعه المخترق',
        badge: 'قفل 2FA',
        severity: 'critical',
        description: 'تعرف كلمة المرور ولكن فيسبوك يطلب رمز مكون من 6 أرقام من تطبيق يخص المخترق.',
        whyHappens: 'تفعيل المخترق للمصادقة الثنائية لمنع استرجاع الحساب.',
        solutionSteps: [
          'في شاشة طلب كود 2FA، اضغط أسفل الشاشة على رابط: "هل تواجه مشكلة؟" (Having trouble?).',
          'اختر: "لا يتوفر لدي هاتفي" أو "طرق أخرى للتحقق" (Need another way to authenticate).',
          'اختر: "إرسال بطاقة هوية صادرة عن جهة حكومية" (Upload Government ID).',
          'سيصلك رابط استثنائي على بريدك لتسجيل الدخول وتعطيل قفل 2FA الخاص بالمخترق.'
        ],
        tips: [
          'المراجعة تتم آلياً أو عبر فريق أمان فيسبوك وتستغرق عادة بين ساعتين إلى 24 ساعة.'
        ],
        screenName: 'شاشة رمز المصادقة الثنائية في فيسبوك'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'الدخول إلى بوابة الحسابات المخترقة الرسمية في فيسبوك',
        summary: 'facebook.com/hacked',
        details: [
          'افتح الرابط الرسمي: facebook.com/hacked من متصفح الهاتف أو الكمبيوتر.',
          'اضغط على الزر الأزرق: "تم اختراق حسابي" (My Account Is Compromised).'
        ],
        actionButton: {
          label: 'فتح بوابة facebook.com/hacked',
          url: 'https://www.facebook.com/hacked',
          isExternal: true
        }
      },
      {
        stepNumber: 2,
        title: 'تحديد الحساب وإدخال كلمة المرور السابقة',
        summary: 'إثبات الملكية عبر تاريخ الحساب',
        details: [
          'اكتب رقم هاتفك 7××××××12 أو بريدك المسجل أو اسم المستخدم.',
          'أدخل آخر كلمة مرور كنت تستخدمها قبل الاختراق.',
          'سيخبرك فيسبوك أن كلمة المرور قديمة وسيبدأ عملية التأمين التلقائي.'
        ]
      },
      {
        stepNumber: 3,
        title: 'إلغاء التغييرات التي قام بها المخترق',
        summary: 'مراجعة بيانات الأمان',
        details: [
          'سيقودك فيسبوك عبر خطوات تفقد الحساب: "مراجعة المنشورات والرسائل والبريد الإلكتروني".',
          'حدد أي إيميل أو رقم هاتف أضافه المخترق واضغط "إزالة".',
          'أعد تعيين كلمة مرور جديدة قوية.'
        ]
      },
      {
        stepNumber: 4,
        title: 'تسجيل الخروج من كل الأجهزة وتأمين الجلسات',
        summary: 'طرد المخترق من ماسنجر وتطبيق فيسبوك',
        details: [
          'اختر خيار: "تسجيل الخروج من كافة الأجهزة" (Log out of all devices).',
          'قم بتفعيل المصادقة الثنائية على رقم هاتفك الشخصي.'
        ],
        actionButton: {
          label: 'فحص جلسات فيسبوك النشطة',
          url: 'https://www.facebook.com/settings?tab=security',
          isExternal: true
        }
      }
    ],
    officialLinks: [
      {
        title: 'بوابة فيسبوك الرسمية للحسابات المخترقة',
        desc: 'أهم رابط لحل مشكلة اختراق الحساب واستبدال كلمة المرور والإيميل.',
        url: 'https://www.facebook.com/hacked',
        badge: 'رابط الاختراق المباشر',
        isPrimary: true
      },
      {
        title: 'البحث عن حسابك وتحديده (Facebook Identify)',
        desc: 'العثور على الحساب برقم الهاتف أو الإيميل حتى لو تم تغيير الاسم.',
        url: 'https://www.facebook.com/login/identify',
        badge: 'تحديد الحساب'
      },
      {
        title: 'مركز مساعدة فيسبوك: الحسابات المخترقة والمسروقة',
        desc: 'الدليل الرسمي لحل مشكلات تسجيل الدخول والتعرف على الهوية.',
        url: 'https://www.facebook.com/help/1216349518398524',
        badge: 'مركز المساعدة'
      }
    ],
    postSecurityChecklist: [
      {
        id: 'fb_logout_all',
        title: 'تسجيل الخروج من كل الأجهزة الغريبة',
        description: 'إنهاء جلسات المخترق على الهواتف والمتصفحات في قسم الأمان.',
        link: 'https://www.facebook.com/settings?tab=security'
      },
      {
        id: 'fb_remove_emails',
        title: 'حذف أي بريد إلكتروني أو رقم هاتف أضافه المخترق',
        description: 'التأكد من بقاء بياناتك فقط في إعدادات الاتصال.',
        link: 'https://accountscenter.facebook.com/personal-info/contact-points'
      },
      {
        id: 'fb_enable_2fa',
        title: 'تفعيل المصادقة الثنائية على رقمك الشخصي فقط',
        description: 'حماية الحساب برمز SMS يصل إلى هاتفك عند كل محاولة تسجيل جديدة.',
        link: 'https://accountscenter.facebook.com/password_and_security/two_factor'
      }
    ]
  },

  instagram: {
    id: 'instagram',
    nameAr: 'إنستغرام',
    nameEn: 'Instagram',
    tagline: 'بوابة instagram.com/hacked والتحقق بفيديو السيلفي ثلاثي الأبعاد لاسترجاع الحساب',
    colorClass: 'text-pink-600',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    activeTabClass: 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-sm',
    iconName: 'instagram',
    targetAccountHint: 'البحث عبر اسم المستخدم أو البريد a***********@gmail.com أو الهاتف 7××××××12',
    primaryHackedTitle: 'المخترق غير الإيميل واسم المستخدم أو طلب كود تطبيق 2FA',
    primaryHackedExplanation: 'تتيح إنستغرام ميزة حصرية قوية تسمى "التحقق عبر فيديو السيلفي" (Video Selfie Verification)، حيث يقوم نظام الذكاء الاصطناعي بمطابقة وجهك مع صورك وفيديوهاتك السابقة في الحساب واستعادته خلال 24 ساعة.',
    officialRecoveryUrl: 'https://www.instagram.com/hacked',
    bypassGoldenTrick: {
      title: 'الحل الذهبي لاختراق إنستغرام وفيديو السيلفي:',
      description: 'افتح بوابة instagram.com/hacked عبر متصفح الهاتف أو تطبيق إنستغرام لفتح خيار التحقق بالوجه.',
      buttonLabel: 'الانتقال إلى instagram.com/hacked',
      steps: [
        {
          stepTitle: 'افحص بريدك بحثاً عن رسالة إلغاء التغيير',
          stepDesc: 'افتح بريدك الإلكتروني (Gmail أو Hotmail) وابحث عن رسالة من security@mail.instagram.com واضغط زر "تأمين حسابك" (Revert this change) لإلغاء إيميل المخترق فوراً.',
          highlight: 'Revert this change'
        },
        {
          stepTitle: 'افتح رابط instagram.com/hacked في هاتفك',
          stepDesc: 'اختر: "تم اختراق حسابي" (My account was hacked) واضغط التالي.',
          highlight: 'My account was hacked'
        },
        {
          stepTitle: 'اكتب اسم المستخدم أو رقم الهاتف 7××××××12',
          stepDesc: 'إذا لم تجد اسم المستخدم، اكتب رقم الهاتف المسجل لتحديد الحساب.',
          highlight: 'البحث عن الحساب'
        },
        {
          stepTitle: 'اختيار "طلب مساعدة إضافية" ثم "فيديو سيلفي"',
          stepDesc: 'إذا كان المخترق قد فعل 2FA، اختر "طلب دعم" ثم "التقاط فيديو سيلفي" لتحريك وجهك يميناً ويساراً وسيتم فتح الحساب.',
          highlight: 'فيديو سيلفي Video Selfie'
        }
      ]
    },
    troubleshootIssues: [
      {
        id: 'ig_user_not_found',
        title: 'المخترق غيّر اسم المستخدم (Username) وأصبح لا يظهر في البحث',
        badge: 'تغيير المعرف',
        severity: 'high',
        description: 'عند كتابة اسم المستخدم السابق يظهر أنه غير موجود أو تم حذفه.',
        whyHappens: 'يقوم المخترق بتغيير اسم المستخدم لمنع الأصدقاء وصاحب الحساب من الوصول إليه.',
        solutionSteps: [
          'افتح محادثات أصدقائك في إنستغرام عبر هاتف صديقك، ستجد اسم المستخدم الجديد الذي وضعه المخترق أعلى المحادثة!',
          'ابحث عن إشعار تغيير اسم المستخدم في بريدك الإلكتروني.',
          'استخدم رقم الهاتف 7××××××12 للبحث عن الحساب بدلاً من اسم المستخدم في شاشة تسجيل الدخول.'
        ],
        tips: [
          'اسم الحساب الجديد يظل مرتبطاً بنفس المعرف الرقمي الأصلي للحساب.'
        ],
        screenName: 'شاشة البحث في إنستغرام'
      },
      {
        id: 'ig_2fa_backup_needed',
        title: 'يطلب كود المصادقة الثنائية 2FA أو الرموز الاحتياطية',
        badge: 'قفل أمني',
        severity: 'critical',
        description: 'بعد إدخال كلمة المرور يطلب كود من تطبيق يخص المخترق.',
        whyHappens: 'تفعيل المخترق للمصادقة الثنائية لحرمانك من الوصول.',
        solutionSteps: [
          'اضغط أسفل الشاشة على رابط: "جرب طريقة أخرى" (Try another way).',
          'اختر: "طلب الدعم" (Get support).',
          'سيظهر لك سؤال: "هل لديك صور لنفسك في حسابك؟" اختر نعم.',
          'اتبع تعليمات الكاميرا الأمامية لأخذ فيديو سيلفي قصير لتأكيد أنك المالك الحقيقي.'
        ],
        tips: [
          'يجب التقاط الفيديو في مكان ذي إضاءة ممتازة، وارتداء ملابس عادية بدون نظارات شمسية أو قبعات.'
        ],
        screenName: 'شاشة كود التحقق بخطوتين في إنستغرام'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'فتح بوابة استرداد إنستغرام على الهاتف',
        summary: 'instagram.com/hacked',
        details: [
          'افتح متصفح الهاتف أو التطبيق وانتقل إلى: instagram.com/hacked.',
          'اختر سبب الاسترداد: "تم اختراق حسابي" (My account was hacked).'
        ],
        actionButton: {
          label: 'فتح صفحة instagram.com/hacked',
          url: 'https://www.instagram.com/hacked',
          isExternal: true
        }
      },
      {
        stepNumber: 2,
        title: 'البحث عن الحساب وطلب رمز الدخول',
        summary: 'استخدام الهاتف أو الإيميل',
        details: [
          'أدخل اسم المستخدم أو رقم هاتفك 7××××××12 أو بريدك a***********@gmail.com.',
          'اختر إرسال كود تسجيل الدخول إلى هاتفك عبر SMS أو واتساب.'
        ]
      },
      {
        stepNumber: 3,
        title: 'تخطي قفل المخترق عبر فيديو السيلفي',
        summary: 'إثبات الهوية بالذكاء الاصطناعي',
        details: [
          'إذا طلب كود 2FA للمخترق، اضغط "جرب طريقة أخرى" ثم "طلب الدعم".',
          'التقط فيديو سيلفي قصير يوضح وجهك من كافة الزوايا.',
          'ستتلقى رسالة تأكيد وإلغاء قفل 2FA خلال ساعات على بريدك.'
        ]
      },
      {
        stepNumber: 4,
        title: 'طرد المخترق وتغيير كلمة السر',
        summary: 'حماية الحساب فور الاسترجاع',
        details: [
          'ادخل إلى مركز الحسابات (Accounts Center) وقم بتسجيل الخروج من كل الجلسات الأخرى.',
          'احذف أي إيميل بديل أو رقم أضافه المخترق.'
        ],
        actionButton: {
          label: 'إدارة أجهزة إنستغرام النشطة',
          url: 'https://accountscenter.instagram.com/password_and_security/login_activity',
          isExternal: true
        }
      }
    ],
    officialLinks: [
      {
        title: 'بوابة إنستغرام الرسمية للحسابات المخترقة',
        desc: 'الرابط المباشر الرسمي من إنستغرام للتعامل مع الحسابات المخترقة وفيديو السيلفي.',
        url: 'https://www.instagram.com/hacked',
        badge: 'رابط الاختراق المباشر',
        isPrimary: true
      },
      {
        title: 'دليل استعادة حساب إنستغرام المخترق الرسمي',
        desc: 'إرشادات مركز مساعدة إنستغرام خطوة بخطوة للتعامل مع تغيير الإيميل و2FA.',
        url: 'https://help.instagram.com/149494848770079',
        badge: 'مركز المساعدة'
      },
      {
        title: 'مركز حسابات ميتا (Meta Accounts Center)',
        desc: 'إدارة كلمات المرور والمصادقة الثنائية والأجهزة المتصلة بإنستغرام.',
        url: 'https://accountscenter.instagram.com',
        badge: 'إدارة الأمان'
      }
    ],
    postSecurityChecklist: [
      {
        id: 'ig_logout_activity',
        title: 'تسجيل الخروج من نشاط تسجيل الدخول الغريب',
        description: 'طرد أي هواتف أو مدن مجهولة دخلت على الحساب.',
        link: 'https://accountscenter.instagram.com/password_and_security/login_activity'
      },
      {
        id: 'ig_remove_third_party',
        title: 'إلغاء التطبيقات والمواقع المرتبطة بحسابك',
        description: 'حذف التطبيقات الخارجية المشبوهة.',
        link: 'https://www.instagram.com/accounts/manage_access/'
      },
      {
        id: 'ig_setup_authenticator',
        title: 'تفعيل المصادقة الثنائية عبر تطبيقك الشخصي',
        description: 'ربط الحساب بتطبيق التحقق الخاص بك وليس هاتف المخترق.',
        link: 'https://accountscenter.instagram.com/password_and_security/two_factor'
      }
    ]
  },

  whatsapp: {
    id: 'whatsapp',
    nameAr: 'واتساب',
    nameEn: 'WhatsApp',
    tagline: 'طرد المخترق فوراً بإعادة تسجيل الرقم 7××××××12 وتجاوز كود PIN بعد 7 أيام',
    colorClass: 'text-emerald-600',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    activeTabClass: 'bg-emerald-600 text-white shadow-sm',
    iconName: 'whatsapp',
    targetAccountHint: 'رقم الهاتف المربوط: 7××××××12 (المنتهي بـ 12)',
    primaryHackedTitle: 'تم سحب الواتساب وطلب كود PIN التحقق بخطوتين وضعه المخترق',
    primaryHackedExplanation: 'تعتمد سرقة واتساب على خداع المستخدم لإرسال كود SMS، ثم يقوم المخترق فوراً بتفعيل رمز PIN من 6 أرقام (التحقق بخطوتين) ليمنعك من استرجاعه. ولكن نظام واتساب يفصل المخترق فور إدخالك كود SMS الجديد!',
    officialRecoveryUrl: 'https://faq.whatsapp.com/1131652977717250',
    bypassGoldenTrick: {
      title: 'القاعدة الذهبية لاسترداد واتساب وطرد المخترق:',
      description: 'بمجرد أن تعيد تسجيل رقمك وتدخل كود SMS، يخرج المخترق من الحساب فوراً دون أن يتمكن من قراءة أي رسالة جديدة!',
      buttonLabel: 'إعادة تسجيل رقمك في التطبيق فوراً',
      steps: [
        {
          stepTitle: 'أعد تسجيل رقمك في تطبيق واتساب الآن',
          stepDesc: 'افتح واتساب واكتب رقمك 7××××××12 بالرمز الدولي. اطلب رمز التحقق عبر رسالة SMS أو مكالمة صوتية.',
          highlight: 'تسجيل الرقم في واتساب'
        },
        {
          stepTitle: 'إدخال كود SMS المكون من 6 أرقام',
          stepDesc: 'بمجرد إدخال كود SMS، يتم تسجيل الخروج التلقائي للمخترق من جهازه فوراً في نفس الثانية!',
          highlight: 'طرد المخترق الفوري'
        },
        {
          stepTitle: 'ماذا لو طلب كود PIN (التحقق بخطوتين) وضعه المخترق؟',
          stepDesc: 'إذا لم تكن تعرف الرمز، اضغط "نسيت رقم PIN؟" ثم "إرسال رسالة بريد إلكتروني" إذا كان بريدك مسجلاً. إذا لم يكن مسجلاً، انتظر 7 أيام بالضبط وسيتيح لك واتساب فتح الحساب وإلغاء كود PIN المخترق، وخلال هذه الـ 7 أيام المخترق مقفول عنه الحساب أيضاً!',
          highlight: 'مهلة الـ 7 أيام لحذف كود المخترق'
        },
        {
          stepTitle: 'تجميد الحساب عبر مراسلة دعم واتساب',
          stepDesc: 'أرسل إيميل إلى support@whatsapp.com بعنوان: "Lost/Stolen: Please deactivate my account" واكتب رقمك بالصيغة الدولية لتجميد الحساب حتى لا يراسله أحد.',
          highlight: 'support@whatsapp.com'
        }
      ]
    },
    troubleshootIssues: [
      {
        id: 'wa_pin_locked',
        title: 'يطلب كود PIN من 6 أرقام وضعه المخترق بعد إدخال كود SMS',
        badge: 'قفل كود PIN',
        severity: 'critical',
        description: 'أدخلت كود SMS بنجاح ولكن الشاشة تطلب رمز PIN للتحقق بخطوتين لا تعرفه.',
        whyHappens: 'فعل المخترق رمز أمان لمنعك من إكمال الدخول.',
        solutionSteps: [
          'اعلم أن المخترق طُرد بالفعل من الحساب في اللحظة التي أدخلت فيها كود SMS ولا يستطيع قراءة رسائلك.',
          'اضغط على خيار: "هل نسيت رقم التعريف الشخصي؟" (Forgot PIN?).',
          'إذا كان بريدك مربوطاً بالحساب سابقاً، اضغط "إرسال بريد إلكتروني" وسيصلك رابط فك القفل فوراً.',
          'إذا وضع المخترق بريده، يجب عليك الانتظار لمدة 7 أيام بالضبط دون مسح التطبيق، وبعد 7 أيام يظهر زر "إعادة التعيين" (Reset) وتدخل الحساب بدون كود PIN.'
        ],
        tips: [
          'خلال فترة الانتظار (7 أيام)، رقمك غير مفعل عند المخترق، ورسائلك مشفرة تماماً ولا يمكن لأحد قراءتها.'
        ],
        screenName: 'شاشة التحقق بخطوتين (PIN) في واتساب'
      },
      {
        id: 'wa_code_wait_hours',
        title: 'عداد الوقت يطلب الانتظار ساعات طويلة لاستلام كود SMS',
        badge: 'تأخر الكود',
        severity: 'high',
        description: 'بسبب المحاولات المتكررة يظهر عداد انتظار طويل.',
        whyHappens: 'تكرار طلب الأكواد يطلق نظام الحماية المؤقت في واتساب.',
        solutionSteps: [
          'انتظر حتى ينتهي عداد الوقت تماماً ولا تقم بحذف التطبيق أو إعادة تثبيته لأن ذلك يطيل مدة الانتظار.',
          'عند انتهاء العداد، اختر "اتصل بي" (Call me) بدلاً من رسالة SMS لتلقي مكالمة سريعة تملي عليك الأرقام.',
          'تأكد من وجود تغطية خلوية جيدة في هاتفك لاستقبال المكالمات.'
        ],
        tips: [
          'إذا كان الحساب يُستخدم لأغراض تجارية أو احتيالية من المخترق، راسل الدعم لتجميده فوراً.'
        ],
        screenName: 'شاشة طلب الرمز في واتساب'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'تسجيل الدخول برقمك 7××××××12 في واتساب فوراً',
        summary: 'طرد فوري للمخترق بمجرد كود SMS',
        details: [
          'افتح واتساب في هاتفك وأدخل رقمك مع مفتاح دولتك.',
          'اطلب كود التحقق عبر رسالة SMS أو مكالمة.',
          'أدخل الكود المكون من 6 أرقام ليتم طرد المخترق من جهازه مباشرة.'
        ],
        actionButton: {
          label: 'دليل واتساب الرسمي للحسابات المسروقة',
          url: 'https://faq.whatsapp.com/1131652977717250',
          isExternal: true
        }
      },
      {
        stepNumber: 2,
        title: 'التعامل مع كود PIN (التحقق بخطوتين)',
        summary: 'تجاوز قفل المخترق أو الانتظار 7 أيام',
        details: [
          'إذا ظهرت شاشة PIN، اضغط "نسيت رقم التعريف الشخصي؟".',
          'إذا لم تكن تعرفه، انتظر 7 أيام لإعادة تعيينه بدون كود المخترق.',
          'خلال هذه الأيام السبعة، المخترق مقفل عنه الحساب تماماً ولا يستطيع استخدامه.'
        ]
      },
      {
        stepNumber: 3,
        title: 'تجميد الحساب عبر دعم واتساب (اختياري وآمن)',
        summary: 'منع المخترق من مراسلة معارفك',
        details: [
          'أرسل بريداً إلى support@whatsapp.com.',
          'الموضوع: Lost/Stolen: Please deactivate my account.',
          'المحتوى: اكتب رقم هاتفك بالصيغة الدولية الكاملة.'
        ]
      },
      {
        stepNumber: 4,
        title: 'تفعيل التحقق بخطوتين الخاص بك وفحص واتساب ويب',
        summary: 'تحصين نهائي بعد الدخول',
        details: [
          'ادخل فوراً إلى الإعدادات > الحساب > التحقق بخطوتين، وضع كود PIN خاص بك وبريدك.',
          'افحص قسم "الأجهزة المرتبطة" (Linked Devices) واضغط "تسجيل الخروج من كافة الأجهزة".'
        ]
      }
    ],
    officialLinks: [
      {
        title: 'صفحة دعم واتساب الرسمية للحسابات المسروقة',
        desc: 'الشرح الرسمي لكيفية استعادة الحساب المسروق والتعامل مع كود PIN والمهلة الزمنية.',
        url: 'https://faq.whatsapp.com/1131652977717250',
        badge: 'دعم واتساب الرسمي',
        isPrimary: true
      },
      {
        title: 'مراسلة الدعم الفني لواتساب (Contact WhatsApp)',
        desc: 'صفحة التواصل المباشر مع دعم واتساب لتجميد الحسابات أو حل مشكلات التفعيل.',
        url: 'https://www.whatsapp.com/contact/',
        badge: 'التواصل مع الدعم'
      },
      {
        title: 'إرشادات الأمان والمصادقة الثنائية في واتساب',
        desc: 'كيفية قفل حسابك وحمايته من الاختراق مستقبلاً برمز PIN شخصي.',
        url: 'https://faq.whatsapp.com/1278661612933454',
        badge: 'إرشادات الأمان'
      }
    ],
    postSecurityChecklist: [
      {
        id: 'wa_linked_devices',
        title: 'تسجيل الخروج من كافة الأجهزة المرتبطة (WhatsApp Web)',
        description: 'افتح الإعدادات > الأجهزة المرتبطة، وتأكد من عدم وجود أي متصفح أو كمبيوتر متصل.',
      },
      {
        id: 'wa_set_pin',
        title: 'إنشاء رمز PIN خاص بك للتحقق بخطوتين وربطه ببريدك',
        description: 'الإعدادات > الحساب > التحقق بخطوتين، أضف رمزاً مكوناً من 6 أرقام تحفظه جيداً وبريدك.',
      },
      {
        id: 'wa_warn_contacts',
        title: 'تنبيه أصدقائك ومجموعاتك بعدم إرسال أي أموال',
        description: 'انشر في الحالة أو أخبر المقربين بأن الحساب كان مخترقاً ليتجاهلوا أي رسائل احتيال أرسلها المخترق.',
      }
    ]
  },

  tiktok: {
    id: 'tiktok',
    nameAr: 'تيك توك',
    nameEn: 'TikTok',
    tagline: 'نموذج الإبلاغ عن حساب مخترق وإثبات ملكية الهاتف 7××××××12 والجهاز المسجل',
    colorClass: 'text-neutral-900',
    badgeColor: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    activeTabClass: 'bg-neutral-900 text-white shadow-sm',
    iconName: 'tiktok',
    targetAccountHint: 'الحساب المربوط برقم 7××××××12 أو الإيميل a***********@gmail.com أو @hotmail',
    primaryHackedTitle: 'المخترق قام بفك ربط رقم الهاتف أو تغيير كلمة المرور والبريد',
    primaryHackedExplanation: 'تعتمد تيك توك على التحقق من هوية صاحب الحساب من خلال سجل الأجهزة (Device Model) التي تم فتح الحساب منها وتاريخ الإنشاء ورقم الهاتف المسجل أصلاً.',
    officialRecoveryUrl: 'https://www.tiktok.com/feedback',
    bypassGoldenTrick: {
      title: 'الحل الذهبي لاسترداد تيك توك من داخل التطبيق:',
      description: 'استخدم ميزة "الإبلاغ عن مشكلة" من تطبيق تيك توك على هاتفك القديم.',
      buttonLabel: 'فتح نموذج الدعم في تيك توك',
      steps: [
        {
          stepTitle: 'افتح شاشة تسجيل الدخول في تيك توك',
          stepDesc: 'اضغط على رمز علامة الاستفهام (?) أعلى يسار الشاشة لفتح "حل مشكلات تسجيل الدخول".',
          highlight: 'أيقونة (?) حل المشكلات'
        },
        {
          stepTitle: 'اختر: استرداد الحساب (Account Recovery)',
          stepDesc: 'اختر وسيلة البحث: رقم الهاتف 7××××××12 أو اسم المستخدم السابق.',
          highlight: 'استرداد الحساب'
        },
        {
          stepTitle: 'اختر: "لا يمكنني الوصول إلى بريد أو هاتف الاسترداد"',
          stepDesc: 'اضغط على "الإبلاغ عن مشكلة" لفتح تذكرة مباشرة مع دعم أمان تيك توك.',
          highlight: 'الإبلاغ عن مشكلة'
        },
        {
          stepTitle: 'تقديم تفاصيل الجهاز الأصلي',
          stepDesc: 'اكتب موديل هاتفك القديم، وتاريخ إنشاء الحساب، وصورة لإثبات هويتك وسيقوم فريق الدعم بربط بريدك الجديد.',
          highlight: 'تفاصيل الجهاز القديم'
        }
      ]
    },
    troubleshootIssues: [
      {
        id: 'tt_phone_unlinked',
        title: 'المخترق فك ربط رقم الهاتف 7××××××12 وربط هاتفه',
        badge: 'فك الربط',
        severity: 'critical',
        description: 'عند محاولة تسجيل الدخول برقم الهاتف يظهر أن الرقم غير مرتبط بأي حساب.',
        whyHappens: 'قام المخترق بنقل الحساب إلى رقم هاتف آخر.',
        solutionSteps: [
          'ادخل إلى نموذج تيك توك الرسمي لردود الفعل: tiktok.com/feedback.',
          'اختر الموضوع: "الإبلاغ عن مشكلة أمنية / حساب مخترق" (Report a bug / Hacked account).',
          'اكتب اسم المستخدم وبريدك الإلكتروني a***********@gmail.com ورقمك الأصلي 7××××××12.',
          'أرفق تفاصيل تثبت ملكيتك مثل (نوع هاتفك الذي استخدمته في تسجيل الفيديوهات، تاريخ إنشاء الحساب التقريبي، إيصالات شحن العملات إن وجدت).'
        ],
        tips: [
          'دعم تيك توك يستجيب عادة خلال 48 إلى 72 ساعة عبر الإيميل.'
        ],
        screenName: 'نموذج ملاحظات ودعم تيك توك'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'فتح نموذج الإبلاغ عن مشكلة في تيك توك',
        summary: 'tiktok.com/feedback',
        details: [
          'افتح نموذج الدعم الرسمي: tiktok.com/feedback.',
          'اختر الموضوع: استفسار عام حول الحساب أو اختراق الحساب.'
        ],
        actionButton: {
          label: 'فتح نموذج دعم تيك توك الرسمي',
          url: 'https://www.tiktok.com/feedback',
          isExternal: true
        }
      },
      {
        stepNumber: 2,
        title: 'تعبئة معلومات الحساب الأصلية بدقة',
        summary: 'إثبات الملكية التاريخية',
        details: [
          'اكتب الإيميل الأصلي ورقم الهاتف: 7××××××12.',
          'وضح أن الحساب تم اختراقه وتغيير وسائل الاتصال دون إذنك.'
        ]
      },
      {
        stepNumber: 3,
        title: 'استلام رابط إعادة التعيين من فريق أمان تيك توك',
        summary: 'استعادة الحساب',
        details: [
          'سيصلك إيميل من support@tiktok.com يطلب تأكيد بعض التفاصيل.',
          'اتبع الرابط لتعيين كلمة مرور جديدة وتفعيل المصادقة الثنائية برقمك.'
        ]
      }
    ],
    officialLinks: [
      {
        title: 'نموذج ملاحظات ودعم تيك توك الرسمي (Feedback)',
        desc: 'البوابة المباشرة لرفع تذكرة اختراق حساب أو استفسار أمني مع دعم تيك توك.',
        url: 'https://www.tiktok.com/feedback',
        badge: 'نموذج الدعم المباشر',
        isPrimary: true
      },
      {
        title: 'دليل استكشاف أخطاء تسجيل الدخول في تيك توك',
        desc: 'خطوات استعادة الوصول للحساب وتغيير كلمة المرور وطرق التحقق.',
        url: 'https://support.tiktok.com/ar/log-in-troubleshoot',
        badge: 'دليل الدخول'
      }
    ],
    postSecurityChecklist: [
      {
        id: 'tt_devices',
        title: 'تسجيل الخروج من كافة الأجهزة الغريبة في تيك توك',
        description: 'الملف الشخصي > الإعدادات والخصوصية > الأمان > أجهزتك، احذف أي جهاز غريب.',
      },
      {
        id: 'tt_2step',
        title: 'تفعيل التحقق بخطوتين برقم هاتفك 7××××××12',
        description: 'الإعدادات والخصوصية > الأمان > التحقق بخطوتين، اختر SMS مع رقمك.',
      }
    ]
  },

  snapchat: {
    id: 'snapchat',
    nameAr: 'سناب شات',
    nameEn: 'Snapchat',
    tagline: 'نموذج طوارئ سناب شات للحسابات المخترقة واسترداد اسم المستخدم والإيميل',
    colorClass: 'text-amber-500',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    activeTabClass: 'bg-amber-500 text-slate-900 shadow-sm font-bold',
    iconName: 'snapchat',
    targetAccountHint: 'الحساب المربوط بـ a***********@gmail.com أو الهاتف 7××××××12',
    primaryHackedTitle: 'تم قفل حساب سناب شات أو تغييره بواسطة المخترق',
    primaryHackedExplanation: 'يوفر سناب شات نموذج دعم مخصصاً للحسابات المخترقة يتيح لفريق أمان سناب فحص محاولات تسجيل الدخول الأخيرة من عناوين IP والأجهزة وإلغاء قفل الحساب.',
    officialRecoveryUrl: 'https://help.snapchat.com/hc/ar/requests/new?ticket_form_id=360000030252',
    bypassGoldenTrick: {
      title: 'الحل الذهبي لاسترداد سناب شات المخترق:',
      description: 'ارفع طلباً رسمياً في تذكرة "أعتقد أن حسابي تعرض للاختراق".',
      buttonLabel: 'الانتقال لنموذج تذكرة سناب شات',
      steps: [
        {
          stepTitle: 'افتح صفحة مساعدة سناب شات الرسمية',
          stepDesc: 'انتقل إلى: help.snapchat.com واختر "لا يمكنني الوصول إلى حسابي".',
          highlight: 'help.snapchat.com'
        },
        {
          stepTitle: 'اختر: "أعتقد أن حسابي تعرض للاختراق"',
          stepDesc: 'سيفتح نموذج مفصل لإدخال بياناتك الأصلية قبل الاختراق.',
          highlight: 'حسابي تعرض للاختراق'
        },
        {
          stepTitle: 'اكتب اسم المستخدم والإيميل المسجل',
          stepDesc: 'أدخل رقم الهاتف 7××××××12 مع المفتاح الدولي، وتاريخ بدء المشكلة.',
          highlight: 'البيانات المسجلة'
        },
        {
          stepTitle: 'تحقق من بريدك الإلكتروني',
          stepDesc: 'سيرسل لك دعم سناب شات رابطاً آمناً لإعادة تعيين كلمة المرور وطرد المخترق.',
          highlight: 'رابط إعادة التعيين'
        }
      ]
    },
    troubleshootIssues: [
      {
        id: 'sc_locked',
        title: 'الحساب مقفل مؤقتاً أو دائماً بسبب نشاط المخترق',
        badge: 'قفل الحساب',
        severity: 'high',
        description: 'تظهر رسالة "تم قفل حسابك لأننا رصدنا نشاطاً مشبوهاً".',
        whyHappens: 'رصد نظام أمان سناب محاولات دخول متكررة من جهاز المخترق فقام بقفل الحساب لحمايته.',
        solutionSteps: [
          'ادخل إلى صفحة إلغاء القفل الرسمية: accounts.snapchat.com/accounts/unlock.',
          'سجل الدخول واضغط على الزر الأصفر "إلغاء القفل" (Unlock).',
          'إذا لم ينجح فك القفل التلقائي، املأ نموذج الحساب المخترق عبر help.snapchat.com.'
        ],
        tips: [
          'لا تستخدم أي تطبيقات غير رسمية لتسجيل الدخول في سناب شات.'
        ],
        screenName: 'صفحة فك قفل حساب سناب شات'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'فتح نموذج الإبلاغ عن اختراق حساب سناب شات',
        summary: 'help.snapchat.com',
        details: [
          'افتح الرابط الرسمي لدعم سناب شات المخصص للاختراق.',
          'اختر: "I think my account was compromised" (أعتقد أن حسابي تعرض للاختراق).'
        ],
        actionButton: {
          label: 'فتح نموذج بلاغ اختراق سناب شات',
          url: 'https://help.snapchat.com/hc/ar/requests/new?ticket_form_id=360000030252',
          isExternal: true
        }
      },
      {
        stepNumber: 2,
        title: 'كتابة اسم المستخدم والبريد الأصلي',
        summary: 'إثبات الهوية الأصلية',
        details: [
          'اكتب اسم المستخدم لحسابك في سناب شات.',
          'اكتب بريدك الإلكتروني الأصلي ورقمك: 7××××××12.',
          'في مربع الوصف، اكتب أن الحساب تعرض للاختراق وتطلب استعادته إلى بريدك الأصلي.'
        ]
      },
      {
        stepNumber: 3,
        title: 'إعادة تعيين كلمة المرور وطرد الأجهزة',
        summary: 'تأمين الحساب',
        details: [
          'بمجرد استلام رد الدعم أو رابط إعادة التعيين، ضع كلمة سر قوية.',
          'افتح إعدادات سناب شات > الأجهزة المحفوظة، واحذف أي جهاز لا يخصك.'
        ]
      }
    ],
    officialLinks: [
      {
        title: 'نموذج الإبلاغ عن اختراق حساب سناب شات الرسمي',
        desc: 'النموذج المعتمد لتقديم طلب استعادة الحساب المقفل أو المسروق.',
        url: 'https://help.snapchat.com/hc/ar/requests/new?ticket_form_id=360000030252',
        badge: 'نموذج الدعم الرسمي',
        isPrimary: true
      },
      {
        title: 'صفحة فك قفل حساب سناب شات (Snapchat Unlock)',
        desc: 'إلغاء القفل التلقائي عندما يتم قفل الحساب بسبب نشاط مشبوه.',
        url: 'https://accounts.snapchat.com/accounts/unlock',
        badge: 'فك القفل'
      }
    ],
    postSecurityChecklist: [
      {
        id: 'sc_saved_devices',
        title: 'حذف الأجهزة المحفوظة الغريبة',
        description: 'الإعدادات > المصادقة الثنائية > حذف الأجهزة الموثوقة السابقة.',
      },
      {
        id: 'sc_two_factor',
        title: 'تفعيل تسجيل الدخول بخطوتين برقم هاتفك',
        description: 'تأكد من استقبال كود SMS على رقمك 7××××××12 عند كل تسجيل جديد.',
      }
    ]
  },

  x: {
    id: 'x',
    nameAr: 'منصة إكس (تويتر سابقاً)',
    nameEn: 'X (formerly Twitter)',
    tagline: 'نموذج help.x.com للحسابات المخترقة واسترداد الوصول عبر الإيميل الأصلي',
    colorClass: 'text-slate-900',
    badgeColor: 'bg-slate-200 text-slate-900 border-slate-300',
    activeTabClass: 'bg-black text-white shadow-sm',
    iconName: 'x',
    targetAccountHint: 'الحساب المربوط بـ a***********@gmail.com أو الهاتف 7××××××12',
    primaryHackedTitle: 'المخترق غير البريد الإلكتروني أو طلب كود مفتاح الأمان 2FA في إكس',
    primaryHackedExplanation: 'توفر منصة إكس نموذجاً رسمياً مخصصاً لاستعادة الحسابات المخترقة (Compromised Account Form)، حيث يتم التحقق من مطابقة البريد الإلكتروني الذي تم إنشاء الحساب به أول مرة.',
    officialRecoveryUrl: 'https://help.x.com/forms/signin',
    bypassGoldenTrick: {
      title: 'الحل الذهبي لاختراق منصة إكس:',
      description: 'ارفع بلاغ الحساب المخترق الرسمي وسيقوم نظام إكس بإرسال رابط الاسترداد لبريدك الأصلي.',
      buttonLabel: 'فتح نموذج مساعدة منصة إكس',
      steps: [
        {
          stepTitle: 'افتح صفحة مساعدة تسجيل الدخول في إكس',
          stepDesc: 'انتقل إلى: help.x.com/forms/signin.',
          highlight: 'help.x.com/forms/signin'
        },
        {
          stepTitle: 'اختر: "أعتقد أن حسابي قد تم اختراقه"',
          stepDesc: 'اختر خيار: "I think my account is compromised / hacked".',
          highlight: 'حسابي تم اختراقه'
        },
        {
          stepTitle: 'أدخل اسم المستخدم والبريد a***********@gmail.com',
          stepDesc: 'اكتب بريدك الأصلي الذي سجلت به الحساب ورقم هاتفك 7××××××12.',
          highlight: 'البريد الأصلي'
        },
        {
          stepTitle: 'الرد على الإيميل الآلي من منصة إكس',
          stepDesc: 'ستتلقى رسالة من support@x.com في بريدك، قم بالرد عليها مؤكداً أنك صاحب الحساب وستتم إعادة تعيين كلمة المرور.',
          highlight: 'الرد على رسالة الدعم'
        }
      ]
    },
    troubleshootIssues: [
      {
        id: 'x_email_changed',
        title: 'المخترق غيّر الإيميل في إكس وأصبح لا يقبل الإيميل القديم',
        badge: 'تغيير الإيميل',
        severity: 'critical',
        description: 'عند محاولة نسيان كلمة المرور يظهر أنه لم يتم العثور على بريدك.',
        whyHappens: 'تغيير البريد الإلكتروني في إعدادات الحساب.',
        solutionSteps: [
          'افتح بريدك المسجل وابحث عن رسالة من verify@x.com بعنوان "Notice of email change".',
          'اضغط على الرابط الموجود في الرسالة لإلغاء هذا التغيير وإعادة البريد القديم فوراً.',
          'إذا لم تجد الرسالة، افتح نموذج الحساب المخترق على help.x.com/forms/signin وضع اسم المستخدم وبريدك الأصلي.'
        ],
        tips: [
          'الرد على رسائل دعم إكس يجب أن يكون دائماً من نفس البريد الأصلي.'
        ],
        screenName: 'صفحة دعم منصة إكس'
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'الانتقال إلى نموذج الحسابات المخترقة في منصة إكس',
        summary: 'help.x.com/forms/signin',
        details: [
          'افتح رابط نموذج الحسابات المخترقة الرسمي.',
          'اختر: "I need to regain access to my X account" ثم "I think my account was hacked".'
        ],
        actionButton: {
          label: 'فتح نموذج اختراق منصة إكس',
          url: 'https://help.x.com/forms/signin',
          isExternal: true
        }
      },
      {
        stepNumber: 2,
        title: 'كتابة اسم المستخدم والبريد الإلكتروني الأصلي',
        summary: 'تحديد ملكية الحساب',
        details: [
          'اكتب اسم المستخدم لحسابك في إكس (@username).',
          'اكتب البريد الإلكتروني الأصلي (Gmail / Hotmail).'
        ]
      },
      {
        stepNumber: 3,
        title: 'الرد على رسالة التأكيد وتغيير كلمة المرور',
        summary: 'إنهاء الاسترداد',
        details: [
          'افحص بريدك الإلكتروني وقم بالرد على التذكرة لتأكيد هويتك.',
          'سيتم إرسال رابط مباشر لتعيين كلمة مرور جديدة وطرد المخترق.'
        ]
      }
    ],
    officialLinks: [
      {
        title: 'نموذج الإبلاغ عن حساب إكس مخترق الرسمي',
        desc: 'البوابة المعتمدة لتقديم تذاكر الدعم لاستعادة الحسابات المخترقة.',
        url: 'https://help.x.com/forms/signin',
        badge: 'نموذج الدعم الرسمي',
        isPrimary: true
      },
      {
        title: 'دليل منصة إكس الرسمي لحماية واستعادة الحساب المخترق',
        desc: 'تعليمات الأمان وخطوات استرجاع الحسابات المسروقة خطوة بخطوة.',
        url: 'https://help.x.com/safety-and-security/x-account-compromised',
        badge: 'دليل الأمان'
      }
    ],
    postSecurityChecklist: [
      {
        id: 'x_apps',
        title: 'إلغاء صلاحيات التطبيقات المشبوهة المرتبطة بحسابك',
        description: 'الإعدادات والخصوصية > الأمان والوصول إلى الحساب > التطبيقات والجلسات، احذف أي تطبيق غير معروف.',
        link: 'https://x.com/settings/connected_apps'
      },
      {
        id: 'x_sessions',
        title: 'تسجيل الخروج من الجلسات الأخرى النشطة',
        description: 'إنهاء كل الجلسات المفتوحة على هواتف أو حواسيب المخترق.',
        link: 'https://x.com/settings/sessions'
      }
    ]
  }
};
