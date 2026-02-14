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
    initGrowingTree();
    initStatCounters();
    initAboutParticles();
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
            if (entry.isIntersecting) entry.target.classList.add('visible');
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
            start: "top 75%",
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
        certificates: "Hover on a certificate to peek behind it! <span class='material-icons-outlined align-middle'>verified</span>",
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
        museumSection.addEventListener('mousemove', (e) => {
            museumSpotlight.style.opacity = '1';
            museumSpotlight.style.left = e.clientX + 'px';
            museumSpotlight.style.top = e.clientY + 'px';
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
// FIX #9: CONTACT FORM - EmailJS Integration
// =================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY'); // <-- REPLACE with your EmailJS public key
    }

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

        // Method 1: Try EmailJS (if configured)
        if (typeof emailjs !== 'undefined') {
            try {
                await emailjs.send(
                    'YOUR_SERVICE_ID',  // <-- REPLACE with your EmailJS service ID
                    'YOUR_TEMPLATE_ID', // <-- REPLACE with your EmailJS template ID
                    {
                        from_name: name,
                        from_email: email,
                        message: message,
                        to_email: 'constancadcunha@gmail.com'
                    }
                );
                sent = true;
            } catch (err) {
                console.log('EmailJS failed, trying Formspree...', err);
            }
        }

        // Method 2: Fallback to Formspree
        if (!sent) {
            try {
                const response = await fetch('https://formspree.io/f/xaygoyze', {
                    method: 'POST',
                    body: JSON.stringify({ name, email, message }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    sent = true;
                } else {
                    const data = await response.json();
                    console.error('Formspree error:', data);
                }
            } catch (error) {
                console.error('Formspree fetch error:', error);
            }
        }

        if (sent) {
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            playWhimsicalSound();
            if (typeof confetti === 'function') {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
        } else {
            formMessage.textContent = 'Oops! Something went wrong. Please try again or email me directly at constancadcunha@gmail.com';
            formMessage.className = 'form-message error';
        }

        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;

        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
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
// GROWING TREE (Enhancement #8)
// =================================

function initGrowingTree() {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;

    const treeSvg = document.getElementById('growingTree');
    if (!treeSvg) return;

    const timelineItems = document.querySelectorAll('.timeline-item[data-tree-stage]');
    let currentStage = 0;

    const treeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stage = parseInt(entry.target.dataset.treeStage);
                if (stage > currentStage) {
                    currentStage = stage;
                }
                // Apply the highest stage reached
                treeSvg.classList.remove('tree-stage-1', 'tree-stage-2', 'tree-stage-3');
                treeSvg.classList.add(`tree-stage-${currentStage}`);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => treeObserver.observe(item));
}

// =================================
// STAT COUNTERS (Enhancement #8)
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
    
    for (let i = 0; i < 12; i++) {
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