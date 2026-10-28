import React from "react";

interface ToolNestLogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
  textClassName?: string;
  badge?: string;
}

export function ToolNestLogo({
  className = "h-8 w-8",
  size,
  withText = false,
  textClassName = "text-xl font-bold tracking-tight text-foreground",
  badge,
}: ToolNestLogoProps) {
  const iconStyle = size ? { width: size, height: size } : undefined;

  return (
    <div className="flex items-center gap-2.5">
      <div
        style={iconStyle}
        className={`relative shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 ${size ? "" : className}`}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ToolNest Logo"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(0,212,255,0.35)]"
        >
          <defs>
            <linearGradient id="tn-primary-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="tn-secondary-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
            <linearGradient id="tn-core-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <filter id="tn-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#00D4FF" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Squircle Tile Base */}
          <rect width="64" height="64" rx="18" fill="#0A0D14" />
          <rect
            x="1.5"
            y="1.5"
            width="61"
            height="61"
            rx="16.5"
            stroke="url(#tn-primary-grad)"
            strokeWidth="2"
            strokeOpacity="0.6"
          />

          {/* Upper Nest Bar (Protective canopy & 'T' bar) */}
          <path
            d="M14 23 C14 15 22 13 32 13 C42 13 50 15 50 23"
            stroke="url(#tn-primary-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Lower Nest Cradle (Deep bowl & 'N' foundation) */}
          <path
            d="M12 28 C12 43 20 51 32 51 C44 51 52 43 52 28"
            stroke="url(#tn-secondary-grad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Flank connectors */}
          <path
            d="M18 26 L18 34 M46 26 L46 34"
            stroke="url(#tn-primary-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />

          {/* Central Nestled AI Star Diamond */}
          <path
            d="M32 19 L35.5 28.5 L45 32 L35.5 35.5 L32 45 L28.5 35.5 L19 32 L28.5 28.5 Z"
            fill="url(#tn-core-glow)"
            filter="url(#tn-shadow)"
          />
          <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
        </svg>
      </div>

      {withText && (
        <span className={textClassName}>
          Tool<span className="text-gradient">Nest</span>
          {badge && (
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {badge}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
