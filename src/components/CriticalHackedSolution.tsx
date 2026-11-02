import React, { useState } from 'react';
import { KeyRound, CheckCircle2, ExternalLink } from 'lucide-react';
import { PlatformConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface CriticalHackedSolutionProps {
  currentPlatform: PlatformConfig;
}

export const CriticalHackedSolution: React.FC<CriticalHackedSolutionProps> = ({ currentPlatform }) => {
  const { language, t } = useLanguage();
  const platformName = language === 'en' && currentPlatform.nameEn ? currentPlatform.nameEn : currentPlatform.nameAr;

  return (
    <div id="hacked-solution-section" className="bg-white border-2 border-red-500/80 rounded-2xl p-5 sm:p-7 shadow-md mb-8 relative overflow-hidden">
      {/* Accent strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
          <KeyRound className="w-6 h-6" />
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              {language === 'ar' ? `إجابة مشكلتك المباشرة لـ ${currentPlatform.nameAr}` : `Direct Problem Solution for ${platformName}`}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {language === 'ar' ? 'حل أقفال المخترق والمصادقة' : 'Hacker Lock & Auth Bypass'}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentPlatform.primaryHackedTitle}
          </h3>

          <p className="text-sm text-slate-700 leading-relaxed">
            {currentPlatform.primaryHackedExplanation}
          </p>
        </div>
      </div>

      {/* Main Solution Box */}
      <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
          <span>{currentPlatform.bypassGoldenTrick.title}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600">
          {currentPlatform.bypassGoldenTrick.description}
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentPlatform.bypassGoldenTrick.steps.map((st, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-bold text-blue-600 mb-1">
                  {language === 'ar' ? `المرحلة ${idx + 1}:` : `Stage ${idx + 1}:`}
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5">
                  {st.stepTitle}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.stepDesc}
                </p>
              </div>
              {st.highlight && (
                <div className="mt-2.5 pt-2 border-t border-slate-100">
                  <span className="inline-block bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded border border-blue-200">
                    {st.highlight}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Direct Action Link */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <div className="text-xs text-slate-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{language === 'ar' ? 'اتبع هذه الخطوات بالترتيب مباشرة داخل البوابة الرسمية' : 'Follow these sequential steps directly inside the official portal'}</span>
          </div>

          <a
            href={currentPlatform.officialRecoveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
            id={`btn-bypass-action-${currentPlatform.id}`}
          >
            <span>{currentPlatform.bypassGoldenTrick.buttonLabel}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
