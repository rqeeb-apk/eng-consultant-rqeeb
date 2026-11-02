import React from 'react';
import { AlertOctagon, ShieldX, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ScamWarning: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-red-900 to-rose-950 text-white rounded-2xl p-5 sm:p-6 shadow-sm mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-800/80 border border-red-700 flex items-center justify-center shrink-0">
          <AlertOctagon className="w-7 h-7 text-red-300" />
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-red-500/30 text-red-200 border border-red-400/30 px-2.5 py-0.5 rounded-full font-bold">
              {language === 'ar' ? 'تحذير أمني عاجل وحاسم' : 'Critical Security Advisory'}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white">
            {language === 'ar' 
              ? 'احذر تماماً من المحتالين الذين يزعمون قدرتهم على استرجاع الحساب مقابل المال!'
              : 'Beware of online scammers claiming they can manually hack or recover accounts for money!'}
          </h3>

          <p className="text-xs sm:text-sm text-red-100/90 leading-relaxed">
            {language === 'ar' ? (
              <>
                الجهة الوحيدة في العالم القادرة تقنياً ورسمياً على إعادة حسابك هي <strong className="text-white underline">الشركات الأصلية نفسها (Google, Meta, WhatsApp, TikTok)</strong> عبر بوابات الاسترداد الآلية.
                أي شخص على تيليجرام أو إنستغرام أو واتساب يدعي أنه "هاكر أخلاقي" وسيعيد حسابك مقابل تحويلات مالية هو <strong className="text-yellow-300">محتال بنسبة 100%</strong> يريد سرقة أموالك.
              </>
            ) : (
              <>
                The only official entities that can restore your account ownership are the original platforms themselves via automated recovery portals. Any individual on Telegram, Instagram, or WhatsApp requesting prepaid cards or money transfers to "hack back" your account is a 100% fraudster.
              </>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
            <div className="flex items-center gap-2 bg-red-800/40 p-2.5 rounded-lg border border-red-700/50 text-red-100">
              <ShieldX className="w-4 h-4 text-red-300 shrink-0" />
              <span>{language === 'ar' ? 'لا تشارك رمز SMS أو 2FA مع أي شخص إطلاقاً' : 'Never share SMS codes or 2FA passwords with anyone'}</span>
            </div>
            <div className="flex items-center gap-2 bg-red-800/40 p-2.5 rounded-lg border border-red-700/50 text-red-100">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{language === 'ar' ? 'استخدم حصراً روابط الاسترداد الرسمية المعتمدة' : 'Use only official authorized recovery URLs'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
