import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../../../contexts/DarkModeContext';

gsap.registerPlugin(ScrollTrigger);

const FLOWER_URL =
  'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/6e8c403a-cbbb-4ffb-9b5c-046a895a4145_44754-O4E303.jpg?v=7bc895d19fd86036061a48ea2d24fbcb';

const STARRY_NIGHT_URL =
  'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/ee9938bb-db17-4424-ae21-3295d23f431b_Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg.webp?v=e5c1f82b131465dd1fba7e27842ec222';

export default function IntroOverlay() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useDarkMode();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onLeave: () => window.dispatchEvent(new Event('introComplete')),
        },
      });

      if (isMobile) {
        /* Fade ONLY the .intro-phone-bezel elements (dark bg + border + chrome).
           The screen content div has NO bezel class so it stays fully visible.
           The phone wrap zooms to 22x — at that scale the bezel corners are
           physically off-screen, so the screen content fills the viewport. */
        tl.to('.intro-phone-bezel', { opacity: 0, duration: 0.15, ease: 'power2.out' }, 0);
        tl.to('.intro-scroll-hint', { opacity: 0, duration: 0.10, ease: 'power2.out' }, 0);
        tl.to('.intro-phone-wrap', { scale: 20, ease: 'power3.inOut' }, 0);
      } else {
        tl.to('.intro-laptop-body', { opacity: 0, duration: 0.14, ease: 'power2.out' }, 0);
        tl.to('.intro-laptop-hinge, .intro-laptop-base, .intro-scroll-hint', { opacity: 0, duration: 0.10, ease: 'power2.out' }, 0);
        tl.to('.intro-laptop-wrap', { scale: 20, ease: 'power3.inOut' }, 0);
      }

      tl.fromTo('.portfolio-card',
        { opacity: 0, scale: 0.72, yPercent: 3, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, yPercent: 0, filter: 'blur(0px)', ease: 'power3.out' },
        0.18
      );
      tl.fromTo('.intro-card-cover',
        { opacity: 0, scale: 0.76, yPercent: 2 },
        { opacity: 1, scale: 1, yPercent: 0, ease: 'power2.out' },
        0.16
      );
      tl.to('.intro-card-cover', { opacity: 0, ease: 'sine.out' }, 0.72);
      tl.to('.intro-fixed-overlay', { opacity: 0, filter: 'blur(6px)', ease: 'power2.inOut' }, 0.78);
      tl.set('.intro-fixed-overlay', { display: 'none', pointerEvents: 'none' }, 0.998);
    });

    return () => ctx.revert();
  }, [isMobile]);

  /* phone outer dimensions */
  const phoneW = Math.min(200, Math.round(window.innerWidth * 0.52));
  const phoneH = Math.round(phoneW * 1.95);
  const inset = 13; /* border(7) + padding(6) = 13px each side */

  return (
    <>
      <div
        className="intro-fixed-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* Painting background of the overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("${isDark ? STARRY_NIGHT_URL : FLOWER_URL}")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />

        {/* Dark tint */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isDark ? 'rgba(0,0,0,0.22)' : 'rgba(0,0,0,0.12)',
          pointerEvents: 'none',
        }} />

        {/* Contained card cover so the zoom resolves into a framed rectangle, not a full-page wash */}
        <div
          className="intro-card-cover"
          style={{
            position: 'fixed',
            top: isMobile ? '7vh' : '8vh',
            left: '50%',
            transform: 'translateX(-50%)',
            width: isMobile ? '86%' : '82%',
            height: isMobile ? '86vh' : '84vh',
            borderRadius: '1.5rem',
            background: isDark ? '#1c1a17' : '#ffffff',
            opacity: 0,
            zIndex: 8,
            pointerEvents: 'none',
            boxShadow: isDark
              ? '0 0 0 1px rgba(255,255,255,0.04), 0 18px 48px rgba(0,0,0,0.28)'
              : '0 0 0 1px rgba(0,0,0,0.05), 0 18px 48px rgba(0,0,0,0.08)',
          }}
        />

        {/* ─── MOBILE: phone mockup ─── */}
        {isMobile ? (
          <div
            className="intro-phone-wrap"
            style={{
              position: 'relative', zIndex: 2,
              width: phoneW, height: phoneH,
              willChange: 'transform', transformOrigin: 'center center',
            }}
          >
            {/*
              LAYERING (bottom → top):
              z-1  .intro-phone-bezel  dark rounded background (fades out)
              z-2  screen content div  painting + text  (NEVER fades — no bezel class)
              z-3  .intro-phone-bezel  border ring  (fades out)
              z-4  .intro-phone-bezel  notch / home / buttons  (fade out)

              When GSAP fades .intro-phone-bezel → opacity 0:
                • dark bg disappears → transparent corners
                • border ring disappears
                • chrome disappears
                • screen content (z-2) remains → zooms to fill viewport at scale 22
            */}

            {/* z-1: dark phone body background — fades to reveal screen beneath */}
            <div
              className="intro-phone-bezel"
              style={{
                position: 'absolute', inset: 0,
                background: '#1a1a1c', borderRadius: 38,
                zIndex: 1, pointerEvents: 'none',
              }}
            />

            {/* z-2: SCREEN CONTENT — not a bezel element, stays visible throughout */}
            <div
              style={{
                position: 'absolute',
                top: inset, left: inset, right: inset, bottom: inset,
                borderRadius: 26, overflow: 'hidden',
                zIndex: 2,
              }}
            >
              <ScreenContent isDark={isDark} mobile screenW={phoneW - inset * 2} screenH={phoneH - inset * 2} />
            </div>

            {/* z-3: phone border ring — fades out */}
            <div
              className="intro-phone-bezel"
              style={{
                position: 'absolute', inset: 0,
                border: '7px solid #2e2e30', borderRadius: 38,
                boxShadow: '0 28px 72px rgba(0,0,0,0.55)',
                background: 'transparent',
                zIndex: 3, pointerEvents: 'none',
              }}
            />

            {/* z-4: dynamic island */}
            <div
              className="intro-phone-bezel"
              style={{
                position: 'absolute', top: 16, left: '50%',
                transform: 'translateX(-50%)',
                width: 68, height: 11,
                background: '#1a1a1c', borderRadius: 999,
                zIndex: 4, pointerEvents: 'none',
              }}
            />

            {/* z-4: home indicator */}
            <div
              className="intro-phone-bezel"
              style={{
                position: 'absolute', bottom: 9, left: '50%',
                transform: 'translateX(-50%)',
                width: 68, height: 4,
                background: 'rgba(255,255,255,0.28)',
                borderRadius: 2, zIndex: 4, pointerEvents: 'none',
              }}
            />

            {/* Volume buttons */}
            <div className="intro-phone-bezel" style={{ position: 'absolute', left: -4, top: 78, width: 3, height: 22, background: '#3a3a3c', borderRadius: '2px 0 0 2px', zIndex: 4 }} />
            <div className="intro-phone-bezel" style={{ position: 'absolute', left: -4, top: 108, width: 3, height: 34, background: '#3a3a3c', borderRadius: '2px 0 0 2px', zIndex: 4 }} />
            <div className="intro-phone-bezel" style={{ position: 'absolute', left: -4, top: 150, width: 3, height: 34, background: '#3a3a3c', borderRadius: '2px 0 0 2px', zIndex: 4 }} />
            {/* Power button */}
            <div className="intro-phone-bezel" style={{ position: 'absolute', right: -4, top: 118, width: 3, height: 46, background: '#3a3a3c', borderRadius: '0 2px 2px 0', zIndex: 4 }} />
          </div>

        ) : (
          /* ─── DESKTOP: laptop mockup (unchanged) ─── */
          <div
            className="intro-laptop-wrap"
            style={{ position: 'relative', zIndex: 2, willChange: 'transform', transformOrigin: 'center center' }}
          >
            <div
              className="intro-laptop-body"
              style={{
                width: 560, height: 350,
                background: '#1a1a1c', borderRadius: 12,
                border: '5px solid #3a3a3c', padding: 8,
                boxSizing: 'border-box', overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
              }}
            >
              <ScreenContent isDark={isDark} mobile={false} screenW={544} screenH={334} />
            </div>
            <div className="intro-laptop-hinge" style={{ width: 600, height: 5, background: '#2a2a2c', position: 'relative', left: -20 }} />
            <div
              className="intro-laptop-base"
              style={{
                width: 640, height: 20,
                background: 'linear-gradient(to bottom, #2a2a2c, #1f1f21)',
                borderRadius: '0 0 12px 12px', position: 'relative', left: -40,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div style={{ width: 80, height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
            </div>
          </div>
        )}

        {/* Scroll hint */}
        <div
          className="intro-scroll-hint"
          style={{
            position: 'absolute', bottom: isMobile ? 26 : 36,
            left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 6, zIndex: 6,
          }}
        >
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.5)', animation: 'scrollPulseIntro 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.5rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            scroll to enter
          </span>
        </div>
      </div>

      {/* Intro scroll exists only to drive the zoom; the actual portfolio lives in a fixed shell underneath. */}
      <div ref={spacerRef} style={{ height: '220vh' }} />

      <style>{`
        @keyframes scrollPulseIntro {
          0%, 100% { opacity: 0.2; transform: scaleY(0.4); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }
        .intro-laptop-body:hover .screen-glow { opacity: 1 !important; }
      `}</style>
    </>
  );
}

/* ─── Screen content shared between phone and laptop ─── */
function ScreenContent({
  isDark,
  mobile,
  screenW,
  screenH,
}: {
  isDark: boolean;
  mobile: boolean;
  screenW: number;
  screenH: number;
}) {
  const screenBg = isDark ? STARRY_NIGHT_URL : FLOWER_URL;
  const textColor = isDark ? 'rgba(232,228,218,0.95)' : '#1f1f1f';
  const subColor = isDark ? 'rgba(232,228,218,0.55)' : 'rgba(0,0,0,0.38)';
  const navBg = isDark ? 'rgba(28,26,23,0.88)' : 'rgba(255,255,255,0.9)';
  const navBorder = isDark ? 'rgba(232,228,218,0.08)' : 'rgba(0,0,0,0.06)';
  const navLinkColor = isDark ? 'rgba(232,228,218,0.45)' : 'rgba(0,0,0,0.3)';

  const overlayBg = mobile
    ? isDark
      ? 'linear-gradient(160deg, rgba(28,26,23,0.72) 0%, rgba(28,26,23,0.30) 50%, rgba(28,26,23,0.72) 100%)'
      : 'linear-gradient(160deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.78) 100%)'
    : isDark
      ? 'linear-gradient(to bottom, rgba(28,26,23,0.55) 0%, rgba(28,26,23,0.22) 50%, rgba(28,26,23,0.55) 100%)'
      : 'linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.55) 100%)';

  const FULL_NAME = 'Constança Cunha';
  const [typedName, setTypedName] = useState('');
  const [showSub, setShowSub] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTypedName(FULL_NAME.slice(0, i));
      if (i >= FULL_NAME.length) {
        clearInterval(id);
        setTimeout(() => setShowCursor(false), 400);
        setTimeout(() => setShowSub(true), 600);
        setTimeout(() => setShowTagline(true), 1100);
      }
    }, 68);
    return () => clearInterval(id);
  }, []);

  const namePx = mobile ? Math.max(11, Math.round(screenW * 0.095)) : 22;
  const subPx  = mobile ? Math.max(3,  Math.round(screenW * 0.020)) : 4.5;

  return (
    <div style={{
      width: '100%', height: '100%',
      borderRadius: mobile ? 26 : 4,
      overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: mobile ? 5 : 6,
    }}>
      {/* Painting bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("${screenBg}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      {/* Readability gradient */}
      <div style={{ position: 'absolute', inset: 0, background: overlayBg, pointerEvents: 'none' }} />

      {/* Glow — desktop only */}
      {!mobile && (
        <div className="screen-glow" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(200,185,155,0.18) 0%, transparent 65%)', opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none' }} />
      )}

      {/* Mini nav — desktop only */}
      {!mobile && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 16, background: navBg, backdropFilter: 'blur(4px)', borderBottom: `1px solid ${navBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          {['Home', 'Projects', 'About', "Let's Work"].map((l) => (
            <span key={l} style={{ fontSize: 3.5, fontFamily: 'DM Sans, sans-serif', color: navLinkColor, letterSpacing: '0.04em' }}>{l}</span>
          ))}
        </div>
      )}

      {/* Typewriter name */}
      <span style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: namePx, fontWeight: 300,
        color: textColor, letterSpacing: '0.02em', lineHeight: 1,
        marginTop: mobile ? 16 : 8,
        position: 'relative', zIndex: 1,
        textShadow: isDark ? '0 1px 8px rgba(0,0,0,0.7)' : '0 1px 6px rgba(255,255,255,0.9)',
        minHeight: '1em', textAlign: 'center',
        paddingLeft: mobile ? 6 : 0, paddingRight: mobile ? 6 : 0,
      }}>
        {typedName}
        {showCursor && (
          <span style={{
            display: 'inline-block', width: mobile ? 1 : 1.5,
            height: '0.85em', background: textColor,
            marginLeft: 1, verticalAlign: 'text-bottom',
            animation: 'cursorBlink 0.65s step-end infinite',
          }} />
        )}
      </span>

      {/* Subtitle */}
      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: subPx, fontWeight: 400,
        letterSpacing: mobile ? '0.14em' : '0.28em',
        textTransform: 'uppercase',
        color: subColor,
        position: 'relative', zIndex: 1,
        textShadow: isDark ? '0 1px 4px rgba(0,0,0,0.5)' : '0 1px 4px rgba(255,255,255,0.7)',
        opacity: showSub ? 1 : 0,
        transform: showSub ? 'translateY(0)' : 'translateY(3px)',
        transition: 'opacity 0.45s ease, transform 0.45s ease',
        textAlign: 'center',
        paddingLeft: mobile ? 8 : 0, paddingRight: mobile ? 8 : 0,
      }}>
        Product Designer &amp; UX Engineer
      </span>

      {/* Tagline — desktop only */}
      {!mobile && (
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic', fontSize: 7, fontWeight: 300,
          color: subColor, marginTop: 2,
          textAlign: 'center', maxWidth: '80%',
          position: 'relative', zIndex: 1,
          textShadow: isDark ? '0 1px 4px rgba(0,0,0,0.5)' : '0 1px 4px rgba(255,255,255,0.7)',
          opacity: showTagline ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          I turn complex problems into clear, beautiful, human-centred experiences.
        </span>
      )}

      <style>{`@keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
    </div>
  );
}
