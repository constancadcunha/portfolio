import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import IntroOverlay from './components/IntroOverlay';
import HeroQuote from './components/HeroNew';
import ProjectsSection from './components/ProjectsSection';
import ProcessSection from './components/ProcessSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import PortfolioFooter from './components/PortfolioFooter';
import CVPrint from './components/CVPrint';
import { DarkModeProvider, useDarkMode } from '../../contexts/DarkModeContext';
import { getTokens } from '../../utils/darkTokens';

const FLOWER_URL =
  'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/6e8c403a-cbbb-4ffb-9b5c-046a895a4145_44754-O4E303.jpg?v=7bc895d19fd86036061a48ea2d24fbcb';

const STARRY_NIGHT_URL =
  'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/ee9938bb-db17-4424-ae21-3295d23f431b_Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg.webp?v=e5c1f82b131465dd1fba7e27842ec222';

const CREDENTIALS = [
  { name: 'Instituto Superior Técnico', detail: 'M.Sc. Interaction & Visualization' },
  { name: 'Sky Portugal', detail: 'Frontend Developer Intern' },
  { name: 'nextflat CH', detail: 'Product Designer & Engineer' },
  { name: 'SINFO', detail: 'Tech Conference · 5,000 attendees' },
  { name: 'IBM', detail: 'Enterprise Design Thinking' },
];

const ROLES = ['Product Designer', 'UX Researcher', 'Frontend Builder'];

/* ── Rotating tagline ── */
function RotatingTagline() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 350);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="font-dm font-normal text-stone uppercase overflow-hidden"
      style={{
        fontSize: 'clamp(0.5rem, 0.95vw, 0.75rem)',
        letterSpacing: '0.36em',
        marginBottom: '1.4rem',
        height: '1.4em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        {ROLES[idx]}
      </span>
    </div>
  );
}

/* ── Back to top button ── */
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.portfolio-scroll');
    if (!container) return;

    const onScroll = () => setShow(container.scrollTop > container.clientHeight * 0.6);
    container.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = useCallback(() => {
    const container = document.querySelector<HTMLElement>('.portfolio-scroll');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className="cursor-pointer"
      style={{
        position: 'fixed',
        bottom: '3.5rem',
        right: '2rem',
        zIndex: 60,
        width: '2.4rem',
        height: '2.4rem',
        borderRadius: '50%',
        background: 'rgba(31,30,27,0.88)',
        border: '1px solid rgba(255,255,255,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        backdropFilter: 'blur(6px)',
      }}
    >
      <i className="ri-arrow-up-line text-white/80" style={{ fontSize: '0.95rem', lineHeight: 1 }} />
    </button>
  );
}

/* ── Konami code easter egg ── */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

function useKonamiCode(onActivate: () => void) {
  const seq = useRef<string[]>([]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      seq.current = [...seq.current, e.key].slice(-KONAMI.length);
      if (seq.current.join(',') === KONAMI.join(',')) {
        onActivate();
        seq.current = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onActivate]);
}

/* ── Cursor sparkle trail ── */
interface Sparkle { id: number; x: number; y: number; size: number; color: string; }
const SPARKLE_COLORS = ['#c4a882','#8a9e7a','#b0966e','#d4c5a9','#7a8f6a'];

function CursorSparkle() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const counter = useRef(0);
  const lastMove = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove.current < 60) return; // throttle
      lastMove.current = now;
      const id = counter.current++;
      const size = 4 + Math.random() * 5;
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
      setSparkles((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY, size, color }]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 700);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'fixed',
            left: s.x - s.size / 2,
            top: s.y - s.size / 2,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: s.color,
            pointerEvents: 'none',
            zIndex: 9999,
            animation: 'sparkleFade 0.7s ease forwards',
          }}
        />
      ))}
      <style>{`
        @keyframes sparkleFade {
          0%   { opacity: 0.7; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.2) translateY(-12px); }
        }
      `}</style>
    </>
  );
}

/* ── Konami toast ── */
function KonamiToast({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '6rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        background: '#1f1e1b',
        color: '#f5f3f0',
        borderRadius: '999px',
        padding: '0.7rem 1.6rem',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.8rem',
        letterSpacing: '0.03em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        animation: 'toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '1rem' }}>🍪</span>
      <span>you found it — have a cookie</span>
      <span style={{ opacity: 0.4, fontSize: '0.65rem' }}>↑↑↓↓←→←→BA</span>
    </div>
  );
}

/* ── Name scramble hook ── */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖàáâãäåæçèéêëìíîïðñòóôõö';
function useNameScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const [scrambling, setScrambling] = useState(false);
  const clickCount = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    clickCount.current++;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { clickCount.current = 0; }, 1200);

    if (clickCount.current >= 5 && !scrambling) {
      setScrambling(true);
      clickCount.current = 0;
      let iter = 0;
      const totalFrames = 18;
      const interval = setInterval(() => {
        iter++;
        const progress = iter / totalFrames;
        setDisplay(
          original.split('').map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i / original.length < progress) return ch;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join('')
        );
        if (iter >= totalFrames) {
          clearInterval(interval);
          setDisplay(original);
          setScrambling(false);
        }
      }, 55);
    }
  }, [original, scrambling]);

  return { display, handleClick };
}

/* ── Inner home content (needs context access) ── */
function HomeContent() {
  const topStripRef = useRef<HTMLDivElement>(null);
  const bottomStripRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [konamiActive, setKonamiActive] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [introComplete, setIntroComplete] = useState(false);
  const { display: nameDisplay, handleClick: handleNameClick } = useNameScramble('Constança Cunha');
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  const activateKonami = useCallback(() => setKonamiActive(true), []);
  useKonamiCode(activateKonami);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const bgUrl = isDark ? STARRY_NIGHT_URL : FLOWER_URL;

  // Desktop: background-attachment:fixed (parallax)
  // Mobile: we use a separate position:fixed div — background-attachment:fixed is broken on iOS
  //         and background-attachment:scroll makes the painting drift as you scroll
  const desktopBgStyle = {
    backgroundImage: `url("${bgUrl}")`,
    backgroundAttachment: 'fixed' as const,
    backgroundSize: 'cover' as const,
    backgroundPosition: 'center' as const,
  };

  useEffect(() => {
    const onIntroComplete = () => setIntroComplete(true);
    window.addEventListener('introComplete', onIntroComplete);
    return () => window.removeEventListener('introComplete', onIntroComplete);
  }, []);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (introComplete) {
      body.dataset.shellScrollLocked = 'true';
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
    } else {
      delete body.dataset.shellScrollLocked;
      body.style.overflow = '';
      html.style.overflow = '';
    }

    return () => {
      delete body.dataset.shellScrollLocked;
      body.style.overflow = '';
      html.style.overflow = '';
    };
  }, [introComplete]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const y = container.scrollTop;
      const maxScroll = Math.max(1, container.scrollHeight - container.clientHeight);
      const progress = Math.min(1, Math.max(0, y / maxScroll));
      const offset = y * 0.06;

      if (topStripRef.current) topStripRef.current.style.backgroundPositionY = `calc(50% + ${offset}px)`;
      if (bottomStripRef.current) bottomStripRef.current.style.backgroundPositionY = `calc(50% - ${offset}px)`;
      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${progress})`;
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener('scroll', onScroll);
  }, [introComplete]);

  return (
    <div style={{ position: 'relative', ...(isMobile ? {} : desktopBgStyle) }}>
      {/* Mobile-only: fixed background so the painting NEVER moves while scrolling */}
      {isMobile && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: -1,
            backgroundImage: `url("${bgUrl}")`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            pointerEvents: 'none',
          }}
        />
      )}

      <CVPrint />
      <CursorSparkle />
      {konamiActive && <KonamiToast onDone={() => setKonamiActive(false)} />}

      {/* Reading progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 70, background: 'rgba(31,30,27,0.08)', pointerEvents: 'none' }}>
        <div
          ref={progressBarRef}
          style={{
            height: '100%', width: '100%',
            background: isDark ? '#e8e4da' : '#1f1e1b',
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
            transition: 'transform 0.08s linear, background 0.5s ease',
          }}
        />
      </div>

      <BackToTop />
      <Navbar />
      <IntroOverlay />

      {/* Frame strips — visible on both desktop and mobile to show painting at top/bottom */}
      <>
        <div
          ref={topStripRef}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: '8vh', zIndex: 0, pointerEvents: 'none',
            backgroundImage: `url("${bgUrl}")`, backgroundSize: 'cover',
            backgroundPositionX: 'center', backgroundPositionY: '50%',
          }}
        />
        <div
          ref={bottomStripRef}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, height: '8vh', zIndex: 0, pointerEvents: 'none',
            backgroundImage: `url("${bgUrl}")`, backgroundSize: 'cover',
            backgroundPositionX: 'center', backgroundPositionY: '50%',
          }}
        />
      </>

      <div
        ref={cardRef}
        className="portfolio-card"
        style={{
          position: 'fixed',
          top: isMobile ? '7vh' : '8vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: isMobile ? '86%' : '82%',
          height: isMobile ? '86vh' : '84vh',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          background: t.bg,
          zIndex: 2,
          opacity: introComplete ? 1 : 0.98,
          pointerEvents: introComplete ? 'auto' : 'none',
          boxShadow: isDark
            ? '0 0 0 1px rgba(255,255,255,0.04), 0 18px 48px rgba(0,0,0,0.28)'
            : '0 0 0 1px rgba(0,0,0,0.05), 0 18px 48px rgba(0,0,0,0.08)',
          transition: 'background 0.5s ease, box-shadow 0.5s ease, opacity 0.35s ease',
        }}
      >
        <div
          ref={scrollContainerRef}
          className="portfolio-scroll"
          style={{
            height: '100%',
            overflowY: introComplete ? 'auto' : 'hidden',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            background: t.bg,
          }}
        >
        {/* ── Hero ── */}
        <section
          id="hero"
          className="flex flex-col items-center justify-center text-center"
          style={{
            padding: isMobile ? '6rem 6% 5rem' : '14vh 8% 8vh',
            background: t.bg,
            transition: 'background 0.5s ease',
          }}
        >
          <p
            className="font-dm uppercase"
            style={{ fontSize: 'clamp(0.5rem, 0.85vw, 0.65rem)', letterSpacing: '0.3em', marginBottom: '1.75rem', color: t.textMuted }}
          >
            Portfolio
          </p>

          <h1
            className="font-cormorant font-light cursor-default select-none"
            style={{ fontSize: 'clamp(2.8rem, 7.5vw, 7.2rem)', lineHeight: 0.95, letterSpacing: '0.02em', marginBottom: '1.6rem', color: t.text, transition: 'color 0.5s ease' }}
            onClick={handleNameClick}
            title="click me 5 times... 👀"
          >
            {nameDisplay}
          </h1>

          <RotatingTagline />

          <p
            className="font-cormorant font-light italic mx-auto"
            style={{ fontSize: 'clamp(0.95rem, 1.7vw, 1.2rem)', maxWidth: '28rem', lineHeight: 1.65, color: isDark ? 'rgba(232,228,218,0.5)' : 'rgba(31,30,27,0.5)' }}
          >
            I turn complex problems into clear, beautiful, human-centred experiences.
          </p>

          {/* Credibility strip */}
          <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p className="font-dm uppercase" style={{ fontSize: '0.52rem', letterSpacing: '0.3em', color: t.textFaint }}>
              Experience across
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {CREDENTIALS.map((c, i) => (
                <span key={c.name} className="flex items-center gap-x-5">
                  <span
                    className="font-cormorant font-light transition-colors duration-200 cursor-default"
                    style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', letterSpacing: '0.015em', color: isDark ? 'rgba(232,228,218,0.35)' : 'rgba(31,30,27,0.45)' }}
                    title={c.detail}
                  >
                    {c.name}
                  </span>
                  {i < CREDENTIALS.length - 1 && (
                    <span className="font-dm select-none" style={{ fontSize: '0.5rem', color: t.textFaint }}>·</span>
                  )}
                </span>
              ))}
            </div>
            <div style={{ width: '2.5rem', height: '1px', background: isDark ? 'rgba(232,228,218,0.1)' : 'rgba(31,30,27,0.12)', marginTop: '0.25rem' }} />
          </div>

          <div className="flex flex-col items-center gap-2" style={{ marginTop: '3rem', opacity: 0.25 }}>
            <div style={{ width: 1, height: 36, background: isDark ? '#e8e4da' : '#6b6b60', animation: 'scrollNudge 2s ease-in-out infinite' }} />
            <span className="font-dm uppercase" style={{ fontSize: '0.46rem', letterSpacing: '0.32em', color: t.textMuted }}>scroll</span>
          </div>
        </section>

        <HeroQuote />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
        <PortfolioFooter />
        </div>
      </div>

      <style>{`
        @keyframes scrollNudge {
          0%, 100% { opacity: 0.2; transform: scaleY(0.4); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(12px) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <DarkModeProvider>
      <HomeContent />
    </DarkModeProvider>
  );
}
