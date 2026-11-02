import React, { useState } from 'react';
import { ExternalLink, Send, MessageCircle, Download, Globe } from 'lucide-react';
import { OWNER_CONTACT } from '../data/ownerData';
import { PlatformConfig } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { AppLogo } from './AppLogo';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPlatform: PlatformConfig;
  onOpenInstallModal?: () => void;
  onOpenOwnerPanel?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPlatform, 
  onOpenInstallModal,
  onOpenOwnerPanel,
}) => {
  const { isInstallable, install } = usePWAInstall();
  const { language, toggleLanguage, t } = useLanguage();
  const [clickCount, setClickCount] = useState(0);
  const [clickToast, setClickToast] = useState<string | null>(null);

  const handleLogoClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 10 && nextCount < 20) {
      setClickToast(t('ownerTapToast', { n: 20 - nextCount }));
      setTimeout(() => setClickToast(null), 2000);
    } else if (nextCount >= 20) {
      setClickCount(0);
      setClickToast(t('ownerOpenedToast'));
      setTimeout(() => setClickToast(null), 2000);
      if (onOpenOwnerPanel) {
        onOpenOwnerPanel();
      }
    }
  };

  const platformName = language === 'en' && currentPlatform.nameEn ? currentPlatform.nameEn : currentPlatform.nameAr;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 select-none w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-1.5 sm:gap-2 w-full max-w-full">
        
        {/* Brand Logo & Title with 20-Click Trigger & AppLogo (Letter R) */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group relative shrink min-w-0"
          title={t('logoTooltip')}
          id="btn-navbar-logo-trigger"
        >
          {/* App Logo Component with Letter R */}
          <AppLogo size="md" />

          <div className="min-w-0 truncate">
            <div className="flex items-center gap-1 sm:gap-2">
              <h1 className="text-xs sm:text-base md:text-lg font-extrabold text-slate-900 leading-tight truncate">
                {t('appTitle')}
              </h1>
              <span className="hidden sm:inline-block text-[10px] sm:text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-200 whitespace-nowrap shrink-0">
                {t('appSubTitle')}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block truncate">
              {OWNER_CONTACT.brandName} • {t('appDesc')}
            </p>
          </div>

          {/* Secret Tap Countdown Toast */}
          {clickToast && (
            <div className="absolute top-12 ltr:left-0 rtl:right-0 bg-slate-900 text-amber-300 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-amber-400/40 shadow-xl z-50 animate-bounce whitespace-nowrap">
              {clickToast}
            </div>
          )}
        </div>

        {/* Action Controls & Navigation Items */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">

          {/* Language Switcher Toggle (Arabic / English) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition cursor-pointer shrink-0 shadow-2xs"
            id="nav-btn-language-toggle"
            title={t('langToggleTitle')}
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
            <span className="font-extrabold text-slate-900 text-[11px] sm:text-xs">{t('langName')}</span>
          </button>

          {/* Notification Bell Button */}
          <a
            href="#notification-center-section"
            className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition cursor-pointer shrink-0"
            id="nav-btn-notifications"
            title={t('notificationsTitle')}
          >
            <span className="relative flex">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75 top-0 right-0"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600 top-0 right-0"></span>
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </a>

          {/* In-App Install Button */}
          <button
            onClick={() => {
              if (isInstallable) {
                install();
              } else if (onOpenInstallModal) {
                onOpenInstallModal();
              }
            }}
            className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition cursor-pointer shrink-0"
            id="nav-btn-install-pwa"
            title={t('installTitle')}
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">{t('installApp')}</span>
            <span className="sm:hidden text-[11px]">{t('installAppMobile')}</span>
          </button>

          {/* Telegram Bot */}
          <a
            href={OWNER_CONTACT.telegramBotUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-bold px-3 py-2 rounded-xl transition shrink-0"
            id="nav-telegram-bot-link"
            title={t('telegramBot')}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('telegramBot')}</span>
          </a>

          {/* Owner WhatsApp */}
          <a
            href={OWNER_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition shadow-xs shrink-0"
            id="nav-owner-whatsapp"
            title={t('whatsappTitle')}
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">{t('whatsappContact')}</span>
            <span className="md:hidden text-[11px] sm:text-xs">{t('whatsappMobile')}</span>
          </a>

          {/* Direct Platform Link */}
          <a
            href={currentPlatform.officialRecoveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-2 rounded-xl transition shadow-xs shrink-0"
            id="btn-open-current-platform-nav"
          >
            <span>{t('platformPortal')} {platformName}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
