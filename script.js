// =================================
// INITIALIZATION
// =================================

// Initialize Lucide icons
lucide.createIcons();

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// =================================
// WHIMSICAL SOUND
// =================================

const whimsicalSound = document.getElementById('whimsicalSound');
whimsicalSound.volume = 0.3;

function playWhimsicalSound() {
    if (whimsicalSound.paused) {
        whimsicalSound.currentTime = 0;
        whimsicalSound.play().catch(e => console.log("Audio play failed:", e));
    }
}

// Play sound on first interaction
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

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.getElementById("progressBar").style.width = scrollPercent + "%";
});

// =================================
// HERO ANIMATIONS
// =================================

window.addEventListener('load', () => {
    gsap.to('#heroSubtitle', { opacity: 1, duration: 1, delay: 0.3 });
    gsap.to('#heroName1', { opacity: 1, duration: 1, delay: 0.5 });
    gsap.to('#heroName2', { opacity: 1, duration: 1, delay: 0.7 });
    gsap.to('#badge1', { opacity: 1, duration: 0.6, delay: 0.9 });
    gsap.to('#badge2', { opacity: 1, duration: 0.6, delay: 1.1 });
    gsap.to('#badge3', { opacity: 1, duration: 0.6, delay: 1.3 });
    gsap.to('#scrollHint', { opacity: 1, duration: 1, delay: 1.6 });
});

// =================================
// REVEAL SECTIONS ON SCROLL
// =================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '-30px' });

document.querySelectorAll('.reveal-section').forEach(s => revealObserver.observe(s));

// =================================
// STUDIO IPHONE FUNCTIONALITY
// =================================

const projectEntries = document.querySelectorAll('.project-entry');
const viewportImg = document.getElementById('viewportImg');
const iphoneWrapper = document.getElementById('iphoneWrapper');
const iphoneFixed = document.getElementById('iphoneFixed');
const archiveProject = document.getElementById('archive-project');

// Hide iPhone initially
iphoneFixed.style.display = 'none';

// Preload debug image for phone
const debugImage = new Image();
debugImage.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

// Create a ScrollTrigger for the entire studio section
ScrollTrigger.create({
    trigger: '#studio',
    start: 'top 40%',
    end: 'bottom bottom',
    onEnter: () => {
        // When entering studio section, show iPhone for first non-archive project
        const firstNonArchive = document.querySelector('.project-entry:not(#archive-project)');
        if (firstNonArchive) {
            updatePhone(firstNonArchive);
            iphoneFixed.style.display = 'block';
            iphoneFixed.style.opacity = '1';
        }
    },
    onLeaveBack: () => {
        // When scrolling back up out of studio, hide iPhone immediately
        iphoneFixed.style.opacity = '0';
        setTimeout(() => {
            iphoneFixed.style.display = 'none';
        }, 200);
    }
});

// Create observers for all project entries except archive
projectEntries.forEach(entry => {
    if (entry !== archiveProject) {
        ScrollTrigger.create({
            trigger: entry,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => updatePhone(entry),
            onEnterBack: () => updatePhone(entry),
            onLeave: () => {
                // When leaving a project, check if next is archive
                if (entry.nextElementSibling && entry.nextElementSibling.id === 'archive-project') {
                    iphoneFixed.style.opacity = '0';
                    setTimeout(() => {
                        iphoneFixed.style.display = 'none';
                    }, 200);
                }
            }
        });
    }
});

// Special observer for archive project to hide iPhone immediately
if (archiveProject) {
    ScrollTrigger.create({
        trigger: archiveProject,
        start: "top 75%",
        onEnter: () => {
            iphoneFixed.style.opacity = '0';
            setTimeout(() => {
                iphoneFixed.style.display = 'none';
            }, 200);
        },
        onLeaveBack: () => {
            // When scrolling back up from archive, show iPhone for previous project
            const prevProject = archiveProject.previousElementSibling;
            if (prevProject && prevProject.classList.contains('project-entry')) {
                updatePhone(prevProject);
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

    // Show iPhone with simple transition
    iphoneFixed.style.display = 'block';
    iphoneFixed.style.opacity = '1';

    // Simple image transition
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

// =================================
// IMAGE MODAL
// =================================

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

document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('imageModal')) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// =================================
// DIALOGUE SYSTEM
// =================================

const dialogueMap = {
    hero: "Welcome to my garden of designs. Pull up a chair and stay a while. <span class='material-icons-outlined align-middle'>eco</span>",
    about: "Based in Lisbon, but my roots can grow anywhere in the world. <span class='material-icons-outlined align-middle'>public</span>",
    artifacts: "Three years of professional growth—from conferences to startups. <span class='material-icons-outlined align-middle'>grass</span>",
    studio: "Scroll through my case studies! Watch the phone change with each project. <span class='material-icons-outlined align-middle'>phone_iphone</span>",
    designs: "Click any piece to see it full size! Each one tells a story. <span class='material-icons-outlined align-middle'>auto_awesome</span>",
    websites: "Websites I've nurtured from seedlings to full bloom. <span class='material-icons-outlined align-middle'>spa</span>",
    certificates: "Formal recognition of skills and knowledge acquired. <span class='material-icons-outlined align-middle'>verified</span>",
    wisdom: "Skills cultivated through years of practice and curiosity. <span class='material-icons-outlined align-middle'>grass</span>",
    contact: "Let's grow something beautiful together! <span class='material-icons-outlined align-middle'>favorite</span>"
};

const dialogueContainer = document.getElementById('dialogueContainer');
const dialogueText = document.getElementById('dialogueText');
let isDialogueVisible = true;

function updateDialogue(text) {
    if (isDialogueVisible) {
        dialogueText.innerHTML = text;
        dialogueContainer.classList.remove('hidden');
    }
}

function dismissDialogue() {
    isDialogueVisible = false;
    dialogueContainer.classList.add('hidden');
}

const dialogueObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && isDialogueVisible && dialogueMap[entry.target.id]) {
            updateDialogue(dialogueMap[entry.target.id]);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section, footer').forEach(s => dialogueObserver.observe(s));

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            isDialogueVisible = true;
        }, 100);
    });
});

// =================================
// THEME TOGGLE
// =================================

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    lucide.createIcons();
    playWhimsicalSound();
}

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

// =================================
// MUSEUM GALLERY CONTROLS
// =================================

const galleryTrack = document.getElementById('galleryTrack');
let gallerySpeed = 20;
let isGalleryPaused = false;
const originalSpeed = 20;

if (galleryTrack) {
    galleryTrack.style.animation = `scrollGallery ${gallerySpeed}s linear infinite`;

    // Museum spotlight cursor
    const museumSpotlight = document.getElementById('museum-cursor-spotlight');
    const museumSection = document.getElementById('designs');

    // Track mouse movement for spotlight
    museumSection.addEventListener('mousemove', (e) => {
        museumSpotlight.style.opacity = '1';
        museumSpotlight.style.left = e.clientX + 'px';
        museumSpotlight.style.top = e.clientY + 'px';
    });

    museumSection.addEventListener('mouseleave', () => {
        museumSpotlight.style.opacity = '0';
    });

    // Control buttons
    document.getElementById('speedUpBtn').addEventListener('click', () => {
        gallerySpeed = Math.max(5, gallerySpeed - 5);
        if (!isGalleryPaused) {
            galleryTrack.style.animation = `scrollGallery ${gallerySpeed}s linear infinite`;
        }
        playWhimsicalSound();
        showControlFeedback('Speed increased');
    });

    document.getElementById('speedDownBtn').addEventListener('click', () => {
        gallerySpeed = Math.min(60, gallerySpeed + 5);
        if (!isGalleryPaused) {
            galleryTrack.style.animation = `scrollGallery ${gallerySpeed}s linear infinite`;
        }
        playWhimsicalSound();
        showControlFeedback('Speed decreased');
    });

    document.getElementById('pauseBtn').addEventListener('click', () => {
        galleryTrack.style.animationPlayState = 'paused';
        isGalleryPaused = true;
        playWhimsicalSound();
        showControlFeedback('Paused');
    });

    document.getElementById('playBtn').addEventListener('click', () => {
        galleryTrack.style.animationPlayState = 'running';
        isGalleryPaused = false;
        playWhimsicalSound();
        showControlFeedback('Playing');
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        gallerySpeed = originalSpeed;
        galleryTrack.style.animation = `scrollGallery ${gallerySpeed}s linear infinite`;
        galleryTrack.style.animationPlayState = 'running';
        isGalleryPaused = false;
        playWhimsicalSound();
        showControlFeedback('Speed reset');
    });

    galleryTrack.addEventListener('mouseenter', () => {
        if (!isGalleryPaused) {
            galleryTrack.style.animationPlayState = 'paused';
        }
    });

    galleryTrack.addEventListener('mouseleave', () => {
        if (!isGalleryPaused) {
            galleryTrack.style.animationPlayState = 'running';
        }
    });

    function showControlFeedback(message) {
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.position = 'absolute';
        feedback.style.bottom = '70px';
        feedback.style.right = '2rem';
        feedback.style.background = 'rgba(0,0,0,0.8)';
        feedback.style.color = '#C9A96E';
        feedback.style.padding = '0.5rem 1rem';
        feedback.style.borderRadius = '0.5rem';
        feedback.style.fontSize = '0.75rem';
        feedback.style.zIndex = '100';
        feedback.style.border = '1px solid rgba(201, 169, 110, 0.5)';
        document.querySelector('.museum-section').appendChild(feedback);

        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(10px)';
            feedback.style.transition = 'all 0.2s ease';
            setTimeout(() => feedback.remove(), 200);
        }, 1000);
    }
}

// =================================
// CONTACT FORM
// =================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    // Ensure form inputs are clickable
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
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

        // Get form data
        const formData = new FormData(contactForm);

        try {
            // Send to Formspree
            const response = await fetch('https://formspree.io/f/xaygoyze', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                formMessage.className = 'form-message success';
                contactForm.reset();

                // Play celebration sound/effect
                playWhimsicalSound();
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = 'Oops! Something went wrong. Please try again or email me directly at constancadcunha@gmail.com';
            formMessage.className = 'form-message error';
        } finally {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }
    });
}

// =================================
// SMOOTH SCROLL
// =================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        playWhimsicalSound();
    });
});

// =================================
// SCROLL TRIGGER MANAGEMENT
// =================================

let scrollTriggers = [];

function initScrollTriggers() {
    // Clean up any existing triggers
    scrollTriggers.forEach(trigger => {
        if (trigger && trigger.kill) trigger.kill();
    });
    scrollTriggers = [];
}

// Re-initialize on window resize (with debounce)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initScrollTriggers();
    }, 250);
});

// =================================
// INITIALIZE DIALOGUE
// =================================

updateDialogue(dialogueMap.hero);