import React, { useState, useEffect } from 'react';
import { PlatformConfig } from '../types';
import { HelpCircle, CheckCircle2, Monitor, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface InteractiveTroubleshooterProps {
  currentPlatform: PlatformConfig;
}

export const InteractiveTroubleshooter: React.FC<InteractiveTroubleshooterProps> = ({ currentPlatform }) => {
  const { language, t } = useLanguage();
  const issues = currentPlatform.troubleshootIssues;
  const [selectedIssueId, setSelectedIssueId] = useState<string>(issues[0]?.id || '');

  const platformName = language === 'en' && currentPlatform.nameEn ? currentPlatform.nameEn : currentPlatform.nameAr;

  // Reset tab when platform changes
  useEffect(() => {
    if (issues.length > 0) {
      setSelectedIssueId(issues[0].id);
    }
  }, [currentPlatform.id]);

  const currentIssue = issues.find((i) => i.id === selectedIssueId) || issues[0];

  if (!currentIssue) return null;

  return (
    <section id="troubleshooter-section" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            {language === 'ar' ? `أداة تشخيص العقبات أثناء استرجاع ${currentPlatform.nameAr}` : `Hacker Obstacle Diagnostics for ${platformName}`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'ar' ? 'حدد العائق أو الشاشة التي توقفت عندها للحصول على الحل الدقيق فوراً' : 'Select the obstacle or hurdle screen you encountered to view exact step-by-step resolution'}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
        {issues.map((issue) => {
          const isSelected = issue.id === selectedIssueId;
          return (
            <button
              key={issue.id}
              onClick={() => setSelectedIssueId(issue.id)}
              className={`p-3.5 rounded-xl transition border flex flex-col justify-between gap-2 cursor-pointer ltr:text-left rtl:text-right ${
                isSelected
                  ? 'bg-blue-50/90 border-blue-500 text-blue-950 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              id={`tab-troubleshoot-${issue.id}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    issue.severity === 'critical'
                      ? 'bg-red-100 text-red-700'
                      : issue.severity === 'high'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {issue.badge}
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>}
              </div>
              <div className="text-xs font-bold leading-snug line-clamp-2">
                {issue.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Panel */}
      <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              {currentIssue.title}
            </h4>
            <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
              <Monitor className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'ar' ? `مرحلة الظهور: ${currentIssue.screenName}` : `Stage: ${currentIssue.screenName}`}</span>
            </div>
          </div>
        </div>

        {/* Description & Cause */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">{language === 'ar' ? 'وصف العائق:' : 'Obstacle Description:'}</span>
            <p className="text-slate-600 leading-relaxed">{currentIssue.description}</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">{language === 'ar' ? 'السبب التقني:' : 'Technical Cause:'}</span>
            <p className="text-slate-600 leading-relaxed">{currentIssue.whyHappens}</p>
          </div>
        </div>

        {/* Solution Steps */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ar' ? 'خطوات الحل الموصى بها:' : 'Recommended Resolution Steps:'}</span>
          </h5>
          <div className="space-y-2">
            {currentIssue.solutionSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed"
              >
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        {currentIssue.tips.length > 0 && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>{language === 'ar' ? 'نصائح ذهبية لزيادة فرصة النجاح:' : 'Pro Security Advice:'}</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {currentIssue.tips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
