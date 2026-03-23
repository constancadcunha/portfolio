import { useRef, useState, useEffect } from 'react';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';

const STEPS = [
  {
    num: '01',
    title: 'Understand',
    subtitle: 'Research · Listen · Map',
    description:
      "I start before any screen is drawn. That means talking to real users, reviewing analytics, mapping mental models, and building a shared picture of the problem — not the solution.",
    details: [
      'User interviews & contextual inquiry',
      'Competitive analysis & heuristic review',
      'Journey mapping & pain point synthesis',
    ],
    accent: '#8a9e7a',
  },
  {
    num: '02',
    title: 'Frame',
    subtitle: 'Decide · Prototype · Challenge',
    description:
      "Research without direction is just noise. I turn findings into design principles, prioritised problem statements, and lo-fi explorations — testing assumptions before they become expensive mistakes.",
    details: [
      'How Might We / opportunity framing',
      'Concept sketches & rapid wireframes',
      'Design critique & early stakeholder review',
    ],
    accent: '#c4a882',
  },
  {
    num: '03',
    title: 'Build',
    subtitle: 'Refine · Test · Ship',
    description:
      "High-fidelity designs grounded in real feedback. I stay close to engineering, iterate on what usability testing surfaces, and care about what happens after handoff — not just the deck.",
    details: [
      'Component-based design systems',
      'Moderated usability testing & iteration',
      'Frontend collaboration & QA review',
    ],
    accent: '#b0966e',
  },
];

function useInViewOnce(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function ProcessSection() {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  const headingAccent = isDark
    ? 'linear-gradient(120deg, #f8d66f 0%, #7aa6ff 56%, #9fb0ff 100%)'
    : 'linear-gradient(120deg, #9abeda 0%, #f0cfa3 48%, #bad5c4 100%)';
  const { ref: headerRef, inView: headerIn } = useInViewOnce(0.2);
  const { ref: stepsRef, inView: stepsIn } = useInViewOnce(0.1);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="process"
      style={{
        background: isDark ? '#1f1d1a' : '#faf9f7',
        padding: '8rem 8% 8.5rem',
        transition: 'background 0.5s ease',
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '5.5rem',
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p
            className="font-dm uppercase"
            style={{ fontSize: '0.65rem', letterSpacing: '0.28em', marginBottom: '1.2rem', color: t.textMuted }}
          >
            Process
          </p>
          <h2
            className="font-cormorant font-light"
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.08,
              backgroundImage: headingAccent,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '1.2rem',
            }}
          >
            How I work.
          </h2>
          <p
            className="font-dm"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.75,
              maxWidth: '30rem',
              color: t.textMuted,
            }}
          >
            Three phases, one through-line: every decision connects back to the person using it.
          </p>
        </div>

        {/* Steps grid */}
        <div
          ref={stepsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
          }}
          className="process-grid"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
              style={{
                padding: '2.8rem 2.4rem 3rem',
                cursor: 'default',
                opacity: stepsIn ? 1 : 0,
                transform: stepsIn ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms, background 0.2s ease`,
                background: activeStep === i
                  ? (isDark ? 'rgba(232,228,218,0.04)' : 'rgba(31,30,27,0.03)')
                  : 'transparent',
                borderRadius: '0.75rem',
                position: 'relative',
              }}
            >
              {/* Step number */}
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(4rem, 7vw, 6.5rem)',
                  fontWeight: 300,
                  lineHeight: 1,
                  color: activeStep === i ? step.accent : (isDark ? 'rgba(232,228,218,0.07)' : 'rgba(31,30,27,0.07)'),
                  transition: 'color 0.3s ease',
                  marginBottom: '1.5rem',
                  userSelect: 'none',
                }}
              >
                {step.num}
              </div>

              {/* Title */}
              <h3
                className="font-cormorant font-light"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  marginBottom: '0.35rem',
                  color: t.text,
                  lineHeight: 1.1,
                }}
              >
                {step.title}
              </h3>

              {/* Subtitle */}
              <p
                className="font-dm uppercase"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  color: activeStep === i ? step.accent : (isDark ? 'rgba(248,214,111,0.65)' : 'rgba(110,140,166,0.78)'),
                  marginBottom: '1.4rem',
                  transition: 'color 0.3s ease',
                }}
              >
                {step.subtitle}
              </p>

              {/* Divider line — animates with hover */}
              <div
                style={{
                  width: activeStep === i ? '3rem' : '1.5rem',
                  height: '1px',
                  background: activeStep === i ? step.accent : (isDark ? 'rgba(232,228,218,0.12)' : 'rgba(31,30,27,0.12)'),
                  marginBottom: '1.4rem',
                  transition: 'width 0.35s ease, background 0.3s ease',
                }}
              />

              {/* Description */}
              <p
                className="font-dm"
                style={{
                  fontSize: '0.83rem',
                  lineHeight: 1.75,
                  color: t.textMuted,
                  marginBottom: '1.8rem',
                }}
              >
                {step.description}
              </p>

              {/* Detail list */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {step.details.map((d) => (
                  <li
                    key={d}
                    className="font-dm flex items-start gap-2.5"
                    style={{ fontSize: '0.75rem', color: t.textFaint, lineHeight: 1.55 }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: activeStep === i ? step.accent : (isDark ? 'rgba(232,228,218,0.2)' : 'rgba(31,30,27,0.2)'),
                        flexShrink: 0,
                        marginTop: '0.45rem',
                        transition: 'background 0.3s ease',
                      }}
                    />
                    {d}
                  </li>
                ))}
              </ul>

              {/* Vertical separator (not on last) */}
              {i < STEPS.length - 1 && (
                <div
                  className="process-separator"
                  style={{
                    position: 'absolute',
                    top: '2.5rem',
                    right: 0,
                    width: '1px',
                    height: 'calc(100% - 5rem)',
                    background: isDark ? 'rgba(232,228,218,0.07)' : 'rgba(31,30,27,0.07)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '4.5rem',
            opacity: stepsIn ? 1 : 0,
            transition: 'opacity 0.7s ease 0.5s',
          }}
        >
          <p
            className="font-cormorant font-light italic"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: isDark ? 'rgba(232,228,218,0.28)' : 'rgba(31,30,27,0.28)' }}
          >
            "Good design is invisible. Great design makes the right thing obvious."
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
          .process-separator {
            display: none !important;
          }
          #process {
            padding: 4.5rem 6% 4.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
