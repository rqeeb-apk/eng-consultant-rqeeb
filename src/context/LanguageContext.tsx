import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

export interface LanguageContextType {
  language: Language;
  dir: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Brand & Navbar
    appTitle: 'المهندس الاستشاري رقيب',
    appSubTitle: 'استرجاع الحسابات',
    appDesc: 'بوابات الطوارئ والاستشارات التقنية',
    ownerTapToast: 'بقي {n} نقرات للوصول للوحة المالك',
    ownerOpenedToast: 'تم فتح لوحة التحكم المخصصة للمالك!',
    notifications: 'التنبيهات',
    notificationsTitle: 'التنبيهات الأمنية والتحديثات',
    installApp: 'تثبيت التطبيق',
    installAppMobile: 'تثبيت',
    installTitle: 'تثبيت المنصة في الجوال',
    telegramBot: 'بوت التيليجرام',
    whatsappContact: 'محادثة المهندس',
    whatsappMobile: 'واتساب',
    whatsappTitle: 'تواصل مع المهندس رقيب',
    platformPortal: 'بوابة',
    logoTooltip: 'انقر 20 مرة للوصول للوحة المالك',
    langName: 'English',
    langToggleTitle: 'التحويل إلى اللغة الإنجليزية (Switch to English)',

    // Activation Screen
    activationTitle: 'تفعيل حساب المشترك',
    activationSubtitle: 'هذه المنصة مخصصة وحصرية للمشتركين فقط من قبل المهندس الاستشاري رقيب',
    activationInputLabel: 'أدخل كود تفعيل الاشتراك الخاص بك:',
    activationInputPlaceholder: 'أدخل كود التفعيل المخصص لك...',
    identityInputLabel: 'رقم هاتفك أو بريدك الإلكتروني (لربط تفعيلك):',
    identityInputPlaceholder: 'أدخل رقم الهاتف أو البريد الإلكتروني...',
    activateBtn: 'تفعيل حسابك الآن',
    invalidCodeError: 'كود التفعيل غير صحيح أو مستخدم مسبقاً! يرجى التواصل مع المالك للحصول على كود جديد.',
    missingIdentityError: 'يرجى كتابة رقم هاتفك أو بريدك الإلكتروني لربط التفعيل.',
    activationSuccess: 'تم تفعيل حسابك بنجاح! مرحباً بك في المنصة.',
    contactOwnerForCode: 'تواصل مع المالك للحصول على كود تفعيل',
    ownerPanelLoginLink: 'تسجيل دخول المالك / الأدمن',
    lockedMessage: 'محتوى المنصة مقفل. يلزم تفعيل كود الاشتراك للوصول إلى أدوات وطرق استرجاع الحسابات.',
    activeCodesInfo: 'أكواد التفعيل المعتمدة تشمل جميع المنصات السبع (Gmail, Facebook, WhatsApp, Instagram, TikTok, Snapchat, X)',

    // Active User Session Banner
    sessionActivated: 'حسابك مفعّل بنجاح:',
    sessionCode: 'كود الاشتراك:',
    sessionDate: 'تاريخ التفعيل:',
    logoutActivation: 'تسجيل الخروج من التفعيل',

    // Target Banner
    targetBannerBadge: 'منصة استرجاع الحسابات الرسمية والاستشارات الأمنية',
    targetBannerPhone: 'رقم التواصل المباشر مع المالك:',
    targetBannerEmail: 'البريد الإلكتروني المعتمد:',
    targetBannerWebsites: 'المواقع الرسمية:',
    targetBannerTelegram: 'بوت التلجرام:',

    // Platform Tabs & Guide Modal
    selectPlatform: 'اختر المنصة المخترقة لاستعراض الدليل الشامل والطرق الرسمية:',
    interactiveGuideBtn: 'دليل الخطوات التفاعلي لـ',
    interactiveGuideSubtitle: 'انقر هنا لإظهار النافذة المنبثقة الإرشادية بجميع الخطوات والأدوات',
    guideModalTitle: 'دليل الخطوات التفاعلي واستجابة الطوارئ لـ',
    closeModal: 'إغلاق النافذة',
    quickJump: 'انتقال سريع للأقسام:',
    secSolution: '1. إجابة مشكلتك المباشرة',
    secReadiness: '2. مقياس جاهزية الاسترداد',
    secTroubleshooter: '3. أداة تشخيص العقبات',
    secRoadmap: '4. خارطة الطريق الرسمية',
    secEmergency: '5. دليل الطوارئ الشامل',
    secPostSecurity: '6. قائمة التحصين وطرد المخترق',
    secOfficialLinks: '7. الروابط الرسمية المعتمدة',

    // Sections
    criticalSolutionTitle: 'إجابة مشكلتك المباشرة وحل عقبات الاختراق',
    readinessTitle: 'مقياس جاهزية الاسترداد وحساب نسبة النجاح المتوقعة',
    troubleshooterTitle: 'أداة تشخيص العقبات والتعامل مع أساليب المخترق',
    stepGuideTitle: 'خارطة الطريق الرسمية لاسترداد حساب',
    stepByStepSub: 'خطوة بخطوة حتى طرد المخترق وتغيير كلمة السر',
    allPlatformsTitle: 'دليل الطوارئ الشامل لجميع المنصات الـ 7',
    postSecurityTitle: 'قائمة التحصين وطرد المخترق بعد استرجاع الحساب',
    officialLinksTitle: 'الروابط الرسمية المعتمدة لاسترجاع الحساب',
    scamWarningTitle: 'تحذير أمني هام من النصب والاحتيال',

    // Footer
    footerRights: 'جميع الحقوق محفوظة للمهندس الاستشاري رقيب',
    footerDev: 'تطوير وبناء منصة استرجاع الحسابات والاستشارات الأمنية',
  },

  en: {
    // Brand & Navbar
    appTitle: 'Consultant Engineer Rqeeb',
    appSubTitle: 'Account Recovery',
    appDesc: 'Emergency Portals & Technical Consulting',
    ownerTapToast: '{n} taps left for Owner Panel...',
    ownerOpenedToast: 'Owner Control Panel Unlocked!',
    notifications: 'Alerts',
    notificationsTitle: 'Security Alerts & Updates',
    installApp: 'Install App',
    installAppMobile: 'Install',
    installTitle: 'Install Platform on Mobile',
    telegramBot: 'Telegram Bot',
    whatsappContact: 'Contact Engineer',
    whatsappMobile: 'WhatsApp',
    whatsappTitle: 'Contact Engineer Rqeeb',
    platformPortal: 'Portal',
    logoTooltip: 'Tap 20 times to access Owner Panel',
    langName: 'العربية',
    langToggleTitle: 'التحويل إلى اللغة العربية (Switch to Arabic)',

    // Activation Screen
    activationTitle: 'Subscriber Account Activation',
    activationSubtitle: 'This platform is exclusively dedicated for subscribers by Consultant Engineer Rqeeb',
    activationInputLabel: 'Enter your subscription activation code:',
    activationInputPlaceholder: 'Enter your activation code...',
    identityInputLabel: 'Your Phone Number or Email (to link your activation):',
    identityInputPlaceholder: 'Enter phone number or email...',
    activateBtn: 'Activate Account Now',
    invalidCodeError: 'Invalid activation code or already used! Please contact the owner to get a new code.',
    missingIdentityError: 'Please enter your phone number or email to link your activation.',
    activationSuccess: 'Account activated successfully! Welcome to the platform.',
    contactOwnerForCode: 'Contact Owner for Activation Code',
    ownerPanelLoginLink: 'Owner / Admin Login',
    lockedMessage: 'Platform content is locked. Subscription activation code is required to access tools and recovery guides.',
    activeCodesInfo: 'Authorized activation codes cover all 7 supported platforms (Gmail, Facebook, WhatsApp, Instagram, TikTok, Snapchat, X)',

    // Active User Session Banner
    sessionActivated: 'Account successfully activated:',
    sessionCode: 'Subscription Code:',
    sessionDate: 'Activation Date:',
    logoutActivation: 'Log Out of Activation',

    // Target Banner
    targetBannerBadge: 'Official Account Recovery & Security Consulting Platform',
    targetBannerPhone: 'Direct Phone Contact with Owner:',
    targetBannerEmail: 'Authorized Email:',
    targetBannerWebsites: 'Official Websites:',
    targetBannerTelegram: 'Telegram Bot:',

    // Platform Tabs & Guide Modal
    selectPlatform: 'Select the compromised platform to explore the full guide and official methods:',
    interactiveGuideBtn: 'Interactive Step-by-Step Guide for',
    interactiveGuideSubtitle: 'Click here to show the interactive guided popup with all steps & tools',
    guideModalTitle: 'Interactive Step-by-Step Guide & Emergency Response for',
    closeModal: 'Close Window',
    quickJump: 'Quick Section Jump:',
    secSolution: '1. Direct Solution to Your Problem',
    secReadiness: '2. Recovery Readiness Gauge',
    secTroubleshooter: '3. Hacker Obstacle Diagnostics',
    secRoadmap: '4. Official Step-by-Step Roadmap',
    secEmergency: '5. Emergency All-Platforms Matrix',
    secPostSecurity: '6. Post-Recovery Security Checklist',
    secOfficialLinks: '7. Official Authorized Links',

    // Sections
    criticalSolutionTitle: 'Direct Solution to Your Problem & Hacker Bypass',
    readinessTitle: 'Recovery Readiness Gauge & Success Probability',
    troubleshooterTitle: 'Hacker Obstacle Diagnostics & Countermeasures',
    stepGuideTitle: 'Official Step-by-Step Recovery Roadmap for',
    stepByStepSub: 'Step-by-step instructions to evict hackers and secure credentials',
    allPlatformsTitle: 'Comprehensive Emergency Matrix for All 7 Platforms',
    postSecurityTitle: 'Post-Recovery Security & Eviction Checklist',
    officialLinksTitle: 'Official Authorized Recovery Links',
    scamWarningTitle: 'Important Security Advisory on Scams & Fraud',

    // Footer
    footerRights: 'All Rights Reserved - Consultant Engineer Rqeeb',
    footerDev: 'Account Recovery & Security Consulting Platform',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('rqeeb_app_lang');
    return (saved === 'en' || saved === 'ar') ? saved : 'ar';
  });

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('rqeeb_app_lang', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    let str = translations[language]?.[key] || translations['ar']?.[key] || key;
    if (replacements) {
      Object.entries(replacements).forEach(([k, val]) => {
        str = str.replace(`{${k}}`, String(val));
      });
    }
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
