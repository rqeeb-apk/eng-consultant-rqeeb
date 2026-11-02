import { useState, useEffect, useCallback } from 'react';
import { SecurityAlert, NotificationSettings } from '../types';
import { DEFAULT_NOTIFICATION_SETTINGS, INITIAL_SECURITY_ALERTS } from '../data/notificationData';

const SETTINGS_KEY = 'rqeeb_notification_settings_v1';
const ALERTS_KEY = 'rqeeb_security_alerts_v1';

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_NOTIFICATION_SETTINGS;
    } catch {
      return DEFAULT_NOTIFICATION_SETTINGS;
    }
  });

  const [alerts, setAlerts] = useState<SecurityAlert[]>(() => {
    try {
      const stored = localStorage.getItem(ALERTS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_SECURITY_ALERTS;
    } catch {
      return INITIAL_SECURITY_ALERTS;
    }
  });

  // Check support and current permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      if (Notification.permission === 'granted') {
        setSettings((prev) => ({ ...prev, enabled: true }));
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save notification settings:', e);
    }
  }, [settings]);

  // Save alerts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
    } catch (e) {
      console.warn('Failed to save security alerts:', e);
    }
  }, [alerts]);

  // Request browser permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      alert('المتصفح أو الجهاز الحالي لا يدعم التنبيهات المباشرة (Web Push Notifications).');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        setSettings((prev) => ({ ...prev, enabled: true }));
        // Send welcoming notification
        await sendLocalNotification({
          title: '🛡️ تم تفعيل تنبيهات المهندس رقيب بنجاح',
          body: 'ستصلك فوراً أي تحذيرات أمنية طارئة أو تحديثات جديدة في طرق استرجاع الحسابات.',
          tag: 'welcome-alert',
        });
        return true;
      } else {
        setSettings((prev) => ({ ...prev, enabled: false }));
        return false;
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
      return false;
    }
  }, [isSupported]);

  // Dispatch browser notification (via ServiceWorker or direct Notification API)
  const sendLocalNotification = useCallback(
    async (options: {
      title: string;
      body: string;
      tag?: string;
      data?: Record<string, unknown>;
      icon?: string;
    }) => {
      if (!isSupported || Notification.permission !== 'granted') {
        return false;
      }

      const iconUrl = options.icon || '/pwa-192x192.png';
      const notificationOptions: NotificationOptions = {
        body: options.body,
        icon: iconUrl,
        badge: '/pwa-192x192.png',
        tag: options.tag || `rqeeb-alert-${Date.now()}`,
        dir: 'rtl',
        lang: 'ar',
        data: options.data,
      };

      try {
        // Try ServiceWorker registration first for robust mobile PWA delivery
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          if (registration && 'showNotification' in registration) {
            await registration.showNotification(options.title, notificationOptions);
            return true;
          }
        }

        // Fallback to standard window Notification
        new Notification(options.title, notificationOptions);
        return true;
      } catch (err) {
        console.warn('Failed to display native notification, fallback to in-app:', err);
        return false;
      }
    },
    [isSupported]
  );

  // Trigger test notification
  const sendTestNotification = useCallback(
    async (type: 'critical' | 'update' | 'tip' = 'critical') => {
      let title = '🚨 تنبيه أمني عاجل من المهندس رقيب';
      let body = 'رصد محاولات تصيد واحتيال جديدة تستهدف حسابات التواصل. يرجى تفعيل المصادقة الثنائية وعدم مشاركة أكواد SMS.';

      if (type === 'update') {
        title = '🔄 تحديث جديد في بوابات استرجاع الحسابات';
        body = 'تم تحديث روابط وخوارزميات استرجاع حسابات إنستغرام وجوجل لتجاوز أقفال المخترقين.';
      } else if (type === 'tip') {
        title = '💡 توجيه أمني من المهندس الاستشاري رقيب';
        body = 'تأكد من عدم وجود أي جلسات نشطة مجهولة في جهازك، وقم بمراجعة الأجهزة المرتبطة شهرياً.';
      }

      // If permission is not granted, request it first
      if (permission !== 'granted') {
        const granted = await requestPermission();
        if (!granted) return false;
      }

      const delivered = await sendLocalNotification({
        title,
        body,
        tag: `test-alert-${Date.now()}`,
      });

      // Also append to the in-app alerts list
      const newAlert: SecurityAlert = {
        id: `alert_test_${Date.now()}`,
        title,
        body,
        date: 'الآن',
        type,
        read: false,
      };

      setAlerts((prev) => [newAlert, ...prev]);
      return delivered;
    },
    [permission, requestPermission, sendLocalNotification]
  );

  // Toggle specific setting category
  const updateSetting = useCallback((key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Mark an alert as read
  const markAsRead = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((item) => (item.id === alertId ? { ...item, read: true } : item))
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setAlerts((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const unreadCount = alerts.filter((a) => !a.read).length;

  return {
    isSupported,
    permission,
    settings,
    alerts,
    unreadCount,
    requestPermission,
    sendTestNotification,
    updateSetting,
    markAsRead,
    markAllAsRead,
  };
}
