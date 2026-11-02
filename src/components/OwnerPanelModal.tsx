import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Search, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  UserCheck, 
  Settings, 
  X, 
  Eye, 
  EyeOff, 
  Save, 
  Copy, 
  Check, 
  Wallet, 
  LogOut
} from 'lucide-react';
import { 
  ActivationCodeItem 
} from '../data/activationCodes';
import { 
  OwnerCredentials, 
  OwnerConfig, 
  UserSession 
} from '../hooks/useActivationStore';
import { useLanguage } from '../context/LanguageContext';

interface OwnerPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOwnerLoggedIn: boolean;
  onLoginOwner: (email: string, pin: string, password: string) => { success: boolean; message: string };
  onLogoutOwner: () => void;
  codes: ActivationCodeItem[];
  subscribers: UserSession[];
  ownerCredentials: OwnerCredentials;
  ownerConfig: OwnerConfig;
  onAddCodes: (newCodes: string[]) => void;
  onDeleteCode: (code: string) => void;
  onToggleCodeStatus: (code: string) => void;
  onResetAllCodes: () => void;
  onUpdateOwnerCredentials: (creds: OwnerCredentials) => void;
  onUpdateOwnerConfig: (config: OwnerConfig) => void;
}

export const OwnerPanelModal: React.FC<OwnerPanelModalProps> = ({
  isOpen,
  onClose,
  isOwnerLoggedIn,
  onLoginOwner,
  onLogoutOwner,
  codes,
  subscribers,
  ownerCredentials,
  ownerConfig,
  onAddCodes,
  onDeleteCode,
  onToggleCodeStatus,
  onResetAllCodes,
  onUpdateOwnerCredentials,
  onUpdateOwnerConfig,
}) => {
  const { language, t } = useLanguage();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState<{ success: boolean; text: string } | null>(null);

  // Active Tab inside Owner Panel
  const [activeTab, setActiveTab] = useState<'codes' | 'subscribers' | 'site_settings' | 'security_settings'>('codes');

  // Codes management filters
  const [codeSearch, setCodeSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'used' | 'unused'>('all');
  const [bulkInput, setBulkInput] = useState('');
  const [showAddBulkModal, setShowAddBulkModal] = useState(false);

  // Editable owner config form state
  const [editConfig, setEditConfig] = useState<OwnerConfig>(ownerConfig);
  const [configSaved, setConfigSaved] = useState(false);

  // Editable credentials form state
  const [editCreds, setEditCreds] = useState<OwnerCredentials>(ownerCredentials);
  const [credsSaved, setCredsSaved] = useState(false);

  // Copy helper state
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginFeedback(null);
    const res = onLoginOwner(loginEmail, loginPin, loginPassword);
    setLoginFeedback({ success: res.success, text: res.message });
    if (res.success) {
      setLoginEmail('');
      setLoginPin('');
      setLoginPassword('');
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOwnerConfig(editConfig);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleSaveCreds = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateOwnerCredentials(editCreds);
    setCredsSaved(true);
    setTimeout(() => setCredsSaved(false), 3000);
  };

  const handleAddBulkCodesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCodes = bulkInput
      .split(/[\n,;\s]+/)
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (parsedCodes.length > 0) {
      onAddCodes(parsedCodes);
      setBulkInput('');
      setShowAddBulkModal(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filtered codes
  const filteredCodes = codes.filter((item) => {
    const matchesSearch = item.code.toLowerCase().includes(codeSearch.toLowerCase()) ||
      (item.usedBy && item.usedBy.toLowerCase().includes(codeSearch.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'used' && item.isUsed) || 
      (statusFilter === 'unused' && !item.isUsed);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const usedCount = codes.filter((c) => c.isUsed).length;
  const unusedCount = codes.filter((c) => !c.isUsed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-5xl w-full p-5 sm:p-7 shadow-2xl relative space-y-6 my-8 max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {language === 'ar' ? 'لوحة المالك والتحكم الكامل (المهندس رقيب)' : 'Owner Control Panel (Eng. Rqeeb)'}
                </h3>
                <span className="text-[10px] bg-red-600/30 text-red-300 border border-red-500/40 px-2.5 py-0.5 rounded-full font-bold">
                  {language === 'ar' ? 'سرية' : 'Confidential'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'إدارة أكواد التفعيل الـ 350+، تفعيل الاشتراك المشترك، وتعديل إعدادات الموقع والمحافظ' : 'Manage 350+ activation codes, user sessions, wallet numbers & settings'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwnerLoggedIn && (
              <button
                onClick={onLogoutOwner}
                className="bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition cursor-pointer shrink-0"
                title={language === 'ar' ? 'تسجيل الخروج من لوحة المالك' : 'Logout Owner Panel'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition cursor-pointer shrink-0"
              id="btn-close-owner-panel-modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* -------------------- OWNER LOGIN SCREEN (If not logged in) -------------------- */}
        {!isOwnerLoggedIn ? (
          <div className="space-y-6 max-w-md mx-auto py-6 flex-1 overflow-y-auto w-full">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-amber-400 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">
                {language === 'ar' ? 'تسجيل دخول المالك والمهندس الاستشاري' : 'Owner / Admin Portal Access'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'أدخل البريد الإلكتروني، رمز PIN، وكلمة السر المعتمدة للوصول للوحة التحكم' : 'Enter email, PIN code, and password to authenticate'}
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              {/* Field 1: Owner Email */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">{language === 'ar' ? 'البريد الإلكتروني للمالك:' : 'Owner Email:'}</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  dir="ltr"
                />
              </div>

              {/* Field 2: Owner PIN */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">{language === 'ar' ? 'رمز PIN السري:' : 'Secret PIN:'}</label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  placeholder="••••"
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono tracking-widest font-bold"
                  dir="ltr"
                />
              </div>

              {/* Field 3: Owner Password */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">{language === 'ar' ? 'كلمة السر:' : 'Password:'}</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute ltr:right-3 rtl:left-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold ${
                    loginFeedback.success
                      ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                      : 'bg-red-950 border border-red-500 text-red-300'
                  }`}
                >
                  {loginFeedback.text}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                id="btn-submit-owner-login"
              >
                <Key className="w-4 h-4" />
                <span>{language === 'ar' ? 'دخول لوحة التحكم والمالك' : 'Login to Owner Panel'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* -------------------- OWNER CONTROL DASHBOARD (When Logged In) -------------------- */
          <div className="flex-1 flex flex-col overflow-hidden space-y-4">
            
            {/* Owner Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700 shrink-0 text-xs sm:text-sm font-bold">
              <button
                onClick={() => setActiveTab('codes')}
                className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'codes'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>{language === 'ar' ? `إدارة الأكواد الـ 350+ (${codes.length})` : `Manage Codes (${codes.length})`}</span>
              </button>

              <button
                onClick={() => setActiveTab('subscribers')}
                className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'subscribers'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>{language === 'ar' ? `المشتركون والمفعّلون (${subscribers.length})` : `Subscribers (${subscribers.length})`}</span>
              </button>

              <button
                onClick={() => setActiveTab('site_settings')}
                className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'site_settings'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{language === 'ar' ? 'تعديل بيانات المحفظة والموقع' : 'Site & Wallet Settings'}</span>
              </button>

              <button
                onClick={() => setActiveTab('security_settings')}
                className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'security_settings'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>{language === 'ar' ? 'تعديل PIN المالك والدخول' : 'Security & PIN Settings'}</span>
              </button>
            </div>

            {/* TAB 1: ACTIVATION CODES MANAGEMENT (350+ CODES) */}
            {activeTab === 'codes' && (
              <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0">
                  <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
                    <span className="text-slate-400 block">{language === 'ar' ? 'إجمالي الأكواد:' : 'Total Codes:'}</span>
                    <span className="text-lg font-bold text-white font-mono">{codes.length}</span>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
                    <span className="text-slate-400 block">{language === 'ar' ? 'أكواد مفعّلة/مستخدمة:' : 'Used Codes:'}</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">{usedCount}</span>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700">
                    <span className="text-slate-400 block">{language === 'ar' ? 'أكواد غير مستعملة:' : 'Unused Codes:'}</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">{unusedCount}</span>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 flex items-center justify-between">
                    <button
                      onClick={() => setShowAddBulkModal(true)}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{language === 'ar' ? 'إضافة أكواد جديدة' : 'Add New Codes'}</span>
                    </button>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
                  <div className="relative w-full sm:w-72">
                    <input
                      type="text"
                      placeholder={language === 'ar' ? 'بحث عن كود أو مستخدم...' : 'Search code or user...'}
                      value={codeSearch}
                      onChange={(e) => setCodeSearch(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-2" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto text-xs">
                    {/* Category Filter */}
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-1.5 text-white font-bold"
                    >
                      <option value="all">{language === 'ar' ? 'كل الفئات' : 'All Categories'}</option>
                      <option value="gmail">Google (gmail)</option>
                      <option value="face">Facebook (face)</option>
                      <option value="whats">WhatsApp (whats)</option>
                      <option value="insta">Instagram (insta)</option>
                      <option value="tik">TikTok (tik)</option>
                      <option value="snap">Snapchat (snap)</option>
                    </select>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="bg-slate-900 border border-slate-600 rounded-xl px-3 py-1.5 text-white font-bold"
                    >
                      <option value="all">{language === 'ar' ? 'كل الحالات' : 'All Statuses'}</option>
                      <option value="unused">{language === 'ar' ? 'غير مستعمل فقط' : 'Unused Only'}</option>
                      <option value="used">{language === 'ar' ? 'مستخدم ومفعل فقط' : 'Used Only'}</option>
                    </select>

                    <button
                      onClick={onResetAllCodes}
                      className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-2.5 py-1.5 rounded-xl transition flex items-center gap-1 cursor-pointer"
                      title={language === 'ar' ? 'إعادة تعيين الأكواد لغير مستعمل' : 'Reset All Codes to Unused'}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'إعادة ضبط الحالات' : 'Reset Statuses'}</span>
                    </button>
                  </div>
                </div>

                {/* Codes List Table */}
                <div className="flex-1 overflow-y-auto border border-slate-800 rounded-2xl bg-slate-950/60 p-2 space-y-1.5">
                  {filteredCodes.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      {language === 'ar' ? 'لا توجد أكواد تطابق خيارات البحث الحالية.' : 'No codes match search filter.'}
                    </div>
                  ) : (
                    filteredCodes.map((item) => (
                      <div
                        key={item.code}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900/90 hover:bg-slate-850 p-2.5 px-3.5 rounded-xl border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-white select-all">
                            {item.code}
                          </span>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.category === 'gmail'
                                ? 'bg-red-500/20 text-red-300'
                                : item.category === 'face'
                                ? 'bg-blue-500/20 text-blue-300'
                                : item.category === 'whats'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : item.category === 'insta'
                                ? 'bg-pink-500/20 text-pink-300'
                                : item.category === 'tik'
                                ? 'bg-slate-700 text-slate-200'
                                : item.category === 'snap'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}
                          >
                            {item.category.toUpperCase()}
                          </span>

                          {item.isUsed ? (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <span>{language === 'ar' ? `مفعل لـ: ${item.usedBy}` : `Used by: ${item.usedBy}`}</span>
                            </span>
                          ) : (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                              {language === 'ar' ? 'جاهز للاستعمال' : 'Ready / Unused'}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => copyToClipboard(item.code)}
                            className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 transition cursor-pointer"
                          >
                            {copiedCode === item.code ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedCode === item.code ? (language === 'ar' ? 'نسخ' : 'Copied') : (language === 'ar' ? 'نسخ' : 'Copy')}</span>
                          </button>

                          <button
                            onClick={() => onToggleCodeStatus(item.code)}
                            className={`text-[11px] px-2.5 py-1 rounded-lg border font-bold transition cursor-pointer ${
                              item.isUsed
                                ? 'bg-amber-600/20 text-amber-300 border-amber-500/30 hover:bg-amber-600/40'
                                : 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-600/40'
                            }`}
                          >
                            {item.isUsed ? (language === 'ar' ? 'إلغاء التفعيل' : 'Deactivate') : (language === 'ar' ? 'تفعيل يدوياً' : 'Activate Manually')}
                          </button>

                          <button
                            onClick={() => onDeleteCode(item.code)}
                            className="text-slate-500 hover:text-red-400 p-1 transition cursor-pointer"
                            title={language === 'ar' ? 'حذف الكود' : 'Delete Code'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: SUBSCRIBERS LOG */}
            {activeTab === 'subscribers' && (
              <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1 shrink-0">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'ar' ? 'سجل المستخدمين الذين قاموا بتفعيل الاشتراك المشترك' : 'Active Subscriber Log'}</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'يعرض كل هاتف أو بريد الكود الذي استخدمه وتاريخ التفعيل.' : 'Displays identity, activated master code, and timestamp.'}
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto border border-slate-800 rounded-2xl bg-slate-950/60 p-3 space-y-2">
                  {subscribers.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-xs">
                      {language === 'ar' ? 'لا يوجد مستخدمون مفعّلون حتى الآن.' : 'No active subscribers logged yet.'}
                    </div>
                  ) : (
                    subscribers.map((sub, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-white text-sm font-mono">
                            {sub.identity}
                          </div>
                          <div className="text-slate-400 flex items-center gap-2 font-mono">
                            <span>{language === 'ar' ? 'كود الاشتراك:' : 'Code:'} <strong className="text-amber-300">{sub.code}</strong></span>
                            <span>•</span>
                            <span>{language === 'ar' ? 'التاريخ:' : 'Date:'} {sub.activatedAt}</span>
                          </div>
                        </div>

                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                          {language === 'ar' ? 'اشتراك نشط' : 'Active Subscription'}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: SITE & WALLET SETTINGS */}
            {activeTab === 'site_settings' && (
              <form onSubmit={handleSaveConfig} className="flex-1 overflow-y-auto space-y-4 pr-1">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-amber-400" />
                    <span>{language === 'ar' ? 'إعدادات محفظة جيب ورسوم الاشتراك وبيانات التواصل' : 'Wallet & Subscription Pricing Configuration'}</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'عدّل رقم المحفظة، قيمة الاشتراك، ورابط الدعم الفني وستتغير فوراً في واجهة المستخدم.' : 'Update wallet phone number, subscription fee, and contact links.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Wallet Phone Number */}
                  <div className="space-y-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-200">{language === 'ar' ? 'رقم محفظة جيب والمحافظ المعتمد:' : 'Wallet Phone Number:'}</label>
                    <input
                      type="text"
                      value={editConfig.walletPhone}
                      onChange={(e) => setEditConfig({ ...editConfig, walletPhone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2 text-white font-mono text-sm"
                      dir="ltr"
                    />
                  </div>

                  {/* Wallet Title / Name */}
                  <div className="space-y-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-200">{language === 'ar' ? 'اسم المحفظة المعروض للعميل:' : 'Wallet Display Name:'}</label>
                    <input
                      type="text"
                      value={editConfig.walletName}
                      onChange={(e) => setEditConfig({ ...editConfig, walletName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2 text-white text-sm"
                    />
                  </div>

                  {/* Subscription Price */}
                  <div className="space-y-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-200">{language === 'ar' ? 'قيمة الاشتراك (مثال: 1500 ريال يمني):' : 'Subscription Price:'}</label>
                    <input
                      type="text"
                      value={editConfig.subscriptionPrice}
                      onChange={(e) => setEditConfig({ ...editConfig, subscriptionPrice: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2 text-white text-sm"
                    />
                  </div>

                  {/* Telegram Bot */}
                  <div className="space-y-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-200">{language === 'ar' ? 'رابط بوت التيليجرام الرسمي:' : 'Official Telegram Bot URL:'}</label>
                    <input
                      type="text"
                      value={editConfig.telegramBot}
                      onChange={(e) => setEditConfig({ ...editConfig, telegramBot: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2 text-white font-mono text-sm"
                      dir="ltr"
                    />
                  </div>

                  {/* Announcement Text */}
                  <div className="space-y-1 bg-slate-800 p-4 rounded-2xl border border-slate-700 md:col-span-2">
                    <label className="block font-bold text-slate-200">{language === 'ar' ? 'نص الإعلان الشريطي العلوي للمستخدمين:' : 'Top Banner Announcement Text:'}</label>
                    <textarea
                      rows={2}
                      value={editConfig.announcementText}
                      onChange={(e) => setEditConfig({ ...editConfig, announcementText: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-white text-xs leading-relaxed"
                    />
                  </div>
                </div>

                {configSaved && (
                  <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تم حفظ إعدادات المحفظة والموقع بنجاح!' : 'Wallet and site settings saved successfully!'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{language === 'ar' ? 'حفظ التعديلات الحالية' : 'Save Changes'}</span>
                </button>
              </form>
            )}

            {/* TAB 4: OWNER CREDENTIALS & PIN SETTINGS */}
            {activeTab === 'security_settings' && (
              <form onSubmit={handleSaveCreds} className="flex-1 overflow-y-auto space-y-4 pr-1">
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-400" />
                    <span>{language === 'ar' ? 'تعديل بريد المالك، رمز PIN السري وكلمة السر' : 'Modify Owner Credentials & PIN'}</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === 'ar' ? 'قم بتحديث بيانات دخول لوحة المالك لحماية لوحة التحكم.' : 'Update owner email, PIN, and password.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Email */}
                  <div className="space-y-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-200">{language === 'ar' ? 'البريد الإلكتروني للمالك:' : 'Owner Email:'}</label>
                    <input
                      type="email"
                      required
                      value={editCreds.email}
                      onChange={(e) => setEditCreds({ ...editCreds, email: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2 text-white font-mono text-sm"
                      dir="ltr"
                    />
                  </div>

                  {/* PIN */}
                  <div className="space-y-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-200">{language === 'ar' ? 'رمز PIN السري الخاص بالمالك:' : 'Secret PIN:'}</label>
                    <input
                      type="text"
                      required
                      value={editCreds.pin}
                      onChange={(e) => setEditCreds({ ...editCreds, pin: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2 text-white font-mono font-bold text-sm tracking-widest"
                      dir="ltr"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1 bg-slate-800 p-4 rounded-2xl border border-slate-700">
                    <label className="block font-bold text-slate-200">{language === 'ar' ? 'كلمة السر الجديدة:' : 'New Password:'}</label>
                    <input
                      type="text"
                      required
                      value={editCreds.password}
                      onChange={(e) => setEditCreds({ ...editCreds, password: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-600 rounded-xl px-3.5 py-2 text-white font-mono text-sm"
                      dir="ltr"
                    />
                  </div>
                </div>

                {credsSaved && (
                  <div className="p-3 bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تم تحديث بيانات دخول المالك بنجاح!' : 'Owner credentials updated successfully!'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl flex items-center gap-2 transition cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تحديث بيانات الدخول والـ PIN' : 'Update Credentials & PIN'}</span>
                </button>
              </form>
            )}

          </div>
        )}

        {/* Modal for Add Bulk Codes */}
        {showAddBulkModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <form onSubmit={handleAddBulkCodesSubmit} className="bg-slate-900 border border-slate-700 p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-400" />
                  <span>{language === 'ar' ? 'إضافة أكواد تفعيل جديدة للمنصة' : 'Add New Activation Codes'}</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddBulkModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">
                  {language === 'ar' ? 'اكتب الأكواد الجديدة (كود في كل سطر أو مفصولة بفاصلة):' : 'Enter new codes (one per line or comma-separated):'}
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder={language === 'ar' ? 'أدخل الأكواد الجديدة هنا (كود في كل سطر)...' : 'Enter new codes here (one per line)...'}
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono leading-relaxed"
                  dir="ltr"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition cursor-pointer"
                >
                  {language === 'ar' ? 'إضافة الأكواد الآن' : 'Add Codes Now'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddBulkModal(false)}
                  className="bg-slate-800 text-slate-300 text-xs px-4 py-2.5 rounded-xl hover:bg-slate-700"
                >
                  {t('closeModal')}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
