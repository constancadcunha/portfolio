import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';

export default function PortfolioFooter() {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  return (
    <footer style={{ background: t.bgFooter, transition: 'background 0.5s ease', marginTop: '-1rem', position: 'relative', zIndex: 2 }}>
      {/* Bottom bar */}
      <div
        style={{
          borderTop: `1px solid ${t.borderDivider}`,
          padding: '2rem 8% calc(7.5vh + 1.75rem + env(safe-area-inset-bottom))',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
        }}
      >
        <p className="font-dm" style={{ fontSize: '0.86rem', letterSpacing: '0.03em', color: t.textMuted, justifySelf: 'center' }}>
          &copy; {new Date().getFullYear()} Constança Cunha.
        </p>
        <p className="font-dm" style={{ fontSize: '0.86rem', letterSpacing: '0.03em', color: t.textMuted, justifySelf: 'center' }}>
          Last updated March 2026
        </p>
        <p className="font-cormorant italic" style={{ fontSize: '1.12rem', color: t.textMuted, justifySelf: 'center' }}>
          designed &amp; built with care
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          footer > div p {
            justify-self: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
