import { useDarkMode } from '../../contexts/DarkModeContext';
import { getTokens } from '../../utils/darkTokens';
import Icon from '../base/Icon';

export interface ShotImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface FigmaToShippedProps {
  /** Screenshot/export of the Figma frame. Leave undefined until you have it. */
  figma?: ShotImage;
  /** Screenshot of the shipped, live result. */
  shipped?: ShotImage;
  /** Shown as the Figma frame label, e.g. "Property feed / Desktop". */
  frameName: string;
  /** Shown in the fake browser address bar, e.g. "knitcraft.app/charts". */
  url?: string;
  caption?: string;
}

const FIGMA_BLUE = '#0d99ff';

/**
 * Two-column "Figma → shipped" comparison: the design frame on a Figma-style
 * canvas beside the same screen in a browser window.
 *
 * Missing images render as labelled placeholders in dev only. In production a
 * pair is hidden until both sides exist, so the live site never shows a gap.
 */
export default function FigmaToShipped({ figma, shipped, frameName, url, caption }: FigmaToShippedProps) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  if (!import.meta.env.DEV && !(figma && shipped)) return null;

  const panelBorder = `1px solid ${t.border}`;

  return (
    <figure className="f2s" style={{ margin: 0 }}>
      <div className="f2s-grid">
        {/* ── Figma side ── */}
        <div className="f2s-panel" style={{ border: panelBorder, background: isDark ? '#1e1e1e' : '#f5f5f5' }}>
          <div className="f2s-bar" style={{ background: '#2c2c2c', color: 'rgba(255,255,255,0.85)' }}>
            <FigmaMark />
            <span>Figma</span>
            <span style={{ opacity: 0.75, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>/ {frameName}</span>
          </div>
          <div
            className="f2s-canvas"
            style={{
              backgroundColor: isDark ? '#1e1e1e' : '#e9e9e9',
              backgroundImage: `radial-gradient(${isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.12)'} 1px, transparent 1px)`,
              backgroundSize: '12px 12px',
            }}
          >
            <span className="f2s-frame-label" style={{ color: isDark ? '#6cc0ff' : '#0a62ab' }}>{frameName}</span>
            <div className="f2s-frame" style={{ outline: `1.5px solid ${FIGMA_BLUE}` }}>
              <Slot image={figma} todo="TODO: add the Figma frame export" isDark={isDark} />
              {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
                <span key={c} className={`f2s-handle f2s-${c}`} style={{ borderColor: FIGMA_BLUE }} aria-hidden="true" />
              ))}
            </div>
          </div>
        </div>

        {/* ── Arrow ── */}
        <div className="f2s-arrow" aria-hidden="true" style={{ background: t.card, border: panelBorder, color: t.text }}>
          <Icon name="ri-arrow-right-line" />
        </div>

        {/* ── Shipped side ── */}
        <div className="f2s-panel" style={{ border: panelBorder, background: t.card }}>
          <div className="f2s-bar" style={{ background: isDark ? '#2a2824' : '#f1eee9', color: t.textMuted }}>
            <span className="f2s-dots" aria-hidden="true"><i /><i /><i /></span>
            <span
              className="f2s-url"
              style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff', border: panelBorder, color: t.textMuted }}
            >
              <Icon name="ri-lock-line" /> {url ?? 'Shipped'}
            </span>
          </div>
          <div className="f2s-shot">
            <Slot image={shipped} todo="TODO: add a screenshot of the shipped screen" isDark={isDark} />
          </div>
        </div>
      </div>

      <figcaption className="font-dm" style={{ marginTop: '0.75rem', fontSize: '0.72rem', color: t.textMuted, display: 'flex', gap: '0.5rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.58rem', color: t.text }}>Figma → shipped</span>
        {caption && <span>{caption}</span>}
      </figcaption>

      <style>{`
        .f2s-grid { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .f2s-panel { border-radius: 0.75rem; overflow: hidden; display: flex; flex-direction: column; min-width: 0; }
        .f2s-bar { display: flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.7rem; font-family: 'DM Sans Variable', 'DM Sans', sans-serif; font-size: 0.62rem; min-height: 2rem; }
        .f2s-canvas { position: relative; flex: 1; padding: 1.6rem 1.1rem 1.1rem; }
        .f2s-frame-label { position: absolute; top: 0.45rem; left: 1.1rem; font-family: 'DM Sans Variable', 'DM Sans', sans-serif; font-size: 0.58rem; font-weight: 500; }
        .f2s-frame { position: relative; aspect-ratio: 16 / 10; background: #fff; }
        .f2s-handle { position: absolute; width: 7px; height: 7px; background: #fff; border: 1.5px solid; }
        .f2s-tl { top: -4px; left: -4px; } .f2s-tr { top: -4px; right: -4px; }
        .f2s-bl { bottom: -4px; left: -4px; } .f2s-br { bottom: -4px; right: -4px; }
        .f2s-shot { flex: 1; display: flex; align-items: center; padding: 1.1rem; }
        .f2s-shot > * { width: 100%; aspect-ratio: 16 / 10; }
        .f2s-dots { display: inline-flex; gap: 4px; }
        .f2s-dots i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; opacity: 0.35; }
        .f2s-url { flex: 1; min-width: 0; border-radius: 999px; padding: 0.15rem 0.6rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .f2s-arrow { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 2rem; height: 2rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 2; box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
        @media (max-width: 640px) {
          .f2s-grid { grid-template-columns: 1fr; gap: 1.6rem; }
          .f2s-arrow { transform: translate(-50%, -50%) rotate(90deg); }
        }
      `}</style>
    </figure>
  );
}

function Slot({ image, todo, isDark }: { image?: ShotImage; todo: string; isDark: boolean }) {
  if (image) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        width={image.width ?? 1200}
        height={image.height ?? 750}
        loading="lazy"
        decoding="async"
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
      />
    );
  }
  return (
    <div
      className="font-dm"
      style={{
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '1rem', fontSize: '0.62rem', lineHeight: 1.5,
        border: `1.5px dashed ${isDark ? 'rgba(232,228,218,0.25)' : 'rgba(31,30,27,0.25)'}`,
        color: isDark ? 'rgba(232,228,218,0.7)' : 'rgba(31,30,27,0.7)',
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
      }}
    >
      {todo}
    </div>
  );
}

function FigmaMark() {
  return (
    <svg width="8" height="12" viewBox="0 0 38 57" aria-hidden="true">
      <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </svg>
  );
}
