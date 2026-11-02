import React, { useState } from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { 
  Bell, 
  BellRing, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  Check, 
  Settings2, 
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NotificationCenter: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    permission,
    settings,
    alerts,
    unreadCount,
    requestPermission,
    sendTestNotification,
    updateSetting,
    markAsRead,
    markAllAsRead,
  } = usePushNotifications();

  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSentMessage, setTestSentMessage] = useState<string | null>(null);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'critical' | 'update' | 'tip'>('all');

  const handleSendTest = async (type: 'critical' | 'update' | 'tip') => {
    setIsSendingTest(true);
    setTestSentMessage(null);
    try {
      const ok = await sendTestNotification(type);
      if (ok) {
        setTestSentMessage(language === 'ar' ? 'تم إرسال التنبيه الفوري بنجاح! تفقد أعلى شاشة هاتفك أو جهازك.' : 'Push notification delivered successfully!');
      } else {
        setTestSentMessage(language === 'ar' ? 'تم تسجيل التنبيه في القائمة الداخلية. يرجى التأكد من الموافقة على إذن الإشعارات.' : 'Notification added to in-app alerts list.');
      }
    } finally {
      setIsSendingTest(false);
      setTimeout(() => setTestSentMessage(null), 5000);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filterType === 'all') return true;
    return alert.type === filterType;
  });

  return (
    <section 
      id="notification-center-section" 
      className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm mb-8 scroll-mt-20"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            {permission === 'granted' ? (
              <BellRing className="w-6 h-6 animate-pulse" />
            ) : (
              <Bell className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {t('notificationsTitle')}
              </h3>
              {unreadCount > 0 && (
                <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                  {unreadCount} {language === 'ar' ? 'جديد' : 'New'}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'ar' ? 'خدمة إرسال تنبيهات (Push Notifications) لإبلاغك بأي تحديثات جديدة في طرق الاسترجاع أو تحذيرات أمنية طارئة' : 'Real-time push notifications for urgent security advisories & method updates'}
            </p>
          </div>
        </div>

        {/* Permission Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {permission === 'granted' ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ar' ? 'التنبيهات مفعلة' : 'Notifications Active'}</span>
            </div>
          ) : permission === 'denied' ? (
            <div className="flex items-center gap-1.5 bg-red-50 text-red-800 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{language === 'ar' ? 'محظورة في المتصفح' : 'Blocked in Browser'}</span>
            </div>
          ) : (
            <button
              onClick={requestPermission}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition shadow-sm hover:shadow cursor-pointer"
              id="btn-enable-push-notifications"
            >
              <BellRing className="w-4 h-4" />
              <span>{language === 'ar' ? 'تفعيل التنبيهات المباشرة' : 'Enable Push Notifications'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Banner / Notification Controls */}
      <div className="my-5 bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-300/30 px-2.5 py-0.5 rounded-full">
                {language === 'ar' ? 'نظام البث الأمني المباشر' : 'Live Security Feed'}
              </span>
              <span className="text-xs text-slate-300">
                {language === 'ar' ? 'إشعار فوري عند صدور أي ثغرة أو تحديث' : 'Real-time broadcast for security updates'}
              </span>
            </div>
            <h4 className="text-base font-bold text-white">
              {language === 'ar' ? 'جرب إرسال تنبيه تجريبي فوري إلى هاتفك أو جهازك الآن' : 'Send a test push notification to your device now'}
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {language === 'ar' ? 'اضغط على أحد الأزرار أدناه للتحقق من وصول التنبيهات إلى شريط إشعارات جهازك:' : 'Click any button below to trigger an immediate alert test:'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSendTest('critical')}
              disabled={isSendingTest}
              className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              id="btn-test-critical-alert"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{language === 'ar' ? 'تنبيه أمني عاجل' : 'Urgent Alert'}</span>
            </button>

            <button
              onClick={() => handleSendTest('update')}
              disabled={isSendingTest}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              id="btn-test-recovery-update"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{language === 'ar' ? 'تحديث طريقة استرجاع' : 'Method Update'}</span>
            </button>

            <button
              onClick={() => handleSendTest('tip')}
              disabled={isSendingTest}
              className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              id="btn-test-advisor-tip"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{language === 'ar' ? 'نصيحة المهندس رقيب' : 'Pro Security Tip'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {testSentMessage && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 p-3 rounded-xl text-xs flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{testSentMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">{language === 'ar' ? 'الآن' : 'Now'}</span>
          </div>
        )}

        {/* Permission Denied Helper Note */}
        {permission === 'denied' && (
          <div className="bg-red-950/70 border border-red-500/50 text-red-200 p-3.5 rounded-xl text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block text-white">
                {language === 'ar' ? 'تم رفض إذن الإشعارات مسبقاً في متصفحك' : 'Notifications permission previously blocked'}
              </span>
              <p className="text-red-200/90 leading-relaxed">
                {language === 'ar' ? 'لإعادة تفعيلها: اضغط على أيقونة القفل أو الإعدادات 🔒 بجانب رابط الموقع في شريط المتصفح، ثم فعّل خيار "الإشعارات (Notifications)" وأعد تحميل الصفحة.' : 'To re-enable: click the padlock 🔒 in browser address bar, grant "Notifications", and refresh page.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Notification Categories Settings Toggle Drawer */}
      <div className="mb-5">
        <button
          onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
          className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1.5 transition cursor-pointer"
          id="btn-toggle-notification-categories"
        >
          <Settings2 className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'ar' ? 'تخصيص فئات التنبيهات التي ترغب باستلامها' : 'Customize Notification Categories'}</span>
          {showSettingsDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showSettingsDrawer && (
          <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in text-xs">
            {/* Category 1 */}
            <label className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition">
              <input
                type="checkbox"
                checked={settings.criticalAlerts}
                onChange={(e) => updateSetting('criticalAlerts', e.target.checked)}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">{language === 'ar' ? '🚨 تنبيهات أمنية عاجلة' : '🚨 Urgent Security Alerts'}</span>
                <span className="text-[11px] text-slate-500">{language === 'ar' ? 'حيل اختراق جديدة وثغرات الحسابات' : 'Zero-day security advisories'}</span>
              </div>
            </label>

            {/* Category 2 */}
            <label className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition">
              <input
                type="checkbox"
                checked={settings.platformUpdates}
                onChange={(e) => updateSetting('platformUpdates', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">{language === 'ar' ? '🔄 تحديثات طرق الاسترجاع' : '🔄 Method & Portal Updates'}</span>
                <span className="text-[11px] text-slate-500">{language === 'ar' ? 'روابط وبوابات استعادة جديدة' : 'New recovery shortcuts & portals'}</span>
              </div>
            </label>

            {/* Category 3 */}
            <label className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition">
              <input
                type="checkbox"
                checked={settings.securityTips}
                onChange={(e) => updateSetting('securityTips', e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">{language === 'ar' ? '💡 توجيهات المهندس رقيب' : '💡 Expert Security Guidance'}</span>
                <span className="text-[11px] text-slate-500">{language === 'ar' ? 'نصائح حماية وتحصين الحسابات' : 'Proactive account hardening tips'}</span>
              </div>
            </label>
          </div>
        )}
      </div>

      {/* Filter Tabs & Alerts Feed */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-700 ltr:mr-1 rtl:ml-1">{language === 'ar' ? 'تصفية التنبيهات:' : 'Filter Alerts:'}</span>
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'ar' ? `الكل (${alerts.length})` : `All (${alerts.length})`}
            </button>
            <button
              onClick={() => setFilterType('critical')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                filterType === 'critical'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              {language === 'ar' ? 'عاجل' : 'Urgent'}
            </button>
            <button
              onClick={() => setFilterType('update')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                filterType === 'update'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              {language === 'ar' ? 'تحديثات' : 'Updates'}
            </button>
            <button
              onClick={() => setFilterType('tip')}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                filterType === 'tip'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              {language === 'ar' ? 'توجيهات' : 'Tips'}
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold self-start sm:self-auto flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all as read'}</span>
            </button>
          )}
        </div>

        {/* List of Security Alerts */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              {language === 'ar' ? 'لا توجد تنبيهات في هذا القسم حالياً.' : 'No alerts in this category.'}
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => markAsRead(alert.id)}
                className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row items-start justify-between gap-3 cursor-pointer ${
                  !alert.read
                    ? 'bg-blue-50/40 border-blue-200 hover:border-blue-300 shadow-2xs'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        alert.type === 'critical'
                          ? 'bg-red-100 text-red-700 border border-red-200'
                          : alert.type === 'update'
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {alert.type === 'critical' ? (language === 'ar' ? 'تحذير أمني عاجل' : 'Urgent Advisory') : alert.type === 'update' ? (language === 'ar' ? 'تحديث استرجاع' : 'Method Update') : (language === 'ar' ? 'توجيه تقني' : 'Pro Tip')}
                    </span>
                    {!alert.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                    )}
                    <span className="text-[11px] text-slate-400 font-medium">
                      {alert.date}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-slate-900 leading-snug">
                    {alert.title}
                  </h5>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {alert.body}
                  </p>
                </div>

                {alert.actionUrl && (
                  <a
                    href={alert.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="self-stretch sm:self-center bg-white hover:bg-slate-100 text-blue-700 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shrink-0 shadow-2xs cursor-pointer"
                  >
                    <span>{alert.linkText || (language === 'ar' ? 'عرض التفاصيل' : 'View Details')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
