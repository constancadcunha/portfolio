import { useState, useCallback } from 'react';
import FadeIn from '../../../components/base/FadeIn';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';

/* ─── TYPES ─────────────────────────────────────────────── */

interface ProjectLinks {
  caseStudy?: string;
  prototype?: string;
  live?: string;
  github?: string;
}

interface Project {
  name: string;
  tag: string;
  categories: string[];
  title: string;
  description: string;
  impact?: string;
  bg: string;
  details?: string;
  links?: ProjectLinks;
}

/* ─── DATA ──────────────────────────────────────────────── */

const featured: Project[] = [
  {
    name: 'nextflat',
    tag: 'Product Design · Design Systems · Frontend',
    categories: ['Web'],
    title: 'Redesigning a live Swiss real estate platform — from cluttered feed to map-first clarity',
    description:
      'Sole designer on a 500+ user platform. Redesigned homepage, property feed, and both lister and searcher dashboards across 2 release cycles. Built an atomic design system that cut frontend implementation time by ~30%.',
    impact: '~30% faster feature build · map-first feed · 2 release cycles shipped',
    bg: 'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/d13be3b3-3e62-4ab2-bf73-3a38241445b1_nextflat.png?v=f881151d216566e033795e859ef074d7',
    details:
      "As the sole designer at nextflat CH, I owned the full design process across 2 release cycles on a live Swiss real estate platform with 500+ active users. Starting from user research with both property listers and searchers, I identified that the core problem was a lack of spatial context — users couldn't understand where properties were relative to their life. I designed a map-first property feed with three view modes (map+feed, map+panel, full listing). Alongside product design, I built an atomic design system using CSS modules that engineering adopted directly, reducing estimated implementation time for new features by ~30% based on before/after engineering estimates.",
  },
  {
    name: 'SageBook',
    tag: 'iOS App · UX Research · SwiftUI',
    categories: ['Mobile'],
    title: 'Fixing the moment new cooks abandon a recipe — halfway through, pan already hot',
    description:
      'Survey found 60%+ abandon recipes mid-way due to unclear instructions. Designed a step-by-step execution flow with contextual ingredients and progress clarity. Zero backtracking in v2 vs. 3/5 hitting dead ends in v1.',
    impact: 'Zero backtracking in v2 · 60%+ mid-recipe abandonment addressed',
    bg: 'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/68d5af49-633b-40bd-bf93-fbaa8b39929c_sagebook.png?v=0739bd4c666dd878ca0fc30f6a4913b2',
    details:
      "SageBook started from a clear observation: new cooks abandon recipes not because they're unmotivated but because recipe formats are designed for experienced cooks. A survey of new cooks found 60%+ abandon mid-recipe due to unclear instructions. I designed a step-by-step execution flow — no scrolling back, no scanning ahead — where each step reveals only what's relevant. Contextual ingredient sub-lists, visual progress indicators, and inline timers addressed the specific failure modes. Usability testing showed zero backtracking in v2 vs. 3 out of 5 participants hitting dead ends in v1.",
    links: {
      caseStudy: 'https://constancadcunha.github.io/SageBook/',
      prototype: 'https://sagebook.figma.site/',
    },
  },
  {
    name: 'ReMi',
    tag: 'Mobile App · UCD · 7-week sprint',
    categories: ['Mobile'],
    title: "Young adults starting a first job shouldn't have to figure out relocation and budgeting alone",
    description:
      'Combined relocation planning and budget decisions into a single guided onboarding flow. Full UCD process: research, journey mapping, prototyping, two rounds of evaluation.',
    impact: '40% clarity improvement in onboarding · 2 rounds of usability evaluation',
    bg: 'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/3b6e777d-3d0f-46e8-9220-44f6e2eee1a9_remi1.png?v=7378270b2653db2ac3b341f97a6701fd',
    details:
      'A 7-week UCD sprint addressing a specific transition moment: young adults accepting their first job offer, then immediately facing relocation costs, rental deposits, setup budgets, and salary planning simultaneously. Research revealed these decisions are deeply interconnected but split across separate tools. ReMi combined them into a single guided onboarding flow — you enter your new job details once, and the app helps you plan your relocation and first-month budget as a single connected experience. Two rounds of usability evaluation showed a 40% improvement in onboarding clarity.',
    links: {
      caseStudy: 'https://group1ccul03.notion.site/78aca85d730543929c78a2d25c008060?v=0ed04df2912d4a379f3af8766f5ae863',
      prototype: 'https://www.figma.com/proto/KwwVf95iNG2TyMDblbhMAk/CCU?node-id=295-928',
    },
  },
];

const more: Project[] = [
  {
    name: 'Clicky',
    tag: 'Web · Interaction · Experimental',
    categories: ['Web', 'Experimental'],
    title: 'Every tap and click is a tiny conversation between a person and an interface.',
    bg: 'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/a4fd0202-006b-4ff0-b74f-3d36f11dad63_clicky1.png?v=bf206608caff9f32dd029fe425d52e8c',
    description: 'Micro-interaction design as a discipline worth showing, not just describing. Tactile feedback, spring physics, satisfying transitions — built as a working prototype.',
    links: {
      prototype: 'https://www.figma.com/proto/UC2rBn1q2buoAE2SHOHmMg/App?node-id=28-140&starting-point-node-id=28%3A140',
    },
  },
  {
    name: 'Incipit',
    tag: 'Web · Writing · Focus Design',
    categories: ['Web'],
    title: 'The hardest part of writing is the first sentence.',
    bg: 'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/f89773e7-9cce-4d26-9d17-5f82c73a1c05_incipit.png?v=739f4a870d5d073135dacc8b19946307',
    description: 'Distraction-free writing environment designed around blank-page paralysis. No word count anxiety, no pressure — just gentle entry-point prompts.',
    links: {
      live: 'https://constancadcunha.github.io/incipit/',
      github: 'https://github.com/constancadcunha/incipit',
    },
  },
  {
    name: 'CottageTunes',
    tag: 'Mobile · Music · Discovery',
    categories: ['Mobile'],
    title: 'Music discovery built around atmosphere, not algorithm.',
    bg: 'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/9d6f502c-4e6c-45d7-9fe8-ca48fa7425c1_cottagetunes.png?v=2100af8a01d528cdf18320946b7443da',
    description: 'Mood-first discovery interface navigating by setting and context — rain, morning light, focus — rather than genre or listening history.',
    links: {
      github: 'https://github.com/constancadcunha/CottageTunes',
    },
  },
  {
    name: 'BookPod',
    tag: 'Mobile · Reading · Habit Design',
    categories: ['Mobile'],
    title: 'Readers stop reading because friction wins, not because motivation fades.',
    bg: 'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/d46ac9d9-031a-41e0-b145-f90b46b62416_bookPod.png?v=9bcf0c85c9c5106211fcccf34e0565d6',
    description: 'Social reading companion using micro-session framing, ambient community presence, and low-pressure streaks. Concept exploration in habit formation.',
    links: {
      live: 'https://constancadcunha.github.io/bookPod/',
      github: 'https://github.com/constancadcunha/bookPod',
    },
  },
  {
    name: 'Skein',
    tag: 'Mobile · Craft · Community',
    categories: ['Mobile'],
    title: "A craft app designed around how knitters actually think — not how apps assume they do.",
    bg: 'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/e4846dbe-843f-4b39-a049-7fddabbfe165_skein.png?v=a049a4fb97d426ca18d66a8f7dc49e2e',
    description: 'Pattern progress tracking, yarn stash management, and community sharing designed around project states and non-linear workflows.',
    links: {
      live: 'https://constancadcunha.github.io/skein/',
      github: 'https://github.com/constancadcunha/skein',
    },
  },
  {
    name: 'DebugQuest',
    tag: 'Web · Game · Developer Tools',
    categories: ['Web', 'Experimental'],
    title: 'Learning to debug should feel like solving a puzzle, not reading a manual.',
    bg: 'https://readdy.ai/api/search-image?query=minimalist%20retro%20terminal%20debugging%20interface%20with%20soft%20warm%20beige%20tones%20clean%20flat%20illustration%20style%20screen%20glow%20subtle%20code%20lines%20aesthetic%20quiet%20background&width=640&height=480&seq=debugquest1&orientation=landscape',
    description: 'Interactive debugging challenge built to make error-finding intuitive and even enjoyable. Code puzzles, incremental hints, and instant feedback loops.',
    links: {
      github: 'https://github.com/constancadcunha/DebugQuest',
    },
  },
];

const FILTER_TAGS = ['All', 'Web', 'Mobile', 'Experimental'] as const;
type FilterTag = typeof FILTER_TAGS[number];

/* ─── HELPERS ────────────────────────────────────────────── */

function primaryLink(links?: ProjectLinks): string | undefined {
  return links?.live ?? links?.prototype ?? links?.github;
}

/* ─── CASE STUDY MODAL ───────────────────────────────────── */

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ background: t.card, boxShadow: '0 24px 80px rgba(0,0,0,0.3)', maxHeight: '90vh' }}
      >
        <div className="relative h-52 sm:h-60 overflow-hidden sm:rounded-t-2xl rounded-t-2xl" style={{ background: isDark ? '#2a2824' : '#f5f3f0' }}>
          <img src={project.bg} alt={project.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            style={{ background: isDark ? 'rgba(30,28,24,0.9)' : 'rgba(255,255,255,0.9)' }}
          >
            <i className="ri-close-line text-base leading-none" style={{ color: t.text }} />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <p className="font-dm text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: t.textMuted }}>{project.tag}</p>
          <h2 className="font-cormorant font-light leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', maxWidth: '32rem', color: t.text }}>
            Problems I solved,<br />
            <em>not just screens I designed.</em>
          </h2>
          {project.impact && <p className="font-dm text-xs text-sage font-medium mb-5">{project.impact}</p>}
          <p className="font-dm text-sm leading-relaxed mb-6" style={{ color: t.textMuted }}>{project.details ?? project.description}</p>
          {(project.links?.caseStudy || project.links?.prototype) && (
            <div className="flex flex-wrap gap-2 pt-5" style={{ borderTop: `1px solid ${t.borderDivider}` }}>
              {project.links?.caseStudy && (
                <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer"
                  className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                  style={{ fontSize: '0.72rem', border: `1px solid ${t.borderInput}`, color: t.text }}
                  onClick={(e) => e.stopPropagation()}>
                  <i className="ri-article-line text-xs" />Case study<i className="ri-external-link-line text-xs opacity-60" />
                </a>
              )}
              {project.links?.prototype && (
                <a href={project.links.prototype} target="_blank" rel="noopener noreferrer"
                  className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                  style={{ fontSize: '0.72rem', border: `1px solid ${t.borderInput}`, color: t.text }}
                  onClick={(e) => e.stopPropagation()}>
                  <i className="ri-play-circle-line text-xs" />Live prototype<i className="ri-external-link-line text-xs opacity-60" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── MORE PROJECT MINI MODAL ────────────────────────────── */

function MoreProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ background: t.card, boxShadow: '0 24px 80px rgba(0,0,0,0.28)', maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden" style={{ height: '10rem', background: isDark ? '#2a2824' : '#f5f3f0' }}>
          <img src={project.bg} alt={project.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          <span className="absolute bottom-3 left-4 font-dm text-xs text-white/90 tracking-widest uppercase font-medium">{project.name}</span>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full transition-colors cursor-pointer"
            style={{ background: isDark ? 'rgba(30,28,24,0.9)' : 'rgba(255,255,255,0.9)' }}
          >
            <i className="ri-close-line text-sm" style={{ color: t.text }} />
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <p className="font-dm tracking-[0.2em] uppercase" style={{ fontSize: '0.55rem', marginBottom: '0.5rem', color: t.textMuted }}>{project.tag}</p>
          <h3 className="font-cormorant font-light leading-snug" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: t.text }}>{project.title}</h3>
          <p className="font-dm leading-relaxed" style={{ fontSize: '0.8rem', marginBottom: '1.25rem', color: t.textMuted }}>{project.description}</p>
          <div className="flex flex-wrap gap-2" style={{ borderTop: `1px solid ${t.borderDivider}`, paddingTop: '1rem' }}>
            {project.links?.prototype && (
              <a href={project.links.prototype} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                style={{ fontSize: '0.72rem', border: `1px solid ${t.border}`, color: t.textMuted }}>
                <i className="ri-play-circle-line text-xs" />View prototype<i className="ri-external-link-line text-xs opacity-50" />
              </a>
            )}
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                style={{ fontSize: '0.72rem', border: `1px solid ${t.border}`, color: t.textMuted }}>
                <i className="ri-global-line text-xs" />Live site<i className="ri-external-link-line text-xs opacity-50" />
              </a>
            )}
            {project.links?.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                style={{ fontSize: '0.72rem', border: `1px solid ${t.borderInput}`, color: t.textMuted }}>
                <i className="ri-github-line text-xs" />View code<i className="ri-external-link-line text-xs opacity-50" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── LINK ICON BUTTONS ─────────────────────────────────── */

interface LinkBtnProps { href: string; icon: string; label: string; }

function LinkBtn({ href, icon, label }: LinkBtnProps) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={label}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-150 cursor-pointer flex-shrink-0"
      style={{ border: `1px solid ${t.border}`, color: t.textMuted }}>
      <i className={`${icon} text-xs leading-none`} />
    </a>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [openMoreProject, setOpenMoreProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All');
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);

  const handleRowMouseMove = useCallback((e: React.MouseEvent) => {
    setPreviewPos({ x: e.clientX, y: e.clientY });
  }, []);

  const filteredMore = activeFilter === 'All'
    ? more
    : more.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="projects" style={{ background: t.bg, padding: '7rem 5% 6rem', transition: 'background 0.5s ease' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Section header */}
        <FadeIn style={{ marginBottom: '3.5rem' }}>
          <p className="font-dm text-xs tracking-[0.25em] uppercase" style={{ marginBottom: '1rem', color: t.textMuted }}>Selected Work</p>
          <h2 className="font-cormorant font-light leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', maxWidth: '32rem', color: t.text }}>
            Problems I solved,<br />
            <em>not just screens I designed.</em>
          </h2>
          <p className="font-dm" style={{ marginTop: '1.2rem', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '28rem', color: t.textMuted }}>
            Each project shows the problem, the thinking, the key decisions — and the estimated impact on real users.
          </p>
        </FadeIn>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: '4.5rem' }}>
          {featured.map((p, i) => (
            <FadeIn key={p.name} delay={i * 100}>
              <div
                className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 cursor-pointer h-full"
                onClick={() => setOpenProject(p)}
                style={{ background: t.card, border: `1px solid ${t.border}` }}
              >
                <div className="relative overflow-hidden" style={{ height: '12rem', background: isDark ? '#2a2824' : '#f5f3f0' }}>
                  <img src={p.bg} alt={p.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-3 left-4 font-dm text-xs text-white/90 tracking-widest uppercase font-medium">{p.name}</span>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <p className="font-dm tracking-[0.22em] uppercase" style={{ fontSize: '0.55rem', marginBottom: '0.6rem', color: t.textMuted }}>{p.tag}</p>
                  <h3 className="font-cormorant font-normal leading-snug" style={{ fontSize: '1.1rem', marginBottom: '0.65rem', color: t.text }}>{p.title}</h3>
                  <p className="font-dm leading-relaxed" style={{ fontSize: '0.75rem', marginBottom: '0.65rem', color: t.textMuted }}>{p.description}</p>
                  <p className="font-dm text-sage font-medium" style={{ fontSize: '0.65rem', marginBottom: '1.2rem' }}>{p.impact}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {p.links?.caseStudy ? (
                      <a href={p.links.caseStudy} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                        style={{ fontSize: '0.72rem', border: `1px solid ${t.borderInput}`, color: t.text }}>
                        <i className="ri-article-line text-xs" />Case study<i className="ri-external-link-line text-xs opacity-50" />
                      </a>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); setOpenProject(p); }}
                        className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer"
                        style={{ fontSize: '0.72rem', border: `1px solid ${t.borderInput}`, color: t.text }}>
                        View case study
                      </button>
                    )}
                    {p.links?.prototype && (
                      <a href={p.links.prototype} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                        className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                        style={{ fontSize: '0.72rem', border: `1px solid ${t.border}`, color: t.textMuted }}>
                        <i className="ri-play-circle-line text-xs" />Prototype
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* More work */}
        <FadeIn>
          <div style={{ borderTop: `1px solid ${t.borderDivider}`, paddingTop: '2.5rem' }}>

            {/* Header row with filter pills */}
            <div className="flex flex-wrap items-center justify-between gap-3" style={{ marginBottom: '1.5rem' }}>
              <p className="font-dm uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.28em', color: t.textFaint }}>Also worth seeing</p>
              <div className="flex items-center gap-1.5">
                {FILTER_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className="font-dm whitespace-nowrap cursor-pointer transition-all duration-200 rounded-full"
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.08em',
                      padding: '0.3rem 0.85rem',
                      background: activeFilter === tag ? t.text : 'transparent',
                      color: activeFilter === tag ? (isDark ? '#1c1a17' : '#ffffff') : t.textMuted,
                      border: activeFilter === tag ? `1px solid ${t.text}` : `1px solid ${t.border}`,
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Project rows */}
            <div>
              {filteredMore.length === 0 && (
                <p className="font-dm text-sm py-6 text-center" style={{ color: t.textFaint }}>No projects in this category yet.</p>
              )}
              {filteredMore.map((p, i) => (
                <div
                  key={p.name}
                  style={{
                    opacity: 1,
                    transform: 'translateY(0)',
                    transition: `opacity 0.35s ease ${i * 50}ms, transform 0.35s ease ${i * 50}ms`,
                  }}
                >
                  <div
                    className="group flex items-center gap-4 py-3.5 rounded px-2 cursor-pointer transition-colors duration-150"
                    onClick={() => setOpenMoreProject(p)}
                    onMouseEnter={() => setPreviewProject(p)}
                    onMouseLeave={() => setPreviewProject(null)}
                    onMouseMove={handleRowMouseMove}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setOpenMoreProject(p)}
                    style={{
                      borderBottom: `1px solid ${t.border}`,
                    }}
                  >
                    <div className="flex-shrink-0 rounded overflow-hidden" style={{ width: '4rem', height: '3rem', background: isDark ? '#2a2824' : '#f0ede8' }}>
                      <img src={p.bg} alt={p.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5" style={{ marginBottom: '0.15rem' }}>
                        <span className="font-dm text-sm font-medium whitespace-nowrap" style={{ color: t.text }}>{p.name}</span>
                        {/* Category badges */}
                        <div className="hidden sm:flex items-center gap-1">
                          {p.categories.map((cat) => (
                            <span key={cat} className="font-dm rounded-full"
                              style={{
                                fontSize: '0.5rem',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                padding: '0.15rem 0.5rem',
                                background: isDark
                                  ? cat === 'Experimental' ? 'rgba(180,160,220,0.12)' : cat === 'Mobile' ? 'rgba(120,180,140,0.12)' : 'rgba(232,228,218,0.08)'
                                  : cat === 'Experimental' ? 'rgba(94,80,134,0.08)' : cat === 'Mobile' ? 'rgba(80,120,100,0.08)' : 'rgba(31,30,27,0.06)',
                                color: cat === 'Experimental' ? (isDark ? 'rgba(180,160,220,0.8)' : 'rgba(94,80,134,0.7)') :
                                       cat === 'Mobile' ? (isDark ? 'rgba(120,180,140,0.9)' : 'rgba(80,120,100,0.8)') :
                                       t.textMuted,
                              }}>
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="font-dm leading-snug truncate" style={{ fontSize: '0.72rem', color: t.textMuted }}>{p.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {p.links?.prototype && <LinkBtn href={p.links.prototype} icon="ri-play-circle-line" label="View prototype" />}
                      {p.links?.live && <LinkBtn href={p.links.live} icon="ri-global-line" label="View live" />}
                      {p.links?.github && <LinkBtn href={p.links.github} icon="ri-github-line" label="View on GitHub" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Cursor-following hover preview */}
      {previewProject && (
        <div
          style={{
            position: 'fixed',
            left: previewPos.x + 22,
            top: previewPos.y - 80,
            zIndex: 500,
            pointerEvents: 'none',
            width: '13rem',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            background: t.card,
            border: `1px solid ${t.border}`,
            animation: 'previewFadeIn 0.18s ease forwards',
          }}
        >
          <div style={{ width: '100%', height: '8rem', overflow: 'hidden', background: isDark ? '#2a2824' : '#f5f3f0' }}>
            <img src={previewProject.bg} alt={previewProject.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div style={{ padding: '0.6rem 0.75rem' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', color: t.text, fontWeight: 500, marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {previewProject.name}
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.58rem', color: t.textMuted, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {previewProject.tag}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes previewFadeIn {
          from { opacity: 0; transform: translateY(4px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {openProject && <CaseStudyModal project={openProject} onClose={() => setOpenProject(null)} />}
      {openMoreProject && <MoreProjectModal project={openMoreProject} onClose={() => setOpenMoreProject(null)} />}
    </section>
  );
}
