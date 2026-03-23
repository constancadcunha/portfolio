import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';

const socials = [
  { icon: 'ri-linkedin-box-line', label: 'LinkedIn', href: 'https://www.linkedin.com/in/constanca-cunha/' },
  { icon: 'ri-github-line', label: 'GitHub', href: 'https://github.com/constancadcunha' },
  { icon: 'ri-global-line', label: 'Website', href: 'https://constancadcunha.github.io/constancacunha/' },
];

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'About Me', href: '#about' },
  { label: "Let's Work", href: '#contact' },
];

export default function PortfolioFooter() {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: t.bgFooter, transition: 'background 0.5s ease' }}>
      {/* Nav + socials */}
      <div
        className="footer-links-row"
        style={{
          borderTop: `1px solid ${t.borderDivider}`,
          padding: '2.5rem 8%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <div className="flex items-center gap-6 flex-wrap">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={scrollTo(l.href)}
              className="font-dm transition-colors duration-200 cursor-pointer whitespace-nowrap"
              style={{ fontSize: '0.78rem', letterSpacing: '0.04em', color: t.textMuted }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 cursor-pointer"
              style={{ border: `1px solid ${t.border}`, color: t.textMuted }}
            >
              <i className={`${s.icon} text-base leading-none`} />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: `1px solid ${t.borderDivider}`,
          padding: '1.2rem 8%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <p className="font-dm" style={{ fontSize: '0.74rem', letterSpacing: '0.04em', color: t.textMuted }}>
          &copy; {new Date().getFullYear()} Constança Cunha. All rights reserved.
        </p>
        <p className="font-dm" style={{ fontSize: '0.74rem', letterSpacing: '0.04em', color: t.textMuted }}>
          Last updated March 2026
        </p>
        <p className="font-cormorant italic" style={{ fontSize: '0.95rem', color: t.textMuted }}>
          designed &amp; built with care
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-links-row { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  );
}
