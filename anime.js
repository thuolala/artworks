document.addEventListener("DOMContentLoaded", function () {
    anime({
        targets: '.welcome span',
        translateY: [
            { value: -30, easing: 'easeOutBounce', duration: 300 }, // Moves up
            { value: 0, easing: 'easeOutBounce', duration: 300, delay: 70 } // Comes down
        ],
        delay: (_, i) => i * 50, // Staggered effect for each letter
        loop: true,
        loopDelay: 500 // Small pause before repeating
    });
});
