import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Key, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Lock,
  Award,
  Wallet
} from 'lucide-react';
import { OWNER_CONTACT } from '../data/ownerData';
import { OwnerConfig, UserSession } from '../hooks/useActivationStore';
import { AppLogo } from './AppLogo';
import { useLanguage } from '../context/LanguageContext';

interface UserActivationScreenProps {
  onActivate: (identity: string, code: string) => { success: boolean; message: string };
  userSession: UserSession | null;
  ownerConfig: OwnerConfig;
}

export const UserActivationScreen: React.FC<UserActivationScreenProps> = ({
  onActivate,
  userSession,
  ownerConfig,
}) => {
  const { language, t } = useLanguage();
  const [identity, setIdentity] = useState('');
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; text: string } | null>(null);
  const [copiedWallet, setCopiedWallet] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const result = onActivate(identity, code);
    setFeedback({ success: result.success, text: result.message });
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(ownerConfig.walletPhone);
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden my-6">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Header with App Logo featuring Letter R */}
        <div className="text-center space-y-4 flex flex-col items-center">
          <AppLogo size="xl" />

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-md">
            <Award className="w-4 h-4 text-amber-200" />
            <span>{t('appTitle')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('activationTitle')}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('activationSubtitle')}
          </p>

          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs px-4 py-2 rounded-xl">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t('lockedMessage')}</span>
          </div>
        </div>

        {/* Subscription Payment Steps Box */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 space-y-4 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {language === 'ar' ? `خطوات تفعيل الاشتراك المشترك (قيمة الاشتراك: ${ownerConfig.subscriptionPrice})` : `Subscription Activation Steps (${ownerConfig.subscriptionPrice})`}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === 'ar' ? `قم بتحويل مبلغ ${ownerConfig.subscriptionPrice} عبر رقم المحفظة لاستلام كود التفعيل المخصص لك` : `Transfer ${ownerConfig.subscriptionPrice} via wallet number to receive your code`}
                </p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full self-start sm:self-auto">
              {language === 'ar' ? `رسوم التفعيل: ${ownerConfig.subscriptionPrice}` : `Price: ${ownerConfig.subscriptionPrice}`}
            </span>
          </div>

          {/* Wallet Number Card */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-1 text-center ltr:sm:text-left rtl:sm:text-right">
              <span className="text-xs text-slate-400 font-medium block">
                {language === 'ar' ? `رقم المحفظة المعتمد (${ownerConfig.walletName}):` : `Wallet Number (${ownerConfig.walletName}):`}
              </span>
              <div className="font-mono text-lg font-bold text-emerald-400" dir="ltr">
                {ownerConfig.walletPhone}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyWallet}
                className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl border border-slate-600 flex items-center justify-center gap-1.5 transition cursor-pointer"
                id="btn-copy-wallet-number"
              >
                {copiedWallet ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedWallet ? (language === 'ar' ? 'تم نسخ الرقم' : 'Copied!') : (language === 'ar' ? 'نسخ رقم المحفظة' : 'Copy Wallet Number')}</span>
              </button>

              <a
                href={ownerConfig.whatsappPhone ? `https://wa.me/${ownerConfig.whatsappPhone.replace(/[^0-9]/g, '')}?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A7%D9%84%D9%85%D9%87%D9%86%D8%AF%D8%B3%20%D8%B1%D9%82%D9%8A%D8%A8%D8%8C%20%D9%82%D9%85%D8%AA%20%D8%A8%D8%AA%D8%AD%D9%88%D9%8A%D9%84%201500%20%D8%B1%D9%8A%D8%A7%D9%84%20%D9%84%D8%AA%D9%81%D8%B9%D9%8A%D9%84%20%D8%A7%D9%84%D8%AD%D8%B3%D8%A7%D8%A8%D8%8C%20%D8%A3%D8%B1%D8%AC%D9%88%20%D8%A5%D8%B1%D8%B3%D8%A7%D9%84%20%D9%83%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D9%81%D8%B9%D9%8A%D9%84.` : OWNER_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                id="btn-whatsapp-request-code"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ar' ? 'إرسال الإشعار واتساب' : 'Send WhatsApp Proof'}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
              <span>{language === 'ar' ? `قم بتحويل ${ownerConfig.subscriptionPrice} إلى رقم المحفظة ${ownerConfig.walletPhone}.` : `Transfer ${ownerConfig.subscriptionPrice} to wallet ${ownerConfig.walletPhone}.`}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
              <span>{language === 'ar' ? 'أرسل صورة الإشعار للمهندس رقيب عبر الواتساب أو التيليجرام لاستلام كود التفعيل الخاص بك.' : 'Send transfer screenshot to Engineer Rqeeb via WhatsApp or Telegram to get your code.'}</span>
            </div>
          </div>
        </div>

        {/* Activation Form - Clean & Secure without code hints */}
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700/90 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="pb-3 border-b border-slate-700">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-400" />
              <span>{language === 'ar' ? 'إدخال بيانات التفعيل والدخول' : 'Enter Activation & Credentials'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Field 1: Phone or Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                {t('identityInputLabel')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={t('identityInputPlaceholder')}
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Field 2: Activation Code */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                {t('activationInputLabel')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={t('activationInputPlaceholder')}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition font-mono uppercase font-bold"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Feedback Message */}
          {feedback && (
            <div
              className={`p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 ${
                feedback.success
                  ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-200'
                  : 'bg-red-950/90 border border-red-500 text-red-200'
              }`}
            >
              {feedback.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer flex items-center justify-center gap-2"
              id="btn-submit-user-activation"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{t('activateBtn')}</span>
            </button>

            {/* Support Link */}
            <div className="flex items-center text-xs">
              <a
                href={ownerConfig.telegramBot}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1.5 bg-sky-950/50 px-3 py-1.5 rounded-lg border border-sky-800/50 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'طلب كود عبر التيليجرام' : 'Request Code on Telegram'}</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
