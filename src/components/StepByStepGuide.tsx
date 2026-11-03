import React, { useState, useEffect } from 'react';
import { PlatformConfig } from '../types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  Sparkles,
  Gauge
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface StepByStepGuideProps {
  currentPlatform: PlatformConfig;
}

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ currentPlatform }) => {
  const { language } = useLanguage();
  const platformName = language === 'en' && currentPlatform.nameEn ? currentPlatform.nameEn : currentPlatform.nameAr;

  // Track if full guide reading sequence is active
  const [isPlayingFullSequence, setIsPlayingFullSequence] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);

  const {
    isSupported,
    isSpeaking,
    isPaused,
    activeItemIndex,
    rate,
    speak,
    stop,
    pause,
    resume,
    changeRate
  } = useTextToSpeech({
    language,
    onEnd: () => {
      // If we are playing full guide sequence, advance to next step
      if (isPlayingFullSequence) {
        setSequenceIndex((prevIdx) => {
          const nextIdx = prevIdx + 1;
          if (nextIdx < currentPlatform.steps.length) {
            return nextIdx;
          } else {
            // Sequence finished
            setIsPlayingFullSequence(false);
            return 0;
          }
        });
      }
    }
  });

  // Handle sequential reading when sequenceIndex changes
  useEffect(() => {
    if (isPlayingFullSequence && sequenceIndex < currentPlatform.steps.length) {
      const step = currentPlatform.steps[sequenceIndex];
      const textToRead = constructStepText(step, sequenceIndex + 1);
      speak(textToRead, sequenceIndex);
    }
  }, [sequenceIndex, isPlayingFullSequence, currentPlatform.steps, speak]);

  // Construct readable clean string for a step
  const constructStepText = (step: typeof currentPlatform.steps[0], stepNum: number) => {
    const stepLabel = language === 'ar' ? `الخطوة رقم ${stepNum}` : `Step number ${stepNum}`;
    const warningPrefix = language === 'ar' ? 'ملاحظة تحذيرية مهمة:' : 'Important warning note:';
    
    let text = `${stepLabel}: ${step.title}. ${step.summary}. `;
    if (step.details && step.details.length > 0) {
      const detailIntro = language === 'ar' ? 'التعليمات:' : 'Instructions:';
      text += `${detailIntro} ${step.details.join('. ')}. `;
    }
    if (step.warningNote) {
      text += `${warningPrefix} ${step.warningNote}.`;
    }
    return text;
  };

  // Toggle play/pause for full guide
  const handleToggleFullGuide = () => {
    if (isPlayingFullSequence) {
      if (isSpeaking) {
        pause();
      } else if (isPaused) {
        resume();
      } else {
        stopSequence();
      }
    } else {
      stop();
      setIsPlayingFullSequence(true);
      setSequenceIndex(0);
    }
  };

  // Stop sequence
  const stopSequence = () => {
    setIsPlayingFullSequence(false);
    setSequenceIndex(0);
    stop();
  };

  // Play a single specific step
  const handlePlaySingleStep = (stepIdx: number) => {
    if (isPlayingFullSequence) {
      setIsPlayingFullSequence(false);
    }

    if (activeItemIndex === stepIdx && isSpeaking) {
      pause();
    } else if (activeItemIndex === stepIdx && isPaused) {
      resume();
    } else {
      const step = currentPlatform.steps[stepIdx];
      const textToRead = constructStepText(step, stepIdx + 1);
      speak(textToRead, stepIdx);
    }
  };

  return (
    <section id="step-roadmap-section" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm mb-8">
      {/* Header with Title and Text-to-Speech Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'ar' ? `خارطة الطريق الرسمية لاسترداد حساب ${currentPlatform.nameAr} خطوة بخطوة` : `Official Step-by-Step Recovery Roadmap for ${platformName}`}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {language === 'ar' ? 'اتبع هذه المراحل بدقة لاستعادة السيطرة الكاملة على الحساب وطرد المخترق' : 'Follow these precise sequential stages to regain full account ownership'}
            </p>
          </div>
        </div>

        {/* Global Text-to-Speech Control Bar */}
        {isSupported && (
          <div className="bg-slate-900 text-white p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md shrink-0">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSpeaking ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                {isSpeaking ? (
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-3 bg-emerald-400 animate-pulse"></span>
                    <span className="w-0.5 h-2 bg-emerald-400 animate-ping"></span>
                    <span className="w-0.5 h-3.5 bg-emerald-400 animate-pulse"></span>
                  </div>
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </div>

              <div>
                <span className="text-xs font-bold block text-white">
                  {isPlayingFullSequence && isSpeaking
                    ? (language === 'ar' ? `جاري قراءة الخطوة (${sequenceIndex + 1}/${currentPlatform.steps.length})...` : `Reading Step (${sequenceIndex + 1}/${currentPlatform.steps.length})...`)
                    : isSpeaking
                    ? (language === 'ar' ? 'جاري القراءة الصوتية...' : 'Reading Aloud...')
                    : (language === 'ar' ? 'الدليل الصوتي الموجه' : 'Guided Audio Roadmap')}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {language === 'ar' ? 'للاستماع الهادئ وتقليل التوتر أثناء الاسترجاع' : 'Listen calmly during stressful account recovery'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              {/* Play / Pause Main Button */}
              <button
                onClick={handleToggleFullGuide}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer shadow-xs"
                id="btn-tts-play-full"
                title={language === 'ar' ? 'تشغيل أو إيقاف الدليل الصوتي الكامل' : 'Play / Pause Full Audio Guide'}
              >
                {isPlayingFullSequence && isSpeaking ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إيقاف مؤقت' : 'Pause'}</span>
                  </>
                ) : isPlayingFullSequence && isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'استئناف' : 'Resume'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'استماع للكل' : 'Listen All'}</span>
                  </>
                )}
              </button>

              {/* Stop Button */}
              {(isSpeaking || isPaused || isPlayingFullSequence) && (
                <button
                  onClick={stopSequence}
                  className="bg-slate-800 hover:bg-slate-700 text-red-400 p-1.5 rounded-xl border border-slate-700 transition cursor-pointer"
                  id="btn-tts-stop"
                  title={language === 'ar' ? 'إنهاء القراءة الصوتية' : 'Stop Audio'}
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                </button>
              )}

              {/* Speed Rate Control Selector */}
              <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl px-2 py-1 text-[11px] text-slate-300 font-mono">
                <Gauge className="w-3 h-3 text-amber-400 shrink-0" />
                {[0.8, 1, 1.2].map((sRate) => (
                  <button
                    key={sRate}
                    onClick={() => changeRate(sRate)}
                    className={`px-1.5 py-0.5 rounded transition ${
                      rate === sRate ? 'bg-emerald-500 text-slate-950 font-bold' : 'hover:text-white'
                    }`}
                  >
                    {sRate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Steps List with Individual TTS Player Buttons & Highlights */}
      <div className="space-y-4">
        {currentPlatform.steps.map((step, idx) => {
          const isThisStepActive = activeItemIndex === idx;
          const isThisStepSpeaking = isThisStepActive && isSpeaking;

          return (
            <div
              key={step.stepNumber}
              className={`border rounded-xl p-4 sm:p-5 transition relative overflow-hidden ${
                isThisStepActive
                  ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-400/30 shadow-md'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              {/* Active voice indicator bar */}
              {isThisStepActive && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse"></div>
              )}

              <div className="flex items-start gap-3.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition ${
                    isThisStepActive
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {step.stepNumber}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {step.title}
                      </h4>

                      {/* Per-Step TTS Audio Trigger */}
                      {isSupported && (
                        <button
                          onClick={() => handlePlaySingleStep(idx)}
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                            isThisStepSpeaking
                              ? 'bg-emerald-600 text-white border-emerald-500 animate-pulse shadow-2xs'
                              : isThisStepActive && isPaused
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                          }`}
                          title={language === 'ar' ? 'استماع لهذه الخطوة بالصوت' : 'Listen to this step'}
                          id={`btn-tts-step-${step.stepNumber}`}
                        >
                          {isThisStepSpeaking ? (
                            <>
                              <VolumeX className="w-3 h-3 text-white" />
                              <span>{language === 'ar' ? 'إيقاف' : 'Pause'}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-emerald-600" />
                              <span>{language === 'ar' ? 'استماع' : 'Listen'}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium border border-blue-100 self-start">
                      {step.summary}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                    {step.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
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
          );
        })}
      </div>
    </section>
  );
};
