/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PlatformId } from './types';
import { PLATFORMS_DATA } from './data/platformsData';
import { useActivationStore } from './hooks/useActivationStore';
import { Navbar } from './components/Navbar';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { UserActivationScreen } from './components/UserActivationScreen';
import { OwnerPanelModal } from './components/OwnerPanelModal';
import { PlatformTabs } from './components/PlatformTabs';
import { PlatformGuideModal } from './components/PlatformGuideModal';
import { AccountTargetBanner } from './components/AccountTargetBanner';
import { OwnerContactCard } from './components/OwnerContactCard';
import { CriticalHackedSolution } from './components/CriticalHackedSolution';
import { ReadinessAssessment } from './components/ReadinessAssessment';
import { InteractiveTroubleshooter } from './components/InteractiveTroubleshooter';
import { StepByStepGuide } from './components/StepByStepGuide';
import { AllPlatformsOverview } from './components/AllPlatformsOverview';
import { PostRecoverySecurity } from './components/PostRecoverySecurity';
import { OfficialLinksCard } from './components/OfficialLinksCard';
import { ScamWarning } from './components/ScamWarning';
import { NotificationCenter } from './components/NotificationCenter';
import { Footer } from './components/Footer';
import { ShieldCheck, LogOut } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language, t } = useLanguage();
  const [activePlatformId, setActivePlatformId] = useState<PlatformId>('google');
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Activation Store
  const {
    codes,
    userSession,
    isActivated,
    isOwnerLoggedIn,
    ownerCredentials,
    ownerConfig,
    subscribers,
    activateUser,
    logoutUser,
    loginOwner,
    logoutOwner,
    addCodes,
    deleteCode,
    toggleCodeStatus,
    resetAllCodesToUnused,
    updateOwnerCredentials,
    updateOwnerConfig,
  } = useActivationStore();

  const currentPlatform = PLATFORMS_DATA[activePlatformId] || PLATFORMS_DATA.google;

  // STRICT LOCK: Main application features unlocked ONLY when user has valid activation or owner is logged in
  const isContentUnlocked = isActivated || isOwnerLoggedIn;

  const handleSelectPlatform = (id: PlatformId) => {
    setActivePlatformId(id);
    setShowGuideModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans selection:bg-red-100 selection:text-red-900 antialiased w-full max-w-full overflow-x-hidden">
      {/* Navigation Header with Logo R & Language Switcher */}
      <Navbar 
        currentPlatform={currentPlatform}
        onOpenOwnerPanel={() => setShowOwnerModal(true)}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
        
        {/* PWA Mobile & Desktop Install Banner */}
        <PWAInstallBanner />

        {/* Identity & Main Advisory Banner: المهندس الاستشاري رقيب */}
        <AccountTargetBanner currentPlatform={currentPlatform} />

        {/* Active Subscriber Session Badge (if logged in) */}
        {isActivated && userSession && (
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{t('sessionActivated')}</span>
                  <span className="font-mono text-emerald-400 font-bold" dir="ltr">{userSession.identity}</span>
                </div>
                <div className="text-slate-400 text-xs font-mono">
                  {t('sessionCode')} <span className="text-amber-300 font-bold">{userSession.code}</span> | {t('sessionDate')} {userSession.activatedAt}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={logoutUser}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('logoutActivation')}</span>
              </button>
            </div>
          </div>
        )}

        {/* -------------------- USER ACTIVATION SCREEN -------------------- */}
        {!isContentUnlocked && (
          <UserActivationScreen
            onActivate={activateUser}
            userSession={userSession}
            ownerConfig={ownerConfig}
          />
        )}

        {/* -------------------- UNLOCKED MAIN APP CONTENT -------------------- */}
        {isContentUnlocked && (
          <>
            {/* Platform Selector Tabs */}
            <PlatformTabs 
              activePlatformId={activePlatformId} 
              onSelectPlatform={handleSelectPlatform} 
              onOpenGuideModal={() => setShowGuideModal(true)}
            />

            {/* Push Notification Center & Security Alerts */}
            <NotificationCenter />

            {/* Owner Contact Card (Phone +967785502919, Email, Websites, Telegram Bot) */}
            <OwnerContactCard />

            {/* Immediate Platform-Specific Hacked Solution (Passkey, 2FA, PIN, etc.) */}
            <CriticalHackedSolution currentPlatform={currentPlatform} />

            {/* Readiness assessment and success probability */}
            <ReadinessAssessment currentPlatform={currentPlatform} />

            {/* Interactive troubleshooter for common platform hurdles */}
            <InteractiveTroubleshooter currentPlatform={currentPlatform} />

            {/* Step-by-step roadmap */}
            <StepByStepGuide currentPlatform={currentPlatform} />

            {/* All Platforms Emergency Matrix */}
            <AllPlatformsOverview 
              onSelectPlatform={handleSelectPlatform} 
            />

            {/* Post recovery security checklist */}
            <PostRecoverySecurity currentPlatform={currentPlatform} />

            {/* Official Direct Links */}
            <OfficialLinksCard currentPlatform={currentPlatform} />

            {/* Universal Scam Warning */}
            <ScamWarning />
          </>
        )}
      </main>

      {/* Guided Platform Steps Popup Modal */}
      <PlatformGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        platform={currentPlatform}
      />

      {/* Secret Owner Control Panel Modal */}
      <OwnerPanelModal
        isOpen={showOwnerModal}
        onClose={() => setShowOwnerModal(false)}
        isOwnerLoggedIn={isOwnerLoggedIn}
        onLoginOwner={loginOwner}
        onLogoutOwner={logoutOwner}
        codes={codes}
        subscribers={subscribers}
        ownerCredentials={ownerCredentials}
        ownerConfig={ownerConfig}
        onAddCodes={addCodes}
        onDeleteCode={deleteCode}
        onToggleCodeStatus={toggleCodeStatus}
        onResetAllCodes={resetAllCodesToUnused}
        onUpdateOwnerCredentials={updateOwnerCredentials}
        onUpdateOwnerConfig={updateOwnerConfig}
      />

      <Footer />
    </div>
  );
}
