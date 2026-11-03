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
  Gauge,
  Timer,
  Clock,
  RotateCcw,
  PlusCircle,
  HeartHandshake,
  CheckCircle2,
  Sparkles,
  Navigation,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  CornerDownRight,
  CornerDownLeft,
  Check,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

interface StepByStepGuideProps {
  currentPlatform: PlatformConfig;
}

// Default estimated recovery times in minutes per platform
const PLATFORM_ESTIMATED_MINUTES: Record<string, number> = {
  google: 15,
  facebook: 20,
  instagram: 15,
  whatsapp: 12,
  tiktok: 15,
  snapchat: 10,
  x: 18,
};

export const StepByStepGuide: React.FC<StepByStepGuideProps> = ({ currentPlatform }) => {
  const { language, dir } = useLanguage();
  const platformName = language === 'en' && currentPlatform.nameEn ? currentPlatform.nameEn : currentPlatform.nameAr;

  // --- Guided Step Pointer State ---
  const [guidedStepIdx, setGuidedStepIdx] = useState<number>(0);
  const totalSteps = currentPlatform.steps.length || 1;

  // Reset guided step on platform change
  useEffect(() => {
    setGuidedStepIdx(0);
  }, [currentPlatform.id]);

  // Navigate to step and smooth scroll
  const scrollToStep = (stepIdx: number) => {
    const validIdx = Math.max(0, Math.min(stepIdx, totalSteps - 1));
    setGuidedStepIdx(validIdx);

    const stepEl = document.getElementById(`step-card-${validIdx + 1}`);
    if (stepEl) {
      stepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNextGuidedStep = () => {
    if (guidedStepIdx < totalSteps - 1) {
      scrollToStep(guidedStepIdx + 1);
    }
  };

  const handlePrevGuidedStep = () => {
    if (guidedStepIdx > 0) {
      scrollToStep(guidedStepIdx - 1);
    }
  };

  // --- Visual Countdown Timer State ---
  const defaultPlatformMins = PLATFORM_ESTIMATED_MINUTES[currentPlatform.id] || 15;
  const [totalSeconds, setTotalSeconds] = useState<number>(defaultPlatformMins * 60);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(defaultPlatformMins * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeStepFocusIdx, setActiveStepFocusIdx] = useState<number | null>(null);

  // Update timer whenever platform changes
  useEffect(() => {
    const mins = PLATFORM_ESTIMATED_MINUTES[currentPlatform.id] || 15;
    setTotalSeconds(mins * 60);
    setTimeLeftSeconds(mins * 60);
    setIsTimerRunning(false);
    setActiveStepFocusIdx(null);
  }, [currentPlatform.id]);

  // Live countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeftSeconds]);

  // Timer controls
  const toggleTimer = () => {
    if (timeLeftSeconds <= 0) {
      resetTimer();
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning((prev) => !prev);
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    const mins = PLATFORM_ESTIMATED_MINUTES[currentPlatform.id] || 15;
    setTotalSeconds(mins * 60);
    setTimeLeftSeconds(mins * 60);
    setActiveStepFocusIdx(null);
  };

  const addExtraFiveMinutes = () => {
    setTotalSeconds((prev) => prev + 300);
    setTimeLeftSeconds((prev) => prev + 300);
  };

  const startStepTimer = (stepIdx: number) => {
    const stepMins = Math.max(2, Math.round(defaultPlatformMins / totalSteps));
    setTotalSeconds(stepMins * 60);
    setTimeLeftSeconds(stepMins * 60);
    setActiveStepFocusIdx(stepIdx);
    setIsTimerRunning(true);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Progress percentage
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round(((totalSeconds - timeLeftSeconds) / (totalSeconds || 1)) * 100))
  );

  // Anxiety Management Reassurance Messages based on timer progress
  const getAnxietyMessage = () => {
    if (timeLeftSeconds <= 0) {
      return language === 'ar'
        ? 'اكتمل الوقت التقديري! لا تقلق إذا احتجت وقتاً إضافياً، يمكنك التواصل مباشرة مع المهندس رقيب.'
        : 'Estimated time reached! Do not worry if you need extra time—reach out to Engineer Rqeeb.';
    }

    if (progressPercent < 30) {
      return language === 'ar'
        ? 'خد نفساً عميقاً والتزم بالهدوء. معظم الحسابات تُسترجع بنجاح عند اتباع الخطوات بتركيز دون استعجال.'
        : 'Take a deep breath and stay calm. Most accounts are successfully recovered when steps are followed patiently.';
    } else if (progressPercent < 60) {
      return language === 'ar'
        ? 'أنت تسير بخطى ثابتة وممتازة! ادخل البيانات بعناية وتجنب التخمين العشوائي.'
        : 'You are making steady progress! Enter details carefully and avoid random guessing.';
    } else if (progressPercent < 90) {
      return language === 'ar'
        ? 'قطعنا معظم مسافة الاسترجاع! تأكد من تجهيز الرموز الاحتياطية وإعادة تعيين كلمة السر.'
        : 'You are close to completion! Prepare backup codes and reset your password securely.';
    } else {
      return language === 'ar'
        ? 'المرحلة النهائية لطرد المخترق وتأمين الحساب بالكامل!'
        : 'Final stage to evict the hacker and fully secure your account!';
    }
  };

  // --- Text-To-Speech (TTS) State & Integration ---
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
      if (isPlayingFullSequence) {
        setSequenceIndex((prevIdx) => {
          const nextIdx = prevIdx + 1;
          if (nextIdx < currentPlatform.steps.length) {
            return nextIdx;
          } else {
            setIsPlayingFullSequence(false);
            return 0;
          }
        });
      }
    }
  });

  useEffect(() => {
    if (isPlayingFullSequence && sequenceIndex < currentPlatform.steps.length) {
      const step = currentPlatform.steps[sequenceIndex];
      const textToRead = constructStepText(step, sequenceIndex + 1);
      speak(textToRead, sequenceIndex);
    }
  }, [sequenceIndex, isPlayingFullSequence, currentPlatform.steps, speak]);

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

  const stopSequence = () => {
    setIsPlayingFullSequence(false);
    setSequenceIndex(0);
    stop();
  };

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

  // Calculate step estimated duration
  const getStepMins = (stepIdx: number) => {
    return Math.max(2, Math.round(defaultPlatformMins / totalSteps));
  };

  const activeStep = currentPlatform.steps[guidedStepIdx] || currentPlatform.steps[0];

  return (
    <section id="step-roadmap-section" className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-7 shadow-sm mb-8 space-y-6">
      {/* Header with Title and Overall Meta Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
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

        {/* Total Estimated Time Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold self-start md:self-auto">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'ar'
              ? `إجمالي الوقت المتوقع للاسترجاع: ~${defaultPlatformMins} دقيقة`
              : `Est. Total Recovery Window: ~${defaultPlatformMins} mins`}
          </span>
        </div>
      </div>

      {/* ---------------- INTERACTIVE GUIDED TUTORIAL POINTER (مرشد الخطوات التفاعلي بالسهم) ---------------- */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 p-4 sm:p-5 rounded-2xl border-2 border-amber-400 shadow-lg space-y-3 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="bg-slate-950 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {language === 'ar' ? 'المرشد التعليمي التفاعلي' : 'Interactive Guided Pointer'}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {language === 'ar' ? `الخطوة ${guidedStepIdx + 1} من ${totalSteps}` : `Step ${guidedStepIdx + 1} of ${totalSteps}`}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-950 mt-0.5">
                {activeStep.title}
              </h4>
            </div>
          </div>

          {/* Interactive Step Navigation Controls */}
          <div className="flex items-center gap-2 self-start lg:self-auto w-full lg:w-auto justify-between lg:justify-end">
            <button
              onClick={handlePrevGuidedStep}
              disabled={guidedStepIdx === 0}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                guidedStepIdx === 0
                  ? 'bg-amber-400/50 text-amber-900 cursor-not-allowed opacity-60'
                  : 'bg-slate-950 text-white hover:bg-slate-900 cursor-pointer shadow-md'
              }`}
              id="btn-guided-prev-step"
            >
              {dir === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{language === 'ar' ? 'الخطوة السابقة' : 'Previous Step'}</span>
            </button>

            <button
              onClick={handleNextGuidedStep}
              disabled={guidedStepIdx >= totalSteps - 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition ${
                guidedStepIdx >= totalSteps - 1
                  ? 'bg-amber-400/50 text-amber-900 cursor-not-allowed opacity-60'
                  : 'bg-slate-950 text-amber-300 hover:bg-slate-900 cursor-pointer shadow-lg animate-pulse'
              }`}
              id="btn-guided-next-step"
            >
              <span>{language === 'ar' ? 'الخطوة التالية' : 'Next Step'}</span>
              {dir === 'rtl' ? <ArrowLeft className="w-4 h-4 animate-bounce" /> : <ArrowRight className="w-4 h-4 animate-bounce" />}
            </button>
          </div>
        </div>

        {/* Step Progress Bar & Clickable Step Pills */}
        <div className="pt-1 border-t border-amber-400/60 flex flex-wrap items-center gap-1.5">
          {currentPlatform.steps.map((st, idx) => {
            const isCompleted = idx < guidedStepIdx;
            const isCurrent = idx === guidedStepIdx;

            return (
              <button
                key={st.stepNumber}
                onClick={() => scrollToStep(idx)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-950 text-amber-300 ring-2 ring-slate-950 shadow-md font-extrabold'
                    : isCompleted
                    ? 'bg-emerald-800 text-emerald-100 hover:bg-emerald-700'
                    : 'bg-amber-400/80 hover:bg-amber-300 text-slate-900'
                }`}
                title={st.title}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-amber-200/40 text-slate-950 flex items-center justify-center text-[10px] font-mono">
                    {st.stepNumber}
                  </span>
                )}
                <span className="hidden sm:inline max-w-[120px] truncate">{st.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------- VISUAL COUNTDOWN TIMER & ANXIETY MANAGER CARD ---------------- */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left / Top: Title & Anxiety Reassurance Indicator */}
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-3 py-1 rounded-full">
              <Timer className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
              <span>
                {activeStepFocusIdx !== null
                  ? (language === 'ar' ? `عداد الخطوة ${activeStepFocusIdx + 1}` : `Step ${activeStepFocusIdx + 1} Countdown`)
                  : (language === 'ar' ? 'عداد وقت الاسترجاع المباشر (إدارة التوتر)' : 'Live Recovery Countdown (Anxiety Control)')}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{language === 'ar' ? 'مؤشر الطمأنينة وإدارة وقت الاسترجاع' : 'Recovery Assurance & Timer Gauge'}</span>
            </h4>

            {/* Live Reassurance Message */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
              {getAnxietyMessage()}
            </p>
          </div>

          {/* Right / Bottom: Live Digit Display & Timer Controls */}
          <div className="flex flex-col items-center md:items-end gap-3 bg-slate-900/90 p-4 rounded-xl border border-slate-700/90 shrink-0 w-full md:w-auto">
            
            {/* Countdown Digital Display */}
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-wider text-emerald-400 drop-shadow-md" dir="ltr">
                {formatTime(timeLeftSeconds)}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                {language === 'ar' ? 'دقيقة : ثانية' : 'Min : Sec'}
              </span>
            </div>

            {/* Timer Control Buttons */}
            <div className="flex items-center gap-2 w-full justify-center md:justify-end">
              <button
                onClick={toggleTimer}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-md ${
                  isTimerRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
                id="btn-toggle-recovery-timer"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>{language === 'ar' ? 'إيقاف مؤقت' : 'Pause'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>
                      {timeLeftSeconds < totalSeconds
                        ? (language === 'ar' ? 'استئناف العداد' : 'Resume Timer')
                        : (language === 'ar' ? 'بدء العداد الحي' : 'Start Timer')}
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={addExtraFiveMinutes}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1"
                id="btn-add-timer-5m"
                title={language === 'ar' ? 'إضافة 5 دقائق إضافية للعداد' : 'Add +5 Minutes'}
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>+5m</span>
              </button>

              <button
                onClick={resetTimer}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-600 p-2 rounded-xl transition cursor-pointer"
                id="btn-reset-recovery-timer"
                title={language === 'ar' ? 'إعادة ضبط العداد' : 'Reset Timer'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Visual Animated Progress Bar */}
        <div className="space-y-1 relative z-10 pt-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
            <span>{language === 'ar' ? 'تقدم إنجاز الوقت' : 'Progress'}</span>
            <span className="font-mono text-emerald-400">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-1000 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* ---------------- GLOBAL TEXT-TO-SPEECH CONTROL BAR ---------------- */}
      {isSupported && (
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSpeaking ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
              {isSpeaking ? (
                <div className="flex items-end gap-0.5 h-3.5">
                  <span className="w-0.5 h-3.5 bg-emerald-400 animate-pulse"></span>
                  <span className="w-0.5 h-2 bg-emerald-400 animate-ping"></span>
                  <span className="w-0.5 h-4 bg-emerald-400 animate-pulse"></span>
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

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Play / Pause Main Button */}
            <button
              onClick={handleToggleFullGuide}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer shadow-xs"
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
                className="bg-slate-800 hover:bg-slate-700 text-red-400 p-2 rounded-xl border border-slate-700 transition cursor-pointer"
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

      {/* ---------------- STEPS LIST WITH DIRECTIONAL ARROWS & POINTERS ---------------- */}
      <div className="space-y-4">
        {currentPlatform.steps.map((step, idx) => {
          const isThisStepActive = activeItemIndex === idx;
          const isThisStepSpeaking = isThisStepActive && isSpeaking;
          const isStepTimerFocused = activeStepFocusIdx === idx && isTimerRunning;
          const isGuidedStep = guidedStepIdx === idx;
          const isCompletedStep = idx < guidedStepIdx;
          const stepMins = getStepMins(idx);

          return (
            <div
              key={step.stepNumber}
              id={`step-card-${step.stepNumber}`}
              className={`border rounded-2xl p-4 sm:p-5 transition-all duration-300 relative overflow-hidden ${
                isGuidedStep
                  ? 'border-2 border-amber-500 bg-amber-50/70 shadow-lg ring-4 ring-amber-400/20'
                  : isStepTimerFocused
                  ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-400/40 shadow-md'
                  : isThisStepActive
                  ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-400/30 shadow-md'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              {/* Active voice or timer indicator bar */}
              {(isThisStepActive || isStepTimerFocused || isGuidedStep) && (
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 animate-pulse ${
                    isGuidedStep
                      ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600'
                      : isStepTimerFocused
                      ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }`}
                ></div>
              )}

              {/* Bouncing Directional Arrow Pointer Banner for Active Guided Step */}
              {isGuidedStep && (
                <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-amber-300 font-bold text-xs p-3 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2 shadow-md border border-amber-500/50 mb-3 animate-pulse">
                  <div className="flex items-center gap-2">
                    <CornerDownRight className="w-5 h-5 text-amber-400 animate-bounce shrink-0" />
                    <span>
                      {language === 'ar'
                        ? '👇 هذا هو إرشادتك للخطوة الحالية! قم بقراءة التعليمات أدناه ثم انقر على "إكمال والتالي"'
                        : '👇 Current guided step! Read instructions below then click "Next Step"'}
                    </span>
                  </div>

                  {guidedStepIdx < totalSteps - 1 && (
                    <button
                      onClick={handleNextGuidedStep}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center justify-center gap-1 cursor-pointer transition shrink-0 shadow-sm"
                    >
                      <span>{language === 'ar' ? 'إكمال والتالي ➔' : 'Complete & Next Step ➔'}</span>
                    </button>
                  )}
                </div>
              )}

              <div className="flex items-start gap-3.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition ${
                    isGuidedStep
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-200 font-extrabold shadow-md'
                      : isStepTimerFocused
                      ? 'bg-amber-600 text-white ring-4 ring-amber-100'
                      : isThisStepActive
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : isCompletedStep
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {isCompletedStep ? <Check className="w-5 h-5 text-white" /> : step.stepNumber}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {step.title}
                      </h4>

                      {/* Active Guided Pointer Badge */}
                      {isGuidedStep && (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                          <Navigation className="w-3 h-3 fill-current text-slate-950 animate-pulse" />
                          <span>{language === 'ar' ? 'الخطوة المستهدفة الآن' : 'Active Target Step'}</span>
                        </span>
                      )}

                      {/* Per-Step Estimated Time Badge & Step Timer Trigger */}
                      <button
                        onClick={() => startStepTimer(idx)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg border bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800 border-slate-300 hover:border-amber-300 transition cursor-pointer"
                        title={language === 'ar' ? 'بدء عداد وقت محدد لهذه الخطوة' : 'Start countdown for this step'}
                      >
                        <Timer className="w-3 h-3 text-amber-600" />
                        <span>{language === 'ar' ? `مُستغرق: ~${stepMins} دقائق` : `Est. ~${stepMins} mins`}</span>
                      </button>

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

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    {step.actionButton && (
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
                    )}

                    {/* Step Advance Pointer Button */}
                    <button
                      onClick={() => {
                        if (idx < totalSteps - 1) {
                          scrollToStep(idx + 1);
                        } else {
                          scrollToStep(0);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                    >
                      <span>
                        {idx < totalSteps - 1
                          ? (language === 'ar' ? 'التوجه للخطوة التالية' : 'Proceed to Next Step')
                          : (language === 'ar' ? 'العودة للخطوة الأولى' : 'Restart Step Guide')}
                      </span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
