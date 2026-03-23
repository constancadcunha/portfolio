/**
 * CVPrint — hidden component that renders a clean A4 CV.
 * Only visible during window.print(). All regular UI is hidden via @media print CSS.
 */

const CV_EXPERIENCE = [
  {
    period: 'Sep 2025 – Mar 2026',
    role: 'Product Designer & Frontend Engineer',
    company: 'nextflat CH · Zurich, Remote',
    bullets: [
      'Sole designer on a live Swiss real estate platform with 500+ active users.',
      'Redesigned homepage, property feed and lister/searcher dashboards across 2 release cycles.',
      'Built an atomic design system (CSS modules) reducing estimated frontend implementation time by ~30%.',
    ],
  },
  {
    period: 'Jul – Aug 2024',
    role: 'Front-End Developer Intern',
    company: 'Sky Portugal · Lisbon',
    bullets: [
      'Designed and built an internal STB device management system in under 2 weeks.',
      'Reduced device onboarding time from several days to under 4 hours.',
      'Built structured data exports adopted by all operational teams.',
    ],
  },
  {
    period: 'Mar 2024 – May 2025',
    role: 'Coordinator',
    company: 'SINFO · Lisbon',
    bullets: [
      "Led a 30-person team organising Portugal's largest free tech conference.",
      '5,000+ attendees, 85+ partner companies, Tier-1 sponsorships including Oracle.',
      'Coordinated national media coverage through CNN Portugal.',
    ],
  },
  {
    period: 'Mar 2022 – May 2023',
    role: 'Head of Human Resources',
    company: 'Diferencial IST · Lisbon',
    bullets: [
      'Built recruitment and onboarding processes from scratch for a 20+ member student team.',
    ],
  },
];

const CV_EDUCATION = [
  {
    period: '2024 – 2026 (expected)',
    degree: 'M.Sc. Computer Science',
    sub: 'Interaction & Visualization',
    school: 'Instituto Superior Técnico, Lisbon',
    note: 'Thesis: multi-method usability research platform (Django + heuristic evaluation + SAM surveys)',
  },
  {
    period: '2020 – 2024',
    degree: 'B.Sc. Computer Science',
    sub: '',
    school: 'Instituto Superior Técnico, Lisbon',
    note: 'Foundation in algorithms, software engineering and systems.',
  },
];

const CV_SKILLS_DESIGN = ['Figma', 'User Research', 'Usability Testing', 'Interaction Design', 'Information Architecture', 'Heuristic Evaluation', 'Prototyping', 'Design Systems'];
const CV_SKILLS_TECH = ['React', 'TypeScript', 'SwiftUI', 'Django', 'Python', 'AI Tools'];

const CV_CERTS = [
  'Enterprise Design Thinking Practitioner & Co-Creator — IBM',
  'UI/UX & Figma Specialisation — Udemy · Le Wagon · Accenture',
  'Web Developer Bootcamp — Udemy',
];

const CV_LANGS = [
  { label: 'Portuguese', level: 'Native' },
  { label: 'English', level: 'C2' },
  { label: 'French', level: 'B2' },
  { label: 'Spanish', level: 'B1' },
];

export default function CVPrint() {
  return (
    <div
      id="cv-print-root"
      style={{
        display: 'none',
        fontFamily: '"DM Sans", sans-serif',
        background: '#ffffff',
        color: '#1a1916',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: '2.2rem 2.5rem 1.4rem',
          borderBottom: '2px solid #1a1916',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '2rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '2.4rem',
              fontWeight: 300,
              letterSpacing: '0.02em',
              lineHeight: 1,
              margin: 0,
              color: '#1a1916',
            }}
          >
            Constança Cunha
          </h1>
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(26,25,22,0.5)',
              marginTop: '0.45rem',
            }}
          >
            Product Designer · UX Researcher · Frontend Engineer
          </p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'rgba(26,25,22,0.6)', lineHeight: 1.8 }}>
          <div>Lisbon, Portugal · Open to remote</div>
          <div>constancadcunha@gmail.com</div>
          <div>linkedin.com/in/constanca-cunha</div>
          <div>github.com/constancadcunha</div>
        </div>
      </div>

      {/* ── Two columns ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.75fr',
          gap: '0',
          padding: '0',
        }}
      >
        {/* Left column */}
        <div
          style={{
            padding: '1.5rem 1.6rem 2rem 2.5rem',
            borderRight: '1px solid rgba(26,25,22,0.12)',
          }}
        >
          {/* Skills — Design */}
          <Section title="Design & Research">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {CV_SKILLS_DESIGN.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: '0.62rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(26,25,22,0.2)',
                    color: '#1a1916',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* Skills — Tech */}
          <Section title="Engineering">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {CV_SKILLS_TECH.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: '0.62rem',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(26,25,22,0.2)',
                    color: '#1a1916',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            {CV_EDUCATION.map((e, i) => (
              <div key={i} style={{ marginBottom: i < CV_EDUCATION.length - 1 ? '0.85rem' : 0 }}>
                <p style={{ fontSize: '0.6rem', color: 'rgba(26,25,22,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{e.period}</p>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, margin: '0.1rem 0 0', color: '#1a1916' }}>{e.degree}</p>
                {e.sub && <p style={{ fontSize: '0.68rem', color: 'rgba(26,25,22,0.6)', margin: '0.05rem 0 0' }}>{e.sub}</p>}
                <p style={{ fontSize: '0.68rem', color: '#5a7a5a', margin: '0.1rem 0 0' }}>{e.school}</p>
                <p style={{ fontSize: '0.62rem', color: 'rgba(26,25,22,0.5)', margin: '0.2rem 0 0', lineHeight: 1.4 }}>{e.note}</p>
              </div>
            ))}
          </Section>

          {/* Languages */}
          <Section title="Languages">
            {CV_LANGS.map((l) => (
              <div key={l.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '0.25rem', color: '#1a1916' }}>
                <span>{l.label}</span>
                <span style={{ color: 'rgba(26,25,22,0.45)' }}>{l.level}</span>
              </div>
            ))}
          </Section>

          {/* Certifications */}
          <Section title="Certifications">
            {CV_CERTS.map((c) => (
              <p key={c} style={{ fontSize: '0.62rem', color: 'rgba(26,25,22,0.65)', lineHeight: 1.5, margin: '0 0 0.3rem' }}>
                · {c}
              </p>
            ))}
          </Section>
        </div>

        {/* Right column — Experience */}
        <div style={{ padding: '1.5rem 2.5rem 2rem 1.8rem' }}>
          <Section title="Experience">
            {CV_EXPERIENCE.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: i < CV_EXPERIENCE.length - 1 ? '1.1rem' : 0,
                  paddingBottom: i < CV_EXPERIENCE.length - 1 ? '1.1rem' : 0,
                  borderBottom: i < CV_EXPERIENCE.length - 1 ? '1px solid rgba(26,25,22,0.07)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                  <p
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: '#1a1916',
                      margin: 0,
                    }}
                  >
                    {exp.role}
                  </p>
                  <p style={{ fontSize: '0.58rem', color: 'rgba(26,25,22,0.4)', letterSpacing: '0.08em', whiteSpace: 'nowrap', margin: 0 }}>
                    {exp.period}
                  </p>
                </div>
                <p style={{ fontSize: '0.66rem', color: '#5a7a5a', margin: '0.1rem 0 0.4rem' }}>{exp.company}</p>
                <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: '0.68rem', color: 'rgba(26,25,22,0.65)', lineHeight: 1.55, marginBottom: '0.15rem' }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ── Small section heading helper ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.15rem' }}>
      <p
        style={{
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(26,25,22,0.4)',
          marginBottom: '0.5rem',
          paddingBottom: '0.3rem',
          borderBottom: '1px solid rgba(26,25,22,0.1)',
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}
