import { useEffect, useRef } from 'react';
import './HeroNew.css';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';

const QUOTE =
  "The best portfolios don\u2019t show what you designed.\u00a0They show how you think.";

export default function HeroQuote() {
  const outerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  useEffect(() => {
    const container = textRef.current;
    if (!container) return;
    const scrollContainer = document.querySelector<HTMLElement>('.portfolio-scroll');
    if (!scrollContainer) return;

    const words = QUOTE.split(' ');
    container.innerHTML = words
      .map((word, wi) => {
        const chars = word
          .split('')
          .map((ch) => `<span class="hq-char">${ch}</span>`)
          .join('');
        const space =
          wi < words.length - 1
            ? `<span class="hq-char hq-space">&nbsp;</span>`
            : '';
        return `<span class="hq-word">${chars}${space}</span>`;
      })
      .join('');

    const chars = Array.from(
      container.querySelectorAll<HTMLSpanElement>('.hq-char')
    );
    chars.forEach((c) => {
      c.style.opacity = '0.07';
      c.style.transition = 'opacity 0.1s ease';
    });

    const onScroll = () => {
      const outer = outerRef.current;
      if (!outer) return;

      const outerH = outer.offsetHeight;
      const winH = scrollContainer.clientHeight;
      const scrollRange = outerH - winH;
      if (scrollRange <= 0) return;

      const relativeTop = scrollContainer.scrollTop - outer.offsetTop;
      const p = Math.max(0, Math.min(1, relativeTop / scrollRange));
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${p * 100}%`;
      }

      const total = chars.length;
      const revealed = Math.round(p * total * 1.06);
      chars.forEach((c, i) => {
        c.style.opacity = i < revealed ? '1' : '0.07';
      });
    };

    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => scrollContainer.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={outerRef}
      style={{ position: 'relative', height: '160vh', background: t.bg, transition: 'background 0.5s ease' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: t.bg,
          transition: 'background 0.5s ease',
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 2,
            background: t.progressBg,
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: '100%',
              background: t.progressFill,
              width: '0%',
              transition: 'width 0.05s linear',
              borderRadius: '0 1px 1px 0',
            }}
          />
        </div>

        {/* Quote text */}
        <p
          ref={textRef}
          className="hq-text font-cormorant font-light italic text-center"
          style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.85rem)',
            color: t.quoteText,
            lineHeight: 1.52,
            maxWidth: '48rem',
            padding: '0 2.5rem',
            transition: 'color 0.5s ease',
          }}
        >
          {QUOTE}
        </p>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            opacity: 0,
            transition: 'opacity 0.5s ease',
          }}
          id="hq-scroll-hint"
        >
          <div
            style={{
              width: 1, height: 28,
              background: t.textMuted,
              animation: 'scrollNudgeQuote 2s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.44rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: t.textMuted,
            }}
          >
            keep scrolling
          </span>
        </div>
      </div>

      <style>{`
        @keyframes scrollNudgeQuote {
          0%, 100% { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }
      `}</style>
    </div>
  );
}
