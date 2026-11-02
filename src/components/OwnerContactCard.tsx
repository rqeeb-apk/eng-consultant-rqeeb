import React from 'react';
import { OWNER_CONTACT } from '../data/ownerData';
import { 
  Phone, 
  Mail, 
  Globe, 
  ShoppingBag, 
  Send, 
  ExternalLink, 
  MessageCircle, 
  Headphones, 
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const OwnerContactCard: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 mb-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <Headphones className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-0.5 rounded-full">
                  {language === 'ar' ? 'خدمة الدعم المباشر والاستشارات' : 'Direct Support & Security Consulting'}
                </span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'معتمد وموثق' : 'Verified & Official'}</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {language === 'ar' ? `تواصل مع المالك / الدعم الفني (${OWNER_CONTACT.brandName})` : `Contact Owner / Support (${OWNER_CONTACT.brandName})`}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {language === 'ar' 
                  ? 'لأي استفسار تقني، مساعدة متقدمة في فك القيود والأقفال، أو استعادة الحسابات المعقدة عبر القنوات المعتمدة:'
                  : 'For technical inquiries, assistance with complex account recovery, or security consulting:'}
              </p>
            </div>
          </div>

          {/* Quick Telegram Bot Badge */}
          <a
            href={OWNER_CONTACT.telegramBotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition shadow-md hover:shadow-lg shrink-0 self-start md:self-center"
            id="btn-telegram-bot-header"
          >
            <Send className="w-4 h-4" />
            <span>{t('telegramBot')}: {OWNER_CONTACT.telegramBotUsername}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Phone / Call */}
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-slate-600 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{language === 'ar' ? 'رقم الهاتف / الاتصال المباشر' : 'Direct Phone Contact'}</div>
                <div className="font-mono text-sm sm:text-base font-bold text-white" dir="ltr">
                  {OWNER_CONTACT.phoneFormatted}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href={`tel:${OWNER_CONTACT.phone}`}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition text-center"
                id="btn-call-owner"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'اتصال هاتف' : 'Call'}</span>
              </a>
              <a
                href={OWNER_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition text-center shadow-xs"
                id="btn-whatsapp-owner"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-slate-600 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs text-slate-400 font-medium">{language === 'ar' ? 'البريد الإلكتروني المعتمد' : 'Official Email'}</div>
                <div className="font-mono text-xs sm:text-sm font-bold text-white truncate" dir="ltr">
                  {OWNER_CONTACT.email}
                </div>
              </div>
            </div>

            <a
              href={OWNER_CONTACT.mailtoUrl}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition text-center"
              id="btn-email-owner"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'إرسال بريد إلكتروني مباشر' : 'Send Direct Email'}</span>
            </a>
          </div>

          {/* Telegram Bot */}
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:border-slate-600 transition md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">{language === 'ar' ? 'بوت التيليجرام الرسمي للتواصل' : 'Official Telegram Bot'}</div>
                <div className="font-mono text-xs sm:text-sm font-bold text-white" dir="ltr">
                  {OWNER_CONTACT.telegramBotUsername}
                </div>
              </div>
            </div>

            <a
              href={OWNER_CONTACT.telegramBotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition text-center shadow-xs"
              id="btn-open-telegram-bot"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'بدء المحادثة في التيليجرام' : 'Start Telegram Chat'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Websites Row */}
        <div className="pt-2">
          <div className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>{language === 'ar' ? 'مواقع ومنصات المالك الرسمية:' : 'Official Owner Websites:'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OWNER_CONTACT.websites.map((web, idx) => (
              <a
                key={idx}
                href={web.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 hover:border-blue-500/50 p-4 rounded-2xl transition group flex items-start justify-between gap-3"
                id={`btn-owner-site-${idx}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                    {idx === 0 ? <Globe className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-blue-300 transition">
                        {web.name}
                      </span>
                      <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                        {web.badge}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-blue-400 mt-0.5" dir="ltr">
                      {web.domain}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {web.description}
                    </p>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-white transition pt-1">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
