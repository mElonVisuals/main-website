document.addEventListener('DOMContentLoaded', () => {
    // Example: Glitch effect for a specific heading on hover (can be extended)
    const glitchElement = document.querySelector('.glitch-text'); // Add this class to your hero H1 or other text
    if (glitchElement) {
        glitchElement.addEventListener('mouseenter', () => {
            glitchElement.style.animationPlayState = 'running';
        });
        glitchElement.addEventListener('mouseleave', () => {
            glitchElement.style.animationPlayState = 'paused';
            glitchElement.style.transform = 'translate(0)'; // Reset position
            glitchElement.style.textShadow = 'none'; // Reset shadow
        });
    }

    // More complex page transitions (conceptual)
    // For full page transitions, you'd typically use a library like GSAP, or
    // manage classes on body/main element and listen for animation end events.

    // Example of a subtle background particle/grid animation (CSS-driven, but JS could control density/speed)
    // The CSS already handles a basic animated background. If you need dynamic control,
    // you would manipulate CSS variables or inline styles here.
});