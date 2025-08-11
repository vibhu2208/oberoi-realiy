// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize loader animation first
    initLoaderAnimation();
    
    // Initialize navbar scroll effects
    initNavbarScrollEffect();
    
    // Initialize all animations
    initHighlightsAnimation();
    initAmenitiesCategoriesAnimation();
    
    // Initialize dynamic logo switching
    initDynamicLogoSwitching();
    
    // Initialize luxury contact form
    initLuxuryContactForm();
    
    // Initialize schedule visit popup
    initScheduleVisitPopup();
    
    // Make sure main content is visible
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.style.visibility = 'visible';
        mainContent.style.opacity = '1';
    }
});

// Navbar scroll effect for transparency and stickiness
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar-header');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Add/remove scrolled class based on scroll position
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    

}

function initLoaderAnimation() {
    // Get DOM elements
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('main-content');
    
    // If no loader found, show main content immediately
    if (!loader) {
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.visibility = 'visible';
        }
        return;
    }
    
    // Other elements
    const loaderContent = document.querySelector('.loader-content');
    const line1 = document.querySelector('.line-1');
    const line2 = document.querySelector('.line-2');
    const subline = document.querySelector('.subline');
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    const underline = document.querySelector('.loader-underline');
    const logo = document.querySelector('.logo');
    const loaderLogo = document.querySelector('.loader-logo');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const fluidBackground = document.querySelector('.fluid-background');
    
    // Create a timeline for the loader animation sequence
    const loaderTimeline = gsap.timeline({
        onComplete: () => {
            // Auto-hide loader immediately once the intro animation finishes
            if (!loader.classList.contains('hidden')) {
                hideLoader();
            }
        }
    });
    
    // Set initial states
    gsap.set([loaderContent], {
        opacity: 0,
        scale: 0.95
    });
    
    gsap.set([line1, line2, subline], {
        opacity: 0,
        y: 30
    });
    
    gsap.set(underline, {
        width: 0
    });
    
    gsap.set(logo, {
        opacity: 0,
        scale: 0.9
    });
    
    // Set initial state for loader logo
    if (loaderLogo) {
        gsap.set(loaderLogo, {
            opacity: 0,
            scale: 0.8
        });
    }
    
    gsap.set(scrollIndicator, {
        opacity: 0,
        y: 20
    });
    
    gsap.set(fluidBackground, {
        opacity: 0
    });
    
    // The text to be typed
    const textToType = "Crafting timeless experiences in Gurgaon's heart.";
    
    // Start with fade-in effect for the entire loader content
    loaderTimeline.to(loaderContent, {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        ease: "power2.out"
    })
    
    // Animate line 1
    .to(line1, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: "power2.out"
    }, "-=0.4")
    
    // Animate line 2 with slight delay
    .to(line2, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: "power2.out"
    }, "-=0.4")
    
    // Animate subline container
    .to(subline, {
        duration: 0.3,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        onComplete: () => {
            // Start typing effect
            startTypingEffect(typingText, textToType, cursor);
        }
    }, "-=0.3")
    
    // Animate underline with glow effect
    .to(underline, {
        duration: 0.8,
        width: "200px",
        ease: "power2.out"
    }, "-=0.2")
    
    // Add a subtle glow animation to the underline
    .to(underline, {
        duration: 1,
        boxShadow: "0 0 30px rgba(232, 195, 114, 0.8)",
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1
    }, "-=0.8")
    
    // Step 3: Logo Fade-In
    .to(logo, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out"
    }, "+=0.5")
    
    // Animate loader logo if it exists
    .to(loaderLogo, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
    }, "-=1")
    
    // Step 4: Background Gold Fluid Animation Starts
    .to(fluidBackground, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    
    // Step 5: Scroll Prompt Appears
    .to(scrollIndicator, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");

    // Start floating animation for scroll indicator independently (doesn't affect timeline duration)
    gsap.to(scrollIndicator, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut"
    });
    
    // Function to hide loader and show main content
    function hideLoader() {
        if (!loader) return;
        
        // Fade out loader
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
                if (loader) loader.classList.add('hidden');
                if (mainContent) {
                    mainContent.style.opacity = '1';
                    mainContent.style.visibility = 'visible';
                }
                
                // Enable scrolling
                document.body.classList.add('content-visible');
                document.body.style.overflow = 'auto';
                
                // Initialize main content animations
                if (typeof initMainContentAnimations === 'function') {
                    initMainContentAnimations();
                }
            }
        });
    }
    
    // Removed scroll-to-begin behavior: page now opens automatically after loader
}

function startTypingEffect(element, text, cursorElement) {
    let index = 0;
    const typingSpeed = 5; // milliseconds per character (reduced from 10)
    
    // Show cursor
    gsap.set(cursorElement, { opacity: 1 });
    
    function typeNextChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            
            // Add some randomness to typing speed for more natural effect
            const randomDelay = typingSpeed + Math.random() * 20; // reduced randomness
            setTimeout(typeNextChar, randomDelay);
        } else {
            // Typing complete - keep cursor blinking
            gsap.to(cursorElement, {
                opacity: 1,
                duration: 0.1
            });
        }
    }
    
    // Start typing
    typeNextChar();
}

function initMainContentAnimations() {
    // Animate hero section elements
    const heroContent = document.querySelector('.hero-content-container');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (heroContent) {
        const heroTitle = heroContent.querySelector('h1');
        const heroSubtitle = heroContent.querySelector('p');
        const ctaButton = heroContent.querySelector('.hero-cta-button');
        
        // Set initial states
        gsap.set([heroTitle, heroSubtitle, ctaButton], {
            opacity: 0,
            y: 50
        });
        
        // Create hero animation timeline
        let heroTimeline;
        if (isMobile) {
            // No scroll trigger on mobile; play immediately
            heroTimeline = gsap.timeline();
        } else {
            heroTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: heroContent,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        }
        
        heroTimeline
            .to(heroTitle, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            })
            .to(heroSubtitle, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            }, "-=0.6")
            .to(ctaButton, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            }, "-=0.6");
    }
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    gsap.set(projectCards, {
        opacity: 0,
        y: 50
    });
    
    if (isMobile) {
        gsap.to(projectCards, {
            duration: 1,
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: "power2.out"
        });
    } else {
        gsap.to(projectCards, {
            duration: 1,
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".project-grid",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Animate About Oberoi Realty section
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const aboutSubheading = aboutSection.querySelector('.about-subheading');
        const aboutHeading = aboutSection.querySelector('.about-heading');
        const aboutLines = aboutSection.querySelectorAll('.about-line');
        const aboutCta = aboutSection.querySelector('.about-cta');

        // Animate subheading and heading first
        if (aboutSubheading && aboutHeading) {
            gsap.set([aboutSubheading, aboutHeading], {
                opacity: 0,
                y: 40
            });

            if (isMobile) {
                gsap.fromTo([aboutSubheading, aboutHeading],
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power2.out" }
                );
            } else {
                gsap.fromTo([aboutSubheading, aboutHeading], 
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: aboutSection,
                            start: "top 75%",
                            end: "bottom 25%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            }
        }

        // Animate about lines with stagger
        if (aboutLines.length > 0) {
            gsap.set(aboutLines, { opacity: 0, y: 40 });

            if (isMobile) {
                gsap.fromTo(aboutLines,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, ease: "power2.out" }
                );
            } else {
                gsap.fromTo(aboutLines, 
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.3,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: aboutSection,
                            start: "top 70%",
                            end: "bottom 30%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            }
        }

        // Animate CTA button last
        if (aboutCta) {
            gsap.set(aboutCta, { opacity: 0, y: 40 });

            if (isMobile) {
                gsap.fromTo(aboutCta,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
                );
            } else {
                gsap.fromTo(aboutCta, 
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: aboutSection,
                            start: "top 65%",
                            end: "bottom 35%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            }
        }
    }
    
    // Animate contact section
    const contactItems = document.querySelectorAll('.contact-item');
    
    gsap.set(contactItems, {
        opacity: 0,
        y: 30
    });
    
    if (isMobile) {
        gsap.to(contactItems, {
            duration: 1,
            opacity: 1,
            y: 0,
            stagger: 0.15,
            ease: "power2.out"
        });
    } else {
        gsap.to(contactItems, {
            duration: 1,
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".contact-info",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        });
    });
});

// Initialize Highlights Section Animations
function initHighlightsAnimation() {
    const highlightsSection = document.querySelector('.highlights-section');
    const highlightsTitle = document.querySelector('.highlights-title');
    const featureCards = document.querySelectorAll('.feature-card');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (!highlightsSection || !highlightsTitle || !featureCards.length) {
        console.warn('Highlights section elements not found');
        return;
    }
    
    // Ensure elements are visible by default
    gsap.set(highlightsSection, { visibility: 'visible' });
    gsap.set(highlightsTitle, { opacity: 1, y: 0 });
    gsap.set(featureCards, { opacity: 1, y: 0 });
    
    // Create a timeline for the highlights section
    if (!isMobile) {
        const highlightsTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: highlightsSection,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                onEnter: () => {
                    // Animate background color change from dark to white
                    gsap.to(highlightsSection, {
                        backgroundColor: '#ffffff',
                        duration: 1.2,
                        ease: 'power2.inOut'
                    });
                    
                    // Update text colors for contrast
                    gsap.to(highlightsTitle, {
                        color: '#0e0e0e',
                        duration: 1.2,
                        ease: 'power2.inOut'
                    });
                },
                onLeaveBack: () => {
                    // Revert when scrolling back past
                    gsap.to(highlightsSection, {
                        backgroundColor: '#0e0e0e',
                        duration: 0.8,
                        ease: 'power2.inOut'
                    });
                    
                    gsap.to(highlightsTitle, {
                        color: '#ffffff',
                        duration: 0.8,
                        ease: 'power2.inOut'
                    });
                }
            }
        });
    } else {
        // On mobile, ensure final visual state
        gsap.set(highlightsSection, { backgroundColor: '#ffffff' });
        gsap.set(highlightsTitle, { color: '#0e0e0e' });
    }
    
    // Animate title with more reliable trigger
    if (isMobile) {
        gsap.from(highlightsTitle, {
            opacity: 0,
            y: 50,
            duration: 1.0,
            ease: 'power3.out'
        });
    } else {
        gsap.from(highlightsTitle, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: highlightsSection,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none none',
                once: true
            }
        });
    }
    
    // Animate the gold brushstroke underline
    const brushstroke = document.querySelector('.brushstroke');
    if (brushstroke) {
        // Get the total length of the path for accurate animation
        const pathLength = brushstroke.getTotalLength();
        
        // Set initial state
        gsap.set(brushstroke, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });
        
        // Animate the stroke drawing
        if (isMobile) {
            gsap.to(brushstroke, {
                strokeDashoffset: 0,
                duration: 1.2,
                ease: 'power2.out',
                delay: 0.3
            });
        } else {
            gsap.to(brushstroke, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power2.out',
                delay: 0.5,
                scrollTrigger: {
                    trigger: highlightsTitle,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        }
    }
    
    // Animate feature cards with stagger - more reliable animation
    gsap.utils.toArray(featureCards).forEach((card, i) => {
        if (isMobile) {
            gsap.from(card, {
                opacity: 0,
                y: 60,
                scale: 0.95,
                duration: 0.7,
                ease: 'power2.out',
                delay: i * 0.08
            });
        } else {
            gsap.from(card, {
                opacity: 0,
                y: 60,
                scale: 0.9,
                duration: 0.8,
                ease: 'power2.out',
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none none',
                    once: true
                }
            });
        }
        
        // Hover effects
        const icon = card.querySelector('.feature-icon');
        const title = card.querySelector('.feature-title');
        const description = card.querySelector('.feature-description');
        
        if (icon && title && description) {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(icon, {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }
    });
}


// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        gsap.set(hero, {
            y: rate
        });
    }
});



// Dynamic Logo Switching Function
function initDynamicLogoSwitching() {
    const brandLogo = document.querySelector('.brand-logo');
    const loaderLogo = document.querySelector('.loader-logo');
    const phoneLink = document.querySelector('.phone-link');
    const heroSection = document.querySelector('#hero');
    const aboutSection = document.querySelector('.about-section');
    const highlightsSection = document.querySelector('.highlights-section');
    
    if (!brandLogo || !highlightsSection) {
        console.warn('Logo elements or highlights section not found for dynamic switching');
        return;
    }
    
    let currentLogo = 'logo.webp'; // Track current logo state
    let currentPhoneTheme = 'default'; // Track current phone theme
    
    // Create intersection observer for hero section (1st section)
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentLogo !== 'logo.webp') {
                // Back to hero section - switch to original logo.webp
                currentLogo = 'logo.webp';
                switchLogoSmooth(brandLogo, 'logo.webp');
                if (loaderLogo) {
                    switchLogoSmooth(loaderLogo, 'logo.webp');
                }
            }
            
            if (entry.isIntersecting && currentPhoneTheme !== 'default') {
                // Back to hero section - switch phone to default theme
                currentPhoneTheme = 'default';
                if (phoneLink) {
                    phoneLink.classList.remove('orange-theme');
                }
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: '0px 0px -20% 0px'
    });
    
    // Create intersection observer for about section (2nd section)
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentLogo !== 'logo.webp') {
                // In about section - switch to original logo.webp
                currentLogo = 'logo.webp';
                switchLogoSmooth(brandLogo, 'logo.webp');
                if (loaderLogo) {
                    switchLogoSmooth(loaderLogo, 'logo.webp');
                }
            }
            
            if (entry.isIntersecting && currentPhoneTheme !== 'default') {
                // In about section - switch phone to default theme
                currentPhoneTheme = 'default';
                if (phoneLink) {
                    phoneLink.classList.remove('orange-theme');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
    });
    
    // Create intersection observer for highlights section (3rd section)
    const highlightsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && currentLogo !== 'logo-2.svg') {
                // Entering highlights section (3rd section) - switch to orange SVG
                currentLogo = 'logo-2.svg';
                switchLogoSmooth(brandLogo, 'logo-2.svg');
                if (loaderLogo) {
                    switchLogoSmooth(loaderLogo, 'logo-2.svg');
                }
            }
            
            if (entry.isIntersecting && currentPhoneTheme !== 'orange') {
                // Entering highlights section (3rd section) - switch phone to orange theme
                currentPhoneTheme = 'orange';
                if (phoneLink) {
                    phoneLink.classList.add('orange-theme');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    });
    
    // Start observing all sections
    if (heroSection) heroObserver.observe(heroSection);
    if (aboutSection) aboutObserver.observe(aboutSection);
    highlightsObserver.observe(highlightsSection);
}

// Enhanced helper function for smooth logo transitions
function switchLogoSmooth(logoElement, newSrc) {
    if (!logoElement) {
        return;
    }
    
    // Check if we're already using the target logo (avoid unnecessary switches)
    const currentSrc = logoElement.src;
    const targetFileName = newSrc.split('/').pop();
    if (currentSrc.includes(targetFileName.split('.')[0])) {
        return;
    }
    
    // Create smooth transition with enhanced animation
    const tl = gsap.timeline();
    
    tl.to(logoElement, {
        opacity: 0,
        scale: 0.8,
        rotationY: 180,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
            logoElement.src = newSrc;
            
            // Handle CSS class for orange SVG logo
            if (newSrc.includes('logo-2.svg')) {
                logoElement.classList.add('orange-logo');
            } else {
                logoElement.classList.remove('orange-logo');
            }
        }
    })
    .to(logoElement, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "back.out(1.4)",
        delay: 0.1
    });
} 

// Schedule Visit Popup Functionality
function initScheduleVisitPopup() {
    const scheduleBtn = document.getElementById('scheduleVisitBtn');
    const popupOverlay = document.getElementById('schedulePopup');
    const closeBtn = document.getElementById('closePopup');
    const scheduleForm = document.getElementById('scheduleForm');
    const popupInputs = document.querySelectorAll('.popup-input');
    const submitBtn = document.querySelector('.popup-submit-btn');
    
    if (!scheduleBtn || !popupOverlay || !closeBtn || !scheduleForm) {
        console.warn('Schedule visit popup elements not found');
        return;
    }
    
    // Open popup when hero button is clicked
    scheduleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup();
    });
    
    // Close popup when close button is clicked
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closePopup();
    });
    
    // Close popup when clicking outside the container
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Open popup function with GSAP animations
    function openPopup() {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Animate popup entrance
        gsap.fromTo(popupOverlay, 
            { opacity: 0 },
            { 
                opacity: 1, 
                duration: 0.4,
                ease: "power2.out"
            }
        );
        
        gsap.fromTo('.popup-container',
            { 
                scale: 0.8, 
                y: 50,
                opacity: 0
            },
            { 
                scale: 1, 
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                delay: 0.1
            }
        );
        
        // Animate form fields
        gsap.fromTo('.popup-form-field',
            { 
                opacity: 0, 
                y: 20,
                scale: 0.95
            },
            { 
                opacity: 1, 
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.3
            }
        );
    }
    
    // Close popup function with GSAP animations
    function closePopup() {
        gsap.to('.popup-container', {
            scale: 0.8,
            y: 30,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
        
        gsap.to(popupOverlay, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            delay: 0.1,
            onComplete: () => {
                popupOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
                
                // Reset form
                scheduleForm.reset();
                
                // Reset input label colors
                popupInputs.forEach(input => {
                    const label = input.closest('.popup-form-field').querySelector('.popup-label');
                    if (label) {
                        gsap.set(label, { color: "#666" });
                    }
                });
                
                // Remove any existing messages
                const existingMessage = document.querySelector('.popup-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
            }
        });
    }
    
    // Input focus animations and effects
    popupInputs.forEach(input => {
        const field = input.closest('.popup-form-field');
        const label = field.querySelector('.popup-label');
        
        // Focus glow effect
        input.addEventListener('focus', () => {
            // Animate gold glow
            gsap.to(input, {
                boxShadow: "0 0 0 3px rgba(212, 175, 55, 0.2), 0 4px 20px rgba(212, 175, 55, 0.25)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Subtle pulse effect
            gsap.fromTo(input, 
                { scale: 1 },
                { 
                    scale: 1.01,
                    duration: 0.2,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                }
            );
            
            // Label color animation
            if (label) {
                gsap.to(label, {
                    color: "#D4AF37",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        input.addEventListener('blur', () => {
            // Remove glow effect
            gsap.to(input, {
                boxShadow: "0 2px 15px rgba(0, 0, 0, 0.08)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Reset label color if empty
            if (label && !input.value.trim()) {
                gsap.to(label, {
                    color: "#666",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        // Input typing effect
        input.addEventListener('input', () => {
            if (input.value.trim() && label) {
                gsap.to(label, {
                    color: "#D4AF37",
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Submit button interactions
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            submitBtn.classList.add('ripple-active');
            
            // Remove ripple class after animation
            setTimeout(() => {
                submitBtn.classList.remove('ripple-active');
            }, 600);
            
            // Button press animation
            gsap.to(submitBtn, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
            
            // Handle form submission
            handlePopupFormSubmission();
        });
        
        // Button hover enhancement
        submitBtn.addEventListener('mouseenter', () => {
            gsap.to(submitBtn, {
                boxShadow: "0 8px 30px rgba(212, 175, 55, 0.5)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        submitBtn.addEventListener('mouseleave', () => {
            gsap.to(submitBtn, {
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.35)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
    
    // Form submission handler
    async function handlePopupFormSubmission() {
        const formData = new FormData(scheduleForm);
        
        // Basic validation
        const name = formData.get('name');
        const phone = formData.get('phone');
        
        if (!name || !phone) {
            // Show validation error with animation
            showPopupMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Identify source
        formData.append('form_source', 'schedule_popup');
        
        try {
            if (submitBtn) submitBtn.disabled = true;
            const res = await fetch('mailer.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            
            if (data && data.success) {
                showPopupMessage('Thank you! We\'ll contact you to schedule your visit.', 'success');
                setTimeout(() => {
                    closePopup();
                }, 1200);
            } else {
                showPopupMessage('Submission failed. Please try again.', 'error');
                console.error('Mailer error:', data);
            }
        } catch (err) {
            showPopupMessage('Network error. Please try again later.', 'error');
            console.error('Mailer request failed:', err);
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    }
    
    // Popup message display
    function showPopupMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.popup-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `popup-message ${type}`;
        messageEl.textContent = message;
        scheduleForm.appendChild(messageEl);
        
        // Animate message appearance
        gsap.fromTo(messageEl,
            { opacity: 0, y: 20, scale: 0.9 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            }
        );
        
        // Hide message after delay (only for error messages)
        if (type === 'error') {
            setTimeout(() => {
                gsap.to(messageEl, {
                    opacity: 0,
                    y: -20,
                    scale: 0.9,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        if (messageEl.parentNode) {
                            messageEl.remove();
                        }
                    }
                });
            }, 3000);
        }
    }
}

// Luxury Contact Form Animation and Functionality
function initLuxuryContactForm() {
    const formSection = document.querySelector('.luxury-contact-form-section');
    const formHeader = document.querySelector('.form-header');
    const contactForm = document.querySelector('.luxury-contact-form');
    const formFields = document.querySelectorAll('.form-field');
    const formInputs = document.querySelectorAll('.form-input');
    const submitBtn = document.querySelector('.form-submit-btn');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (!formSection || !formHeader || !contactForm) {
        console.warn('Luxury contact form elements not found');
        return;
    }
    
    // GSAP ScrollTrigger Animation - Form entrance
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate form header
    if (isMobile) {
        gsap.to(formHeader, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out"
        });
    } else {
        gsap.to(formHeader, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: formSection,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            }
        });
    }
    
    // Animate form container
    if (isMobile) {
        gsap.to(contactForm, {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            delay: 0.2
        });
    } else {
        gsap.to(contactForm, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
                trigger: formSection,
                start: "top 75%",
                end: "top 45%",
                toggleActions: "play none none reverse"
            }
        });
    }
    
    // Animate form fields individually
    formFields.forEach((field, index) => {
        if (isMobile) {
            gsap.fromTo(field,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)", delay: 0.4 + (index * 0.08) }
            );
        } else {
            gsap.fromTo(field, 
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    delay: 0.6 + (index * 0.1),
                    scrollTrigger: {
                        trigger: formSection,
                        start: "top 70%",
                        end: "top 40%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }
    });
    
    // Input focus animations and effects
    formInputs.forEach(input => {
        const field = input.closest('.form-field');
        const label = field.querySelector('.form-label');
        
        // Focus glow effect
        input.addEventListener('focus', () => {
            // Animate gold glow pulse
            gsap.to(input, {
                boxShadow: "0 0 0 4px rgba(212, 175, 55, 0.2), 0 8px 30px rgba(212, 175, 55, 0.25)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Pulse effect
            gsap.fromTo(input, 
                { scale: 1 },
                { 
                    scale: 1.02,
                    duration: 0.2,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                }
            );
            
            // Label color animation
            if (label) {
                gsap.to(label, {
                    color: "#D4AF37",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        input.addEventListener('blur', () => {
            // Remove glow effect
            gsap.to(input, {
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Reset label color if empty
            if (label && !input.value.trim()) {
                gsap.to(label, {
                    color: "#666",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
        
        // Input typing effect
        input.addEventListener('input', () => {
            if (input.value.trim() && label) {
                gsap.to(label, {
                    color: "#D4AF37",
                    duration: 0.2,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Submit button ripple effect and form handling
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create ripple effect
            submitBtn.classList.add('ripple-active');
            
            // Remove ripple class after animation
            setTimeout(() => {
                submitBtn.classList.remove('ripple-active');
            }, 600);
            
            // Button press animation
            gsap.to(submitBtn, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
            
            // Form validation and submission
            handleFormSubmission();
        });
        
        // Button hover enhancement
        submitBtn.addEventListener('mouseenter', () => {
            gsap.to(submitBtn, {
                boxShadow: "0 15px 45px rgba(212, 175, 55, 0.5)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        submitBtn.addEventListener('mouseleave', () => {
            gsap.to(submitBtn, {
                boxShadow: "0 6px 25px rgba(212, 175, 55, 0.3)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
    
    // Form submission handler
    async function handleFormSubmission() {
        const form = document.getElementById('luxuryContactForm');
        const formData = new FormData(form);
        
        // Basic validation
        const fullName = formData.get('fullName');
        const phoneNumber = formData.get('phoneNumber');
        
        if (!fullName || !phoneNumber) {
            // Show validation error with animation
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Identify source
        formData.append('form_source', 'footer_form');
        
        try {
            if (submitBtn) submitBtn.disabled = true;
            const res = await fetch('mailer.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            
            if (data && data.success) {
                showFormMessage('Thank you! We\'ll contact you soon.', 'success');
                setTimeout(() => {
                    form.reset();
                    // Reset label colors
                    formInputs.forEach(input => {
                        const label = input.closest('.form-field').querySelector('.form-label');
                        if (label) {
                            gsap.to(label, {
                                color: "#666",
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        }
                    });
                }, 500);
            } else {
                showFormMessage('Submission failed. Please try again.', 'error');
                console.error('Mailer error:', data);
            }
        } catch (err) {
            showFormMessage('Network error. Please try again later.', 'error');
            console.error('Mailer request failed:', err);
        } finally {
            if (submitBtn) submitBtn.disabled = false;
        }
    }
    
    // Form message display
    function showFormMessage(message, type) {
        // Create message element if it doesn't exist
        let messageEl = document.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            contactForm.appendChild(messageEl);
        }
        
        // Set message content and style
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;
        
        // Animate message appearance
        gsap.fromTo(messageEl,
            { opacity: 0, y: 20, scale: 0.9 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            }
        );
        
        // Hide message after delay
        setTimeout(() => {
            gsap.to(messageEl, {
                opacity: 0,
                y: -20,
                scale: 0.9,
                duration: 0.3,
                ease: "power2.in"
            });
        }, 3000);
    }
}

// Amenities Categories Animation and Functionality
function initAmenitiesCategoriesAnimation() {
    const categoriesSection = document.querySelector('.amenities-categories-section');
    const categoriesTitle = document.querySelector('.categories-title');
    const categoryCards = document.querySelectorAll('.category-card');
    const galleryPanel = document.getElementById('galleryPanel');
    const galleryOverlay = document.getElementById('galleryOverlay');
    const galleryClose = document.getElementById('galleryClose');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryContent = document.getElementById('galleryContent');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (!categoriesSection || !categoryCards.length) return;
    
    // Animate title (no scroll on mobile)
    if (isMobile) {
        gsap.fromTo(categoriesTitle, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });
    } else {
        gsap.fromTo(categoriesTitle,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: categoriesSection,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
    
    // Animate category cards with stagger (no scroll on mobile)
    if (isMobile) {
        gsap.fromTo(categoryCards,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                stagger: { amount: 1.2, from: "start" }
            }
        );
    } else {
        gsap.fromTo(categoryCards,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: { amount: 1.5, from: "start" },
                scrollTrigger: {
                    trigger: ".categories-grid",
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
    
    // Category data for gallery
    const categoryData = {
        entrance: {
            title: "Grand Entrance",
            items: [
                { name: "Designer Entrance Lobby", icon: "�️", image: "entrance-looby.webp" },
                { name: "Grand Drop-off Area", icon: "🚗", image: "Drop-off-Area.webp" },
                { name: "24/7 Concierge Desk", icon: "🛎️", image: "Concierge-Desk.webp" },
                { name: "Valet Parking Service", icon: "�", image: "Valet-Parking.webp" },
                { name: "Art Installations", icon: "�", image: "art-installiation.webp" },
                { name: "Fountain Court", icon: "⛲", image: "Fountain-Court.webp" }
            ]
        },
        social: {
            title: "Social & Celebration",
            items: [
                { name: "Banquet Hall", icon: "�", image: "banquet-hall.webp" },
                { name: "Open-air Party Lawn", icon: "🌿", image: "Rooftop-Sky-Garden.webp" },
                
                { name: "Karaoke & Dance Lounge", icon: "�", image: "Karaoke-&-Dance-Lounge.webp" },
                { name: "Outdoor Barbecue & Grill Area", icon: "�", image: "Outdoor-Barbecue-&-Grill-Area.webp" },
                { name: "Rooftop Sky Lounge", icon: "�", image: "Rooftop-Sky-Lounge.webp" },
                { name: "Art & Culture Event Space", icon: "�", image: "Art-&-Culture-Event-Space.webp" }
            ]
        },
        nature: {
            title: "Nature Spaces",
            items: [
                { name: "Themed Landscaped Gardens", icon: "�", image: "Themed-Landscaped-Gardens.webp" },
                { name: "Rooftop Sky Garden", icon: "�", image: "Rooftop-Sky-Garden.webp" },
                { name: "Zen Meditation Deck", icon: "🧘", image: "Zen-Meditation-Deck.webp" },
                { name: "Botanical Garden Pathway", icon: "�", image: "Botanical-Garden-Pathway.webp" },
                { name: "Reflexology Walking Track", icon: "�", image: "Reflexology-Walking-Track.webp" },
                { name: "Rainwater Pond / Lotus Pond Feature", icon: "🪷", image: "Rainwater-Pond.webp" }
            ]
        },
        security: {
            title: "Safety And Security",
            items: [
                { name: "24/7 CCTV Surveillance", icon: "📹", image: "24-hours-CCTV-security.webp" },
                { name: "Biometric Entry Access", icon: "🔐", image: "Biometric-Entry-Acces.webp" },
                { name: "Smart Video Door Phones", icon: "📱", image: "Smart-Video-Door-Phones.webp" },
                { name: "Fire Safety System", icon: "🚨", image: "Fire-Safety-System.webp" },
                { name: "Earthquake-Resistant Structure", icon: "🏗️", image: "Earthquake-Resistant-Structure.webp" },
                { name: "Security Patrol", icon: "�️", image: "Security-Patrol.webp" },
                { name: "Emergency Medical Response Station", icon: "🚑", image: "Emergency-Medical-Response-Station.webp" }
            ]
        },
        leisure: {
            title: "Leisure Zone",
            items: [
                { name: "Swimming Pool", icon: "🏊", image: "swimming-pool.webp" },
                { name: "Football Ground", icon: "☀️", image: "football-field.webp" },
                { name: "Basketball Court", icon: "🏀", image: "basket-ball-court.webp" },
                { name: "Cricket Ground", icon: "�", image: "cricket_field.webp" }
            ]
        },
        health: {
            title: "Health And Wellness",
            items: [
                { name: "State-of-the-art Gym", icon: "🏋️", image: "state-of-the-art-gym.webp" },
                { name: "Spa & Sauna", icon: "�", image: "Spa-&-Sauna.webp" },
                { name: "Jacuzzi Zone", icon: "�", image: "Jacuzzi-Zone.webp" },
                { name: "Temperature-Controlled Lap Pool", icon: "🏊", image: "Lap-pool.webp" },
                { name: "Wellness Juice Bar", icon: "🥤", image: "Wellness-Juice-Bar.webp" },
                { name: "Dedicated Physiotherapy Room", icon: "🏥", image: "Dedicated-Physiotherapy-Room.webp" }
            ]
        }
    };
    
    // Add click event listeners to category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const data = categoryData[category];
            
            if (data) {
                openGallery(data);
            }
        });
    });
    
    // Gallery functions with Swiper.js
    let gallerySwiper = null;
    
    function openGallery(data) {
        galleryTitle.textContent = data.title;
        
        // Get swiper wrapper
        const swiperWrapper = document.getElementById('swiperWrapper');
        
        // Clear existing slides
        swiperWrapper.innerHTML = '';
        
        // Create swiper slides
        data.items.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="gallery-item">
                    <div class="gallery-item-image-container">
                        <img src="${item.image}" alt="${item.name}" class="gallery-item-image">
                       
                    </div>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });
        
        // Show gallery with animation
        galleryOverlay.classList.add('active');
        galleryPanel.classList.add('active');
        
        // Initialize or update Swiper (only on desktop/tablet)
        setTimeout(() => {
            if (gallerySwiper) {
                gallerySwiper.destroy(true, true);
            }
            
            // Check if we're on mobile (768px or less)
            const isMobile = window.innerWidth <= 768;
            
            if (!isMobile) {
                gallerySwiper = new Swiper('.gallery-swiper', {
                    // Responsive breakpoints
                    slidesPerView: 1,
                    spaceBetween: 20,
                    breakpoints: {
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        }
                    },
                    
                    // Navigation arrows
                    navigation: {
                        nextEl: '.gallery-nav-next',
                        prevEl: '.gallery-nav-prev',
                    },
                    
                    // Pagination dots
                    pagination: {
                        el: '.gallery-pagination',
                        clickable: true,
                        dynamicBullets: true,
                    },
                    
                    // Autoplay
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                    
                    // Loop
                    loop: true,
                    
                    // Smooth transitions
                    speed: 600,
                    effect: 'slide',
                    
                    // Touch/swipe settings
                    touchRatio: 1,
                    touchAngle: 45,
                    grabCursor: true,
                    
                    // Accessibility
                    a11y: {
                        enabled: true,
                        prevSlideMessage: 'Previous slide',
                        nextSlideMessage: 'Next slide',
                        firstSlideMessage: 'This is the first slide',
                        lastSlideMessage: 'This is the last slide',
                    },
                    
                    // Keyboard navigation
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },
                    
                    // Animation on slide change
                    on: {
                        slideChange: function () {
                            // Add subtle animation to new slide
                            const activeSlide = this.slides[this.activeIndex];
                            if (activeSlide) {
                                const galleryItem = activeSlide.querySelector('.gallery-item');
                                if (galleryItem) {
                                    gsap.fromTo(galleryItem, 
                                        { scale: 0.95, opacity: 0.8 },
                                        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
                                    );
                                }
                            }
                        }
                    }
                });
            } else {
                // On mobile, just show all slides as a static grid
                gallerySwiper = null;
            }
            
            // Animate slides entrance
            const slides = document.querySelectorAll('.gallery-swiper .swiper-slide');
            gsap.fromTo(slides,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: {
                        amount: 0.4,
                        from: "start"
                    },
                    delay: 0.2
                }
            );
        }, 100);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    function closeGallery() {
        galleryOverlay.classList.remove('active');
        galleryPanel.classList.remove('active');
        
        // Destroy Swiper instance to prevent memory leaks
        if (gallerySwiper) {
            gallerySwiper.destroy(true, true);
            gallerySwiper = null;
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Close gallery event listeners
    galleryClose.addEventListener('click', closeGallery);
    galleryOverlay.addEventListener('click', closeGallery);
    
    // Close gallery on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && galleryPanel.classList.contains('active')) {
            closeGallery();
        }
    });
}
