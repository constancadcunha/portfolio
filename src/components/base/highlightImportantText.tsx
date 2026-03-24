import React from 'react';

const HIGHLIGHT_PATTERN = /(~?\d[\d,.]*(?:\/\d[\d,.]*)?(?:\+|%)?|\b\d+[\w-]*\b|\b[ABC]\d\b|\bTier-\d\b|\bv\d\b)/g;

const LIGHT_MONET_COLORS: Record<string, string> = {
  blue: '#6f97c4',
  purple: '#a693cf',
  gold: '#d7bb7b',
  sage: '#8fb79f',
  amber: '#cfa67f',
  sky: '#79a9d8',
  lilac: '#b59ad9',
  honey: '#d7b169',
  mint: '#87bba2',
  coral: '#d49983',
};

const DARK_VANGOGH_COLORS: Record<string, string> = {
  blue: '#6f97e8',
  purple: '#9a7fd6',
  gold: '#e4b741',
  sage: '#76ad8f',
  amber: '#d59a4f',
  sky: '#7cb5ff',
  lilac: '#b493ff',
  honey: '#f0c35a',
  mint: '#7ec3a5',
  coral: '#e7a072',
};

const PALETTE_ORDER = ['blue', 'purple', 'gold', 'sage', 'amber', 'sky', 'lilac', 'honey', 'mint', 'coral'] as const;

function hashKey(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function highlightImportantText(text: string, isDark: boolean, groupKey?: string): React.ReactNode {
  const palette = isDark ? DARK_VANGOGH_COLORS : LIGHT_MONET_COLORS;
  const key = (groupKey ?? '').toLowerCase();
  const directTone = PALETTE_ORDER.find((tone) => key.includes(tone));
  const fallbackTone = PALETTE_ORDER[hashKey(groupKey ?? text) % PALETTE_ORDER.length];
  const accentColor = palette[directTone ?? fallbackTone];
  const accentStyle: React.CSSProperties = {
    color: accentColor,
    fontWeight: 700,
  };

  const nodes: React.ReactNode[] = [];
  const matches = text.matchAll(HIGHLIGHT_PATTERN);
  let lastIndex = 0;
  let matchIndex = 0;

  for (const match of matches) {
    const start = match.index ?? 0;
    const value = match[0];

    if (start > lastIndex) {
      nodes.push(
        <React.Fragment key={`text-${matchIndex}`}>
          {text.slice(lastIndex, start)}
        </React.Fragment>
      );
    }

    nodes.push(
      <span key={`highlight-${matchIndex}`} style={accentStyle}>
        {value}
      </span>
    );

    lastIndex = start + value.length;
    matchIndex += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(
      <React.Fragment key={`text-tail-${matchIndex}`}>
        {text.slice(lastIndex)}
      </React.Fragment>
    );
  }

  return nodes;
}