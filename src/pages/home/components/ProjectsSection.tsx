import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import FadeIn from '../../../components/base/FadeIn';
import FigmaToShipped, { type FigmaToShippedProps } from '../../../components/feature/FigmaToShipped';
import { highlightImportantText } from '../../../components/base/highlightImportantText';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';
import { asset } from '../../../utils/asset';
import Icon from '../../../components/base/Icon';

/* ─── TYPES ─────────────────────────────────────────────── */

interface ProjectLinks {
  caseStudy?: string;
  prototype?: string;
  live?: string;
  github?: string;
}

interface Metric {
  label: string;
  before: string;
  after: string;
  /** Bar lengths as a fraction of 1 */
  from: number;
  to: number;
}

interface Project {
  name: string;
  accentKey?: 'blue' | 'purple' | 'gold' | 'sage' | 'amber';
  tag: string;
  categories: string[];
  title: string;
  description: string;
  impact?: string;
  /** Card image. Omit for confidential work: `metrics` are shown instead. */
  bg?: string;
  alt?: string;
  /** Company · role · dates line, shown in the case study */
  meta?: string;
  details?: string;
  bullets?: string[];
  metrics?: Metric[];
  /** Big number above the metrics, e.g. { value: '200,000+', label: 'customers' } */
  headlineStat?: { value: string; label: string };
  /** Note shown in place of screenshots for confidential client work */
  confidentialNote?: string;
  figmaShipped?: FigmaToShippedProps[];
  links?: ProjectLinks;
}

/* ─── DATA ──────────────────────────────────────────────── */

const featured: Project[] = [
  {
    name: 'mySheepi',
    accentKey: 'sage',
    tag: 'E-commerce · Shopify · Performance',
    categories: ['Web'],
    title: 'Rebuilding a live storefront for 200,000+ customers, and tripling its PageSpeed score',
    description:
      'Redesigned and rebuilt key storefront pages in Shopify Liquid for a German D2C sleep brand. PageSpeed went from the 20s–30s to the 80s–90s, and I contributed to average daily sales growing ~10× since April 2026.',
    impact: 'PageSpeed 20s–30s → 80s–90s · ~10× daily sales · 200,000+ customers',
    bg: asset('images/mysheepi.webp'),
    alt: 'mySheepi storefront homepage: neck pillow hero with a "Mehr Halt für Deinen Nacken" headline',
    meta: 'Phira Ventures · Frontend Developer · Apr 2026 – present',
    details:
      'mySheepi is a German direct-to-consumer sleep brand with more than 200,000 customers, selling through a Shopify storefront. At Phira Ventures I redesigned and rebuilt its key storefront pages in Shopify Liquid, with performance treated as a design constraint from the start.',
    bullets: [
      'Redesigned and rebuilt key storefront pages in Shopify Liquid; PageSpeed scores went from the 20s–30s to the 80s–90s.',
      'Contributed to average daily sales growing ~10×, from about EUR 1k to EUR 10k a day, since April 2026.',
      'Built a KPI dashboard with live-site monitoring and automated accessibility checks.',
      'Built an internal promotion scheduler.',
    ],
    metrics: [
      { label: 'PageSpeed score', before: '20s–30s', after: '80s–90s', from: 0.25, to: 0.86 },
      { label: 'Avg. daily sales', before: '~€1k', after: '~€10k', from: 0.1, to: 1 },
    ],
    headlineStat: { value: '200,000+', label: 'customers on a live Shopify storefront' },
  },
  {
    name: 'nextflat',
    accentKey: 'blue',
    tag: 'Product Design · Design Systems · Frontend',
    categories: ['Web'],
    title: 'Redesigning a live Swiss real estate platform — from cluttered feed to map-first clarity',
    description:
      'Sole designer and frontend engineer on a live platform with 500+ users. Redesigned the homepage, property feed and both dashboards across 2 release cycles, on an atomic design system that cut estimated build time for new features by ~30%.',
    impact: '~30% faster feature builds · map-first feed · 2 release cycles shipped',
    bg: asset('images/nextflat.webp'),
    alt: 'nextflat property feed with a map beside the listing results',
    meta: 'nextflat · Zurich, remote · Sep 2025 – Mar 2026',
    details:
      "As the sole designer and frontend engineer at nextflat, I owned the work end to end on a live Swiss real estate platform with 500+ users, across 2 release cycles. Research with property listers and searchers showed the core problem was missing spatial context: people couldn't see where a property sat relative to their life.",
    bullets: [
      'Designed and built a map-first property feed with three view modes: map + feed, map + panel, and full listing.',
      'Redesigned the homepage and both the lister and searcher dashboards.',
      'Built an atomic design system of accessible React + CSS Modules components, cutting estimated build time for new features by ~30%.',
    ],
    figmaShipped: [
      {
        // TODO(images): add the Figma export and the shipped screenshot of the map-first feed
        frameName: 'Property feed / Map + feed',
        caption: 'The map-first feed, designed and then built in React + CSS Modules.',
      },
      {
        // TODO(images): add the Figma export and the shipped screenshot of a dashboard
        frameName: 'Lister dashboard',
        caption: 'Lister dashboard, built from the same atomic components.',
      },
    ],
  },
  {
    name: 'StitchCraft Studio',
    accentKey: 'amber',
    tag: 'Web app · Next.js · AI',
    categories: ['Web'],
    title: 'A studio for knitters: AI pattern drafting, chart design and hands-free row tracking',
    description:
      'Next.js 16, React 19 and TypeScript. AI pattern drafting from a description or photo, a colourwork chart editor, and a voice-controlled row tracker.',
    impact: '36k+ lines of TypeScript · 31 test files · live demo',
    bg: asset('images/stitchcraft.webp'),
    alt: 'StitchCraft Studio landing page showing a Fair Isle colourwork chart',
    meta: 'Personal project · designed and built solo',
    details:
      'StitchCraft Studio covers a whole knitting project in one place: drafting the pattern, charting the colourwork, and keeping count while your hands are busy. I designed it and built it end to end.',
    bullets: [
      'AI pattern drafting from a description or a photo, with validation and a deterministic fallback.',
      'A colourwork chart editor.',
      'A voice-controlled row tracker, so you can count rows hands-free.',
      'Next.js 16, React 19 and TypeScript: 36k+ lines of TypeScript, 31 test files.',
    ],
    figmaShipped: [
      {
        // TODO(images): add the Figma frame (see "Revamp KnitCraft AI Design" in the knitcraft repo) and a shipped screenshot
        frameName: 'Chart editor',
        url: 'knitcraft-production.up.railway.app',
        caption: 'The colourwork chart editor, from Figma frame to the live app.',
      },
    ],
    links: {
      live: 'https://knitcraft-production.up.railway.app/',
      github: 'https://github.com/constancadcunha/knitcraft',
    },
  },
  {
    name: 'SageBook',
    accentKey: 'gold',
    tag: 'iOS App · UX Research · SwiftUI',
    categories: ['Mobile'],
    title: 'Fixing the moment new cooks abandon a recipe — halfway through, pan already hot',
    description:
      'Survey found 60%+ abandon recipes mid-way due to unclear instructions. Designed a step-by-step execution flow with contextual ingredients and progress clarity. Zero backtracking in v2 vs. 3/5 hitting dead ends in v1.',
    impact: 'Zero backtracking in v2 · 60%+ mid-recipe abandonment addressed',
    bg: asset('images/sagebook.webp'),
    alt: 'SageBook iOS screens showing a step-by-step recipe flow',
    details:
      "SageBook started from a clear observation: new cooks abandon recipes not because they're unmotivated but because recipe formats are designed for experienced cooks. A survey of new cooks found 60%+ abandon mid-recipe due to unclear instructions. I designed a step-by-step execution flow — no scrolling back, no scanning ahead — where each step reveals only what's relevant. Contextual ingredient sub-lists, visual progress indicators, and inline timers addressed the specific failure modes. Usability testing showed zero backtracking in v2 vs. 3 out of 5 participants hitting dead ends in v1.",
    figmaShipped: [
      {
        // TODO(images): add the Figma frame and the SwiftUI screenshot of a recipe step
        frameName: 'Recipe step / iPhone',
        caption: 'A recipe step in Figma and in the SwiftUI build.',
      },
    ],
    links: {
      caseStudy: 'https://constancadcunha.github.io/SageBook/',
      prototype: 'https://sagebook.figma.site/',
    },
  },
];

const more: Project[] = [
  {
    name: 'skein',
    accentKey: 'purple',
    tag: 'Web · Craft · Colour',
    categories: ['Web'],
    title: 'Try the colours before a single stitch.',
    bg: asset('images/skein.webp'),
    alt: 'skein landing page: "Make your palette before you crochet"',
    description: 'A live colour studio for crochet. Pick your yarns, choose your stitch, watch it come to life.',
    links: {
      live: 'https://constancadcunha.github.io/skein/',
      github: 'https://github.com/constancadcunha/skein',
    },
  },
  {
    name: 'bookPod',
    accentKey: 'gold',
    tag: 'Web · Reading · Playful',
    categories: ['Web'],
    title: 'Browse books the way you used to browse music.',
    bg: asset('images/bookpod.webp'),
    alt: 'bookPod: an iPod classic whose screen lists books',
    description: 'An iPod classic, but for books. Scroll the wheel, find your next read.',
    links: {
      live: 'https://constancadcunha.github.io/bookPod/',
      github: 'https://github.com/constancadcunha/bookPod',
    },
  },
  {
    name: 'incipit',
    accentKey: 'blue',
    tag: 'Web · Writing · Generative',
    categories: ['Web', 'Experimental'],
    title: 'One line at a time.',
    bg: asset('images/incipit.webp'),
    alt: 'incipit: the word "incipit" above a generated first line of a novel',
    description: 'The first line of a novel that was never written. Press any key for another, forever.',
    links: {
      live: 'https://constancadcunha.github.io/incipit/',
      github: 'https://github.com/constancadcunha/incipit',
    },
  },
  {
    name: 'CottageTunes',
    accentKey: 'sage',
    tag: 'iOS · SwiftUI · Music',
    categories: ['Mobile'],
    title: 'A music player with a cottage garden in it.',
    bg: asset('images/cottagetunes.webp'),
    alt: 'CottageTunes iPhone screen with a floral song list',
    description: 'A whimsical music player with floral UI and nostalgic cottagecore charm, built in SwiftUI.',
    links: {
      github: 'https://github.com/constancadcunha/CottageTunes',
    },
  },
  {
    name: 'ReMi',
    accentKey: 'purple',
    tag: 'Mobile App · UCD · 7-week sprint',
    categories: ['Mobile'],
    title: "Young adults starting a first job shouldn't have to figure out relocation and budgeting alone",
    description:
      'Combined relocation planning and budget decisions into a single guided onboarding flow. Full UCD process: research, journey mapping, prototyping, two rounds of evaluation.',
    impact: '40% clarity improvement in onboarding · 2 rounds of usability evaluation',
    bg: asset('images/remi.webp'),
    alt: 'ReMi onboarding screens for relocation and budgeting',
    links: {
      caseStudy: 'https://group1ccul03.notion.site/78aca85d730543929c78a2d25c008060?v=0ed04df2912d4a379f3af8766f5ae863',
      prototype: 'https://www.figma.com/proto/KwwVf95iNG2TyMDblbhMAk/CCU?node-id=295-928',
    },
  },
  {
    name: 'Clicky',
    accentKey: 'amber',
    tag: 'Web · Interaction · Experimental',
    categories: ['Web', 'Experimental'],
    title: 'Every tap and click is a tiny conversation between a person and an interface.',
    bg: asset('images/clicky.webp'),
    alt: 'Clicky prototype showing tactile buttons and toggles',
    description: 'Micro-interaction design as a discipline worth showing, not just describing. Tactile feedback, spring physics, satisfying transitions — built as a working prototype.',
    links: {
      prototype: 'https://www.figma.com/proto/UC2rBn1q2buoAE2SHOHmMg/App?node-id=28-140&starting-point-node-id=28%3A140',
    },
  },
  {
    name: 'DebugQuest',
    accentKey: 'blue',
    tag: 'Terminal · Python · Game',
    categories: ['Experimental'],
    title: 'Learning to debug should feel like solving a puzzle, not reading a manual.',
    bg: asset('images/debugquest.webp'),
    alt: 'Code on a dark editor screen',
    // TODO(debugquest): the repo is a Python terminal game (fix buggy Python/JS snippets to progress,
    // ASCII art, skill system, easter eggs). It doesn't mention "incremental hints" or "instant
    // feedback loops" — check this copy against the game and adjust.
    description: 'Interactive debugging challenge built to make error-finding intuitive and even enjoyable. Code puzzles, incremental hints, and instant feedback loops.',
    links: {
      github: 'https://github.com/constancadcunha/DebugQuest',
    },
  },
];

const FILTER_TAGS = ['All', 'Web', 'Mobile', 'Experimental'] as const;
type FilterTag = typeof FILTER_TAGS[number];

const accentGroupOf = (p: Project) => `${p.accentKey ?? 'blue'}-${p.name}`;

/* ─── DIALOG SHELL ───────────────────────────────────────── */

function Dialog({ labelId, onClose, maxWidth, children }: { labelId: string; onClose: () => void; maxWidth: string; children: React.ReactNode }) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        tabIndex={-1}
        className="relative w-full rounded-2xl overflow-y-auto outline-none"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth, background: t.card, boxShadow: '0 24px 80px rgba(0,0,0,0.3)', maxHeight: '90vh' }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer z-10"
      style={{ background: isDark ? 'rgba(30,28,24,0.92)' : 'rgba(255,255,255,0.92)' }}
    >
      <Icon name="ri-close-line" className="text-base leading-none" style={{ color: t.text }} />
    </button>
  );
}

/* ─── METRICS VISUAL (confidential work: numbers instead of screens) ─── */

function MetricsVisual({ project, compact = false, showName = false }: { project: Project; compact?: boolean; showName?: boolean }) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  const barTrack = isDark ? 'rgba(232,228,218,0.08)' : 'rgba(31,30,27,0.07)';
  const barBefore = isDark ? 'rgba(232,228,218,0.28)' : 'rgba(31,30,27,0.22)';
  const barAfter = isDark ? '#76ad8f' : '#2f6649';

  return (
    <div
      className="w-full h-full flex flex-col justify-center"
      style={{
        padding: compact ? '1.1rem 1.25rem' : '1.75rem 2rem',
        gap: compact ? '0.9rem' : '1.3rem',
        background: isDark
          ? 'linear-gradient(145deg, rgba(118,173,143,0.14) 0%, rgba(37,35,32,1) 70%)'
          : 'linear-gradient(145deg, rgba(199,223,208,0.55) 0%, rgba(245,239,232,0.9) 100%)',
      }}
    >
      {showName && (
        <span className="font-dm text-xs tracking-widest uppercase font-medium" style={{ color: t.text }} aria-hidden="true">{project.name}</span>
      )}
      {project.headlineStat && (
        <p style={{ marginBottom: compact ? '0.1rem' : '0.3rem' }}>
          <span className="font-cormorant font-light" style={{ fontSize: compact ? '2.1rem' : '2.8rem', lineHeight: 1, color: t.text }}>{project.headlineStat.value}</span>
          <span className="font-dm" style={{ display: 'block', fontSize: '0.68rem', color: t.textMuted, marginTop: '0.2rem' }}>{project.headlineStat.label}</span>
        </p>
      )}
      {project.metrics?.map((m) => (
        <div key={m.label}>
          <div className="flex items-baseline justify-between gap-3" style={{ marginBottom: '0.4rem' }}>
            <span className="font-dm uppercase" style={{ fontSize: '0.56rem', letterSpacing: '0.2em', color: t.textMuted }}>{m.label}</span>
            <span className="font-dm" style={{ fontSize: compact ? '0.72rem' : '0.8rem', color: t.text }}>
              <span style={{ color: t.textMuted }}>{m.before}</span>
              <span aria-hidden="true" style={{ margin: '0 0.35rem', color: t.textMuted }}>→</span>
              <span className="sr-only"> to </span>
              <strong style={{ fontWeight: 600, color: barAfter }}>{m.after}</strong>
            </span>
          </div>
          <div aria-hidden="true" style={{ display: 'grid', gap: 4 }}>
            <div style={{ height: 5, borderRadius: 3, background: barTrack }}>
              <div style={{ width: `${m.from * 100}%`, height: '100%', borderRadius: 3, background: barBefore }} />
            </div>
            <div style={{ height: 5, borderRadius: 3, background: barTrack }}>
              <div style={{ width: `${m.to * 100}%`, height: '100%', borderRadius: 3, background: barAfter }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── SHARED PILL LINK ───────────────────────────────────── */

function PillLink({ href, icon, children, strong = false }: { href: string; icon: string; children: React.ReactNode; strong?: boolean }) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
      style={{ fontSize: '0.72rem', border: `1px solid ${t.borderInput}`, color: strong ? t.text : t.textMuted }}
    >
      <Icon name={icon} className="text-xs" />
      {children}
      <Icon name="ri-external-link-line" className="text-xs opacity-60" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function ProjectLinksRow({ links }: { links?: ProjectLinks }) {
  if (!links) return null;
  return (
    <>
      {links.live && <PillLink href={links.live} icon="ri-global-line" strong>Live site</PillLink>}
      {links.caseStudy && <PillLink href={links.caseStudy} icon="ri-article-line" strong>Full case study</PillLink>}
      {links.prototype && <PillLink href={links.prototype} icon="ri-play-circle-line">Prototype</PillLink>}
      {links.github && <PillLink href={links.github} icon="ri-github-line">Code</PillLink>}
    </>
  );
}

/* ─── CASE STUDY MODAL ───────────────────────────────────── */

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  const accentGroup = accentGroupOf(project);
  const labelId = `case-${project.name.replace(/\W+/g, '-').toLowerCase()}`;
  const pairs = project.figmaShipped?.filter((p) => import.meta.env.DEV || (p.figma && p.shipped)) ?? [];

  return (
    <Dialog labelId={labelId} onClose={onClose} maxWidth="56rem">
      <div className="relative h-52 sm:h-64 overflow-hidden rounded-t-2xl" style={{ background: isDark ? '#2a2824' : '#f5f3f0' }}>
        {project.bg ? (
          <>
            <img src={project.bg} alt={project.alt ?? ''} width={1200} height={750} decoding="async" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
          </>
        ) : (
          <MetricsVisual project={project} />
        )}
        <CloseButton onClose={onClose} />
      </div>
      <div className="p-6 sm:p-9">
        <p className="font-dm text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: t.textMuted }}>{highlightImportantText(project.tag, isDark, accentGroup)}</p>
        <h2 id={labelId} className="font-cormorant font-light leading-tight" style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)', maxWidth: '40rem', color: t.text, marginBottom: '0.6rem' }}>
          {project.title}
        </h2>
        {project.meta && <p className="font-dm" style={{ fontSize: '0.75rem', color: t.textMuted, marginBottom: '1.1rem' }}>{project.meta}</p>}
        {project.impact && <p className="font-dm text-xs font-medium mb-5" style={{ color: t.text }}>{highlightImportantText(project.impact, isDark, accentGroup)}</p>}
        <p className="font-dm text-sm leading-relaxed mb-5" style={{ color: t.textMuted, maxWidth: '44rem' }}>{highlightImportantText(project.details ?? project.description, isDark, accentGroup)}</p>

        {project.bg && project.metrics && (
          <div className="rounded-xl overflow-hidden mb-6" style={{ border: `1px solid ${t.border}`, maxWidth: '44rem' }}>
            <MetricsVisual project={project} compact />
          </div>
        )}

        {project.bullets && (
          <ul className="font-dm text-sm leading-relaxed mb-6" style={{ color: t.textMuted, maxWidth: '44rem', display: 'grid', gap: '0.5rem', paddingLeft: 0, listStyle: 'none' }}>
            {project.bullets.map((b) => (
              <li key={b} className="flex gap-2.5">
                <span aria-hidden="true" style={{ flexShrink: 0, width: 5, height: 5, borderRadius: '50%', marginTop: '0.55rem', background: t.text, opacity: 0.45 }} />
                <span>{highlightImportantText(b, isDark, accentGroup)}</span>
              </li>
            ))}
          </ul>
        )}

        {project.confidentialNote && (
          <p className="font-dm italic mb-6" style={{ fontSize: '0.75rem', color: t.textMuted }}>
            <Icon name="ri-lock-line" /> {project.confidentialNote}
          </p>
        )}

        {pairs.length > 0 && (
          <div style={{ display: 'grid', gap: '1.75rem', margin: '1.75rem 0 1.5rem' }}>
            {pairs.map((pair) => <FigmaToShipped key={pair.frameName} {...pair} />)}
          </div>
        )}

        {project.links && (
          <div className="flex flex-wrap gap-2 pt-5" style={{ borderTop: `1px solid ${t.borderDivider}` }}>
            <ProjectLinksRow links={project.links} />
          </div>
        )}
      </div>
    </Dialog>
  );
}

/* ─── MORE PROJECT MINI MODAL ────────────────────────────── */

function MoreProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  const accentGroup = accentGroupOf(project);
  const labelId = `more-${project.name.replace(/\W+/g, '-').toLowerCase()}`;

  return (
    <Dialog labelId={labelId} onClose={onClose} maxWidth="32rem">
      <div className="relative overflow-hidden" style={{ height: '11rem', background: isDark ? '#2a2824' : '#f5f3f0' }}>
        {project.bg && <img src={project.bg} alt={project.alt ?? ''} width={1200} height={750} decoding="async" className="w-full h-full object-cover object-top" />}
        <CloseButton onClose={onClose} />
      </div>
      <div className="p-5 sm:p-6">
        <p className="font-dm tracking-[0.2em] uppercase" style={{ fontSize: '0.58rem', marginBottom: '0.4rem', color: t.textMuted }}>{highlightImportantText(project.tag, isDark, accentGroup)}</p>
        <h3 id={labelId} className="font-dm font-medium" style={{ fontSize: '0.95rem', color: t.text, marginBottom: '0.3rem' }}>{project.name}</h3>
        <p className="font-cormorant font-light leading-snug" style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: t.text }}>{project.title}</p>
        <p className="font-dm leading-relaxed" style={{ fontSize: '0.8rem', marginBottom: '1.25rem', color: t.textMuted }}>{highlightImportantText(project.description, isDark, accentGroup)}</p>
        <div className="flex flex-wrap gap-2" style={{ borderTop: `1px solid ${t.borderDivider}`, paddingTop: '1rem' }}>
          <ProjectLinksRow links={project.links} />
        </div>
      </div>
    </Dialog>
  );
}

/* ─── LINK ICON BUTTONS ─────────────────────────────────── */

interface LinkBtnProps { href: string; icon: string; label: string; }

function LinkBtn({ href, icon, label }: LinkBtnProps) {
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={label} aria-label={`${label} (opens in a new tab)`}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 cursor-pointer flex-shrink-0"
      style={{ border: `1px solid ${t.borderInput}`, color: t.textMuted }}>
      <Icon name={icon} className="text-xs leading-none" />
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
  const headingAccent = isDark
    ? 'linear-gradient(120deg, #f8d66f 0%, #7aa6ff 55%, #9fb0ff 100%)'
    : 'linear-gradient(120deg, #3d6a96 0%, #7f5f22 50%, #3b7358 100%)';
  const chipBg = isDark ? 'rgba(248,214,111,0.12)' : 'rgba(151,183,210,0.2)';

  const closeProject = useCallback(() => setOpenProject(null), []);
  const closeMoreProject = useCallback(() => setOpenMoreProject(null), []);

  const handleRowMouseMove = useCallback((e: React.MouseEvent) => {
    setPreviewPos({ x: e.clientX, y: e.clientY });
  }, []);

  const filteredMore = activeFilter === 'All'
    ? more
    : more.filter((p) => p.categories.includes(activeFilter));

  return (
    <section id="projects" aria-labelledby="projects-heading" style={{ background: t.bg, padding: '6rem 5% 6rem', transition: 'background 0.5s ease' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

        {/* Section header */}
        <FadeIn style={{ marginBottom: '3rem' }}>
          <p className="font-dm text-xs tracking-[0.25em] uppercase" style={{ marginBottom: '1rem', color: t.textMuted }}>Selected Work</p>
          <h2 id="projects-heading" className="font-cormorant font-light leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', maxWidth: '36rem', color: t.text }}>
            <span
              style={{
                backgroundImage: headingAccent,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Things I designed,
            </span><br />
            <em>and then built.</em>
          </h2>
          <p className="font-dm" style={{ marginTop: '1.2rem', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '30rem', color: t.textMuted }}>
            Each project shows the problem, the decisions and what shipped, with real numbers where I have them.
          </p>
        </FadeIn>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '4.5rem' }}>
          {featured.map((p, i) => {
            const accentGroup = accentGroupOf(p);
            return (
              <FadeIn key={p.name} delay={(i % 2) * 100}>
                <article
                  className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 cursor-pointer h-full project-card"
                  onClick={() => setOpenProject(p)}
                  style={{ background: t.card, border: `1px solid ${t.border}` }}
                >
                  <div className={`relative flex ${p.bg ? 'overflow-hidden' : ''}`} style={{ aspectRatio: '16 / 9', background: isDark ? '#2a2824' : '#f5f3f0' }}>
                    {p.bg ? (
                      <>
                        <img
                          src={p.bg}
                          alt={p.alt ?? ''}
                          width={1200}
                          height={675}
                          loading={i < 2 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="w-full h-full object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />
                        <span className="absolute bottom-3 left-4 font-dm text-xs text-white tracking-widest uppercase font-medium" aria-hidden="true">{p.name}</span>
                      </>
                    ) : (
                      <MetricsVisual project={p} compact showName />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5 sm:p-6">
                    <p className="font-dm tracking-[0.22em] uppercase" style={{ fontSize: '0.58rem', marginBottom: '0.6rem', color: t.textMuted }}>
                      <span className="sr-only">{p.name}: </span>{highlightImportantText(p.tag, isDark, accentGroup)}
                    </p>
                    <h3 className="font-cormorant font-normal leading-snug" style={{ fontSize: '1.3rem', marginBottom: '0.65rem', color: t.text }}>{p.title}</h3>
                    <p className="font-dm leading-relaxed" style={{ fontSize: '0.78rem', marginBottom: '0.75rem', color: t.textMuted }}>{highlightImportantText(p.description, isDark, accentGroup)}</p>
                    {p.impact && <p className="font-dm font-medium" style={{ fontSize: '0.68rem', marginBottom: '1.2rem', color: t.text }}>{highlightImportantText(p.impact, isDark, accentGroup)}</p>}
                    <div className="mt-auto flex flex-wrap gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setOpenProject(p); }}
                        className="font-dm px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                        style={{ fontSize: '0.72rem', background: t.text, color: t.bg, border: `1px solid ${t.text}` }}
                        aria-label={`Read the ${p.name} case study`}
                      >
                        <Icon name="ri-article-line" className="text-xs" />Case study
                      </button>
                      <ProjectLinksRow links={p.links} />
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        {/* More work */}
        <FadeIn>
          <div style={{ borderTop: `1px solid ${t.borderDivider}`, paddingTop: '2.5rem' }}>

            {/* Header row with filter pills */}
            <div className="flex flex-wrap items-center justify-between gap-3" style={{ marginBottom: '1.5rem' }}>
              <h3
                className="font-dm uppercase"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.28em',
                  color: t.text,
                  background: chipBg,
                  border: `1px solid ${t.border}`,
                  borderRadius: '999px',
                  padding: '0.32rem 0.72rem',
                }}
              >
                Also worth seeing
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter projects">
                {FILTER_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    aria-pressed={activeFilter === tag}
                    className="font-dm whitespace-nowrap cursor-pointer transition-all duration-200 rounded-full"
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.08em',
                      padding: '0.35rem 0.9rem',
                      background: activeFilter === tag ? t.text : 'transparent',
                      color: activeFilter === tag ? t.bg : t.textMuted,
                      border: activeFilter === tag ? `1px solid ${t.text}` : `1px solid ${t.borderInput}`,
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Project rows */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredMore.length === 0 && (
                <li className="font-dm text-sm py-6 text-center" style={{ color: t.textMuted }}>No projects in this category yet.</li>
              )}
              {filteredMore.map((p) => (
                <li key={p.name}>
                  <div
                    className="group flex items-center gap-4 py-3.5 rounded px-2 cursor-pointer transition-colors duration-150"
                    onClick={() => setOpenMoreProject(p)}
                    onMouseEnter={() => setPreviewProject(p)}
                    onMouseLeave={() => setPreviewProject(null)}
                    onMouseMove={handleRowMouseMove}
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name}: ${p.description}`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenMoreProject(p); } }}
                    style={{ borderBottom: `1px solid ${t.border}` }}
                  >
                    <div className="flex-shrink-0 rounded overflow-hidden" style={{ width: '4rem', height: '3rem', background: isDark ? '#2a2824' : '#f0ede8' }}>
                      {p.bg && <img src={p.bg.replace('.webp', '-sm.webp')} alt="" width={128} height={96} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5" style={{ marginBottom: '0.15rem' }}>
                        <span className="font-dm text-sm font-medium whitespace-nowrap" style={{ color: t.text }}>{p.name}</span>
                        <span className="hidden sm:inline font-dm uppercase truncate" style={{ fontSize: '0.56rem', letterSpacing: '0.14em', color: t.textMuted }}>{p.tag}</span>
                      </div>
                      <p className="font-dm leading-snug truncate" style={{ fontSize: '0.74rem', color: t.textMuted }}>{p.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {p.links?.live && <LinkBtn href={p.links.live} icon="ri-global-line" label={`${p.name} live site`} />}
                      {p.links?.prototype && <LinkBtn href={p.links.prototype} icon="ri-play-circle-line" label={`${p.name} prototype`} />}
                      {p.links?.github && <LinkBtn href={p.links.github} icon="ri-github-line" label={`${p.name} code on GitHub`} />}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>

      {/* Cursor-following hover preview */}
      {previewProject?.bg && (
        <div
          aria-hidden="true"
          className="hover-preview"
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
            <img src={previewProject.bg.replace('.webp', '-sm.webp')} alt="" width={320} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div style={{ padding: '0.6rem 0.75rem' }}>
            <p style={{ fontFamily: '"DM Sans Variable", "DM Sans", sans-serif', fontSize: '0.7rem', color: t.text, fontWeight: 500, marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {previewProject.name}
            </p>
            <p style={{ fontFamily: '"DM Sans Variable", "DM Sans", sans-serif', fontSize: '0.58rem', color: t.textMuted, letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
        .project-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        @media (hover: none) { .hover-preview { display: none; } }
      `}</style>

      {openProject && <CaseStudyModal project={openProject} onClose={closeProject} />}
      {openMoreProject && <MoreProjectModal project={openMoreProject} onClose={closeMoreProject} />}
    </section>
  );
}
