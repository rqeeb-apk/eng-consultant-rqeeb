import React from 'react';
import { Shield, ExternalLink, Phone, Globe, Send, MessageCircle } from 'lucide-react';
import { OWNER_CONTACT } from '../data/ownerData';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold text-white">
                  {OWNER_CONTACT.brandName}
                </div>
                <div className="text-xs text-slate-400">
                  {OWNER_CONTACT.brandSub}
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ar' ? 'المرجع الشامل للأمان الرقمي، إرشادات استرداد الحسابات المخترقة، والتواصل المباشر مع الخبراء.' : 'Comprehensive reference for digital security, account recovery guides, and expert consultation.'}
            </p>
          </div>

          {/* Owner Direct Channels */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'قنوات التواصل مع المالك:' : 'Direct Owner Channels:'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400">{language === 'ar' ? 'الهاتف / واتساب:' : 'Phone / WhatsApp:'}</span>
                <a
                  href={OWNER_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-emerald-400 font-bold hover:underline flex items-center gap-1"
                  dir="ltr"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{OWNER_CONTACT.phone}</span>
                </a>
              </div>

              <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400">{language === 'ar' ? 'البريد الإلكتروني:' : 'Official Email:'}</span>
                <a
                  href={OWNER_CONTACT.mailtoUrl}
                  className="font-mono text-blue-400 font-bold hover:underline truncate max-w-[180px]"
                  dir="ltr"
                >
                  {OWNER_CONTACT.email}
                </a>
              </div>

              <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-400">{language === 'ar' ? 'بوت التيليجرام:' : 'Telegram Bot:'}</span>
                <a
                  href={OWNER_CONTACT.telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sky-400 font-bold hover:underline flex items-center gap-1"
                  dir="ltr"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{OWNER_CONTACT.telegramBotUsername}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Owner Websites */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>{language === 'ar' ? 'مواقعنا الرسمية:' : 'Official Websites:'}</span>
            </h4>
            <div className="space-y-2 text-xs">
              {OWNER_CONTACT.websites.map((site, idx) => (
                <a
                  key={idx}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-slate-900 hover:bg-slate-850 p-2.5 rounded-lg border border-slate-800 hover:border-slate-700 transition group cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-white group-hover:text-blue-400 transition">
                      {site.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400" dir="ltr">
                      {site.domain}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {t('footerRights')} © {new Date().getFullYear()}
          </div>
          <div className="text-center sm:text-left text-xs font-bold text-slate-300">
            {t('appTitle')} • {t('footerDev')}
          </div>
        </div>
      </div>
    </footer>
  );
};
