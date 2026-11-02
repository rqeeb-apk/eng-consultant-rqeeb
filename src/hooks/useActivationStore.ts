import { useState, useEffect, useCallback } from 'react';
import { ActivationCodeItem, getInitialActivationCodes } from '../data/activationCodes';

const CODES_STORAGE_KEY = 'rqeeb_activation_codes_v2';
const USER_SESSION_KEY = 'rqeeb_user_activation_session_v2';
const OWNER_CREDENTIALS_KEY = 'rqeeb_owner_credentials_v2';
const OWNER_CONFIG_KEY = 'rqeeb_owner_config_v2';
const SUBSCRIBERS_KEY = 'rqeeb_subscribers_log_v2';

export interface OwnerCredentials {
  email: string;
  pin: string;
  password: string;
}

export interface OwnerConfig {
  walletPhone: string;
  walletName: string;
  subscriptionPrice: string;
  telegramBot: string;
  whatsappPhone: string;
  announcementText: string;
}

export interface UserSession {
  identity: string; // Phone or Email
  code: string;
  activatedAt: string;
}

export const DEFAULT_OWNER_CREDENTIALS: OwnerCredentials = {
  email: 'rqeebpro@gmail.com',
  pin: '7855',
  password: 'rqeebpro2026',
};

export const DEFAULT_OWNER_CONFIG: OwnerConfig = {
  walletPhone: '785502919',
  walletName: 'محفظة جيب (Jaib Wallet) وبقية المحافظ اليمنية',
  subscriptionPrice: '1500 ريال يمني',
  telegramBot: 'https://t.me/Rqeebpro_bot',
  whatsappPhone: '+967785502919',
  announcementText: 'مرحباً بكم في منصة المهندس رقيب — قم بتفعيل الحساب باستخدام كود الاشتراك للاستفادة من كافة بوابات استرجاع الحسابات المخترقة.',
};

export function useActivationStore() {
  // Activation codes
  const [codes, setCodes] = useState<ActivationCodeItem[]>(() => {
    try {
      const stored = localStorage.getItem(CODES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load stored activation codes', e);
    }
    return getInitialActivationCodes();
  });

  // User activation session
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem(USER_SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Owner credentials
  const [ownerCredentials, setOwnerCredentials] = useState<OwnerCredentials>(() => {
    try {
      const stored = localStorage.getItem(OWNER_CREDENTIALS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_OWNER_CREDENTIALS;
    } catch {
      return DEFAULT_OWNER_CREDENTIALS;
    }
  });

  // Owner config
  const [ownerConfig, setOwnerConfig] = useState<OwnerConfig>(() => {
    try {
      const stored = localStorage.getItem(OWNER_CONFIG_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_OWNER_CONFIG;
    } catch {
      return DEFAULT_OWNER_CONFIG;
    }
  });

  // Subscribers list
  const [subscribers, setSubscribers] = useState<UserSession[]>(() => {
    try {
      const stored = localStorage.getItem(SUBSCRIBERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Owner logged in state
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('rqeeb_owner_logged_in') === 'true';
  });

  // Save codes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CODES_STORAGE_KEY, JSON.stringify(codes));
    } catch (e) {
      console.warn('Failed to save activation codes', e);
    }
  }, [codes]);

  // Save session
  useEffect(() => {
    try {
      if (userSession) {
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(userSession));
      } else {
        localStorage.removeItem(USER_SESSION_KEY);
      }
    } catch (e) {
      console.warn('Failed to save user session', e);
    }
  }, [userSession]);

  // Save owner credentials
  useEffect(() => {
    try {
      localStorage.setItem(OWNER_CREDENTIALS_KEY, JSON.stringify(ownerCredentials));
    } catch (e) {
      console.warn('Failed to save owner credentials', e);
    }
  }, [ownerCredentials]);

  // Save owner config
  useEffect(() => {
    try {
      localStorage.setItem(OWNER_CONFIG_KEY, JSON.stringify(ownerConfig));
    } catch (e) {
      console.warn('Failed to save owner config', e);
    }
  }, [ownerConfig]);

  // Save subscribers
  useEffect(() => {
    try {
      localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(subscribers));
    } catch (e) {
      console.warn('Failed to save subscribers', e);
    }
  }, [subscribers]);

  // Verify and activate user
  const activateUser = useCallback(
    (identity: string, enteredCode: string): { success: boolean; message: string } => {
      const cleanIdentity = identity.trim();
      const cleanCode = enteredCode.trim();

      if (!cleanIdentity) {
        return { success: false, message: 'يرجى كتابة رقم الهاتف أو البريد الإلكتروني.' };
      }

      if (!cleanCode) {
        return { success: false, message: 'يرجى كتابة كود التفعيل.' };
      }

      // Check if code exists
      const targetIndex = codes.findIndex(
        (item) => item.code.toLowerCase() === cleanCode.toLowerCase()
      );

      if (targetIndex === -1) {
        return {
          success: false,
          message: 'كود التفعيل غير صحيح! تأكد من كتابة الكود بشكل دقيق أو تواصل مع المهندس رقيب للحصول على كود مفعل.',
        };
      }

      const foundCode = codes[targetIndex];

      // Check if code is already used by someone else
      if (foundCode.isUsed && foundCode.usedBy && foundCode.usedBy.toLowerCase() !== cleanIdentity.toLowerCase()) {
        return {
          success: false,
          message: `هذا الكود مستخدم سابقاً من قبل حساب آخر (${foundCode.usedBy}). يرجى الطلب من المهندس رقيب كوداً جديداً.`,
        };
      }

      // Mark code as used
      const updatedCodes = [...codes];
      const nowStr = new Date().toLocaleDateString('ar-YE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      updatedCodes[targetIndex] = {
        ...foundCode,
        isUsed: true,
        usedBy: cleanIdentity,
        usedAt: nowStr,
      };

      setCodes(updatedCodes);

      const newSession: UserSession = {
        identity: cleanIdentity,
        code: foundCode.code,
        activatedAt: nowStr,
      };

      setUserSession(newSession);

      // Add to subscribers if not present
      setSubscribers((prev) => {
        const exists = prev.some((s) => s.identity.toLowerCase() === cleanIdentity.toLowerCase());
        if (exists) {
          return prev.map((s) => (s.identity.toLowerCase() === cleanIdentity.toLowerCase() ? newSession : s));
        }
        return [newSession, ...prev];
      });

      return {
        success: true,
        message: 'تم تفعيل الحساب بنجاح! مرحباً بك في منصة المهندس الاستشاري رقيب.',
      };
    },
    [codes]
  );

  // Logout user
  const logoutUser = useCallback(() => {
    setUserSession(null);
  }, []);

  // Owner Login
  const loginOwner = useCallback(
    (email: string, pin: string, password: string): { success: boolean; message: string } => {
      const isEmailValid = email.trim().toLowerCase() === ownerCredentials.email.toLowerCase();
      const isPinValid = pin.trim() === ownerCredentials.pin.trim();
      const isPassValid = password.trim() === ownerCredentials.password.trim();

      if (isEmailValid && isPinValid && isPassValid) {
        setIsOwnerLoggedIn(true);
        sessionStorage.setItem('rqeeb_owner_logged_in', 'true');
        return { success: true, message: 'مرحباً بك يا مهندس رقيب! تم تسجيل دخول لوحة المالك بنجاح.' };
      }

      return {
        success: false,
        message: 'بيانات المالك غير صحيحة! تحقق من البريد، رمز PIN، وكلمة السر.',
      };
    },
    [ownerCredentials]
  );

  // Owner Logout
  const logoutOwner = useCallback(() => {
    setIsOwnerLoggedIn(false);
    sessionStorage.removeItem('rqeeb_owner_logged_in');
  }, []);

  // Owner Actions: Add single/multiple codes
  const addCodes = useCallback((newCodesList: string[]) => {
    setCodes((prev) => {
      const existingSet = new Set(prev.map((c) => c.code.toLowerCase()));
      const itemsToAdd: ActivationCodeItem[] = [];

      for (const codeStr of newCodesList) {
        const trimmed = codeStr.trim();
        if (trimmed && !existingSet.has(trimmed.toLowerCase())) {
          let category: ActivationCodeItem['category'] = 'custom';
          if (trimmed.endsWith('-gmail')) category = 'gmail';
          else if (trimmed.endsWith('-face')) category = 'face';
          else if (trimmed.endsWith('-whats')) category = 'whats';
          else if (trimmed.endsWith('-insta')) category = 'insta';
          else if (trimmed.endsWith('-tik')) category = 'tik';
          else if (trimmed.endsWith('-snap')) category = 'snap';

          itemsToAdd.push({
            code: trimmed,
            category,
            isUsed: false,
            createdAt: new Date().toISOString(),
          });
          existingSet.add(trimmed.toLowerCase());
        }
      }

      return [...itemsToAdd, ...prev];
    });
  }, []);

  // Delete code
  const deleteCode = useCallback((codeToDelete: string) => {
    setCodes((prev) => prev.filter((item) => item.code !== codeToDelete));
  }, []);

  // Toggle code status
  const toggleCodeStatus = useCallback((codeToToggle: string) => {
    setCodes((prev) =>
      prev.map((item) => {
        if (item.code === codeToToggle) {
          return {
            ...item,
            isUsed: !item.isUsed,
            usedBy: item.isUsed ? undefined : item.usedBy || 'تم تفعيله من اللوحة',
            usedAt: item.isUsed ? undefined : new Date().toLocaleDateString('ar-YE'),
          };
        }
        return item;
      })
    );
  }, []);

  // Reset all codes
  const resetAllCodesToUnused = useCallback(() => {
    setCodes((prev) =>
      prev.map((item) => ({
        ...item,
        isUsed: false,
        usedBy: undefined,
        usedAt: undefined,
      }))
    );
  }, []);

  // Update Owner Credentials
  const updateOwnerCredentials = useCallback((newCreds: OwnerCredentials) => {
    setOwnerCredentials(newCreds);
  }, []);

  // Update Owner Config
  const updateOwnerConfig = useCallback((newConfig: OwnerConfig) => {
    setOwnerConfig(newConfig);
  }, []);

  return {
    codes,
    userSession,
    isActivated: !!userSession,
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
  };
}
