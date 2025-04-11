// Zrinks Brand Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Generate bubbles randomly
    const animateBubbles = function() {
        const bubbles = document.querySelectorAll('.bubble');
        
        bubbles.forEach(bubble => {
            // Set random horizontal position
            const randomLeft = Math.random() * 100;
            bubble.style.left = `${randomLeft}%`;
            
            // Set random size between 10px and 50px
            const randomSize = Math.random() * 40 + 10;
            bubble.style.width = `${randomSize}px`;
            bubble.style.height = `${randomSize}px`;
            
            // Set random animation duration between 6s and 12s
            const randomDuration = Math.random() * 6 + 6;
            bubble.style.animationDuration = `${randomDuration}s`;
            
            // Set random animation delay
            const randomDelay = Math.random() * 5;
            bubble.style.animationDelay = `${randomDelay}s`;
        });
    };
    
    // Initialize bubbles
    animateBubbles();
    
    // Reinitialize bubbles every 30 seconds for variation
    setInterval(animateBubbles, 30000);

    // Enhanced flavor animations
    const flavorCans = document.querySelectorAll('.flavor-can');
    const shimmerEffects = document.querySelectorAll('.can-shimmer');
    
    // Create synchronized animations for cans
    const animateFlavorCans = function() {
        flavorCans.forEach((can, index) => {
            // Staggered bobbing effect
            setTimeout(() => {
                can.animate([
                    { transform: 'translateY(0) rotate(0deg)' },
                    { transform: 'translateY(-15px) rotate(2deg)' },
                    { transform: 'translateY(0) rotate(0deg)' }
                ], {
                    duration: 2000,
                    iterations: 1,
                    easing: 'ease-in-out'
                });
            }, index * 300);
            
            // Shimmer effect
            if (shimmerEffects[index]) {
                setTimeout(() => {
                    shimmerEffects[index].style.left = '-100%';
                    shimmerEffects[index].style.animation = 'shimmer 2s ease-out forwards';
                }, index * 300 + 500);
            }
        });
    };
    
    // Run animation when section is in view
    const flavorSection = document.querySelector('.flavors');
    let flavorAnimationInterval;
    
    const checkFlavorSectionVisibility = function() {
        if (isInViewport(flavorSection, 200)) {
            if (!flavorAnimationInterval) {
                // Start with immediate animation
                animateFlavorCans();
                // Then set interval for repeated animations
                flavorAnimationInterval = setInterval(animateFlavorCans, 4000);
            }
        } else {
            if (flavorAnimationInterval) {
                clearInterval(flavorAnimationInterval);
                flavorAnimationInterval = null;
            }
        }
    };

    // Scroll animation for sections
    const animateOnScroll = function() {
        // Elements to animate
        const sectionTitles = document.querySelectorAll('.section-title');
        const flavorCards = document.querySelectorAll('.flavor-card');
        const cityCards = document.querySelectorAll('.city-card');
        const aboutContent = document.querySelector('.about-content');
        const aboutImage = document.querySelector('.about-image');
        const ctaHeading = document.querySelector('.cta h2');
        const ctaText = document.querySelector('.cta p');
        const ctaButton = document.querySelector('.cta .primary-btn');
        const newsletter = document.querySelector('.newsletter');

        // Function to check if element is in viewport
        const isInViewport = function(element, offset = 150) {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset)
            );
        };

        // Add visible class to elements in viewport
        const addVisibleClass = function() {
            sectionTitles.forEach(title => {
                if (isInViewport(title)) {
                    title.classList.add('visible');
                }
            });

            flavorCards.forEach((card, index) => {
                if (isInViewport(card)) {
                    // Staggered animation
                    setTimeout(() => {
                        card.classList.add('visible');
                        // Add a subtle rotation to each card
                        card.style.transform = `translateY(0) rotate(${(index - 1) * 2}deg)`;
                    }, index * 150);
                }
            });

            cityCards.forEach((card, index) => {
                if (isInViewport(card)) {
                    // Staggered animation
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                }
            });

            if (aboutContent && isInViewport(aboutContent)) {
                aboutContent.classList.add('visible');
            }

            if (aboutImage && isInViewport(aboutImage)) {
                aboutImage.classList.add('visible');
            }

            if (ctaHeading && isInViewport(ctaHeading)) {
                ctaHeading.classList.add('visible');
            }

            if (ctaText && isInViewport(ctaText)) {
                ctaText.classList.add('visible');
            }

            if (ctaButton && isInViewport(ctaButton)) {
                ctaButton.classList.add('visible');
            }

            if (newsletter && isInViewport(newsletter)) {
                newsletter.classList.add('visible');
            }
            
            // Check flavor section visibility for can animations
            checkFlavorSectionVisibility();
        };

        // Run on load
        addVisibleClass();

        // Run on scroll with throttle for performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    addVisibleClass();
                    scrollTimeout = null;
                }, 100);
            }
        });
    };

    // Initialize scroll animations
    animateOnScroll();

    // Utility function to check if element is in viewport
    function isInViewport(element, offset = 150) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset)
        );
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Flavor card color effect on hover
    const flavorCards = document.querySelectorAll('.flavor-card');
    flavorCards.forEach(card => {
        const color = card.getAttribute('data-color');
        
        card.addEventListener('mouseenter', function() {
            card.style.boxShadow = `0 20px 40px ${color}40`; // Adding transparency
            card.querySelector('.flavor-btn').style.backgroundColor = color;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            card.querySelector('.flavor-btn').style.backgroundColor = '#e2284f';
        });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Hero parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
        
        // Flavor section background circles parallax
        const circles = document.querySelectorAll('.flavor-circle');
        if (circles.length) {
            circles[0].style.transform = `translate(${scrollPosition * 0.05}px, ${scrollPosition * 0.02}px) scale(1.1)`;
            circles[1].style.transform = `translate(-${scrollPosition * 0.03}px, -${scrollPosition * 0.04}px) scale(1.05)`;
            circles[2].style.transform = `translate(${scrollPosition * 0.02}px, -${scrollPosition * 0.01}px) scale(1.03)`;
        }
        
        // About section parallax
        const aboutBefore = document.querySelector('.about::before');
        const aboutAfter = document.querySelector('.about::after');
        
        if (aboutBefore) {
            aboutBefore.style.transform = `translate(${scrollPosition * 0.05}px, ${scrollPosition * 0.02}px)`;
        }
        
        if (aboutAfter) {
            aboutAfter.style.transform = `translate(-${scrollPosition * 0.05}px, -${scrollPosition * 0.02}px)`;
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would normally send the data to your backend
            // For demonstration, we'll just show an alert
            alert(`Thank you! ${email} has been subscribed to our newsletter.`);
            
            // Reset the form
            this.reset();
        });
    }
}); 