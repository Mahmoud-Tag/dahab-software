/**
 * DESIGN SYSTEM - Admin Dashboard
 * Modern SaaS Enterprise Grade
 */

// Color Palette
export const COLORS = {
  // Primary - Luxury Gold
  primary: {
    50: '#FEF9F0',
    100: '#FCEFD8',
    200: '#F9DFB1',
    300: '#F5D08A',
    400: '#F1C063',
    500: '#C9A227', // Main
    600: '#A88620',
    700: '#8B6A1A',
    800: '#6E4E13',
    900: '#52390D',
  },
  
  // Secondary - Deep Navy
  secondary: {
    50: '#F0F4FA',
    100: '#D9E2F0',
    200: '#B3C5E0',
    300: '#8CA8D1',
    400: '#668BC1',
    500: '#0F172A', // Main
    600: '#0D1420',
    700: '#0A0F16',
    800: '#080B0D',
    900: '#050708',
  },

  // Accent - Vibrant Blue
  accent: {
    50: '#EFF6FF',
    100: '#DEE9FF',
    200: '#BDD2FF',
    300: '#9CBBFF',
    400: '#7BA3FF',
    500: '#2563EB', // Main
    600: '#1D4ED8',
    700: '#1E40AF',
    800: '#1E3A8A',
    900: '#172554',
  },

  // Status Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBEF63',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#145231',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  info: {
    50: '#ECF6FF',
    100: '#D1E8FF',
    200: '#A8DAFF',
    300: '#7ECAFF',
    400: '#54B3FF',
    500: '#06B6D4',
    600: '#0891B2',
    700: '#0E7490',
    800: '#164E63',
    900: '#0C2D3A',
  },

  // Neutral - Gray scale
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EBEBEB',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Background & Surfaces
  background: '#F8FAFC',
  surface: {
    light: '#FFFFFF',
    dark: '#F8FAFC',
    hover: '#F1F5F9',
  },

  // Text
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    muted: '#64748B',
    light: '#94A3B8',
  },

  // Borders
  border: {
    light: '#E2E8F0',
    default: '#CBD5E1',
    dark: '#94A3B8',
  },
} as const

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    sans: "'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    mono: "'Fira Code', 'Monaco', monospace",
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const

// Spacing
export const SPACING = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
} as const

// Border Radius
export const RADIUS = {
  none: '0',
  sm: '0.25rem',  // 4px
  base: '0.375rem', // 6px
  md: '0.5rem',   // 8px
  lg: '0.75rem',  // 12px
  xl: '1rem',     // 16px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
  full: '9999px',
} as const

// Shadows
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
} as const

// Transitions
export const TRANSITIONS = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
} as const

// Z-Index Scale
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const

// Breakpoints
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const
