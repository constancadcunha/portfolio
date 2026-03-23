import { useState } from 'react';
import FadeIn from '../../../components/base/FadeIn';
import { useDarkMode } from '../../../contexts/DarkModeContext';
import { getTokens } from '../../../utils/darkTokens';

const FORM_URL = 'https://readdy.ai/api/form/d70ql01qa83q0hmd1flg';

const socials = [
  {
    icon: 'ri-linkedin-box-line',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/constanca-cunha/',
  },
  {
    icon: 'ri-github-line',
    label: 'GitHub',
    href: 'https://github.com/constancadcunha',
  },
  {
    icon: 'ri-global-line',
    label: 'Website',
    href: 'https://constancadcunha.github.io/constancacunha/',
  },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactSection() {
  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const { isDark } = useDarkMode();
  const t = getTokens(isDark);
  const basePath = (__BASE_PATH__ || '/').replace(/\/?$/, '/');
  const resumeHref = `${basePath}${encodeURIComponent('Constança_Cunha_CV.pdf')}`;

  const copyEmail = () => {
    navigator.clipboard.writeText('constancadcunha@gmail.com').then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (charCount > 500) return;

    const form = e.currentTarget;
    const data = new URLSearchParams();
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      if (typeof value === 'string') data.append(key, value);
    });

    setStatus('sending');
    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
        setCharCount(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    border: `1px solid ${t.borderInput}`,
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    background: t.fieldBg,
    color: t.text,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    width: '100%',
  };

  return (
    <section id="contact" style={{ background: t.bg, padding: '8rem 8% 9rem', transition: 'background 0.5s ease' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        {/* Header */}
        <FadeIn style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <p className="font-dm uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.28em', marginBottom: '1.2rem', color: t.textMuted }}>
            Get in touch
          </p>
          <h2 className="font-cormorant font-light" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.5rem)', lineHeight: 1.05, marginBottom: '1.4rem', color: t.text }}>
            Let&apos;s work<br /><em>together.</em>
          </h2>
          <p className="font-dm mx-auto" style={{ fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '28rem', color: t.textMuted }}>
            Open to full product builds, redesigns, or just good design conversations. Drop me a message and I&apos;ll get back to you within a day.
          </p>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '5rem', alignItems: 'start' }} className="contact-grid">
          {/* Left — info */}
          <FadeIn delay={100} distance={20}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.8rem' }}>
              <div>
                <p className="font-dm font-medium" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', color: t.text }}>
                  Based in
                </p>
                <p className="font-cormorant font-light" style={{ fontSize: '1.5rem', color: t.textMuted }}>Lisbon, Portugal</p>
                <p className="font-dm" style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: t.textFaint }}>Available for remote work worldwide</p>
              </div>

              <div>
                <p className="font-dm font-medium" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', color: t.text }}>
                  Email
                </p>
                <div className="flex items-center gap-2">
                  <a href="mailto:constancadcunha@gmail.com"
                    className="font-cormorant font-light transition-colors duration-200 cursor-pointer"
                    style={{ fontSize: '1.25rem', color: t.textMuted }}>
                    constancadcunha@gmail.com
                  </a>
                  <button onClick={copyEmail} title="Copy email"
                    className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 cursor-pointer flex-shrink-0"
                    style={{ border: `1px solid ${t.borderInput}`, color: t.textMuted }}>
                    <i className={`${emailCopied ? 'ri-check-line' : 'ri-clipboard-line'} text-xs leading-none`} />
                  </button>
                </div>
                {emailCopied && <p className="font-dm mt-1" style={{ fontSize: '0.7rem', color: t.textFaint }}>Copied to clipboard!</p>}
              </div>

              <div>
                <p className="font-dm font-medium" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem', color: t.text }}>
                  Find me
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 font-dm transition-colors duration-200 cursor-pointer"
                      style={{ fontSize: '0.85rem', color: t.textMuted }}>
                      <span className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200"
                        style={{ border: `1px solid ${t.borderInput}` }}>
                        <i className={`${s.icon} text-base`} />
                      </span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <a href={resumeHref}
                target="_blank" rel="noopener noreferrer"
                className="font-dm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap"
                style={{ fontSize: '0.8rem', letterSpacing: '0.06em', color: t.text }}>
                <i className="ri-download-line text-base" />
                Download résumé
              </a>
            </div>
          </FadeIn>

          {/* Right — form */}
          <FadeIn delay={200} distance={20}>
            <div>
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center text-center" style={{ padding: '4rem 2rem' }}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full" style={{ background: isDark ? 'rgba(232,228,218,0.08)' : 'rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
                    <i className="ri-check-line text-2xl" style={{ color: t.text }} />
                  </div>
                  <h3 className="font-cormorant font-light" style={{ fontSize: '2rem', marginBottom: '0.75rem', color: t.text }}>Message sent!</h3>
                  <p className="font-dm" style={{ fontSize: '0.85rem', lineHeight: 1.7, color: t.textMuted }}>Thank you for reaching out. I&apos;ll get back to you within a day.</p>
                  <button onClick={() => setStatus('idle')}
                    className="font-dm transition-colors duration-200 cursor-pointer"
                    style={{ fontSize: '0.75rem', marginTop: '2rem', background: 'none', border: 'none', letterSpacing: '0.1em', color: t.textFaint }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form data-readdy-form id="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="form-row">
                    <div>
                      <label htmlFor="name" className="font-dm block" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', color: t.text }}>
                        Name
                      </label>
                      <input id="name" name="name" type="text" required placeholder="Your name" className="font-dm"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = isDark ? 'rgba(232,228,218,0.5)' : 'rgba(0,0,0,0.4)'; }}
                        onBlur={(e) => { e.target.style.borderColor = t.borderInput; }} />
                    </div>
                    <div>
                      <label htmlFor="email" className="font-dm block" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', color: t.text }}>
                        Email
                      </label>
                      <input id="email" name="email" type="email" required placeholder="your@email.com" className="font-dm"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = isDark ? 'rgba(232,228,218,0.5)' : 'rgba(0,0,0,0.4)'; }}
                        onBlur={(e) => { e.target.style.borderColor = t.borderInput; }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="project_type" className="font-dm block" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', color: t.text }}>
                      What are you looking for?
                    </label>
                    <select id="project_type" name="project_type" className="font-dm cursor-pointer"
                      style={{ ...inputStyle, appearance: 'none' }}
                      onFocus={(e) => { e.target.style.borderColor = isDark ? 'rgba(232,228,218,0.5)' : 'rgba(0,0,0,0.4)'; }}
                      onBlur={(e) => { e.target.style.borderColor = t.borderInput; }}>
                      <option value="">Select an option</option>
                      <option value="Full product design">Full product design</option>
                      <option value="UX research & audit">UX research &amp; audit</option>
                      <option value="Redesign">Redesign</option>
                      <option value="Design system">Design system</option>
                      <option value="Collaboration / consulting">Collaboration / consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline" style={{ marginBottom: '0.5rem' }}>
                      <label htmlFor="message" className="font-dm" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: t.text }}>
                        Message
                      </label>
                      <span className="font-dm" style={{ fontSize: '0.65rem', color: charCount > 500 ? '#c0392b' : t.textFaint }}>{charCount}/500</span>
                    </div>
                    <textarea id="message" name="message" required rows={5} maxLength={500}
                      placeholder="Tell me a bit about your project or what you have in mind..."
                      className="font-dm resize-none"
                      style={{ ...inputStyle }}
                      onFocus={(e) => { e.target.style.borderColor = isDark ? 'rgba(232,228,218,0.5)' : 'rgba(0,0,0,0.4)'; }}
                      onBlur={(e) => { e.target.style.borderColor = t.borderInput; }}
                      onChange={(e) => setCharCount(e.target.value.length)} />
                  </div>

                  {status === 'error' && (
                    <p className="font-dm text-sm" style={{ color: '#c0392b' }}>Something went wrong — please try again or email me directly.</p>
                  )}

                  <button type="submit" disabled={status === 'sending' || charCount > 500}
                    className="font-dm font-medium text-white rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer"
                    style={{
                      fontSize: '0.85rem', padding: '0.9rem 2.5rem',
                      background: status === 'sending' ? (isDark ? 'rgba(232,228,218,0.3)' : 'rgba(31,30,27,0.5)') : (isDark ? '#e8e4da' : '#1f1e1b'),
                      color: isDark ? '#1c1a17' : '#ffffff',
                      border: 'none', letterSpacing: '0.05em', alignSelf: 'flex-start',
                      cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    }}>
                    {status === 'sending' ? 'Sending...' : 'Send message'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
