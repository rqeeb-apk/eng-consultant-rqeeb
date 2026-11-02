import React, { useState } from 'react';
import { CheckCircle2, XCircle, Sparkles, ExternalLink } from 'lucide-react';
import { PlatformConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ReadinessAssessmentProps {
  currentPlatform: PlatformConfig;
}

export const ReadinessAssessment: React.FC<ReadinessAssessmentProps> = ({ currentPlatform }) => {
  const { language, t } = useLanguage();
  const [hasPhone, setHasPhone] = useState<boolean | null>(true);
  const [hasOldDevice, setHasOldDevice] = useState<boolean | null>(true);
  const [hasOldPassword, setHasOldPassword] = useState<boolean | null>(true);
  const [hasUsualWifi, setHasUsualWifi] = useState<boolean | null>(true);

  const platformName = language === 'en' && currentPlatform.nameEn ? currentPlatform.nameEn : currentPlatform.nameAr;

  // Calculate score
  let score = 0;
  if (hasPhone) score += 40;
  if (hasOldDevice) score += 30;
  if (hasOldPassword) score += 15;
  if (hasUsualWifi) score += 15;

  const getStatusText = (score: number) => {
    if (score >= 70) {
      return {
        title: language === 'ar' ? 'فرصة نجاح مرتفعة جداً (فوق 85%)' : 'Very High Success Rate (>85%)',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
      };
    }
    if (score >= 40) {
      return {
        title: language === 'ar' ? 'فرصة نجاح متوسطة (ممكنة عبر التحقق اليدوي أو الهوية)' : 'Moderate Success Rate (Possible via ID verification)',
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200'
      };
    }
    return {
      title: language === 'ar' ? 'فرصة ضعيفة (تحتاج إلى جهازك القديم لتأكيد الهوية)' : 'Low Success Rate (Requires original device)',
      color: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200'
    };
  };

  const status = getStatusText(score);

  return (
    <section id="readiness-assessment-section" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm mb-8">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {language === 'ar' ? `مقياس جاهزية الاسترداد لحساب ${currentPlatform.nameAr}` : `Recovery Readiness Assessment for ${platformName}`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'ar' ? 'أجب عن هذه الأسئلة البسيطة لتقييم فرصتك ومعرفة أفضل طريقة قبل فتح رابط الاسترداد' : 'Answer these quick questions to estimate your probability of successful recovery'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Question 1: Phone */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-800">
            {language === 'ar' ? '1. هل شريحة الهاتف الأصلية (مثل 7××××××12) معك حالياً وتستقبل رسائل ومكالمات؟' : '1. Do you currently possess the original SIM card to receive SMS or calls?'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setHasPhone(true)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                hasPhone === true
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'نعم، الرقم معي' : 'Yes, I have it'}</span>
            </button>
            <button
              onClick={() => setHasPhone(false)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                hasPhone === false
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'لا، الرقم ليس معي' : 'No, I don\'t'}</span>
            </button>
          </div>
        </div>

        {/* Question 2: Old Device */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-800">
            {language === 'ar' ? '2. هل تقوم بالمحاولة من هاتفك أو جهازك الذي اعتدت فتح التطبيق منه؟' : '2. Are you attempting recovery from your usual device or phone?'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setHasOldDevice(true)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                hasOldDevice === true
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'نعم، نفس جهازي' : 'Yes, usual device'}</span>
            </button>
            <button
              onClick={() => setHasOldDevice(false)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                hasOldDevice === false
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'جهاز جديد / آخر' : 'New / Other device'}</span>
            </button>
          </div>
        </div>

        {/* Question 3: Old Password */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-800">
            {language === 'ar' ? '3. هل تتذكر أي كلمة مرور قديمة استخدمتها مع هذا الحساب؟' : '3. Do you remember any previously used password?'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setHasOldPassword(true)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                hasOldPassword === true
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'أتذكر كلمة سابقة' : 'Yes, remember old'}</span>
            </button>
            <button
              onClick={() => setHasOldPassword(false)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                hasOldPassword === false
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'لا أتذكر أي كلمة' : 'No, forgot all'}</span>
            </button>
          </div>
        </div>

        {/* Question 4: Usual Wi-Fi */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-800">
            {language === 'ar' ? '4. هل أنت متصل بنفس شبكة الإنترنت (الواي فاي) المعتادة في البيت أو العمل؟' : '4. Are you connected to your usual Wi-Fi network?'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setHasUsualWifi(true)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                hasUsualWifi === true
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'نعم، شبكتي المعتادة' : 'Yes, usual Wi-Fi'}</span>
            </button>
            <button
              onClick={() => setHasUsualWifi(false)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                hasUsualWifi === false
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'شبكة جديدة أو بيانات عامة' : 'New network'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className={`p-4 sm:p-5 rounded-xl border ${status.border} ${status.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">{language === 'ar' ? 'نسبة نجاح الاسترجاع المقدرة:' : 'Estimated Recovery Probability:'}</span>
            <span className={`text-base sm:text-lg font-bold ${status.color}`}>
              %{score} — {status.title}
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            {score >= 70
              ? (language === 'ar' ? `بما أن رقم هاتفك أو جهازك القديم متوفران، يمكنك استرداد حساب ${currentPlatform.nameAr} بنجاح باتباع طريقة التجاوز الرسمية.` : `Since your device or SIM is available, you have a strong chance of recovering ${platformName}.`)
              : (language === 'ar' ? 'يوصى بالانتقال إلى نفس الجهاز والشبكة التي كنت تستخدمها لرفع نسبة النجاح قبل التقدم بطلب الاسترداد.' : 'We recommend attempting recovery from your original phone and Wi-Fi network to increase success odds.')}
          </p>
        </div>

        <a
          href={currentPlatform.officialRecoveryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition shrink-0 shadow-xs cursor-pointer"
        >
          <span>{language === 'ar' ? `ابدأ استرجاع ${currentPlatform.nameAr}` : `Start ${platformName} Recovery`}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
