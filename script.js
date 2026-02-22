// =================================
// INITIALIZATION - Wait for GSAP to load
// =================================

function initSite() {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    initHeroAnimations();
    initRevealSections();
    initStudioIphone();
    initImageModal();
    initDialogueSystem();
    initTheme();
    initMuseumGallery();
    initContactForm();
    initSmoothScroll();
    initStatCounters();
    initAboutParticles();
    initCameraWidget();
    initFlowerPots();
    // Creative enhancements
    initBrowserTyping();
    initSkillWatering();
    initTimelinePulse();
    initWebsiteSignals();
    initOsClock();
    initOsBattery();
    // New sections
    initJourneyFireflies();
    initJourneyInteractions();
    initGardenButterflies();
}

// Wait for GSAP to be available
function waitForGSAP() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initSite();
    } else {
        setTimeout(waitForGSAP, 50);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForGSAP);
} else {
    waitForGSAP();
}

// =================================
// WHIMSICAL SOUND
// =================================

const whimsicalSound = document.getElementById('whimsicalSound');
if (whimsicalSound) whimsicalSound.volume = 0.3;

function playWhimsicalSound() {
    if (whimsicalSound && whimsicalSound.paused) {
        whimsicalSound.currentTime = 0;
        whimsicalSound.play().catch(() => {});
    }
}

let soundPlayed = false;
document.addEventListener('click', function initSound() {
    if (!soundPlayed) {
        playWhimsicalSound();
        soundPlayed = true;
        document.removeEventListener('click', initSound);
    }
});

// =================================
// SCROLL PROGRESS BAR
// =================================

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            document.getElementById("progressBar").style.width = scrollPercent + "%";
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// =================================
// HERO ANIMATIONS
// =================================

function initHeroAnimations() {
    gsap.to('#heroSubtitle', { opacity: 1, duration: 1, delay: 0.3 });
    gsap.to('#heroName1', { opacity: 1, duration: 1, delay: 0.5 });
    gsap.to('#heroName2', { opacity: 1, duration: 1, delay: 0.7 });
    gsap.to('#badge1', { opacity: 1, duration: 0.6, delay: 0.9 });
    gsap.to('#badge2', { opacity: 1, duration: 0.6, delay: 1.1 });
    gsap.to('#badge3', { opacity: 1, duration: 0.6, delay: 1.3 });
    gsap.to('#scrollHint', { opacity: 1, duration: 1, delay: 1.6 });
}

// =================================
// REVEAL SECTIONS ON SCROLL
// =================================

function initRevealSections() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '-30px' });

    document.querySelectorAll('.reveal-section').forEach(s => revealObserver.observe(s));
}

// =================================
// STUDIO IPHONE FUNCTIONALITY - FIX #5: ReMi timing
// =================================

function initStudioIphone() {
    const projectEntries = document.querySelectorAll('.project-entry');
    const viewportImg = document.getElementById('viewportImg');
    const iphoneWrapper = document.getElementById('iphoneWrapper');
    const iphoneFixed = document.getElementById('iphoneFixed');
    const archiveProject = document.getElementById('archive-project');

    if (!iphoneFixed || !viewportImg) return;

    iphoneFixed.style.display = 'none';

    // Create a ScrollTrigger for the entire studio section
    ScrollTrigger.create({
        trigger: '#studio',
        start: 'top 40%',
        end: 'bottom bottom',
        onEnter: () => {
            const firstNonArchive = document.querySelector('.project-entry:not(#archive-project)');
            if (firstNonArchive) {
                updatePhone(firstNonArchive);
                iphoneFixed.style.display = 'block';
                iphoneFixed.style.opacity = '1';
            }
        },
        onLeaveBack: () => {
            iphoneFixed.style.opacity = '0';
            setTimeout(() => { iphoneFixed.style.display = 'none'; }, 200);
        }
    });

    // FIX #5: Create observers for all project entries except archive
    // Using broader start/end ranges so ReMi stays visible longer
    projectEntries.forEach(entry => {
        if (entry !== archiveProject) {
            ScrollTrigger.create({
                trigger: entry,
                start: "top 65%",
                end: "bottom 35%",
                onEnter: () => updatePhone(entry),
                onEnterBack: () => updatePhone(entry),
            });
        }
    });

    // Special observer for archive project to hide iPhone
    if (archiveProject) {
        ScrollTrigger.create({
            trigger: archiveProject,
            start: "top 65%",
            onEnter: () => {
                iphoneFixed.style.opacity = '0';
                setTimeout(() => { iphoneFixed.style.display = 'none'; }, 200);
            },
            onLeaveBack: () => {
                const prevProject = archiveProject.previousElementSibling;
                // Skip the spacer div
                let target = prevProject;
                while (target && !target.classList.contains('project-entry')) {
                    target = target.previousElementSibling;
                }
                if (target && target.classList.contains('project-entry') && target !== archiveProject) {
                    updatePhone(target);
                    iphoneFixed.style.display = 'block';
                    iphoneFixed.style.opacity = '1';
                }
            }
        });
    }

    function updatePhone(entry) {
        if (entry === archiveProject) return;

        const img = entry.dataset.img;
        const color = entry.dataset.color;

        iphoneFixed.style.display = 'block';
        iphoneFixed.style.opacity = '1';

        viewportImg.style.opacity = '0';
        viewportImg.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            viewportImg.src = img;
            setTimeout(() => {
                viewportImg.style.opacity = '1';
                viewportImg.style.transform = 'scale(1)';
            }, 50);
        }, 200);

        if (iphoneWrapper) {
            iphoneWrapper.style.borderColor = color;
            iphoneWrapper.style.boxShadow = `0 50px 100px -20px rgba(0,0,0,0.5), 0 0 0 3px ${color}60, inset 0 0 0 3px #444, 0 0 80px ${color}70`;
        }
    }
}

// =================================
// IMAGE MODAL
// =================================

function initImageModal() {
    document.getElementById('imageModal')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('imageModal')) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(src) {
    document.getElementById('modalImage').src = src;
    document.getElementById('imageModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    playWhimsicalSound();
}

function closeModal() {
    document.getElementById('imageModal').classList.remove('active');
    document.body.style.overflow = '';
}

// =================================
// DIALOGUE SYSTEM
// =================================

function initDialogueSystem() {
    const dialogueMap = {
        hero: "Welcome to my garden of designs. Pull up a chair and stay a while. <span class='material-icons-outlined align-middle'>eco</span>",
        about: "Based in Lisbon, but my roots can grow anywhere in the world. <span class='material-icons-outlined align-middle'>public</span>",
        artifacts: "Three years of professional growth—from conferences to startups. <span class='material-icons-outlined align-middle'>grass</span>",
        studio: "Scroll through my case studies! Watch the phone change with each project. <span class='material-icons-outlined align-middle'>phone_iphone</span>",
        designs: "Click any piece to see it full size! Each one tells a story. <span class='material-icons-outlined align-middle'>auto_awesome</span>",
        websites: "Websites I've nurtured from seedlings to full bloom. <span class='material-icons-outlined align-middle'>spa</span>",
        certificates: "Click a folder to open a certificate! <span class='material-icons-outlined align-middle'>computer</span>",
        wisdom: "Skills cultivated through years of practice and curiosity. <span class='material-icons-outlined align-middle'>grass</span>",
        contact: "Let's grow something beautiful together! <span class='material-icons-outlined align-middle'>favorite</span>"
    };

    const dialogueContainer = document.getElementById('dialogueContainer');
    const dialogueText = document.getElementById('dialogueText');
    
    if (!dialogueContainer || !dialogueText) return;

    window.isDialogueVisible = true;

    function updateDialogue(text) {
        if (window.isDialogueVisible) {
            dialogueText.innerHTML = text;
            dialogueContainer.classList.remove('hidden');
        }
    }

    const dialogueObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && window.isDialogueVisible && dialogueMap[entry.target.id]) {
                updateDialogue(dialogueMap[entry.target.id]);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('section, footer').forEach(s => dialogueObserver.observe(s));

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => { window.isDialogueVisible = true; }, 100);
        });
    });

    updateDialogue(dialogueMap.hero);
}

function dismissDialogue() {
    window.isDialogueVisible = false;
    document.getElementById('dialogueContainer')?.classList.add('hidden');
}

// =================================
// THEME TOGGLE
// =================================

function initTheme() {
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    playWhimsicalSound();
}

// =================================
// MUSEUM GALLERY CONTROLS - UNTOUCHED
// =================================

function initMuseumGallery() {
    const galleryTrack = document.getElementById('galleryTrack');
    if (!galleryTrack) return;

    let gallerySpeed = 20;
    let isGalleryPaused = false;
    const originalSpeed = 20;

    galleryTrack.style.animation = `scrollGallery ${gallerySpeed}s linear infinite`;

    const museumSpotlight = document.getElementById('museum-cursor-spotlight');
    const museumSection = document.getElementById('designs');

    if (museumSection && museumSpotlight) {
        let ticking = false;
        museumSection.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    museumSpotlight.style.opacity = '1';
                    museumSpotlight.style.left = e.clientX + 'px';
                    museumSpotlight.style.top = e.clientY + 'px';
                    ticking = false;
                });
                ticking = true;
            }
        });

        museumSection.addEventListener('mouseleave', () => {
            museumSpotlight.style.opacity = '0';
        });
    }

    document.getElementById('speedUpBtn')?.addEventListener('click', () => {
        gallerySpeed = Math.max(5, gallerySpeed - 5);
        if (!isGalleryPaused) galleryTrack.style.animation = `scrollGallery ${gallerySpeed}s linear infinite`;
        playWhimsicalSound();
        showControlFeedback('Speed increased');
    });

    document.getElementById('speedDownBtn')?.addEventListener('click', () => {
        gallerySpeed = Math.min(60, gallerySpeed + 5);
        if (!isGalleryPaused) galleryTrack.style.animation = `scrollGallery ${gallerySpeed}s linear infinite`;
        playWhimsicalSound();
        showControlFeedback('Speed decreased');
    });

    document.getElementById('pauseBtn')?.addEventListener('click', () => {
        galleryTrack.style.animationPlayState = 'paused';
        isGalleryPaused = true;
        playWhimsicalSound();
        showControlFeedback('Paused');
    });

    document.getElementById('playBtn')?.addEventListener('click', () => {
        galleryTrack.style.animationPlayState = 'running';
        isGalleryPaused = false;
        playWhimsicalSound();
        showControlFeedback('Playing');
    });

    document.getElementById('resetBtn')?.addEventListener('click', () => {
        gallerySpeed = originalSpeed;
        galleryTrack.style.animation = `scrollGallery ${gallerySpeed}s linear infinite`;
        galleryTrack.style.animationPlayState = 'running';
        isGalleryPaused = false;
        playWhimsicalSound();
        showControlFeedback('Speed reset');
    });

    galleryTrack.addEventListener('mouseenter', () => {
        if (!isGalleryPaused) galleryTrack.style.animationPlayState = 'paused';
    });

    galleryTrack.addEventListener('mouseleave', () => {
        if (!isGalleryPaused) galleryTrack.style.animationPlayState = 'running';
    });

    function showControlFeedback(message) {
        const feedback = document.createElement('div');
        feedback.textContent = message;
        Object.assign(feedback.style, {
            position: 'absolute', bottom: '70px', right: '2rem',
            background: 'rgba(0,0,0,0.8)', color: '#C9A96E',
            padding: '0.5rem 1rem', borderRadius: '0.5rem',
            fontSize: '0.75rem', zIndex: '100',
            border: '1px solid rgba(201, 169, 110, 0.5)'
        });
        document.querySelector('.museum-section')?.appendChild(feedback);
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(10px)';
            feedback.style.transition = 'all 0.2s ease';
            setTimeout(() => feedback.remove(), 200);
        }, 1000);
    }
}

// =================================
// CONTACT FORM - Web3Forms (reliable, no backend needed)
// =================================
// SETUP (takes 2 min):
//   1. Go to https://web3forms.com
//   2. Enter your email: constancadcunha@gmail.com
//   3. Check your inbox and click "Create Access Key"
//   4. Paste the access key below replacing REPLACE_WITH_WEB3FORMS_KEY
// =================================

const WEB3FORMS_KEY = '7cedf946-821c-462b-abe0-8c888a0d19d1';

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    // Ensure form inputs are clickable
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('mousedown', (e) => e.stopPropagation());
        input.addEventListener('click', (e) => {
            e.stopPropagation();
            input.focus();
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending... <span class="material-icons-outlined align-middle">hourglass_empty</span>';
        submitButton.disabled = true;

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        let sent = false;

        // Method 1: Web3Forms — primary (no backend, no config needed after key)
        if (WEB3FORMS_KEY !== 'REPLACE_WITH_WEB3FORMS_KEY') {
            try {
                const res = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_KEY,
                        name,
                        email,
                        message,
                        subject: `Portfolio contact from ${name}`
                    })
                });
                const data = await res.json();
                if (data.success) sent = true;
                else console.warn('Web3Forms:', data);
            } catch (err) {
                console.warn('Web3Forms failed:', err);
            }
        }

        // Method 2: EmailJS fallback (if you configured it separately)
        if (!sent && typeof emailjs !== 'undefined') {
            try {
                await emailjs.send(
                    'YOUR_SERVICE_ID',
                    'YOUR_TEMPLATE_ID',
                    { from_name: name, from_email: email, message, to_email: 'constancadcunha@gmail.com' }
                );
                sent = true;
            } catch (err) {
                console.warn('EmailJS failed:', err);
            }
        }

        // Method 3: mailto fallback — always works, opens email client
        if (!sent) {
            const mailtoLink = `mailto:constancadcunha@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
            window.open(mailtoLink, '_blank');
            sent = true; // mailto is always "sent" (opens client)
        }

        if (sent) {
            formMessage.textContent = 'Message sent! You\'ll hear back soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            playWhimsicalSound();
            if (typeof confetti === 'function') {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        }

        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;

        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 6000);
    });
}

// =================================
// SMOOTH SCROLL
// =================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            playWhimsicalSound();
        });
    });
}

// =================================
// STAT COUNTERS
// =================================

function initStatCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.dataset.target);
                const valueEl = entry.target.querySelector('.counter-value');
                if (!valueEl) return;

                let current = 0;
                const increment = Math.max(1, Math.floor(target / 40));
                const duration = 1500;
                const stepTime = duration / (target / increment);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    valueEl.textContent = current.toLocaleString();
                }, stepTime);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
}

// =================================
// ABOUT SECTION PARTICLES (Enhancement #8)
// =================================

function initAboutParticles() {
    const container = document.getElementById('aboutParticles');
    if (!container) return;

    const colors = ['#9CAF88', '#E8C07D', '#B8A9C9', '#D4A5A5', '#A8C5D9'];
    
    // Reduce number of particles from 6 to 3 to save memory and CPU
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'seed-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = (4 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// Cursor sparkles removed per user request

// =================================
// CREATIVE ENHANCEMENT: Browser URL Typewriter
// =================================

function initBrowserTyping() {
    document.querySelectorAll('.browser-card').forEach(card => {
        const urlEl = card.querySelector('.browser-url');
        if (!urlEl) return;

        const original = urlEl.textContent;
        let typingTimer = null;

        card.addEventListener('mouseenter', () => {
            urlEl.textContent = '';
            let i = 0;
            typingTimer = setInterval(() => {
                if (i < original.length) {
                    urlEl.textContent += original[i++];
                } else {
                    clearInterval(typingTimer);
                }
            }, 38);
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(typingTimer);
            urlEl.textContent = original;
        });
    });
}

// =================================
// CREATIVE ENHANCEMENT: Skill Greenhouse Watering
// =================================

function initSkillWatering() {
    document.querySelectorAll('.skill-greenhouse').forEach(gh => {
        gh.addEventListener('click', () => {
            // Water drop burst
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const drop = document.createElement('div');
                    drop.className = 'water-drop';
                    drop.style.left = (15 + Math.random() * 70) + '%';
                    drop.style.top = '0%';
                    drop.style.animationDelay = (Math.random() * 0.1) + 's';
                    gh.appendChild(drop);
                    setTimeout(() => drop.remove(), 750);
                }, i * 60);
            }

            // Icon grow bounce
            const icon = gh.querySelector('.material-icons-outlined');
            if (icon) {
                icon.style.transform = 'scale(1.4)';
                icon.style.color = '#A8C5D9';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                    icon.style.color = '';
                }, 350);
            }

            // Glow flash
            gh.classList.add('watered');
            setTimeout(() => gh.classList.remove('watered'), 650);
        });
    });
}

// Certificate stamps removed — replaced by OS desktop experience

// =================================
// CREATIVE ENHANCEMENT: Timeline Dot Pulse on Enter
// =================================

function initTimelinePulse() {
    const dots = document.querySelectorAll('.timeline-dot');
    if (!dots.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('pulse-in');
                setTimeout(() => entry.target.classList.remove('pulse-in'), 500);
            }
        });
    }, { threshold: 0.6 });

    dots.forEach(d => obs.observe(d));
}

// =================================
// WEBSITE SIGNALS — Holographic Broadcast Effect
// =================================

function initWebsiteSignals() {
    // Starfield
    const starfield = document.getElementById('websiteStarfield');
    if (starfield) {
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'ws-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top  = Math.random() * 100 + '%';
            const sz = 1 + Math.random() * 2;
            star.style.width = sz + 'px';
            star.style.height = sz + 'px';
            star.style.animationDelay    = Math.random() * 4 + 's';
            star.style.animationDuration = (2 + Math.random() * 4) + 's';
            starfield.appendChild(star);
        }
    }

    const snippets = ['<div>', '</div>', '{css}', 'fn()', '→', '.px', 'rgb()', ':root', 'flex', 'async'];

    document.querySelectorAll('.browser-card').forEach(card => {
        // Signal rings
        const rings = document.createElement('div');
        rings.className = 'signal-rings';
        rings.innerHTML = '<div class="signal-ring"></div><div class="signal-ring signal-ring-2"></div><div class="signal-ring signal-ring-3"></div>';
        card.appendChild(rings);

        // LIVE badge
        const live = document.createElement('div');
        live.className = 'site-live-badge';
        live.textContent = '● LIVE';
        card.appendChild(live);

        // 3D tilt on mouse move
        let ticking = false;
        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const r = card.getBoundingClientRect();
                    const x = (e.clientX - r.left) / r.width  - 0.5;
                    const y = (e.clientY - r.top)  / r.height - 0.5;
                    card.style.transform  = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(15px) scale(1.02)`;
                    card.style.transition = 'transform 0.1s ease';
                    ticking = false;
                });
                ticking = true;
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform  = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
            setTimeout(() => card.style.transition = '', 500);
        });

        // Floating code particles
        card.addEventListener('mouseenter', () => {
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const el = document.createElement('span');
                    el.className = 'code-orbital';
                    el.textContent = snippets[Math.floor(Math.random() * snippets.length)];
                    el.style.left = (5 + Math.random() * 85) + '%';
                    el.style.top  = (20 + Math.random() * 70) + '%';
                    card.style.overflow = 'visible';
                    card.appendChild(el);
                    setTimeout(() => { el.remove(); if (i === 5) card.style.overflow = ''; }, 1300);
                }, i * 110);
            }
        });
    });
}

// =================================
// OS CLOCK & BATTERY — Certificate Desktop
// =================================

function initOsClock() {
    const clock = document.getElementById('osClock');
    if (!clock) return;
    function tick() {
        const now = new Date();
        clock.textContent = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    }
    tick();
    setInterval(tick, 60000);
}

function initOsBattery() {
    const batteryIcon = document.getElementById('osBatteryIcon');
    if (!batteryIcon) return;

    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            function updateBatteryStatus() {
                let level = battery.level * 100;
                if (battery.charging) {
                    batteryIcon.textContent = 'battery_charging_full';
                } else {
                    if (level > 90) batteryIcon.textContent = 'battery_full';
                    else if (level > 80) batteryIcon.textContent = 'battery_6_bar';
                    else if (level > 60) batteryIcon.textContent = 'battery_5_bar';
                    else if (level > 40) batteryIcon.textContent = 'battery_4_bar';
                    else if (level > 20) batteryIcon.textContent = 'battery_3_bar';
                    else if (level > 10) batteryIcon.textContent = 'battery_2_bar';
                    else batteryIcon.textContent = 'battery_1_bar';
                }
            }
            updateBatteryStatus();
            battery.addEventListener('chargingchange', updateBatteryStatus);
            battery.addEventListener('levelchange', updateBatteryStatus);
        });
    }
}

// =================================
// CERTIFICATE DESKTOP OS
// =================================

const CERT_DATA = [
    { name: 'Complete Figma Megacourse',       color: '#9CAF88', issuer: 'Udemy',      desc: 'Comprehensive Figma mastery — from basic shapes to advanced prototyping and design systems.',              link: 'certificates/UC-a1497d98-ab9f-4d61-8f60-92c8a520914f.pdf' },
    { name: 'Digital Skills: User Experience', color: '#E8C07D', issuer: 'Accenture',  desc: 'UX research methods, user journey mapping, wireframing, and usability testing fundamentals.',             link: 'certificates/digital-skills-user-experience_certificate_of_achievement_57cnwno.pdf' },
    { name: 'Intro to UI/UX Design',           color: '#B8A9C9', issuer: 'Certificate',desc: 'Core design principles, information architecture, and user-centered design methodology.',                 link: 'certificates/Constança Cunha - 2025-01-24.pdf' },
    { name: 'Master Digital Product Design',   color: '#D4A5A5', issuer: 'Udemy',      desc: 'End-to-end product design workflow — from discovery to high-fidelity mockups and handoff.',              link: 'certificates/UC-486f6c5c-1406-477b-86bc-709727580248.pdf' },
    { name: 'Master Figma for Web & UI/UX',    color: '#A8C5D9', issuer: 'Udemy',      desc: 'Advanced Figma techniques for responsive web design, component libraries, and client workflows.',         link: 'certificates/UC-03333345-1bff-4c16-90e1-23441660e75c.pdf' },
    { name: 'Web Developer Bootcamp 2025',      color: '#7D9B76', issuer: 'Udemy',      desc: '74.5 hours of HTML, CSS, JS, Node, Express, MongoDB — the full-stack journey, start to finish.',        link: 'certificates/UC-5533914a-a4c9-4171-b4c3-46bc1f0b70c8.pdf' },
    { name: 'Modern UI Dev in Unity',           color: '#E8C07D', issuer: 'Udemy',      desc: 'Game UI systems, canvas management, animations, and responsive interfaces in Unity engine.',             link: 'certificates/UC-9b00fce4-8886-4ac2-96d6-23a7c9f9ebd8.pdf' },
    { name: 'Design Thinking Practitioner',     color: '#8B6B8E', issuer: 'IBM',        desc: "IBM's framework for user-centric innovation — Hills, Playbacks, and Sponsor Users.",                    link: 'certificates/Enterprise_Design_Thinking_Practitioner_Badge20250125-26-4dyqob.pdf' },
    { name: 'Design Thinking Co-Creator',       color: '#9CAF88', issuer: 'IBM',        desc: 'Cross-functional collaboration, workshop facilitation, and co-creation techniques at scale.',            link: 'certificates/Enterprise_Design_Thinking_Co_Creator_Badge20250125-26-hts2xc.pdf' },
];

function openCertWindow(idx) {
    const cert = CERT_DATA[idx];
    if (!cert) return;

    // Backdrop
    let backdrop = document.getElementById('osBackdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.id = 'osBackdrop';
        backdrop.className = 'os-backdrop';
        backdrop.onclick = closeCertWindow;
        document.body.appendChild(backdrop);
    }

    const win = document.getElementById('osWindow');
    const monitorScreen = document.querySelector('.cottage-monitor-screen');

    if (monitorScreen && win) {
        const rect = monitorScreen.getBoundingClientRect();
        const menubarH = 24; // approx menubar height
        const pad = 10;

        // Constrain backdrop to monitor screen only
        Object.assign(backdrop.style, {
            top: rect.top + 'px',
            left: rect.left + 'px',
            bottom: 'auto',
            right: 'auto',
            width: rect.width + 'px',
            height: rect.height + 'px',
            borderRadius: '0.6rem',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(2px)'
        });

        // Position window within monitor screen
        Object.assign(win.style, {
            position: 'fixed',
            transform: 'none',
            top: (rect.top + menubarH + pad) + 'px',
            left: (rect.left + pad) + 'px',
            width: (rect.width - pad * 2) + 'px',
            maxHeight: (rect.height - menubarH - pad * 2) + 'px',
            overflowY: 'auto'
        });
        win.classList.add('in-monitor');
    } else {
        // Fallback: full-page backdrop + centred window
        Object.assign(backdrop.style, {
            top: '0', left: '0', bottom: '0', right: '0',
            width: '', height: '', borderRadius: '0',
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)'
        });
        Object.assign(win.style, {
            position: 'fixed',
            transform: 'translate(-50%,-50%)',
            top: '50%', left: '50%',
            width: 'min(520px, 92vw)',
            maxHeight: '', overflowY: ''
        });
        win.classList.remove('in-monitor');
    }

    backdrop.style.display = 'block';

    document.getElementById('osWinTitle').textContent = cert.name;
    document.getElementById('osWinBody').innerHTML = `
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;">
            <div style="width:56px;height:56px;background:${cert.color};border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.35);"><span class="material-icons-outlined" style="font-size:24px;color:#fff">workspace_premium</span></div>
            <div>
                <h3 style="color:#fff;font-weight:700;font-size:1.05rem;margin-bottom:0.2rem;">${cert.name}</h3>
                <p style="color:rgba(255,255,255,0.45);font-size:0.78rem;font-family:monospace;">Issued by: ${cert.issuer}</p>
            </div>
        </div>
        <div style="background:rgba(255,255,255,0.06);border-radius:8px;padding:1rem;margin-bottom:1.25rem;border:1px solid rgba(255,255,255,0.08);">
            <p style="color:rgba(255,255,255,0.75);font-size:0.88rem;line-height:1.65;">${cert.desc}</p>
        </div>
        <div style="display:flex;align-items:center;gap:0.75rem;font-size:0.72rem;font-family:monospace;color:rgba(255,255,255,0.35);margin-bottom:1.25rem;">
            <span style="color:#28C840;">●</span> VERIFIED
            <span style="opacity:0.3;">|</span><span>${cert.issuer}</span>
            <span style="opacity:0.3;">|</span><span style="display:inline-flex;align-items:center;gap:3px">Completed <span class="material-icons-outlined" style="font-size:12px;vertical-align:middle">check_circle</span></span>
        </div>
        <a href="${cert.link}" target="_blank" rel="noopener noreferrer"
           style="display:inline-flex;align-items:center;gap:0.5rem;background:${cert.color};color:#fff;padding:0.6rem 1.4rem;border-radius:999px;font-size:0.78rem;font-weight:700;text-decoration:none;letter-spacing:0.05em;transition:opacity 0.2s;"
           onmouseover="this.style.opacity='0.82'" onmouseout="this.style.opacity='1'">
            Open Certificate →
        </a>`;

    // Force animation replay on every open
    win.style.animation = 'none';
    win.offsetHeight; // trigger reflow
    win.style.animation = '';

    win.classList.remove('hidden');
    playWhimsicalSound();
}

function closeCertWindow() {
    const win = document.getElementById('osWindow');
    if (win) win.classList.add('hidden');
    const bd = document.getElementById('osBackdrop');
    if (bd) bd.style.display = 'none';
}

// =================================
// CAMERA WIDGET — About Section
// =================================

function initCameraWidget() {
    const widget = document.getElementById('cameraWidget');
    if (!widget) return;

    let hasShot = false;

    // Auto-trigger on first scroll into view (with a natural delay)
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasShot) {
                hasShot = true;
                setTimeout(() => triggerCameraShoot(), 1000);
            }
        });
    }, { threshold: 0.6 });

    obs.observe(widget);
}

let cameraIsAnimating = false;

function triggerCameraShoot(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (cameraIsAnimating) return;

    const body     = document.getElementById('cameraBody');
    const polaroid = document.getElementById('cameraPolaroid');
    const hint     = document.getElementById('cameraHintText');

    if (!body || !polaroid) return;

    // If photo is already showing, retract it first then re-shoot
    if (polaroid.classList.contains('photo-ejected')) {
        cameraIsAnimating = true;
        polaroid.classList.remove('photo-ejected');
        polaroid.classList.add('photo-retracting');
        // Reset animation on the img so it replays on next shoot
        const img = polaroid.querySelector('img');
        if (img) { img.style.animation = 'none'; img.offsetHeight; img.style.animation = ''; }
        setTimeout(() => {
            polaroid.classList.remove('photo-retracting');
            cameraIsAnimating = false;
            // Re-trigger the shoot after retraction
            fireShutter(body, polaroid, hint);
        }, 300);
        return;
    }

    fireShutter(body, polaroid, hint);
}

function fireShutter(body, polaroid, hint) {
    cameraIsAnimating = true;

    // Get or create flash overlay
    let overlay = document.getElementById('cameraFlashBurst');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'cameraFlashBurst';
        overlay.className = 'camera-flash-burst';
        document.body.appendChild(overlay);
    }

    // Shake camera body
    body.classList.add('shooting');
    setTimeout(() => body.classList.remove('shooting'), 300);

    // Flash
    overlay.classList.add('active');
    setTimeout(() => overlay.classList.remove('active'), 120);

    // Flash unit flare
    const flashUnit = body.querySelector('.camera-flash-unit');
    if (flashUnit) {
        flashUnit.style.background = 'white';
        flashUnit.style.boxShadow = '0 0 20px 8px rgba(255,255,255,0.7)';
        setTimeout(() => { flashUnit.style.background = ''; flashUnit.style.boxShadow = ''; }, 200);
    }

    // Eject polaroid — animation class triggers CSS keyframe
    setTimeout(() => {
        // Force animation replay if class was already there
        polaroid.classList.remove('photo-ejected', 'photo-retracting');
        polaroid.offsetHeight; // reflow to restart animation
        polaroid.classList.add('photo-ejected');
        if (hint) hint.textContent = 'Click to take another!';
        cameraIsAnimating = false;
    }, 280);

    playWhimsicalSound();
}

// =================================
// FLOWER POTS — Skills Garden Bloom
// =================================

function initFlowerPots() {
    const pots = document.querySelectorAll('.flower-pot-card');
    if (!pots.length) return;

    // Bloom each pot as it enters the viewport
    const bloomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger bloom by card index
                const idx = Array.from(pots).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('bloomed');
                }, idx * 120);
                bloomObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    pots.forEach(pot => bloomObserver.observe(pot));
}

// =================================
// JOURNEY FIREFLIES
// =================================

function initJourneyFireflies() {
    const container = document.getElementById('journeyFireflies');
    if (!container) return;

    // Reduce number of fireflies from 14 to 6 to save memory and CPU
    for (let i = 0; i < 6; i++) {
        const fly = document.createElement('div');
        fly.className = 'journey-firefly';
        fly.style.left = (5 + Math.random() * 90) + '%';
        fly.style.top = (10 + Math.random() * 80) + '%';
        const dur = (5 + Math.random() * 5).toFixed(1) + 's';
        const delay = (Math.random() * 8).toFixed(1) + 's';
        fly.style.setProperty('--dur', dur);
        fly.style.setProperty('--delay', delay);
        fly.style.setProperty('--fx', (Math.random() * 70 - 35) + 'px');
        fly.style.setProperty('--fy', (Math.random() * 40 - 20) + 'px');
        container.appendChild(fly);
    }
}

// =================================
// GARDEN BUTTERFLIES — animated movement
// =================================

function initGardenButterflies() {
    const butterflies = document.querySelectorAll('.garden-butterfly');
    if (!butterflies.length) return;

    butterflies.forEach((bf, i) => {
        // Give each butterfly a randomized animation duration + delay
        bf.style.animationDuration = (7 + i * 3 + Math.random() * 4) + 's';
        bf.style.animationDelay = (i * 2.5) + 's';
        // Random starting position within section
        const section = document.getElementById('wisdom');
        if (section) {
            bf.style.left = (10 + Math.random() * 75) + '%';
            bf.style.top = (15 + Math.random() * 50) + '%';
        }
    });
}

// =================================
// GARDEN — Watering Can + Skill Petals
// =================================

const GARDEN_SKILLS = [
    { skills: ['Python', 'TypeScript', 'Java', 'C/C++', 'Julia', 'JavaScript'], colors: ['#6B7F5E','#7D9B76','#9CAF88','#4A5D4E','#7D9B76','#9CAF88'] },
    { skills: ['React', 'SwiftUI', 'Tailwind', 'Design Systems', 'Next.js'],     colors: ['#C9A96E','#E8C07D','#B87D64','#C9A96E','#E8C07D'] },
    { skills: ['Figma', 'Illustrator', 'Photoshop', 'Motion Design'],             colors: ['#D4A5A5','#B87D64','#8B6B8E','#D4A5A5'] },
    { skills: ['Leadership', 'Product Thinking', 'Rapid Delivery', 'User Empathy'], colors: ['#8B6B8E','#B8A9C9','#6B5580','#B8A9C9'] },
];

function waterPlant(potIdx) {
    const potEl = document.getElementById('pot-' + potIdx);
    if (!potEl) return;

    const plantArea = potEl.querySelector('.flower-plant-area');
    if (!plantArea) return;

    const canBtn = potEl.querySelector('.water-can-btn');
    if (canBtn) {
        canBtn.classList.remove('watering');
        void canBtn.offsetWidth;
        canBtn.classList.add('watering');
        setTimeout(() => canBtn.classList.remove('watering'), 620);
    }

    // Bloom the pot (and mark as watered to suppress hover tooltip)
    potEl.classList.add('bloomed', 'watered');

    // Water drops falling onto plant
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.className = 'garden-water-drop';
            drop.style.left = (30 + Math.random() * 40) + '%';
            drop.style.top = '0';
            plantArea.appendChild(drop);
            setTimeout(() => drop.remove(), 750);
        }, i * 70);
    }

    // Flying skill petals (fun visual burst)
    const data = GARDEN_SKILLS[potIdx];
    if (!data) return;

    data.skills.forEach((skill, i) => {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'flying-skill-petal';
            petal.textContent = skill;
            petal.style.setProperty('--color', data.colors[i % data.colors.length]);

            // Spread petals in a fan arc
            const totalSkills = data.skills.length;
            const angleStart = -Math.PI * 0.85;
            const angleEnd = -Math.PI * 0.15;
            const angle = angleStart + (angleEnd - angleStart) * (i / Math.max(totalSkills - 1, 1));
            const dist = 58 + Math.random() * 30;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            const dr = (Math.random() * 24 - 12) + 'deg';

            petal.style.setProperty('--dx', dx.toFixed(1) + 'px');
            petal.style.setProperty('--dy', dy.toFixed(1) + 'px');
            petal.style.setProperty('--dr', dr);
            petal.style.setProperty('--dur', (0.85 + Math.random() * 0.35) + 's');

            plantArea.appendChild(petal);
            setTimeout(() => petal.remove(), 1500);
        }, 180 + i * 95);
    });

    // After the burst, show permanent skill label chips
    const labelContainer = document.getElementById('skill-labels-' + potIdx);
    if (labelContainer && labelContainer.children.length === 0) {
        const settlDelay = 180 + data.skills.length * 95 + 400;
        setTimeout(() => {
            data.skills.forEach((skill, i) => {
                setTimeout(() => {
                    const chip = document.createElement('span');
                    chip.className = 'skill-label-chip';
                    chip.style.setProperty('--chip-bg', data.colors[i % data.colors.length]);
                    chip.textContent = skill;
                    labelContainer.appendChild(chip);
                    // Double rAF so opacity transition fires
                    requestAnimationFrame(() => requestAnimationFrame(() => chip.classList.add('visible')));
                }, i * 90);
            });
        }, settlDelay);
    }
}

function initJourneyInteractions() {
    const cards = document.querySelectorAll('.journey-card');
    cards.forEach((card) => {
        let ticking = false;
        card.addEventListener('mousemove', (event) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mx', x + '%');
                    card.style.setProperty('--my', y + '%');
                    
                    // 3D tilt effect
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const rotateX = ((event.clientY - centerY) / (rect.height / 2)) * -8;
                    const rotateY = ((event.clientX - centerX) / (rect.width / 2)) * 8;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05) translateY(-8px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)';
        });
    });

    const credCards = document.querySelectorAll('.cred-card');
    credCards.forEach((card) => {
        let ticking = false;
        card.addEventListener('mousemove', (event) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;
                    card.style.setProperty('--mx', x + '%');
                    card.style.setProperty('--my', y + '%');
                    
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const rotateX = ((event.clientY - centerY) / (rect.height / 2)) * -6;
                    const rotateY = ((event.clientX - centerX) / (rect.width / 2)) * 6;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04) translateY(-4px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0)';
        });
    });
}

// =================================
// JOURNEY — Chapter Toggle
// =================================

function toggleJourneyChapter(idx) {
    const story = document.getElementById('jstory-' + idx);
    if (!story) return;

    const isOpen = story.classList.contains('open');

    // Close all open chapters (accordion behaviour)
    for (let i = 0; i < 3; i++) {
        const s  = document.getElementById('jstory-'   + i);
        const ch = document.getElementById('jchapter-' + i);
        if (s)  s.classList.remove('open');
        if (ch) ch.classList.remove('expanded');
    }

    // Open clicked chapter if it was closed
    if (!isOpen) {
        story.classList.add('open');
        const chapter = document.getElementById('jchapter-' + idx);
        chapter && chapter.classList.add('expanded');
    }
}

// =================================
// CREDENTIALS — Interactive Book
// =================================

let _bookAnimating = false;

function initCredBook() {
    const book = document.getElementById('credBook');
    if (book) book.classList.add('book-is-closed');
    _updateBookZIndices();
    
    // Improve click detection by ensuring proper pointer-events
    const pages = document.querySelectorAll('.book-page');
    pages.forEach(page => {
        page.style.pointerEvents = 'auto';
    });
}

function _updateBookZIndices() {
    const pages = Array.from(document.querySelectorAll('.book-page'));
    const total = pages.length;
    pages.forEach((page, i) => {
        if (page.classList.contains('flipped')) {
            // Left side: later (higher-index) flipped page sits on top
            page.style.zIndex = (i + 1) * 5;
        } else {
            // Right side: earlier (lower-index) page sits on top
            page.style.zIndex = (total - i) * 5;
        }
    });
}

function flipBookPage(idx) {
    if (_bookAnimating) return;

    const pages = Array.from(document.querySelectorAll('.book-page'));
    const page = pages[idx];
    if (!page) return;

    const book = document.getElementById('credBook');
    // Last content page index (pages.length - 1 is book-backcover-page, never flips)
    const lastContentIdx = pages.length - 2;

    const isFlipped = page.classList.contains('flipped');

    if (!isFlipped) {
        // Flip forward — only if every preceding page is already flipped
        for (let i = 0; i < idx; i++) {
            if (!pages[i].classList.contains('flipped')) return;
        }
        _bookAnimating = true;
        page.style.zIndex = 999;
        page.classList.add('flipped');
        // Opening the front cover → reveal full open book
        if (idx === 0) book.classList.remove('book-is-closed');
        // Reaching last content page → auto-close back to closed state
        if (idx === lastContentIdx) {
            setTimeout(() => {
                book.classList.add('book-is-closed-back');
            }, 550);
        }
        setTimeout(() => { _bookAnimating = false; _updateBookZIndices(); }, 1020);
    } else {
        // Flip back — only the most-recently-flipped page can unflip
        let lastFlipped = -1;
        pages.forEach((p, i) => { if (p.classList.contains('flipped')) lastFlipped = i; });
        if (idx !== lastFlipped) return;
        _bookAnimating = true;
        page.style.zIndex = 999;
        page.classList.remove('flipped');
        // Closing back to front cover
        if (idx === 0) book.classList.add('book-is-closed');
        // Leaving back cover state
        if (idx === lastContentIdx) book.classList.remove('book-is-closed-back');
        setTimeout(() => { _bookAnimating = false; _updateBookZIndices(); }, 1020);
    }
}

// =================================
// WEBSITES — Case Study Toggle
// =================================

function toggleWebsite(idx) {
    const study = document.getElementById('web-study-' + idx);
    const card  = document.getElementById('web-card-'  + idx);
    if (!study) return;

    const isOpen = study.classList.contains('open');

    // Close others
    for (let i = 0; i < 4; i++) {
        const s = document.getElementById('web-study-' + i);
        const c = document.getElementById('web-card-'  + i);
        if (s) s.classList.remove('open');
        if (c) c.classList.remove('expanded');
    }

    if (!isOpen) {
        study.classList.add('open');
        card && card.classList.add('expanded');
    }
}

// =================================
// IPOD CLASSIC — Navigation & Credentials
// =================================

let currentIpodIndex = 0;
let ipodInDetailView = false;

const credentialData = [
    {
        title: "Cambridge Proficiency",
        subtitle: "C2 Level",
        description: "Advanced English proficiency certification demonstrating mastery of the English language at the highest level."
    },
    {
        title: "Interaction & Visualization",
        subtitle: "M.Sc. Degree",
        description: "Master's degree specializing in interaction design, data visualization techniques, and human-computer interaction."
    }
];

function updateIpodMenu() {
    const menu = document.getElementById('ipodMenu');
    const items = document.querySelectorAll('.ipod-menu-item');
    
    items.forEach((item, idx) => {
        if (idx === currentIpodIndex) {
            item.classList.add('active');
            // Scroll the active item into view
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

function ipodNext() {
    if (!ipodInDetailView) {
        currentIpodIndex = (currentIpodIndex + 1) % credentialData.length;
        updateIpodMenu();
    }
}

function ipodPrev() {
    if (!ipodInDetailView) {
        currentIpodIndex = (currentIpodIndex - 1 + credentialData.length) % credentialData.length;
        updateIpodMenu();
    }
}

function ipodSelect() {
    if (!ipodInDetailView) {
        showIpodDetail();
    }
}

function ipodPlay() {
    if (!ipodInDetailView) {
        showIpodDetail();
    }
}

function ipodMenu() {
    if (ipodInDetailView) {
        ipodGoBack();
    }
}

function showIpodDetail() {
    const detail = document.getElementById('ipodDetail');
    const content = document.getElementById('ipodDetailContent');
    const data = credentialData[currentIpodIndex];
    
    if (!detail || !content || !data) return;
    
    content.innerHTML = `
        <div class="ipod-detail-title">${data.title}</div>
        <div class="ipod-detail-subtitle">${data.subtitle}</div>
        <div class="ipod-detail-desc">${data.description}</div>
    `;
    
    detail.classList.add('active');
    ipodInDetailView = true;
}

function ipodGoBack() {
    const detail = document.getElementById('ipodDetail');
    if (!detail) return;
    
    detail.classList.remove('active');
    ipodInDetailView = false;
}

// Initialize iPod
document.addEventListener('DOMContentLoaded', function() {
    updateIpodMenu();
});
