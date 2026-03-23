/** Warm dark-cream dark mode palette + matching light defaults */

export const lightTokens = {
  bg: '#ffffff',
  bgAlt: '#f9f8f6',
  bgFooter: '#f5f2ed',
  card: '#ffffff',
  fieldBg: '#fafaf9',
  text: '#1f1e1b',
  textMuted: 'rgba(31,30,27,0.55)',
  textFaint: 'rgba(31,30,27,0.35)',
  border: 'rgba(31,30,27,0.08)',
  borderInput: 'rgba(0,0,0,0.12)',
  borderDivider: 'rgba(0,0,0,0.07)',
  quoteText: 'rgba(30,26,21,0.85)',
  progressBg: 'rgba(0,0,0,0.06)',
  progressFill: 'rgba(30,26,21,0.25)',
};

export const darkTokens = {
  bg: '#1c1a17',
  bgAlt: '#1f1d1a',
  bgFooter: '#191714',
  card: '#252320',
  fieldBg: '#2a2824',
  text: '#e8e4da',
  textMuted: 'rgba(232,228,218,0.52)',
  textFaint: 'rgba(232,228,218,0.28)',
  border: 'rgba(232,228,218,0.08)',
  borderInput: 'rgba(232,228,218,0.14)',
  borderDivider: 'rgba(232,228,218,0.08)',
  quoteText: 'rgba(232,228,218,0.82)',
  progressBg: 'rgba(232,228,218,0.08)',
  progressFill: 'rgba(232,228,218,0.3)',
};

export type Tokens = typeof lightTokens;

export function getTokens(isDark: boolean): Tokens {
  return isDark ? darkTokens : lightTokens;
}
