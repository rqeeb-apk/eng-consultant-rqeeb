import React from 'react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({ 
  size = 'md', 
  className = '',
  showText = false 
}) => {
  const sizeDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const svgDimensions = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 80,
  };

  const dim = svgDimensions[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Visual Tech Icon with Letter 'R' */}
      <div className={`relative ${sizeDimensions[size]} flex items-center justify-center shrink-0 group`}>
        {/* Glow halo background */}
        <div className="absolute -inset-1 bg-gradient-to-tr from-red-600 via-amber-500 to-cyan-500 rounded-2xl opacity-70 blur-xs group-hover:opacity-100 transition duration-300"></div>
        
        {/* SVG Container */}
        <div className="relative w-full h-full rounded-2xl bg-slate-950 p-1.5 border border-slate-700/80 shadow-xl flex items-center justify-center overflow-hidden">
          {/* Subtle Background Circuit Grid Pattern */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              {/* Linear Gradients */}
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>

              <linearGradient id="letterRGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>

              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Shield Outline */}
            <path
              d="M50 8 L85 22 V48 C85 70 70 86 50 94 C30 86 15 70 15 48 V22 L50 8 Z"
              fill="#0f172a"
              stroke="url(#shieldGrad)"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Tech Nodes & Circuit Connectors */}
            <circle cx="50" cy="18" r="2.5" fill="#38bdf8" />
            <circle cx="28" cy="30" r="2.5" fill="#ef4444" />
            <circle cx="72" cy="30" r="2.5" fill="#f59e0b" />
            <circle cx="50" cy="84" r="2.5" fill="#10b981" />

            <path d="M50 18 L50 25" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M28 30 L36 34" stroke="url(#circuitGrad)" strokeWidth="1.5" />
            <path d="M72 30 L64 34" stroke="url(#circuitGrad)" strokeWidth="1.5" />
            <path d="M50 84 L50 78" stroke="url(#circuitGrad)" strokeWidth="1.5" />

            {/* Styled Letter 'R' for Rqeeb / Engineering Consulting */}
            {/* R vertical stem */}
            <path
              d="M36 30 V70 M36 30 H54 C62 30 66 35 66 42 C66 49 62 53 54 53 H36 M50 53 L66 70"
              stroke="url(#letterRGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonGlow)"
            />

            {/* Inner Glowing Core Dot */}
            <circle cx="50" cy="41.5" r="2" fill="#ef4444" />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
              المهندس الاستشاري رقيب
            </span>
            <span className="text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-amber-600 text-white px-2 py-0.5 rounded-md shadow-xs">
              RqeebPro
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            شعار الاستشارة التقنية وإسترجاع الحسابات
          </span>
        </div>
      )}
    </div>
  );
};
