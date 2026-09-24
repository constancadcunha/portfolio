import { useEffect, useState } from 'react';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { paintingUrl } from '../../../utils/paintings';

/**
 * A short "curtain" over the painting that lifts to reveal the portfolio.
 * - Finishes on its own in ~1.1s
 * - Any scroll, wheel, touch, click or key skips it immediately
 * - Shown once per session, never under prefers-reduced-motion
 * The page underneath is fully rendered and interactive-ready the whole time.
 */
const SESSION_KEY = 'intro-seen';
const DURATION_MS = 1100;

function shouldShowIntro(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* storage blocked: still show it, it's short */
  }
  return true;
}

export default function IntroOverlay() {
  const { isDark } = useDarkMode();
  const [visible, setVisible] = useState(shouldShowIntro);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => setVisible(false);
    const timer = window.setTimeout(dismiss, DURATION_MS);
    const events = ['wheel', 'touchstart', 'pointerdown', 'keydown', 'scroll'] as const;
    events.forEach((ev) => window.addEventListener(ev, dismiss, { once: true, passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, dismiss));
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="intro-curtain"
      style={{
        position: 'fixed', inset: 0, zIndex: 80,
        backgroundImage: `url("${paintingUrl(isDark)}")`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <span
        className="font-cormorant font-light intro-curtain-name"
        style={{
          fontSize: 'clamp(1.6rem, 3.6vw, 2.6rem)',
          letterSpacing: '0.04em',
          color: isDark ? '#f3efe6' : '#1f1e1b',
          textShadow: isDark ? '0 1px 12px rgba(0,0,0,0.6)' : '0 1px 12px rgba(255,255,255,0.85)',
        }}
      >
        Constança Cunha
      </span>
      <style>{`
        .intro-curtain { animation: introCurtain ${DURATION_MS}ms cubic-bezier(0.65,0,0.35,1) forwards; }
        .intro-curtain-name { animation: introName ${DURATION_MS}ms ease forwards; }
        @keyframes introCurtain {
          0%, 45% { opacity: 1; }
          100%    { opacity: 0; }
        }
        @keyframes introName {
          0%   { opacity: 0; transform: translateY(6px); }
          25%  { opacity: 1; transform: translateY(0); }
          55%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
