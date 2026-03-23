/* ============================================================
   ATELIER CONSTANÇA — Complete Script
   Preloader · Cursor · Nav · Hero Desk · Craft · Self
   Gallery · Contact Form · Easter Eggs · Terminal
============================================================ */

'use strict';

/* ── SCROLL RESTORATION ──────────────────────────────────── */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

/* ── GLOBALS ─────────────────────────────────────────────── */
let gsapReady = false;
const gsapQueue = [];

function waitForGSAP(fn) {
    if (gsapReady) fn();
    else gsapQueue.push(fn);
}

function onGSAPReady() {
    gsapReady = true;
    gsap.registerPlugin(ScrollTrigger);
    gsapQueue.forEach(fn => fn());
    initScrollAnimations();
}

/* ── PRELOADER ───────────────────────────────────────────── */
(function initPreloader() {
    const overlay  = document.getElementById('preloader');
    const fillRect = document.getElementById('matcha-fill-rect');
    const arc      = document.getElementById('progress-arc');
    const steamGrp = document.getElementById('steam-group');
    const skipBtn  = document.getElementById('preloader-skip');

    if (!overlay) return;

    const ARC_FULL = 276.5;
    let done = false;

    function setProgress(p) {
        p = Math.min(1, Math.max(0, p));

        // Matcha fill rises from bottom of bowl
        const bowlHeight = 44;
        const fillH = bowlHeight * p;
        const fillY = 62 + bowlHeight * (1 - p);
        if (fillRect) {
            fillRect.setAttribute('height', fillH);
            fillRect.setAttribute('y', fillY);
        }
        // Arc
        if (arc) {
            arc.style.strokeDashoffset = ARC_FULL * (1 - p);
        }
        // Steam after 30%
        if (steamGrp && p > 0.3) {
            steamGrp.style.opacity = Math.min(1, (p - 0.3) / 0.4);
        }
    }

    function finish() {
        if (done) return;
        done = true;

        // Hold for a moment, then dissolve upward
        setTimeout(() => {
            overlay.style.transition = 'clip-path 0.8s cubic-bezier(0.76,0,0.24,1), opacity 0.8s';
            overlay.style.clipPath = 'inset(0 0 100% 0)';
            overlay.style.opacity = '0';

            setTimeout(() => {
                overlay.style.display = 'none';
                document.body.style.cursor = '';
                animateHeroIn();
            }, 850);
        }, 400);
    }

    // Animate progress
    let start = null;
    const DURATION = 2200;

    function tick(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const p = Math.min(1, elapsed / DURATION);
        // Ease in-out
        const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        setProgress(eased);

        if (p < 1 && !done) {
            requestAnimationFrame(tick);
        } else {
            setProgress(1);
            finish();
        }
    }

    requestAnimationFrame(tick);

    skipBtn && skipBtn.addEventListener('click', () => {
        setProgress(1);
        finish();
    });
})();

/* ── HERO ENTRY ANIMATION ────────────────────────────────── */
function animateHeroIn() {
    requestAnimationFrame(() => {
        document.body.classList.add('hero-ready');
    });
}

function buildMailtoFallback(data) {
    const subject = `Portfolio message from ${data.name || 'a visitor'}`;
    const body = [
        `Name: ${data.name || '-'}`,
        `Company / context: ${data.company || '-'}`,
        `Intent: ${data.intent || '-'}`,
        `Email: ${data.email || '-'}`,
        `Signature: ${data.signature || '-'}`,
        '',
        'Message:',
        data.message || '-',
    ].join('\n');

    return `mailto:constancadcunha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* ── CUSTOM CURSOR ───────────────────────────────────────── */
(function initCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let sparkTimer = 0;
    let lastMX = 0, lastMY = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;

        // Sparks on fast movement
        const dx = mx - lastMX, dy = my - lastMY;
        const speed = Math.sqrt(dx*dx + dy*dy);
        if (speed > 14 && Date.now() - sparkTimer > 60) {
            spawnSparks(mx, my);
            sparkTimer = Date.now();
        }
        lastMX = mx; lastMY = my;
    });

    function loop() {
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';

        // Ring lags behind
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';

        requestAnimationFrame(loop);
    }
    loop();

    // Context-aware states
    document.addEventListener('mouseover', e => {
        const target = e.target.closest('a, button, [data-hover], .work-card, .exp-card, .self-obj, .journey-card, .gframe, .craft-tab, .ingredient');
        if (target) {
            document.body.classList.add('cursor-hover');
            if (target.tagName === 'A' || target.tagName === 'BUTTON') {
                document.body.classList.add('cursor-link');
            }
        } else {
            document.body.classList.remove('cursor-hover', 'cursor-link');
        }
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '';
    });
})();

function spawnSparks(x, y) {
    const count = 3;
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'cursor-spark';
        const angle = Math.random() * Math.PI * 2;
        const dist = 10 + Math.random() * 16;
        spark.style.setProperty('--sx', x + 'px');
        spark.style.setProperty('--sy', y + 'px');
        spark.style.setProperty('--ex', (x + Math.cos(angle) * dist) + 'px');
        spark.style.setProperty('--ey', (y + Math.sin(angle) * dist) + 'px');
        spark.style.left = x + 'px';
        spark.style.top  = y + 'px';
        // Alternate colours
        spark.style.background = i % 2 === 0 ? 'var(--matcha)' : 'var(--sienna)';
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 560);
    }
}

/* ── NAVIGATION ──────────────────────────────────────────── */
function navClick(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return false;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    const isOpen = menu.classList.toggle('open');
    menu.setAttribute('aria-hidden', !isOpen);
    document.body.classList.toggle('menu-open', isOpen);
}

// Scroll progress + active nav
window.addEventListener('scroll', () => {
    const fill = document.getElementById('nav-progress-fill');
    if (fill) {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        fill.style.height = (scrolled / total * 100) + '%';
    }

    // Update active nav item
    const sections = ['work', 'craft', 'self', 'contact'];
    const offset = window.innerHeight * 0.4;
    let current = '';

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= offset) current = id;
        }
    });

    document.querySelectorAll('.nav-item').forEach(a => {
        a.classList.toggle('active', a.dataset.section === current);
    });
}, { passive: true });

/* ── HERO DESK PARALLAX ──────────────────────────────────── */
(function initDeskParallax() {
    const cluster = document.querySelector('.desk-cluster');
    if (!cluster) return;

    // Store base transforms per item
    const baseTransforms = {
        'desk-note':   'rotate(-3deg)',
        'desk-book':   'rotate(2deg)',
        'desk-matcha': 'rotate(-1deg)',
        'desk-vinyl':  'rotate(1deg)',
    };

    document.addEventListener('mousemove', e => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        cluster.querySelectorAll('.desk-item[data-depth]').forEach(item => {
            const depth = parseFloat(item.dataset.depth) || 0.03;
            const tx = dx * depth * 50;
            const ty = dy * depth * 35;
            const base = baseTransforms[item.id] || '';
            item.style.transform = `${base} translate(${tx}px, ${ty}px)`;
        });
    });
})();

/* ── SCROLL REVEAL ───────────────────────────────────────── */
function initScrollAnimations() {
    waitForGSAP(() => {
        // Reveal-up elements
        const reveals = document.querySelectorAll('.reveal-up');
        reveals.forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 88%',
                onEnter: () => el.classList.add('visible'),
            });
        });
    });

    // IntersectionObserver fallback / for elements not using GSAP
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

// Always init scroll animations regardless of GSAP
window.addEventListener('load', initScrollAnimations);

/* ── CRAFT / RECIPE CODEX ────────────────────────────────── */
(function initCraft() {
    const tabs  = document.querySelectorAll('.craft-tab');
    const pages = document.querySelectorAll('.craft-page');
    const tooltip = document.getElementById('ingredient-tooltip');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const idx = parseInt(tab.dataset.tab);
            tabs.forEach(t => t.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            pages[idx] && pages[idx].classList.add('active');
        });
    });

    // Ingredient tasting notes tooltip
    if (tooltip) {
        document.querySelectorAll('.ingredient').forEach(ing => {
            const note = ing.dataset.note;
            if (!note) return;

            ing.addEventListener('mouseenter', e => {
                tooltip.textContent = note;
                tooltip.style.opacity = '1';
                positionTooltip(e);
            });
            ing.addEventListener('mousemove', positionTooltip);
            ing.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        });

        function positionTooltip(e) {
            const x = e.clientX + 16;
            const y = e.clientY - 12;
            const tw = tooltip.offsetWidth;
            const th = tooltip.offsetHeight;
            tooltip.style.left = Math.min(x, window.innerWidth - tw - 16) + 'px';
            tooltip.style.top  = Math.max(8, y - th) + 'px';
        }
    }
})();

/* ── SELF OBJECTS ────────────────────────────────────────── */
(function initSelfObjects() {
    document.querySelectorAll('.self-obj').forEach(obj => {
        const content = obj.dataset.content;
        const reveal  = obj.querySelector('.self-obj-reveal');
        if (reveal && content) reveal.innerHTML = content;
    });
})();

/* ── GALLERY ─────────────────────────────────────────────── */
let gallerySpeed = 32; // seconds per loop
let galleryPaused = false;
const galleryTrack = document.getElementById('gallery-track');

function toggleGalleryPause() {
    galleryPaused = !galleryPaused;
    if (galleryTrack) galleryTrack.classList.toggle('paused', galleryPaused);
    const icon = document.getElementById('gallery-pause-icon');
    if (icon) icon.textContent = galleryPaused ? 'play_arrow' : 'pause';
}

function changeGallerySpeed(delta) {
    gallerySpeed = Math.max(8, Math.min(80, gallerySpeed - delta * 8));
    if (galleryTrack) {
        galleryTrack.style.animationDuration = gallerySpeed + 's';
    }
}

/* ── IMAGE MODAL ─────────────────────────────────────────── */
function openImageModal(src, alt) {
    const modal = document.getElementById('image-modal');
    const img   = document.getElementById('modal-img');
    if (!modal || !img) return;
    img.src = src;
    img.alt = alt || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeImageModal();
        closeTerminal();
    }
});

document.getElementById('image-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeImageModal();
});

/* ── CONTACT FORM ────────────────────────────────────────── */
(function initContactForm() {
    const form    = document.getElementById('contact-form');
    const msgEl   = document.getElementById('form-msg');
    const sendBtn = document.getElementById('letter-send-btn');
    const sendLbl = document.getElementById('letter-send-label');
    const submitEndpoint = 'https://formsubmit.co/ajax/constancadcunha@gmail.com';

    if (!form) return;

    // Matcha easter egg: typing "matcha" in any field
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const combined = Array.from(form.querySelectorAll('input, textarea'))
                .map(f => f.value).join('').toLowerCase();
            if (combined.includes('matcha')) {
                document.getElementById('letter-wrap')?.classList.add('matcha-egg');
                showToast('Lovely taste, darling. 🍵');
            } else {
                document.getElementById('letter-wrap')?.classList.remove('matcha-egg');
            }
        });
    });

    // Typewriter sound on keypress in fields
    form.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach(field => {
        field.addEventListener('keydown', () => playTypeSound());
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!sendBtn || !sendLbl || !msgEl) return;

        if (!form.reportValidity()) {
            return;
        }

        sendLbl.textContent = 'Sending…';
        sendBtn.disabled = true;
        msgEl.className = '';
        msgEl.textContent = '';

        const data = {
            name:      form.name?.value || form.querySelector('[name="name"]')?.value || '',
            company:   form.querySelector('[name="company"]')?.value || '',
            intent:    form.querySelector('[name="intent"]')?.value || '',
            message:   form.querySelector('[name="message"]')?.value || '',
            email:     form.querySelector('[name="email"]')?.value || '',
            signature: form.querySelector('[name="signature"]')?.value || '',
        };

        if (window.location.protocol === 'file:') {
            msgEl.className = 'error';
            msgEl.textContent = 'Please deploy this site to a web server to send messages. FormSubmit requires HTTPS/HTTP. For local testing, open the email app.';
            sendLbl.textContent = 'Deploy to Web';
            sendBtn.disabled = false;
            return;
        }

        try {
            const body = {
                ...data,
                _subject: `Portfolio message from ${data.name || 'a visitor'}`,
                _template: 'table',
                _captcha: 'false',
            };

            const res = await fetch(submitEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const json = await res.json();
            if (!res.ok || json.success === false || json.success === 'false') {
                throw new Error(json.message || 'Send failed');
            }

            msgEl.className = 'success';
            msgEl.textContent = 'Your letter was sent successfully.';
            sendLbl.textContent = 'Sent';
            showToast('Letter sent! Thank you for contacting me :).');
            form.reset();
            document.getElementById('letter-wrap')?.classList.remove('matcha-egg');

        } catch (err) {
            msgEl.className = 'error';
            msgEl.textContent = err instanceof Error && err.message
                ? `The form relay rejected the message: ${err.message}`
                : 'The form relay rejected the message. Please try again in a moment.';
            sendLbl.textContent = 'Send Letter';
            console.error('Form error:', err);
        } finally {
            sendBtn.disabled = false;
        }
    });
})();

/* ── TOAST ───────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, duration = 3200) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('visible');
    toastTimer = setTimeout(() => toast.classList.remove('visible'), duration);
}

/* ── TERMINAL ────────────────────────────────────────────── */
const terminal = document.getElementById('terminal');
const termOutput = document.getElementById('terminal-output');
const termInput  = document.getElementById('terminal-input');

function openTerminal() {
    if (!terminal) return;
    terminal.classList.add('open');
    terminal.setAttribute('aria-hidden', 'false');
    setTimeout(() => termInput?.focus(), 100);
    if (termOutput && termOutput.children.length === 0) {
        printTermLine('Welcome to the Atelier Terminal.', 'resp');
        printTermLine("Type 'help' for available commands.", 'resp');
        printTermLine('', 'empty');
    }
}

function closeTerminal() {
    if (!terminal) return;
    terminal.classList.remove('open');
    terminal.setAttribute('aria-hidden', 'true');
}

function toggleTerminal() {
    if (terminal?.classList.contains('open')) closeTerminal();
    else openTerminal();
}

function printTermLine(text, cls = 'resp') {
    if (!termOutput) return;
    const line = document.createElement('span');
    line.className = 'term-line ' + cls;
    line.textContent = text;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
}

const termCommands = {
    help: () => {
        printTermLine('Available commands:', 'accent');
        printTermLine('  goto [section]  — scroll to work | craft | self | contact', 'resp');
        printTermLine('  whoami          — about the maker', 'resp');
        printTermLine('  skills          — list of skills', 'resp');
        printTermLine('  matcha          — important', 'resp');
        printTermLine('  clear           — clear terminal', 'resp');
        printTermLine('  play            — play something', 'resp');
    },
    whoami: () => {
        printTermLine('Constança Cunha', 'accent');
        printTermLine('Product Designer · CS Background · Lisbon', 'resp');
        printTermLine('Brews matcha · shoots film · reads too many books.', 'resp');
    },
    skills: () => {
        printTermLine('Craft stack:', 'accent');
        ['UX Research', 'Interaction Design', 'Design Systems',
         'Figma', 'HTML · CSS · JS', 'Usability Testing', 'Product Strategy']
            .forEach(s => printTermLine('  · ' + s, 'resp'));
    },
    matcha: () => {
        printTermLine('╔══════════════════════╗', 'cmd');
        printTermLine('║  🍵  Matcha Timer    ║', 'cmd');
        printTermLine('║  Steep: 80°C · 1min  ║', 'cmd');
        printTermLine('║  Whisk vigorously.   ║', 'cmd');
        printTermLine('╚══════════════════════╝', 'cmd');
        printTermLine('', 'empty');
        printTermLine('Starting 60 second timer...', 'resp');
        let t = 60;
        const iv = setInterval(() => {
            if (!terminal?.classList.contains('open') || t <= 0) {
                clearInterval(iv);
                if (t <= 0) {
                    printTermLine('Your matcha is ready. Enjoy.', 'accent');
                }
                return;
            }
            t--;
        }, 1000);
    },
    play: () => {
        printTermLine('Opening Nujabes — Feather on YouTube...', 'resp');
        setTimeout(() => window.open('https://www.youtube.com/watch?v=OHTSxw6zN1U', '_blank'), 400);
    },
    clear: () => {
        if (termOutput) termOutput.innerHTML = '';
    },
};

termInput?.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const raw = termInput.value.trim();
    if (!raw) return;
    termInput.value = '';
    printTermLine('→ ' + raw, 'cmd');

    const [cmd, ...args] = raw.split(' ');
    const lower = cmd.toLowerCase();

    if (lower === 'goto') {
        const sec = args[0]?.toLowerCase();
        const sections = ['work', 'craft', 'self', 'contact'];
        if (sections.includes(sec)) {
            navClick(sec);
            printTermLine('Scrolling to ' + sec + '…', 'resp');
        } else {
            printTermLine('Unknown section. Try: work | craft | self | contact', 'resp');
        }
    } else if (termCommands[lower]) {
        termCommands[lower]();
    } else {
        printTermLine('Command not found: ' + cmd + '. Type "help" for options.', 'resp');
    }
    printTermLine('', 'empty');
});


/* ── FLIP CARDS (mobile tap) ─────────────────────────────── */
(function initFlipCards() {
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('click', e => {
            // Don't flip if clicking a link
            if (e.target.closest('a')) return;
            // Only activate on touch/non-hover devices
            if (window.matchMedia('(hover: hover)').matches) return;
            card.classList.toggle('flipped');
        });
    });
})();

/* ── KEYBOARD SHORTCUTS ──────────────────────────────────── */
document.addEventListener('keydown', e => {
    // Cmd/Ctrl + K → Terminal
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleTerminal();
    }
});

/* ── TYPEWRITER SOUND ────────────────────────────────────── */
let audioCtx = null;

function playTypeSound() {
    try {
        const AudioCtx = window.AudioContext || window['webkitAudioContext'];
        if (!audioCtx) audioCtx = new AudioCtx();
        const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.04, audioCtx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3) * 0.18;
        }
        const src = audioCtx.createBufferSource();
        src.buffer = buf;
        const gain = audioCtx.createGain();
        gain.gain.value = 0.25;
        src.connect(gain);
        gain.connect(audioCtx.destination);
        src.start();
    } catch (_) {}
}

/* ── EASTER EGGS ─────────────────────────────────────────── */

// 1. Konami code → matcha rain + toast
(function konamiCode() {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    document.addEventListener('keydown', e => {
        if (e.key === seq[idx]) {
            idx++;
            if (idx === seq.length) {
                idx = 0;
                triggerMatchaRain();
                showToast('You unlocked the secret menu.');
            }
        } else {
            idx = e.key === seq[0] ? 1 : 0;
        }
    });
})();

function triggerMatchaRain() {
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 160,
            spread: 100,
            origin: { y: 0.2 },
            colors: ['#5C7A5F', '#3D5E40', '#7FA882', '#A8C4AB', '#C9E0CB'],
            shapes: ['circle'],
            scalar: 1.2,
        });
    }
}

// 2. Console ASCII art
(function consoleMessage() {
    const style1 = 'color:#5C7A5F;font-size:14px;font-weight:bold';
    const style2 = 'color:#9A8F84;font-size:11px';
    const style3 = 'color:#C06B38;font-size:11px';
    console.log('%c╔═══════════════════════════════╗', style1);
    console.log('%c║   ATELIER CONSTANÇA  ☕       ║', style1);
    console.log('%c╚═══════════════════════════════╝', style1);
    console.log('%c  You peeked behind the curtain.', style2);
    console.log('%c  Here\'s the secret ingredient:', style2);
    console.log('%c  obsessive attention to detail.', style3);
    console.log('%c  — C', style2);
    console.log('%c  (Try: Cmd/Ctrl+K to open terminal)', style2);
})();

// 3. CC logo: 5 rapid clicks → Van Gogh homage
(function logoEasterEgg() {
    const logo = document.getElementById('nav-logo');
    if (!logo) return;
    let clicks = 0, timer;

    logo.addEventListener('click', () => {
        clicks++;
        clearTimeout(timer);
        timer = setTimeout(() => { clicks = 0; }, 1200);

        if (clicks >= 5) {
            clicks = 0;
            triggerVanGogh();
        }
    });
})();

function triggerVanGogh() {
    const body = document.body;
    body.style.transition = 'filter 0.4s';
    body.style.filter = 'hue-rotate(200deg) saturate(1.8) brightness(0.9)';
    showToast('An homage to where it all started.');

    let phase = 0;
    const iv = setInterval(() => {
        phase += 15;
        body.style.filter = `hue-rotate(${200 + Math.sin(phase * Math.PI / 180) * 60}deg) saturate(1.8) brightness(0.9)`;
    }, 80);

    setTimeout(() => {
        clearInterval(iv);
        body.style.filter = '';
        setTimeout(() => { body.style.transition = ''; }, 500);
    }, 5000);
}

// 4. Idle animation: desk objects party after 25s inactivity
(function idleParty() {
    let idleTimer;
    let partying = false;

    function resetIdle() {
        clearTimeout(idleTimer);
        if (partying) stopParty();
        idleTimer = setTimeout(startParty, 25000);
    }

    function startParty() {
        partying = true;
        const vinyl = document.getElementById('vinyl-disc');
        if (vinyl) vinyl.style.animationDuration = '0.5s';
        const matcha = document.getElementById('desk-matcha');
        if (matcha) {
            matcha.style.animation = 'breathe 0.8s ease-in-out infinite';
        }
    }

    function stopParty() {
        partying = false;
        const vinyl = document.getElementById('vinyl-disc');
        if (vinyl) vinyl.style.animationDuration = '3s';
        const matcha = document.getElementById('desk-matcha');
        if (matcha) matcha.style.animation = '';
    }

    ['mousemove','keydown','click','scroll','touchstart'].forEach(ev =>
        document.addEventListener(ev, resetIdle, { passive: true })
    );
    resetIdle();
})();

// 5. Work card dynamic accent
(function workCardAccents() {
    document.querySelectorAll('.work-card').forEach(card => {
        const accent = card.dataset.accent;
        if (accent) {
            card.style.setProperty('--project-accent', accent);
        }
    });
    document.querySelectorAll('.exp-card').forEach(card => {
        const accent = card.dataset.accent;
        if (accent) {
            card.style.setProperty('--accent', accent);
        }
    });
})();

/* ── GSAP SETUP ──────────────────────────────────────────── */
window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        onGSAPReady();
    } else {
        // Fallback: trigger via script load event
        const scripts = document.querySelectorAll('script[src*="gsap"]');
        let loaded = 0;
        scripts.forEach(s => {
            s.addEventListener('load', () => {
                loaded++;
                if (loaded >= 2 && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                    onGSAPReady();
                }
            });
        });
        // Ultimate fallback
        setTimeout(() => {
            if (!gsapReady) {
                initScrollAnimations();
            }
        }, 2000);
    }
});
