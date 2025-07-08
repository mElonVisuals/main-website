document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky header and active navigation state
    const header = document.querySelector('.main-header');
    const navLinks = document.querySelectorAll('.main-nav .nav-links a');
    const sections = document.querySelectorAll('main section');

    const handleScroll = () => {
        // Sticky header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active navigation link based on scroll position
        let currentActive = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 20; // Adjust offset
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                const id = section.getAttribute('id');
                if (id) {
                    currentActive = `a[href="#${id}"]`;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentActive && link.matches(currentActive)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set active link on load

    // Mobile Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav .nav-links');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open'); // For animating hamburger icon
    });

    // Close mobile menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // Accordion functionality for FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('active');
            } else {
                content.style.maxHeight = '0';
                content.classList.remove('active');
            }
        });
    });

    // Simple Parallax Effect (for sections with .parallax-effect class)
    // This is a basic example; more complex parallax might use libraries or CSS transforms.
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax-effect');
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallaxSpeed || 0.5); // Default speed
            const yPos = -(window.scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Ensure video backgrounds mute on autoplay for some browsers
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.play().catch(error => {
            // Autoplay was prevented. User interaction might be needed.
            console.log('Autoplay prevented:', error);
        });
    }

    // Newsletter form submission (client-side only, for integration with a service)
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessages = document.getElementById('newsletter-messages');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (!email) {
                newsletterMessages.textContent = 'Please enter your email address.';
                newsletterMessages.classList.remove('success');
                newsletterMessages.classList.add('error');
                newsletterMessages.style.display = 'block';
                return;
            }

            // In a real application, you would send this email to a backend service (e.g., Mailchimp API, your own server)
            // For now, we'll simulate success.
            newsletterMessages.textContent = 'Thank you for subscribing!';
            newsletterMessages.classList.remove('error');
            newsletterMessages.classList.add('success');
            newsletterMessages.style.display = 'block';
            emailInput.value = ''; // Clear the input

            // Simulate API call
            // try {
            //     const response = await fetch('/api/subscribe', { // Replace with your actual API endpoint
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ email: email })
            //     });
            //     const data = await response.json();
            //     if (response.ok) {
            //         newsletterMessages.textContent = 'Thank you for subscribing!';
            //         newsletterMessages.classList.remove('error');
            //         newsletterMessages.classList.add('success');
            //         emailInput.value = '';
            //     } else {
            //         newsletterMessages.textContent = data.message || 'Subscription failed. Please try again.';
            //         newsletterMessages.classList.remove('success');
            //         newsletterMessages.classList.add('error');
            //     }
            // } catch (error) {
            //     console.error('Error:', error);
            //     newsletterMessages.textContent = 'An error occurred. Please try again later.';
            //     newsletterMessages.classList.remove('success');
            //     newsletterMessages.classList.add('error');
            // } finally {
            //     newsletterMessages.style.display = 'block';
            // }
        });
    }

});

// Generic Intersection Observer for Fade-in animations
// This will trigger the animations when elements come into view
const animateOnScroll = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Adjust as needed: 0.1 means 10% of the element needs to be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .fade-in-up').forEach(element => {
        // Apply initial hidden state if not already in CSS
        element.style.opacity = '0';
        if (element.classList.contains('fade-in-up')) {
            element.style.transform = 'translateY(20px)';
        }
        observer.observe(element);
    });
};

document.addEventListener('DOMContentLoaded', animateOnScroll);