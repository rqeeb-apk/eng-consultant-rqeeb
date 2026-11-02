import React from 'react';
import { PlatformConfig } from '../types';
import { ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StepByStepGuideProps {
  currentPlatform: PlatformConfig;
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ currentPlatform }) => {
  const { language, t } = useLanguage();
  const platformName = language === 'en' && currentPlatform.nameEn ? currentPlatform.nameEn : currentPlatform.nameAr;

  return (
    <section id="step-roadmap-section" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {language === 'ar' ? `خارطة الطريق الرسمية لاسترداد حساب ${currentPlatform.nameAr} خطوة بخطوة` : `Official Step-by-Step Recovery Roadmap for ${platformName}`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'ar' ? 'اتبع هذه المراحل بدقة لاستعادة السيطرة الكاملة على الحساب وطرد المخترق' : 'Follow these precise sequential stages to regain full account ownership'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {currentPlatform.steps.map((step) => (
          <div
            key={step.stepNumber}
            className="border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-slate-300 transition bg-slate-50/50"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {step.stepNumber}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {step.title}
                  </h4>
                  <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium border border-blue-100 self-start">
                    {step.summary}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>

                {step.warningNote && (
                  <div className="flex items-center gap-2 bg-amber-50 text-amber-900 text-xs p-2.5 rounded-lg border border-amber-200 mt-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{step.warningNote}</span>
                  </div>
                )}

                {step.actionButton && (
                  <div className="pt-2">
                    <a
                      href={step.actionButton.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition"
                      id={`btn-step-action-${step.stepNumber}`}
                    >
                      <span>{step.actionButton.label}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
