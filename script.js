

(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    const saved = sessionStorage.getItem('portfolioScrollY');
    if (saved) {
        window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' });
        sessionStorage.removeItem('portfolioScrollY');
    }
    window.addEventListener('beforeunload', function () {
        sessionStorage.setItem('portfolioScrollY', window.scrollY);
    });
})();

function initSite() {
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    const initWhenVisible = (selector, initFn, rootMargin = '220px') => {
        const target = document.querySelector(selector);
        if (!target || typeof initFn !== 'function') return;

        if (!('IntersectionObserver' in window)) {
            initFn();
            return;
        }

        let initialized = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!initialized && entry.isIntersecting) {
                    initialized = true;
                    initFn();
                    observer.disconnect();
                }
            });
        }, { rootMargin });

        observer.observe(target);
    };

    
    initIntroOverlay(initHeroAnimations);
    initRevealSections();
    initStudioIphone();
    initImageModal();
    initDialogueSystem();
    initTheme();
    initContactForm();
    initSmoothScroll();
    initStatCounters();
    initBrowserTyping();

    initWhenVisible('#about', () => {
        initAboutParticles();
        initCameraWidget();
    }, '260px');

    initWhenVisible('#featured-cases', initTimelinePulse, '260px');
    initWhenVisible('#artifacts', () => {
        initJourneyFireflies();
        initStoryBook();
    }, '300px');
    initWhenVisible('#designs', initMuseumGallery, '300px');
    initWhenVisible('#websites', initWebsiteSignals, '260px');
    initWhenVisible('#certificates', () => {
        initOsClock();
        initOsBattery();
    }, '260px');
    initWhenVisible('#wisdom', () => {
        initFlowerPots();
        initSkillWatering();
        initGardenButterflies();
    }, '300px');
}

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

function initIntroOverlay(onComplete) {
    const overlay = document.getElementById('intro-overlay');
    if (!overlay) { if (onComplete) onComplete(); return; }

    
    if (sessionStorage.getItem('introShown')) {
        if (onComplete) onComplete();
        overlay.classList.add('intro-hidden');
        return;
    }

    
    sessionStorage.setItem('introShown', 'true');

    
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const SCRIPT = [
        { id: 'intro-l1', text: "hi. i\u2019m constan\u00e7a." },
        { id: 'intro-l2', text: "product designer." },
        { id: 'intro-l3', text: "crafting cozy digital experiences" },
        { id: 'intro-l4', text: "one detail at a time." },
    ];

    const actions = document.getElementById('intro-actions');

    function typeText(el, text, speed, onDone) {
        el.classList.add('intro-visible');
        el.textContent = '';
        const cursor = document.createElement('span');
        cursor.className = 'intro-cursor';
        el.appendChild(cursor);

        let i = 0;
        function tick() {
            if (i < text.length) {
                el.insertBefore(document.createTextNode(text[i]), cursor);
                i++;
                setTimeout(tick, speed);
            } else {
                cursor.remove();
                if (onDone) onDone();
            }
        }
        tick();
    }

    function runSequence(index) {
        if (index >= SCRIPT.length) {
            setTimeout(() => actions.classList.add('intro-visible'), 200);
            return;
        }
        const { id, text } = SCRIPT[index];
        const el = document.getElementById(id);
        const delayBefore = index === 0 ? 200 : 120;
        const charSpeed = index === 0 ? 35 : 28;

        setTimeout(() => {
            typeText(el, text, charSpeed, () => {
                setTimeout(() => runSequence(index + 1), 150);
            });
        }, delayBefore);
    }

    function closeIntro() {
        if (onComplete) onComplete();
        overlay.classList.add('intro-leaving');
        setTimeout(() => {
            overlay.classList.add('intro-hidden');
            document.body.style.overflow = '';
        }, 1100);
    }

    document.getElementById('intro-say-hi').addEventListener('click', (e) => {
        e.preventDefault();
        actions.classList.remove('intro-visible');
        const replyEl = document.getElementById('intro-l5');
        setTimeout(() => {
            typeText(replyEl, "lovely to meet you. welcome in.", 35, () => {
                setTimeout(closeIntro, 400);
            });
        }, 120);
    });

    document.getElementById('intro-skip').addEventListener('click', (e) => {
        e.preventDefault();
        closeIntro();
    });

    runSequence(0);
}

function initHeroAnimations() {
    
    gsap.set(['#heroTag', '#heroName1', '#heroSubline', '#heroCTA', '#heroGallery'], { y: 30 });
    
    
    gsap.to('#heroTag', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
    gsap.to('#heroName1', { opacity: 1, y: 0, duration: 1, delay: 0.6 });
    gsap.to('#heroSubline', { opacity: 1, y: 0, duration: 0.8, delay: 1.0 });
    gsap.to('#heroCTA', { opacity: 1, y: 0, duration: 0.8, delay: 1.4 });
    gsap.to('#heroGallery', { opacity: 1, y: 0, duration: 1, delay: 1.8 });
    gsap.to('#heroLocation', { opacity: 1, duration: 0.6, delay: 2.2 });
    gsap.to('#scrollHint', { opacity: 1, duration: 1, delay: 2.6 });
}

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

function initStudioIphone() {
    const projectEntries = document.querySelectorAll('#studio .project-entry');
    const viewportImg = document.getElementById('viewportImg');
    const iphoneWrapper = document.getElementById('iphoneWrapper');
    const iphoneFixed = document.getElementById('iphoneFixed');
    const archiveProject = document.getElementById('archive-project');

    if (!iphoneFixed || !viewportImg) return;
    iphoneFixed.style.display = 'none';

    
    ScrollTrigger.create({
        trigger: '#studio',
        start: 'top 40%',
        end: 'bottom bottom',
        onEnter: () => {
            const firstNonArchive = document.querySelector('#studio .project-entry:not(#archive-project)');
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

function initDialogueSystem() {
    const dialogueMap = {
        hero: "Hi — take a look around. <span class='material-icons-outlined align-middle'>eco</span>",
        about: "Lisbon-based. Open to relocate or go remote. <span class='material-icons-outlined align-middle'>public</span>",
        artifacts: "Click through the postcards to see where I've been. <span class='material-icons-outlined align-middle'>grass</span>",
        studio: "Scroll through — the phone preview updates with each project. <span class='material-icons-outlined align-middle'>phone_iphone</span>",
        'vinyl-lab': "Side B projects: quick experiments with stronger product logic. <span class='material-icons-outlined align-middle'>album</span>",
        designs: "Click anything to see it full size. <span class='material-icons-outlined align-middle'>auto_awesome</span>",
        websites: "A couple of sites I built. <span class='material-icons-outlined align-middle'>spa</span>",
        certificates: "Click a folder to open a certificate. <span class='material-icons-outlined align-middle'>computer</span>",
        wisdom: "Water the plants to see what's inside each one. <span class='material-icons-outlined align-middle'>grass</span>",
        contact: "Say hello if you want to work together. <span class='material-icons-outlined align-middle'>favorite</span>"
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

const WEB3FORMS_KEY = '7cedf946-821c-462b-abe0-8c888a0d19d1';

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    
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

        
        if (!sent) {
            const mailtoLink = `mailto:constancadcunha@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
            window.open(mailtoLink, '_blank');
            sent = true; 
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

function initAboutParticles() {
    const container = document.getElementById('aboutParticles');
    if (!container) return;

    const colors = ['#9CAF88', '#E8C07D', '#B8A9C9', '#D4A5A5', '#A8C5D9'];
    
    
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

function initSkillWatering() {
    document.querySelectorAll('.skill-greenhouse').forEach(gh => {
        gh.addEventListener('click', () => {
            
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

            
            const icon = gh.querySelector('.material-icons-outlined');
            if (icon) {
                icon.style.transform = 'scale(1.4)';
                icon.style.color = '#A8C5D9';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                    icon.style.color = '';
                }, 350);
            }

            
            gh.classList.add('watered');
            setTimeout(() => gh.classList.remove('watered'), 650);
        });
    });
}

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

function initWebsiteSignals() {
    
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
        
        const rings = document.createElement('div');
        rings.className = 'signal-rings';
        rings.innerHTML = '<div class="signal-ring"></div><div class="signal-ring signal-ring-2"></div><div class="signal-ring signal-ring-3"></div>';
        card.appendChild(rings);

        
        const live = document.createElement('div');
        live.className = 'site-live-badge';
        live.textContent = '● LIVE';
        card.appendChild(live);

        
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

let certWindowInMonitor = false;
let certWindowRaf = null;

function positionCertWindowInMonitor() {
    const win = document.getElementById('osWindow');
    const monitorScreen = document.querySelector('.cottage-monitor-screen');
    const backdrop = document.getElementById('osBackdrop');
    if (!win || !monitorScreen || !backdrop || win.classList.contains('hidden') || !certWindowInMonitor) return;

    const screenW = monitorScreen.clientWidth;
    const screenH = monitorScreen.clientHeight;
    const menubarH = 24;
    const pad = 12;

    const usableH = Math.max(220, screenH - menubarH - pad * 2);
    const winW = Math.min(520, Math.max(300, Math.round(screenW * 0.78)));
    const winH = Math.min(440, Math.max(230, Math.round(usableH * 0.74)));
    const left = Math.max(pad, Math.round((screenW - winW) / 2));
    const top = menubarH + Math.max(pad, Math.round((usableH - winH) / 2));

    Object.assign(backdrop.style, {
        position: 'absolute',
        top: menubarH + 'px',
        left: '0',
        bottom: 'auto',
        right: 'auto',
        width: '100%',
        height: `calc(100% - ${menubarH}px)`,
        borderRadius: '0 0 0.6rem 0.6rem',
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(2px)',
        zIndex: '20'
    });

    Object.assign(win.style, {
        position: 'absolute',
        transform: 'none',
        top: top + 'px',
        left: left + 'px',
        width: winW + 'px',
        maxHeight: winH + 'px',
        overflowY: 'auto',
        zIndex: '30'
    });
}

function scheduleCertWindowPosition() {
    if (!certWindowInMonitor) return;
    if (certWindowRaf !== null) return;
    certWindowRaf = requestAnimationFrame(() => {
        certWindowRaf = null;
        positionCertWindowInMonitor();
    });
}

function openCertWindow(idx) {
    const cert = CERT_DATA[idx];
    if (!cert) return;

    
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
        if (backdrop.parentElement !== monitorScreen) monitorScreen.appendChild(backdrop);
        if (win.parentElement !== monitorScreen) monitorScreen.appendChild(win);
        certWindowInMonitor = true;
        positionCertWindowInMonitor();
        win.classList.add('in-monitor');
    } else {
        if (backdrop.parentElement !== document.body) document.body.appendChild(backdrop);
        if (win && win.parentElement !== document.body) document.body.appendChild(win);
        certWindowInMonitor = false;
        
        Object.assign(backdrop.style, {
            position: 'fixed',
            top: '0', left: '0', bottom: '0', right: '0',
            width: '', height: '', borderRadius: '0',
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)',
            zIndex: '9499'
        });
        Object.assign(win.style, {
            position: 'fixed',
            transform: 'translate(-50%,-50%)',
            top: '50%', left: '50%',
            width: 'min(520px, 92vw)',
            maxHeight: '', overflowY: '',
            zIndex: '9500'
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

    
    win.style.animation = 'none';
    win.offsetHeight; 
    win.style.animation = '';

    win.classList.remove('hidden');
    playWhimsicalSound();
}

function closeCertWindow() {
    const win = document.getElementById('osWindow');
    if (win) win.classList.add('hidden');
    const bd = document.getElementById('osBackdrop');
    if (bd) bd.style.display = 'none';
    certWindowInMonitor = false;
}

window.addEventListener('scroll', scheduleCertWindowPosition, { passive: true });
window.addEventListener('resize', scheduleCertWindowPosition);

function initCameraWidget() {
    const widget = document.getElementById('cameraWidget');
    if (!widget) return;

    let hasShot = false;

    
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

    
    if (polaroid.classList.contains('photo-ejected')) {
        cameraIsAnimating = true;
        polaroid.classList.remove('photo-ejected');
        polaroid.classList.add('photo-retracting');
        
        const img = polaroid.querySelector('img');
        if (img) { img.style.animation = 'none'; img.offsetHeight; img.style.animation = ''; }
        setTimeout(() => {
            polaroid.classList.remove('photo-retracting');
            cameraIsAnimating = false;
            
            fireShutter(body, polaroid, hint);
        }, 300);
        return;
    }

    fireShutter(body, polaroid, hint);
}

function fireShutter(body, polaroid, hint) {
    cameraIsAnimating = true;

    
    body.classList.add('shooting');
    setTimeout(() => body.classList.remove('shooting'), 300);

    
    setTimeout(() => {
        
        polaroid.classList.remove('photo-ejected', 'photo-retracting');
        polaroid.offsetHeight; 
        polaroid.classList.add('photo-ejected');
        if (hint) hint.textContent = 'Click to take another!';
        cameraIsAnimating = false;
    }, 280);

    playWhimsicalSound();
}

function initFlowerPots() {
    const pots = document.querySelectorAll('.flower-pot-card');
    if (!pots.length) return;

    
    const bloomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
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

function initJourneyFireflies() {
    const container = document.getElementById('journeyFireflies');
    if (!container) return;

    
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

function initGardenButterflies() {
    const butterflies = document.querySelectorAll('.garden-butterfly');
    if (!butterflies.length) return;

    butterflies.forEach((bf, i) => {
        
        bf.style.animationDuration = (7 + i * 3 + Math.random() * 4) + 's';
        bf.style.animationDelay = (i * 2.5) + 's';
        
        const section = document.getElementById('wisdom');
        if (section) {
            bf.style.left = (10 + Math.random() * 75) + '%';
            bf.style.top = (15 + Math.random() * 50) + '%';
        }
    });
}

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
        setTimeout(() => canBtn.classList.remove('watering'), 1650);
    }

    
    potEl.classList.add('bloomed', 'watered');

    
    for (let i = 0; i < 9; i++) {
        setTimeout(() => {
            const drop = document.createElement('div');
            drop.className = 'garden-water-drop';
            drop.style.left = (12 + Math.random() * 22) + '%';
            drop.style.top = '-4px';
            plantArea.appendChild(drop);
            setTimeout(() => drop.remove(), 750);
        }, 680 + i * 60);
    }

    
    const data = GARDEN_SKILLS[potIdx];
    if (!data) return;

    data.skills.forEach((skill, i) => {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.className = 'flying-skill-petal';
            petal.textContent = skill;
            petal.style.setProperty('--color', data.colors[i % data.colors.length]);

            
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
                    
                    requestAnimationFrame(() => requestAnimationFrame(() => chip.classList.add('visible')));
                }, i * 90);
            });
        }, settlDelay);
    }
}

function initJourneyInteractions() {
    const cards = document.querySelectorAll('.tl-card');
    cards.forEach((card) => {
        let ticking = false;
        card.addEventListener('mousemove', (event) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const rotateX = ((event.clientY - centerY) / (rect.height / 2)) * -5;
                    const rotateY = ((event.clientX - centerX) / (rect.width / 2)) * 5;
                    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateY(-3px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
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

var currentJourneyChapter = 0;
var _postcardFlipping = false;

function _updateCounter(idx) {
    var pips = document.querySelectorAll('.jflip-card');
    pips.forEach(function(p, i) {
        p.classList.toggle('active', i === idx);
        p.setAttribute('aria-selected', i === idx ? 'true' : 'false');
    });
}

function gotoChapter(idx) {
    if (idx < 0 || idx > 4) return;
    if (idx === currentJourneyChapter || _postcardFlipping) return;

    _postcardFlipping = true;

    var tabs   = document.querySelectorAll('.jchap-tab');
    var panels = document.querySelectorAll('.jchap-panel');
    var fromPanel = panels[currentJourneyChapter];
    var toPanel   = panels[idx];
    var dir = idx > currentJourneyChapter ? 1 : -1;

    
    var g1 = document.querySelector('.pc-ghost-1');
    var g2 = document.querySelector('.pc-ghost-2');
    if (g1) { g1.classList.remove('shuffle'); void g1.offsetWidth; g1.classList.add('shuffle'); }
    if (g2) { g2.classList.remove('shuffle'); void g2.offsetWidth; g2.classList.add('shuffle'); }

    
    var fromCard = fromPanel ? fromPanel.querySelector('.pc-card') : null;
    if (fromCard) {
        fromCard.classList.remove('js-tilt-active');
    }

    
    if (fromCard) {
        fromCard.style.transition = 'transform 0.18s cubic-bezier(0.4, 0, 1, 1), opacity 0.15s ease-in';
        fromCard.style.transform  = 'translateX(' + (dir * -48) + 'px) scale(0.94)';
        fromCard.style.opacity    = '0';
    }

    setTimeout(function() {
        
        panels.forEach(function(p, i) { p.classList.toggle('active', i === idx); });
        tabs.forEach(function(t, i)   { t.classList.toggle('active', i === idx); });
        currentJourneyChapter = idx;
        _updateCounter(idx);

        
        var toCard = toPanel ? toPanel.querySelector('.pc-card') : null;
        if (toCard) {
            toCard.style.transition = 'none';
            toCard.style.transform  = 'translateX(' + (-dir * 48) + 'px) scale(0.94)';
            toCard.style.opacity    = '0';

            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    toCard.style.transition = 'transform 0.28s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease';
                    toCard.style.transform  = '';
                    toCard.style.opacity    = '1';

                    
                    var pm = toPanel ? toPanel.querySelector('.pc-postmark') : null;
                    if (pm) {
                        pm.classList.remove('stamping');
                        void pm.offsetWidth;
                        setTimeout(function() { pm.classList.add('stamping'); }, 140);
                    }

                    setTimeout(function() {
                        
                        toCard.style.transition = '';
                        toCard.style.transform  = '';
                        toCard.style.opacity    = '';
                        toCard.classList.add('js-tilt-active');
                        _postcardFlipping = false;
                        typewriteQuote(toPanel);
                    }, 200);
                });
            });
        } else {
            _postcardFlipping = false;
        }
    }, 160);
}

function flipToChapter(idx) { gotoChapter(idx); }
function toggleJourneyChapter(idx) {}

var _twTimer = null;

function typewriteQuote(panel) {
    
    if (_twTimer) { clearTimeout(_twTimer); _twTimer = null; }

    var quote = panel ? panel.querySelector('.pc-quote') : null;
    if (!quote) return;

    
    var full = quote.getAttribute('data-full');
    if (!full) {
        full = quote.textContent.trim();
        quote.setAttribute('data-full', full);
    }

    
    quote.innerHTML = '<span class="pc-tw-text"></span><span class="pc-cursor" aria-hidden="true">|</span>';
    var textEl  = quote.querySelector('.pc-tw-text');
    var cursor  = quote.querySelector('.pc-cursor');

    function tick(i) {
        textEl.textContent = full.slice(0, i);
        if (i >= full.length) {
            _twTimer = null;
            setTimeout(function() { if (cursor) cursor.classList.add('pc-cursor-done'); }, 520);
            return;
        }
        
        var justTyped = i > 0 ? full[i - 1] : '';
        var delay = (justTyped === '.' || justTyped === '!') ? 190 :
                    (justTyped === ',') ? 70 :
                    18 + Math.floor(Math.random() * 10);
        _twTimer = setTimeout(function() { tick(i + 1); }, delay);
    }

    
    _twTimer = setTimeout(function() { tick(1); }, 80);
}

function initStoryBook() {

    
    document.addEventListener('keydown', function(e) {
        var panels = document.getElementById('jchapPanels');
        if (!panels) return;
        var rect = panels.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault(); gotoChapter(currentJourneyChapter + 1);
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault(); gotoChapter(currentJourneyChapter - 1);
        }
    });

    
    var panelsEl = document.getElementById('jchapPanels');
    if (panelsEl) {
        var _touchX = 0, _touchY = 0;
        panelsEl.addEventListener('touchstart', function(e) {
            _touchX = e.changedTouches[0].clientX;
            _touchY = e.changedTouches[0].clientY;
        }, { passive: true });
        panelsEl.addEventListener('touchend', function(e) {
            var dx = e.changedTouches[0].clientX - _touchX;
            var dy = e.changedTouches[0].clientY - _touchY;
            
            if (Math.abs(dx) < 38 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
            if (dx < 0) gotoChapter(currentJourneyChapter + 1);
            else        gotoChapter(currentJourneyChapter - 1);
        }, { passive: true });
    }

    
    if (panelsEl) {
        var _drag = { on: false, startX: 0, lastX: 0 };

        panelsEl.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return;
            if (e.target.closest && e.target.closest('.pc-ghost')) return;
            if (_postcardFlipping) return;
            _drag.on = true;
            _drag.startX = e.clientX;
            _drag.lastX  = e.clientX;
            e.preventDefault(); 
        });

        document.addEventListener('mousemove', function(e) {
            if (!_drag.on || _postcardFlipping) return;
            _drag.lastX = e.clientX;

            var panel = document.querySelector('.jchap-panel.active');
            var card  = panel ? panel.querySelector('.pc-card') : null;
            if (!card) return;

            var dx = e.clientX - _drag.startX;

            
            var atEdge = (dx < 0 && currentJourneyChapter >= 4) || (dx > 0 && currentJourneyChapter <= 0);
            var pull  = dx * (atEdge ? 0.12 : 0.38);
            var tilt  = dx * 0.016;
            var fade  = 1 - Math.min(Math.abs(dx) / 350, 0.32);

            card.style.transition = 'none';
            card.style.transform  = 'translateX(' + pull + 'px) rotate(' + tilt + 'deg)';
            card.style.opacity    = String(Math.max(0.68, fade));
        });

        document.addEventListener('mouseup', function() {
            if (!_drag.on) return;
            _drag.on = false;

            var panel = document.querySelector('.jchap-panel.active');
            var card  = panel ? panel.querySelector('.pc-card') : null;
            var dx = _drag.lastX - _drag.startX;

            if (Math.abs(dx) > 78 && !_postcardFlipping) {
                
                if (dx < 0) gotoChapter(currentJourneyChapter + 1);
                else        gotoChapter(currentJourneyChapter - 1);
            } else {
                
                if (card) {
                    card.style.transition = 'transform 0.46s cubic-bezier(0.25,1,0.5,1), opacity 0.3s ease';
                    card.style.transform  = '';
                    card.style.opacity    = '';
                    setTimeout(function() {
                        card.style.transition = '';
                        card.style.transform  = '';
                        card.style.opacity    = '';
                    }, 460);
                }
            }
        });
    }

    
    setTimeout(function() {
        var firstPanel = document.getElementById('jpanel-0');
        if (firstPanel) {
            typewriteQuote(firstPanel);
            var firstCard = firstPanel.querySelector('.pc-card');
            if (firstCard) firstCard.classList.add('js-tilt-active');
        }
    }, 550);

    
    if (panelsEl) {
        panelsEl.addEventListener('mousemove', function(e) {
            if (_postcardFlipping || _drag.on) return;
            var panel = document.querySelector('.jchap-panel.active');
            var card  = panel ? panel.querySelector('.pc-card') : null;
            if (!card || !card.classList.contains('js-tilt-active')) return;

            var rect = card.getBoundingClientRect();
            var cx = rect.left + rect.width  / 2;
            var cy = rect.top  + rect.height / 2;
            var nx = (e.clientX - cx) / (rect.width  / 2);  
            var ny = (e.clientY - cy) / (rect.height / 2);  

            var maxTilt = 6;
            var rx =  ny * maxTilt * -1;  
            var ry =  nx * maxTilt;       

            card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
            card.style.transform  = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(6px)';
            card.style.boxShadow  =
                '0 ' + (20 + Math.abs(ny) * 16) + 'px ' + (55 + Math.abs(ny) * 24) + 'px rgba(0,0,0,' + (0.38 + Math.abs(ny) * 0.1) + '),' +
                '0 ' + (4  + Math.abs(ny) * 6)  + 'px 16px rgba(0,0,0,0.2),' +
                'inset 0 1px 0 rgba(255,255,255,0.72)';
        });

        panelsEl.addEventListener('mouseleave', function() {
            var panel = document.querySelector('.jchap-panel.active');
            var card  = panel ? panel.querySelector('.pc-card') : null;
            if (!card) return;
            card.style.transition = 'transform 0.55s cubic-bezier(0.25,1,0.5,1), box-shadow 0.55s ease';
            card.style.transform  = '';
            card.style.boxShadow  = '';
        });
    }
}

let _bookAnimating = false;

function initCredBook() {
    const book = document.getElementById('credBook');
    if (book) book.classList.add('book-is-closed');
    _updateBookZIndices();
    
    
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
            
            page.style.zIndex = (i + 1) * 5;
        } else {
            
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
    
    const lastContentIdx = pages.length - 2;

    const isFlipped = page.classList.contains('flipped');

    if (!isFlipped) {
        
        for (let i = 0; i < idx; i++) {
            if (!pages[i].classList.contains('flipped')) return;
        }
        _bookAnimating = true;
        page.style.zIndex = 999;
        page.classList.add('flipped');
        
        if (idx === 0) book.classList.remove('book-is-closed');
        
        if (idx === lastContentIdx) {
            setTimeout(() => {
                book.classList.add('book-is-closed-back');
            }, 550);
        }
        setTimeout(() => { _bookAnimating = false; _updateBookZIndices(); }, 1020);
    } else {
        
        let lastFlipped = -1;
        pages.forEach((p, i) => { if (p.classList.contains('flipped')) lastFlipped = i; });
        if (idx !== lastFlipped) return;
        _bookAnimating = true;
        page.style.zIndex = 999;
        page.classList.remove('flipped');
        
        if (idx === 0) book.classList.add('book-is-closed');
        
        if (idx === lastContentIdx) book.classList.remove('book-is-closed-back');
        setTimeout(() => { _bookAnimating = false; _updateBookZIndices(); }, 1020);
    }
}

function toggleWebsite(idx) {
    const study = document.getElementById('web-study-' + idx);
    const card  = document.getElementById('web-card-'  + idx);
    if (!study) return;

    const isOpen = study.classList.contains('open');

    
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

let currentIpodIndex = 0;
let ipodInDetailView = false;

const credentialData = [
    {
        title: "M.Sc. Computer Science",
        subtitle: "Interaction & Visualization (2024–Present)",
        description: "Master's degree at Instituto Superior Técnico specializing in interaction design, data visualization techniques, and human-computer interaction."
    },
    {
        title: "B.Sc. Computer Science",
        subtitle: "Instituto Superior Técnico (2020–2024)",
        description: "Bachelor's degree in Computer Science, building a strong foundation in software engineering, algorithms, and system design."
    },
    {
        title: "Portuguese",
        subtitle: "Native Speaker",
        description: "Native fluency in Portuguese with deep cultural understanding and professional communication skills."
    },
    {
        title: "English",
        subtitle: "C2 Level - Cambridge Proficiency",
        description: "Advanced English proficiency certification demonstrating mastery of the English language at the highest level."
    },
    {
        title: "French",
        subtitle: "B2 Level",
        description: "Upper-intermediate French proficiency with strong reading, writing, and conversational abilities."
    },
    {
        title: "Spanish",
        subtitle: "B1 Level",
        description: "Intermediate Spanish proficiency enabling effective communication in familiar contexts."
    },
    {
        title: "WebSummit Volunteer",
        subtitle: "2023",
        description: "Volunteered at one of Europe's largest tech conferences, supporting event operations and attendee experience."
    },
    {
        title: "ReFood Volunteer",
        subtitle: "2016–2020",
        description: "Reduced food waste and redistributed meals to families in need. Sorted, organized, and prepared food donations in collaboration with volunteer teams."
    },
    {
        title: "Banco Alimentar Volunteer",
        subtitle: "2012–2020",
        description: "Long-term volunteer commitment across multiple national campaigns, supporting large-scale food collection and distribution initiatives for families facing food insecurity."
    },
    {
        title: "Ballet Teacher Assistant",
        subtitle: "Dance Academy (2015–2019)",
        description: "Assisted in ballet instruction and class coordination. Supported choreography planning and live performances while mentoring young dancers in technique and discipline."
    }
];

function updateIpodMenu() {
    const menu = document.getElementById('ipodMenu');
    const items = document.querySelectorAll('.ipod-menu-item');
    
    items.forEach((item, idx) => {
        if (idx === currentIpodIndex) {
            item.classList.add('active');
            
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

function updateIpodTime() {
    const timeEl = document.getElementById('ipodTime');
    if (timeEl) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeEl.textContent = `${hours}:${minutes}`;
    }
}

function updateIpodBattery() {
    const batteryEl = document.getElementById('batteryLevel');
    if (batteryEl && 'getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            const level = Math.round(battery.level * 100);
            batteryEl.style.width = `${level}%`;
            
            
            if (level > 50) {
                batteryEl.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
            } else if (level > 20) {
                batteryEl.style.background = 'linear-gradient(90deg, #FFC107, #FFD54F)';
            } else {
                batteryEl.style.background = 'linear-gradient(90deg, #F44336, #E57373)';
            }
            
            
            battery.addEventListener('levelchange', () => updateIpodBattery());
        });
    }
}

function updateIpodInternet() {
    const wifiEl = document.getElementById('ipodWifi');
    if (wifiEl) {
        const online = navigator.onLine;
        wifiEl.style.opacity = online ? '1' : '0.3';
        wifiEl.title = online ? 'Connected' : 'Offline';
    }
}

function initIpodClickHandlers() {
    const menuItems = document.querySelectorAll('.ipod-menu-item');
    menuItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            if (!ipodInDetailView) {
                currentIpodIndex = index;
                updateIpodMenu();
                showIpodDetail();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateIpodMenu();
    updateIpodTime();
    updateIpodBattery();
    updateIpodInternet();
    initIpodClickHandlers();
    
    
    setInterval(updateIpodTime, 60000);
    
    
    window.addEventListener('online', updateIpodInternet);
    window.addEventListener('offline', updateIpodInternet);
});

function toggleMobileNav() {
    const btn = document.getElementById('navHamburger');
    const overlay = document.getElementById('mobileNavOverlay');
    const nav = document.querySelector('nav');
    if (!btn || !overlay) return;
    
    if (nav) nav.classList.remove('nav-scrolled-hidden');
    const isOpen = overlay.classList.contains('open');
    btn.classList.toggle('open');
    overlay.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeMobileNav() {
    const btn = document.getElementById('navHamburger');
    const overlay = document.getElementById('mobileNavOverlay');
    if (btn) btn.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
}

(function() {
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const nav = document.querySelector('nav');
            if (!nav) { ticking = false; return; }

            if (window.innerWidth <= 900) {
                
                if (currentScrollY > lastScrollY && currentScrollY > 80) {
                    nav.classList.add('nav-scrolled-hidden');
                } else {
                    
                    nav.classList.remove('nav-scrolled-hidden');
                }
            } else {
                nav.classList.remove('nav-scrolled-hidden');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        });
        ticking = true;
    }, { passive: true });
})();
