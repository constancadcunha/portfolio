import { useState, useEffect, useRef } from 'react';
import FadeIn from '../../../components/base/FadeIn';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';

const skillGroups = [
  {
    title: 'Product Design',
    accent: 'Systems, flows, and interaction decisions that make products feel inevitable.',
    items: [
      { tag: 'Figma', detail: 'Advanced wireframing, systems, and handoff.' },
      { tag: 'Interaction Design', detail: 'Micro-interactions and clear user flows.' },
      { tag: 'Prototyping', detail: 'Low-fi to high-fidelity clickable flows.' },
      { tag: 'Information Architecture', detail: 'Content structure for clarity and speed.' },
    ],
  },
  {
    title: 'Research & Validation',
    accent: 'Evidence before polish, and testing before confidence.',
    items: [
      { tag: 'User Research', detail: 'Interviews, synthesis, and opportunity framing.' },
      { tag: 'Usability Testing', detail: 'Task-based tests and evidence-led iteration.' },
      { tag: 'Heuristic Evaluation', detail: 'Expert inspection with actionable fixes.' },
      { tag: 'AI Tools', detail: 'AI-assisted ideation and research workflows.' },
    ],
  },
  {
    title: 'Build & Systems',
    accent: 'Enough engineering depth to design for reality, not just presentation.',
    items: [
      { tag: 'Design Systems', detail: 'Atomic systems used by engineering teams.' },
      { tag: 'React + TypeScript', detail: 'Production-ready implementation of designs.' },
      { tag: 'SwiftUI', detail: 'Native product prototyping and build.' },
      { tag: 'Django + Python', detail: 'Backend support for research platforms.' },
    ],
  },
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
];

const certificateLinks = [
  {
    title: 'Enterprise Design Thinking Co-Creator — IBM',
    issuer: 'IBM',
    file: 'Enterprise_Design_Thinking_Co_Creator_Badge20250125-26-hts2xc.pdf',
  },
  {
    title: 'Enterprise Design Thinking Practitioner — IBM',
    issuer: 'IBM',
    file: 'Enterprise_Design_Thinking_Practitioner_Badge20250125-26-4dyqob.pdf',
  },
  {
    title: 'UI/UX Certificate — Udemy',
    issuer: 'Udemy',
    file: 'UC-486f6c5c-1406-477b-86bc-709727580248.pdf',
  },
  {
    title: 'UX Achievement Certificate',
    issuer: 'Accenture',
    file: 'digital-skills-user-experience_certificate_of_achievement_57cnwno.pdf',
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
  const { ref: skillsRef, revealed: skillsRevealed } = useRevealOnScroll(skillGroups);
  const { ref: bioRef, revealed: bioRevealed } = useRevealOnScroll([]);
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  const basePath = (__BASE_PATH__ || '/').replace(/\/?$/, '/');
  const certificateHref = (fileName: string) => `${basePath}Certificates/${encodeURIComponent(fileName)}`;
  const panelBg = isDark
    ? 'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.025) 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,244,238,0.98) 100%)';

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
              <div style={{ marginBottom: '1.1rem' }}>
                <p className="font-dm text-xs tracking-[0.2em] uppercase" style={{ color: t.textMuted }}>Core Skills</p>
                <p className="font-cormorant italic" style={{ marginTop: '0.35rem', fontSize: '1rem', color: t.textMuted }}>
                  The three pillars behind how I work.
                </p>
              </div>
              <div
                ref={skillsRef}
                style={{
                  marginBottom: '1.4rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '0.85rem',
                }}
              >
                {skillGroups.map((group, i) => (
                  <div
                    key={group.title}
                    style={{
                      opacity: skillsRevealed ? 1 : 0,
                      transform: skillsRevealed ? 'translateY(0)' : 'translateY(10px)',
                      transition: `opacity 0.45s ease ${i * 70}ms, transform 0.45s ease ${i * 70}ms`,
                      borderRadius: '1.1rem',
                      border: `1px solid ${t.border}`,
                      background: panelBg,
                      padding: '1.05rem 1.1rem',
                      boxShadow: isDark ? 'none' : '0 10px 24px rgba(111, 94, 70, 0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.9rem' }}>
                      <div>
                        <p className="font-cormorant" style={{ fontSize: '1.3rem', lineHeight: 1, color: t.text, marginBottom: '0.35rem' }}>
                          {group.title}
                        </p>
                        <p className="font-dm" style={{ fontSize: '0.72rem', lineHeight: 1.6, color: t.textMuted, maxWidth: '26rem' }}>
                          {group.accent}
                        </p>
                      </div>
                      <span
                        className="font-dm"
                        style={{
                          flexShrink: 0,
                          fontSize: '0.62rem',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: t.textFaint,
                          paddingTop: '0.2rem',
                        }}
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.55rem' }}>
                      {group.items.map((item) => (
                        <div
                          key={item.tag}
                          style={{
                            padding: '0.7rem 0.75rem',
                            borderRadius: '0.85rem',
                            background: isDark ? 'rgba(255,255,255,0.035)' : 'rgba(245, 239, 232, 0.85)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(111, 94, 70, 0.08)'}`,
                          }}
                        >
                          <p className="font-dm" style={{ fontSize: '0.74rem', color: t.text, lineHeight: 1.35, marginBottom: '0.22rem' }}>{item.tag}</p>
                          <p className="font-dm" style={{ fontSize: '0.66rem', color: t.textMuted, lineHeight: 1.5 }}>{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

            {/* Certifications under work experience */}
            <FadeIn delay={320}>
              <div style={{ marginTop: '1rem', paddingTop: '1.3rem', borderTop: `1px solid ${t.border}` }}>
                <div style={{ marginBottom: '1rem' }}>
                  <p className="font-dm text-xs tracking-[0.2em] uppercase" style={{ color: t.textMuted }}>Certifications</p>
                  <p className="font-cormorant italic" style={{ marginTop: '0.35rem', fontSize: '1rem', color: t.textMuted }}>
                    Credential archive with direct certificate links.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.7rem' }}>
                  {certificateLinks.map((cert, index) => (
                    <a
                      key={cert.file}
                      href={certificateHref(cert.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-dm"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        fontSize: '0.74rem',
                        lineHeight: 1.4,
                        padding: '0.95rem 1rem',
                        borderRadius: '1rem',
                        background: panelBg,
                        border: `1px solid ${t.border}`,
                        color: t.textMuted,
                        boxShadow: isDark ? 'none' : '0 10px 24px rgba(111, 94, 70, 0.06)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', minWidth: 0 }}>
                        <div
                          style={{
                            width: '2.4rem',
                            height: '2.4rem',
                            borderRadius: '999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            background: isDark ? 'rgba(232,228,218,0.1)' : 'rgba(111, 94, 70, 0.08)',
                            color: t.text,
                          }}
                        >
                          <span className="font-dm" style={{ fontSize: '0.7rem', letterSpacing: '0.06em' }}>0{index + 1}</span>
                        </div>
                        <span style={{ minWidth: 0 }}>
                          <span className="font-dm" style={{ display: 'block', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: t.textFaint, marginBottom: '0.15rem' }}>
                            {cert.issuer}
                          </span>
                          <span style={{ display: 'block', color: t.text, fontSize: '0.78rem', lineHeight: 1.45 }}>{cert.title}</span>
                        </span>
                      </div>
                      <span className="font-dm" style={{ whiteSpace: 'nowrap', color: t.text, fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', flexShrink: 0 }}>
                        Open <span className="material-icons-round" style={{ fontSize: '0.86rem', verticalAlign: 'text-bottom' }}>north_east</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
