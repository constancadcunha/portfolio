import { useState, useEffect, useCallback } from 'react';
import { useDarkMode } from '../../../contexts/DarkModeContext';

const OPEN_TO_WORK = true;

const FLOWER_URL =
  'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/6e8c403a-cbbb-4ffb-9b5c-046a895a4145_44754-O4E303.jpg?v=7bc895d19fd86036061a48ea2d24fbcb';

const STARRY_NIGHT_URL =
  'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/ee9938bb-db17-4424-ae21-3295d23f431b_Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg.webp?v=e5c1f82b131465dd1fba7e27842ec222';

const NAV_SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: "Let's Work" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [hoverToggle, setHoverToggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const container = document.querySelector<HTMLElement>('.portfolio-scroll');
      const scrollY = container ? container.scrollTop : window.scrollY;
      const viewportH = container ? container.clientHeight : window.innerHeight;
      // On mobile, stay transparent during the intro scroll — only go glassy after the card is revealed
      const threshold = isMobile ? window.innerHeight * 1.1 : 60;
      setScrolled(scrollY > (container ? viewportH * 0.08 : threshold));
    };
    const bind = () => {
      const container = document.querySelector<HTMLElement>('.portfolio-scroll');
      window.addEventListener('scroll', onScroll, { passive: true });
      container?.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => {
        window.removeEventListener('scroll', onScroll);
        container?.removeEventListener('scroll', onScroll);
      };
    };

    let unbind = bind();
    const onIntroComplete = () => {
      unbind();
      unbind = bind();
    };
    window.addEventListener('introComplete', onIntroComplete);
    return () => {
      unbind();
      window.removeEventListener('introComplete', onIntroComplete);
    };
  }, [isMobile]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const setup = () => {
      const container = document.querySelector<HTMLElement>('.portfolio-scroll');
      NAV_SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
          { threshold: 0, root: container ?? null, rootMargin: '-30% 0px -60% 0px' }
        );
        obs.observe(el);
        observers.push(obs);
      });
    };
    setup();
    const handler = () => {
      observers.forEach((o) => o.disconnect());
      observers.length = 0;
      setTimeout(setup, 200);
    };
    window.addEventListener('introComplete', handler);
    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('introComplete', handler);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = useCallback((id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      const container = document.querySelector<HTMLElement>('.portfolio-scroll');
      if (el && container) {
        container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, menuOpen ? 300 : 0);
  }, [menuOpen]);

  const previewImg = isDark ? FLOWER_URL : STARRY_NIGHT_URL;
  const previewLabel = isDark ? 'Spring Blossoms' : 'Van Gogh · Starry Night';
  const previewSub = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  const linkColor = (id: string) =>
    scrolled
      ? activeId === id ? '#1f1e1b' : 'rgba(31,30,27,0.5)'
      : activeId === id ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.65)';

  const underlineBg = scrolled ? '#1f1e1b' : '#ffffff';

  /* ────────────────────────────────────────────────────
     MOBILE NAV
  ──────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
          style={{
            padding: `0.75rem 1.25rem`,
            background: scrolled ? 'rgba(255,255,255,0.88)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : 'none',
          }}
        >
          {/* Left: name */}
          <a
            href="#hero"
            onClick={scrollTo('hero')}
            className="font-cormorant font-light cursor-pointer whitespace-nowrap"
            style={{ fontSize: '1.1rem', letterSpacing: '0.02em', color: scrolled ? '#1f1e1b' : '#ffffff', textShadow: scrolled ? 'none' : '0 1px 4px rgba(0,0,0,0.3)' }}
          >
            Constança Cunha
          </a>

          {/* Right: status dot + dark toggle + hamburger */}
          <div className="flex items-center gap-3">
            {OPEN_TO_WORK && (
              <span className="relative flex-shrink-0" style={{ width: '0.45rem', height: '0.45rem' }} title="Open to work">
                <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#5c8a5c', opacity: 0.55, animationDuration: '1.8s' }} />
                <span className="relative block w-full h-full rounded-full" style={{ background: '#5c8a5c' }} />
              </span>
            )}

            <button
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer"
              style={{
                background: 'transparent',
                border: scrolled ? '1px solid rgba(31,30,27,0.16)' : '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <i className={isDark ? 'ri-sun-line' : 'ri-moon-line'} style={{ fontSize: '0.85rem', lineHeight: 1, color: scrolled ? 'rgba(31,30,27,0.6)' : 'rgba(255,255,255,0.85)' }} />
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer"
              style={{
                background: 'transparent',
                border: scrolled ? '1px solid rgba(31,30,27,0.16)' : '1px solid rgba(255,255,255,0.3)',
              }}
            >
              <i className="ri-menu-3-line" style={{ fontSize: '0.85rem', lineHeight: 1, color: scrolled ? 'rgba(31,30,27,0.6)' : 'rgba(255,255,255,0.85)' }} />
            </button>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: isDark ? 'rgba(28,26,23,0.97)' : 'rgba(250,249,247,0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: isDark ? '1px solid rgba(232,228,218,0.08)' : '1px solid rgba(31,30,27,0.07)' }}>
            <span className="font-cormorant font-light" style={{ fontSize: '1.1rem', letterSpacing: '0.02em', color: isDark ? 'rgba(232,228,218,0.6)' : 'rgba(31,30,27,0.4)' }}>
              Menu
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-200"
              style={{ border: isDark ? '1px solid rgba(232,228,218,0.15)' : '1px solid rgba(31,30,27,0.12)', background: 'transparent' }}
            >
              <i className="ri-close-line" style={{ fontSize: '1.1rem', lineHeight: 1, color: isDark ? 'rgba(232,228,218,0.7)' : 'rgba(31,30,27,0.6)' }} />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col flex-1 justify-center px-8 gap-2" style={{ paddingBottom: '4rem' }}>
            {NAV_SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={scrollTo(s.id)}
                className="font-cormorant font-light block cursor-pointer transition-all duration-200"
                style={{
                  fontSize: 'clamp(2.4rem, 8vw, 3.2rem)',
                  lineHeight: 1.2,
                  color: activeId === s.id
                    ? (isDark ? '#e8e4da' : '#1f1e1b')
                    : (isDark ? 'rgba(232,228,218,0.3)' : 'rgba(31,30,27,0.28)'),
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(-16px)',
                  transition: `opacity 0.35s ease ${i * 55 + 100}ms, transform 0.35s ease ${i * 55 + 100}ms, color 0.2s ease`,
                }}
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Bottom: status */}
          {OPEN_TO_WORK && (
            <div className="flex items-center gap-2 px-8 pb-10" style={{ opacity: menuOpen ? 1 : 0, transition: 'opacity 0.4s ease 0.4s' }}>
              <span className="relative flex-shrink-0" style={{ width: '0.4rem', height: '0.4rem' }}>
                <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#5c8a5c', opacity: 0.55, animationDuration: '1.8s' }} />
                <span className="relative block w-full h-full rounded-full" style={{ background: '#5c8a5c' }} />
              </span>
              <span className="font-dm" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: isDark ? 'rgba(232,228,218,0.4)' : 'rgba(31,30,27,0.4)' }}>
                Open to work · internship &amp; full-time
              </span>
            </div>
          )}
        </div>
      </>
    );
  }

  /* ────────────────────────────────────────────────────
     DESKTOP NAV (unchanged)
  ──────────────────────────────────────────────────── */
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-5 transition-all duration-500"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="flex items-center gap-6 px-5 py-2.5 rounded-full transition-all duration-500"
        style={{
          pointerEvents: 'auto',
          backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'blur(10px)',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'blur(10px)',
          background: scrolled ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.12)',
          border: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.25)',
        }}
      >
        {NAV_SECTIONS.slice(0, 4).map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={scrollTo(id)}
            className="relative text-sm font-dm font-medium tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer"
            style={{ color: linkColor(id) }}
          >
            {label}
            <span
              style={{
                position: 'absolute', bottom: -3, left: 0, right: 0,
                height: 1, borderRadius: 1, background: underlineBg,
                opacity: activeId === id ? 1 : 0,
                transform: activeId === id ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                transformOrigin: 'center',
              }}
            />
          </a>
        ))}

        <a
          href="#contact"
          onClick={scrollTo('contact')}
          className="text-sm font-dm font-medium px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer"
          style={
            activeId === 'contact'
              ? { background: '#1f1e1b', color: '#ffffff', border: '1px solid #1f1e1b' }
              : scrolled
              ? { background: 'transparent', color: 'rgba(31,30,27,0.6)', border: '1px solid rgba(31,30,27,0.22)' }
              : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.3)' }
          }
        >
          Let&apos;s Work
        </a>

        {OPEN_TO_WORK && (
          <span
            className="flex items-center gap-1.5 whitespace-nowrap select-none"
            title="Currently open to work — internship &amp; full-time opportunities"
            style={{
              borderLeft: scrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.2)',
              paddingLeft: '0.85rem',
            }}
          >
            <span className="relative flex-shrink-0" style={{ width: '0.5rem', height: '0.5rem' }}>
              <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#5c8a5c', opacity: 0.55, animationDuration: '1.8s' }} />
              <span className="relative block w-full h-full rounded-full" style={{ background: '#5c8a5c' }} />
            </span>
            <span className="font-dm" style={{ fontSize: '0.65rem', letterSpacing: '0.02em', color: scrolled ? 'rgba(31,30,27,0.55)' : 'rgba(255,255,255,0.6)' }}>
              Open to work
            </span>
          </span>
        )}

        {/* Dark mode toggle with painting hover preview */}
        <div
          className="relative flex-shrink-0"
          onMouseEnter={() => setHoverToggle(true)}
          onMouseLeave={() => setHoverToggle(false)}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 12px)', right: '-0.5rem',
              width: '11rem', borderRadius: '0.75rem', overflow: 'hidden',
              pointerEvents: 'none',
              opacity: hoverToggle ? 1 : 0,
              transform: hoverToggle ? 'translateY(0) scale(1)' : 'translateY(6px) scale(0.96)',
              transition: 'opacity 0.22s ease, transform 0.22s ease',
              background: '#1a1816',
              boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06)',
              zIndex: 100,
            }}
          >
            <div style={{ width: '100%', height: '6.5rem', overflow: 'hidden' }}>
              <img src={previewImg} alt={previewLabel} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
            <div style={{ padding: '0.55rem 0.7rem 0.6rem' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(240,236,228,0.92)', marginBottom: '0.1rem', letterSpacing: '0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {previewLabel}
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,236,228,0.4)' }}>
                {previewSub}
              </p>
            </div>
            <div style={{ position: 'absolute', bottom: -5, right: '1.1rem', width: 10, height: 10, background: '#1a1816', transform: 'rotate(45deg)', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
          </div>

          <button
            onClick={toggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 cursor-pointer"
            style={{
              background: hoverToggle
                ? (scrolled ? 'rgba(31,30,27,0.08)' : 'rgba(255,255,255,0.18)')
                : isDark ? (scrolled ? 'rgba(31,30,27,0.08)' : 'rgba(255,255,255,0.1)') : 'transparent',
              border: scrolled ? '1px solid rgba(31,30,27,0.14)' : '1px solid rgba(255,255,255,0.22)',
              transform: hoverToggle ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <i
              className={isDark ? 'ri-sun-line' : 'ri-moon-line'}
              style={{ fontSize: '0.9rem', lineHeight: 1, color: scrolled ? 'rgba(31,30,27,0.6)' : 'rgba(255,255,255,0.7)', transition: 'opacity 0.2s ease' }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
