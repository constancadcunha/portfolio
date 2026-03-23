import { useState, useEffect, useRef } from 'react';
import FadeIn from '../../../components/base/FadeIn';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';

const skills = [
  { tag: 'Figma', detail: 'Advanced — every wireframe, system, and handoff lives here.' },
  { tag: 'User Research', detail: 'Interviews, usability testing, heuristic evaluation — the real stuff.' },
  { tag: 'Design Systems', detail: 'Built atomic systems with CSS modules used by real engineering teams.' },
  { tag: 'Prototyping', detail: 'From low-fi sketches to clickable high-fidelity flows.' },
  { tag: 'Interaction Design', detail: 'Mapping micro-interactions and edge cases with care.' },
  { tag: 'React', detail: 'Can implement my own designs in production when needed.' },
  { tag: 'SwiftUI', detail: 'Built SageBook natively — design and code in one pass.' },
  { tag: 'TypeScript', detail: 'Comfortable in JS/TS frontend codebases beyond just design handoff.' },
  { tag: 'Usability Testing', detail: 'Run structured tests, synthesise findings, iterate on evidence.' },
  { tag: 'AI Tools', detail: 'Integrating AI throughout research, ideation, and writing.' },
  { tag: 'Information Architecture', detail: 'How content is structured matters as much as how it looks.' },
  { tag: 'Heuristic Evaluation', detail: 'Expert inspection method — built a full platform for it at IST.' },
  { tag: 'Django', detail: 'Backend work on the multi-method usability research platform at IST.' },
  { tag: 'Python', detail: 'Scripting, data processing, and backend tooling.' },
];

const timeline = [
  {
    period: 'Sep 2025 — Mar 2026',
    role: 'Product Designer & Frontend Engineer',
    company: 'nextflat CH · Zurich, Remote',
    description: 'Sole designer on a live Swiss real estate platform (500+ users). Redesigned homepage, property feed, and dashboards across 2 release cycles. Built an atomic design system reducing estimated frontend implementation time by ~30%.',
    achievement: '2 full release cycles shipped',
  },
  {
    period: 'Jul — Aug 2024',
    role: 'Front-End Developer Intern',
    company: 'Sky Portugal · Lisbon',
    description: 'Designed and built an internal STB device management system in under 2 weeks, reducing device onboarding time from several days to under 4 hours. Automated workflows and built structured data exports used by all operational teams.',
    achievement: 'Device onboarding: days to under 4 hours',
  },
  {
    period: 'Mar 2024 — May 2025',
    role: 'Coordinator',
    company: 'SINFO · Lisbon',
    description: "Led a 30-person team organising Portugal's largest free tech conference. 5,000+ attendees, 85+ partner companies. Secured Tier-1 sponsorships including Oracle and coordinated national media coverage through CNN Portugal.",
    achievement: '5,000+ attendees · Oracle sponsorship',
  },
  {
    period: 'Mar 2022 — May 2023',
    role: 'Head of Human Resources',
    company: 'Diferencial IST · Lisbon',
    description: 'Built recruitment and onboarding processes from scratch for a 20+ member student team, improving time-to-productivity and first-year retention.',
    achievement: 'Processes built from zero',
  },
  {
    period: '2024 — 2026 (expected)',
    role: 'M.Sc. Computer Science — Interaction & Visualization',
    company: 'Instituto Superior Técnico · Lisbon',
    description: 'Specialisation in interaction design and data visualisation. Thesis: extended a Django-based usability testing tool with heuristic evaluation, task analysis, and SAM self-report surveys — turning a single-method video tool into a multi-method usability research suite.',
    achievement: 'Thesis: live usability research platform',
  },
  {
    period: '2020 — 2024',
    role: 'B.Sc. Computer Science',
    company: 'Instituto Superior Técnico · Lisbon',
    description: 'Foundation in algorithms, software engineering, and systems. Led to a natural intersection with design and human-computer interaction.',
    achievement: 'Graduated 2024',
  },
];

const languages = [
  { label: 'Portuguese', level: 'Native' },
  { label: 'English', level: 'C2' },
  { label: 'French', level: 'B2' },
  { label: 'Spanish', level: 'B1' },
];

/* ── Hook: reveal items on scroll ── */
function useRevealOnScroll<T>(items: T[], threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, revealed };
}

export default function AboutSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { ref: skillsRef, revealed: skillsRevealed } = useRevealOnScroll(skills);
  const { ref: bioRef, revealed: bioRevealed } = useRevealOnScroll([]);
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  return (
    <section id="about" style={{ padding: '7rem 5% 7rem', background: t.bgAlt, transition: 'background 0.5s ease' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <FadeIn style={{ marginBottom: '3.5rem' }}>
          <p className="font-dm text-xs tracking-[0.25em] uppercase" style={{ marginBottom: '1rem', color: t.textMuted }}>About Me</p>
          <h2 className="font-cormorant font-light leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', color: t.text }}>
            Designer by craft,<br /><em>engineer by training.</em>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <div>
            {/* Bio card — blur reveal */}
            <div
              ref={bioRef}
              className="flex items-start gap-4"
              style={{
                marginBottom: '2.5rem',
                opacity: bioRevealed ? 1 : 0,
                filter: bioRevealed ? 'blur(0px)' : 'blur(6px)',
                transform: bioRevealed ? 'translateY(0)' : 'translateY(18px)',
                transition: 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), filter 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <div className="flex-shrink-0 rounded-full overflow-hidden border-2 border-white" style={{ width: '5rem', height: '5rem' }}>
                <img
                  src="https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/8c3586c5-87d7-4a69-acaf-06a7702348ab_Constanca.jpg?v=e39dd6796735130c5131f6b448cdeb29"
                  alt="Constança Cunha"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="font-dm text-sm font-medium" style={{ color: t.text }}>Constança Cunha</p>
                <p className="font-dm text-xs" style={{ marginTop: '0.15rem', color: t.textMuted }}>Lisbon, Portugal · Open to remote</p>
                <p className="font-dm text-xs leading-relaxed" style={{ marginTop: '0.5rem', color: t.textMuted }}>
                  Product Designer with a Computer Science background and a master&apos;s in Interaction &amp; Visualization. I&apos;ve worked on live products, built design systems used by engineers, and can implement my own designs in code.
                </p>
              </div>
            </div>

            {/* Skills — staggered spring pop-in */}
            <div>
              <p className="font-dm text-xs tracking-[0.2em] uppercase" style={{ marginBottom: '0.9rem', color: t.textMuted }}>Hover to learn more</p>
              <div ref={skillsRef} className="flex flex-wrap gap-2" style={{ marginBottom: '1.2rem' }}>
                {skills.map((s, i) => (
                  <div key={s.tag} className="relative">
                    <button
                      onMouseEnter={() => setHoveredSkill(s.tag)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onTouchStart={() => setHoveredSkill(s.tag === hoveredSkill ? null : s.tag)}
                      className="font-dm text-sm px-3 py-1.5 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap"
                      style={{
                        fontSize: '0.78rem',
                        opacity: skillsRevealed ? 1 : 0,
                        transform: skillsRevealed ? 'scale(1) translateY(0)' : 'scale(0.82) translateY(8px)',
                        transition: `opacity 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 38}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 38}ms, background 0.2s ease, color 0.2s ease, border-color 0.2s ease`,
                        background: isDark ? 'rgba(255,255,255,0.06)' : '#ffffff',
                        border: `1px solid ${isDark ? 'rgba(232,228,218,0.15)' : 'rgba(31,30,27,0.18)'}`,
                        color: t.text,
                      }}
                    >
                      {s.tag}
                    </button>
                    {hoveredSkill === s.tag && (
                      <div
                        className="absolute bottom-full left-0 mb-2 z-10 rounded-lg px-3 py-2 pointer-events-none"
                        style={{
                          fontSize: '0.7rem',
                          fontFamily: 'DM Sans',
                          width: '13rem',
                          lineHeight: 1.5,
                          background: isDark ? '#e8e4da' : '#1f1e1b',
                          color: isDark ? '#1f1e1b' : '#ffffff',
                        }}
                      >
                        {s.detail}
                        <div
                          className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                          style={{ borderTopColor: isDark ? '#e8e4da' : '#1f1e1b' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <FadeIn delay={200} style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: `1px solid ${t.border}` }}>
              <p className="font-dm text-xs tracking-[0.2em] uppercase" style={{ marginBottom: '0.75rem', color: t.textMuted }}>Certifications</p>
              <ul className="space-y-1.5">
                {[
                  'Enterprise Design Thinking Practitioner & Co-Creator — IBM',
                  'UI/UX & Figma Specialisation — Udemy · Le Wagon · Accenture',
                  'Web Developer Bootcamp — Udemy',
                ].map((c) => (
                  <li key={c} className="font-dm text-xs flex gap-2 items-start" style={{ color: t.textMuted }}>
                    <span className="material-icons-round text-xs text-sage leading-none" style={{ marginTop: '2px' }}>verified</span>
                    {c}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '1.2rem' }}>
                <p className="font-dm text-xs tracking-[0.2em] uppercase" style={{ marginBottom: '0.75rem', color: t.textMuted }}>Languages</p>
                <div className="flex gap-2 flex-wrap">
                  {languages.map((l) => (
                    <span
                      key={l.label}
                      className="font-dm text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      style={{
                        background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                        border: `1px solid ${t.border}`,
                        color: t.textMuted,
                      }}
                    >
                      <span className="material-icons-round text-xs leading-none" style={{ opacity: 0.5 }}>translate</span>
                      {l.label}
                      <span style={{ opacity: 0.5 }}>{l.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — Timeline */}
          <div className="space-y-7">
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 80} distance={24}>
                <div className="relative pl-5" style={{ borderLeft: `1px solid ${t.border}` }}>
                  <div className="absolute rounded-full bg-sage" style={{ left: '-0.35rem', top: '0.35rem', width: '0.65rem', height: '0.65rem' }} />
                  <p className="font-dm text-xs tracking-widest uppercase" style={{ marginBottom: '0.25rem', color: t.textMuted }}>{item.period}</p>
                  <p className="font-cormorant font-medium leading-tight" style={{ fontSize: '1.15rem', color: t.text }}>{item.role}</p>
                  <p className="font-dm text-sage" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>{item.company}</p>
                  <p className="font-dm leading-relaxed" style={{ fontSize: '0.82rem', marginBottom: '0.5rem', color: t.textMuted }}>{item.description}</p>
                  <p className="font-dm flex items-center gap-1" style={{ fontSize: '0.7rem', color: t.textFaint }}>
                    <span className="material-icons-round text-xs leading-none">star_outline</span>
                    {item.achievement}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
