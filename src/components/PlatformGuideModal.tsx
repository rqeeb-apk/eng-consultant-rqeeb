import React from 'react';
import { 
  PlatformConfig 
} from '../types';
import { 
  KeyRound, 
  BarChart3, 
  Wrench, 
  MapPin, 
  ShieldAlert, 
  ShieldCheck, 
  ExternalLink, 
  X, 
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { AppLogo } from './AppLogo';
import { useLanguage } from '../context/LanguageContext';

interface PlatformGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: PlatformConfig;
}

export const PlatformGuideModal: React.FC<PlatformGuideModalProps> = ({
  isOpen,
  onClose,
  platform,
}) => {
  const { language, dir, t } = useLanguage();
  if (!isOpen) return null;

  const platformName = language === 'en' && platform.nameEn ? platform.nameEn : platform.nameAr;

  const scrollToSection = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const stepsList = [
    {
      id: 'hacked-solution-section',
      icon: KeyRound,
      color: 'bg-red-500/10 text-red-600 border-red-200',
      badge: language === 'ar' ? 'الخطوة الفورية' : 'Immediate Step',
      title: language === 'ar' ? `إجابة مشكلتك المباشرة لـ ${platform.nameAr}` : `Direct Problem Solution for ${platformName}`,
      desc: language === 'ar'
        ? `حل قفل المخترق، تجاوز كود التوثيق 2FA، مفاتيح الأمان Passkey، كود الـ PIN، أو تغيير بريد الاسترداد في ${platform.nameAr}.`
        : `Bypass hacker locks, 2FA codes, Passkeys, PIN codes, or email changes for ${platformName}.`,
      actionLabel: language === 'ar' ? 'الانتقال إلى الحل المباشر' : 'Go to Direct Solution',
    },
    {
      id: 'readiness-assessment-section',
      icon: BarChart3,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200',
      badge: language === 'ar' ? 'التقييم الأولي' : 'Initial Assessment',
      title: language === 'ar' ? `مقياس جاهزية الاسترداد لحساب ${platform.nameAr}` : `Recovery Readiness Gauge for ${platformName}`,
      desc: language === 'ar'
        ? `اختبار ذكي لحساب نسبة احتمالية نجاح استرجاع حساب ${platform.nameAr} بناءً على المعلومات والبيانات المتوفرة لديك.`
        : `Interactive assessment to compute your estimated recovery success rate for ${platformName}.`,
      actionLabel: language === 'ar' ? 'حساب نسبة الجاهزية' : 'Calculate Readiness',
    },
    {
      id: 'troubleshooter-section',
      icon: Wrench,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200',
      badge: language === 'ar' ? 'تشخيص الأعطال' : 'Diagnostics',
      title: language === 'ar' ? `أداة تشخيص العقبات أثناء استرجاع ${platform.nameAr}` : `Hacker Obstacle Diagnostics for ${platformName}`,
      desc: language === 'ar'
        ? `حل العقبات التقنية مثل عدم وصول رسالة الرمز، اختراق بريد الاسترداد، أو تغيير رقم الهاتف المرتبط.`
        : `Solve technical hurdles such as delayed SMS codes, hijacked email, or changed phone numbers.`,
      actionLabel: language === 'ar' ? 'فتح أداة التشخيص' : 'Open Diagnostics',
    },
    {
      id: 'step-roadmap-section',
      icon: MapPin,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
      badge: language === 'ar' ? 'الخارطة الرسمية' : 'Official Roadmap',
      title: language === 'ar' ? `خارطة الطريق الرسمية لاسترداد حساب ${platform.nameAr} خطوة بخطوة` : `Official Step-by-Step Roadmap for ${platformName}`,
      desc: language === 'ar'
        ? `خطوات تطبيقية مرتبة بالتفصيل وموثقة بالروابط الرسمية المعتمدة لاستعادة الحساب بأمان.`
        : `Detailed sequential steps grounded in official support channels to recover your account safely.`,
      actionLabel: language === 'ar' ? 'استعراض خارطة الطريق' : 'View Roadmap',
    },
    {
      id: 'emergency-matrix-section',
      icon: ShieldAlert,
      color: 'bg-purple-500/10 text-purple-600 border-purple-200',
      badge: language === 'ar' ? 'دليل شامل' : 'Comprehensive Matrix',
      title: language === 'ar' ? `دليل الطوارئ الشامل لجميع المنصات الـ 7` : `Emergency Matrix for All 7 Platforms`,
      desc: language === 'ar'
        ? `مصفوفة استرجاع سريعة تغطي (جوجل، فيسبوك، إنستغرام، واتساب، تيك توك، سناب شات، X).`
        : `Quick recovery matrix covering Google, Facebook, Instagram, WhatsApp, TikTok, Snapchat, and X.`,
      actionLabel: language === 'ar' ? 'عرض دليل المنصات الـ 7' : 'View All 7 Platforms',
    },
    {
      id: 'post-recovery-section',
      icon: ShieldCheck,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
      badge: language === 'ar' ? 'الأمان والحماية' : 'Security & Eviction',
      title: language === 'ar' ? `قائمة التحصين وطرد المخترق بعد استرجاع ${platform.nameAr}` : `Eviction & Post-Recovery Checklist for ${platformName}`,
      desc: language === 'ar'
        ? `خطوات حاسمة لإلغاء جميع الجلسات المفتوحة وطرد المخترق نهائياً لمنع أي محاولة اختراق مستقبلاً.`
        : `Crucial steps to revoke active sessions, evict hackers, and secure your account long-term.`,
      actionLabel: language === 'ar' ? 'عرض خطوات التحصين' : 'View Eviction Checklist',
    },
    {
      id: 'official-links-section',
      icon: ExternalLink,
      color: 'bg-slate-500/10 text-slate-700 border-slate-200',
      badge: language === 'ar' ? 'روابط موثوقة' : 'Official Links',
      title: language === 'ar' ? `الروابط الرسمية المعتمدة لـ ${platform.nameAr}` : `Official Authorized Links for ${platformName}`,
      desc: language === 'ar'
        ? `بوابة الروابط المباشرة لفريد الدعم الفني، نماذج بلاغات الاختراق، واستعادة الملكية في ${platform.nameAr}.`
        : `Direct links to official support teams, compromise reporting forms, and ownership recovery.`,
      actionLabel: language === 'ar' ? 'عرض الروابط الرسمية' : 'View Official Links',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh] my-auto animate-in fade-in zoom-in duration-200">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white p-5 sm:p-6 shrink-0 relative overflow-hidden border-b border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <AppLogo size="md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold">
                    {language === 'ar' ? `تم التوجيه لـ ${platform.nameAr}` : `Targeted: ${platformName}`}
                  </span>
                  <span className="text-xs font-mono text-slate-400">({platform.nameEn})</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
                  {language === 'ar' ? `دليل وخطوات استرجاع حساب ${platform.nameAr}` : `${platformName} Recovery Guide & Roadmap`}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition cursor-pointer"
              title={t('closeModal')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed relative z-10">
            {language === 'ar'
              ? <>تم تخصيص وتجميع جميع الأدوات والروابط والحلول التطبيقية لاستعادة حسابك المفقود أو المخترق في <strong>{platform.nameAr}</strong> تحت إشراف المهندس الاستشاري رقيب.</>
              : <>All tools, links, and step-by-step solutions to recover your compromised <strong>{platformName}</strong> account have been prepared under the supervision of Consultant Engineer Rqeeb.</>}
          </p>
        </div>

        {/* Scrollable Steps Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-slate-50/60">
          
          {/* Guided Arrow Banner */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-3 rounded-2xl flex items-center justify-between shadow-md mb-2 border border-amber-400">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-slate-950 text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                ↓
              </span>
              <div>
                <span className="text-xs font-black block text-slate-950">
                  {language === 'ar' ? 'المرشد التوجيهي بالأسهم:' : 'Interactive Guided Pointer:'}
                </span>
                <span className="text-[11px] text-slate-900 font-medium block">
                  {language === 'ar' ? 'انقر على خيار للانتقال المباشر أو اتبع السهم للقسم التالي' : 'Click any option to jump directly or follow the arrows'}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-black bg-slate-950 text-amber-300 px-3 py-1 rounded-xl">
              {language === 'ar' ? '7 مراحل استرجاع' : '7 Stages'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-1">
            <span>{language === 'ar' ? `المراحل المخصصة لاسترجاع حساب ${platform.nameAr}:` : `Recovery stages for ${platformName}:`}</span>
            <span>{language === 'ar' ? '(انقر للانتقال مباشرة للقسم)' : '(Click to jump)'}</span>
          </div>

          {stepsList.map((step, sIdx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="bg-white border border-slate-200 hover:border-amber-400 rounded-2xl p-4 shadow-xs hover:shadow-md transition group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative overflow-hidden"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${step.color} relative`}>
                    <Icon className="w-5 h-5" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-950 text-amber-300 font-bold text-[10px] flex items-center justify-center border border-slate-700">
                      {sIdx + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                        {step.badge}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection(step.id)}
                  className="w-full sm:w-auto bg-slate-900 group-hover:bg-amber-600 text-white group-hover:text-slate-950 text-xs font-extrabold py-2.5 px-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
                >
                  <span>{step.actionLabel}</span>
                  {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <a
            href={platform.officialRecoveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{language === 'ar' ? `فتح البوابة الرسمية المباشرة لـ ${platform.nameAr}` : `Open Direct Official Portal for ${platformName}`}</span>
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-6 rounded-xl transition cursor-pointer"
          >
            {language === 'ar' ? 'متابعة واستعراض الصفحة' : 'Continue to Page'}
          </button>
        </div>

      </div>
    </div>
  );
};
