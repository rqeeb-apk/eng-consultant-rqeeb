export type PlatformId = 
  | 'google' 
  | 'facebook' 
  | 'instagram' 
  | 'whatsapp' 
  | 'tiktok' 
  | 'snapchat' 
  | 'x';

export interface CountryCode {
  country: string;
  nameAr: string;
  code: string;
  flag: string;
  example: string;
}

export interface TroubleshootIssue {
  id: string;
  title: string;
  badge: string;
  severity: 'critical' | 'high' | 'medium';
  description: string;
  whyHappens: string;
  solutionSteps: string[];
  tips: string[];
  screenName: string;
}

export interface RecoveryStep {
  stepNumber: number;
  title: string;
  summary: string;
  details: string[];
  warningNote?: string;
  actionButton?: {
    label: string;
    url: string;
    isExternal: boolean;
  };
}

export interface OfficialLinkItem {
  title: string;
  desc: string;
  url: string;
  badge: string;
  isPrimary?: boolean;
}

export interface SecurityCheckItem {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export interface PlatformConfig {
  id: PlatformId;
  nameAr: string;
  nameEn: string;
  tagline: string;
  colorClass: string;
  badgeColor: string;
  activeTabClass: string;
  iconName: string;
  primaryHackedTitle: string;
  primaryHackedExplanation: string;
  bypassGoldenTrick: {
    title: string;
    description: string;
    buttonLabel: string;
    steps: {
      stepTitle: string;
      stepDesc: string;
      highlight?: string;
    }[];
  };
  targetAccountHint: string;
  officialRecoveryUrl: string;
  officialLinks: OfficialLinkItem[];
  troubleshootIssues: TroubleshootIssue[];
  steps: RecoveryStep[];
  postSecurityChecklist: SecurityCheckItem[];
}

export interface SecurityAlert {
  id: string;
  title: string;
  body: string;
  date: string;
  type: 'critical' | 'update' | 'tip';
  platform?: PlatformId;
  linkText?: string;
  actionUrl?: string;
  read?: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  criticalAlerts: boolean;
  platformUpdates: boolean;
  securityTips: boolean;
}
