document.addEventListener('DOMContentLoaded', function() {
    // Page elements
    const pages = document.querySelectorAll('.page');
    const continueBtn = document.getElementById('continueBtn');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const dots = document.querySelectorAll('.dot');
    let currentPage = 1;

    // Canvas setup
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let confettiParticles = [];

    // Show page function
    function showPage(pageNum) {
        pages.forEach((page, index) => {
            page.classList.toggle('active', index + 1 === pageNum);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === pageNum);
        });
        currentPage = pageNum;
        
        if (pageNum === 3) createConfetti();
    }

    // Event listeners
    continueBtn.addEventListener('click', () => showPage(2));
    yesBtn.addEventListener('click', () => showPage(3));

    // No button chase effect
    noBtn.addEventListener('mouseenter', function() {
        const maxX = window.innerWidth - 120;
        const maxY = window.innerHeight - 80;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.transition = 'all 0.5s ease';
        noBtn.style.zIndex = '9999';
    });

    // Create confetti
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            confettiParticles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 20,
                vy: Math.random() * 10 - 5,
                size: Math.random() * 5 + 3,
                rotation: Math.random() * 360,
                color: ['#ff6b9d', '#c44569', '#ff9ff3', '#feca57'][Math.floor(Math.random() * 4)]
            });
        }
    }

    // Animation loop
    function animate() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiParticles = confettiParticles.filter(p => {
            if (currentPage === 3) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1;
                p.rotation += 5;
                
                if (p.y < canvas.height + 50) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation * Math.PI / 180);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                    ctx.restore();
                    return true;
                }
            }
            return false;
        });

        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showPage(index + 1));
    });

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
