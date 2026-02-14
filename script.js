// 3-PAGE VALENTINE EXPERIENCE - FIXED FOR GITHUB PAGES
document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const continueBtn = document.getElementById('continueBtn');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const dots = document.querySelectorAll('.dot');
    let currentPage = 1;

    // Canvas confetti
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let confettiParticles = [];

    // Page navigation
    function showPage(pageNum) {
        pages.forEach((page, index) => {
            page.classList.toggle('active', index + 1 === pageNum);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === pageNum);
        });
        
        currentPage = pageNum;
        
        // Confetti cleanup when leaving page 2
        if (pageNum !== 2 && pageNum !== 3) {
            confettiParticles = [];
        }
    }

    // Page 1 → Page 2
    continueBtn.addEventListener('click', () => {
        showPage(2);
    });

    // Page 2 → Page 3 (Yes button)
    yesBtn.addEventListener('click', () => {
        showPage(3);
        createConfetti();
    });

    // No button runs away
    noBtn.addEventListener('mouseenter', () => {
        const randomX = Math.random() * (window.innerWidth - 120);
        const randomY = Math.random() * (window.innerHeight - 80);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        noBtn.style.transform = 'scale(1.1)';
    });

    // PERFECT CONFETTI EXPLOSION
    function createConfetti() {
        for (let i = 0; i < 80; i++) {
            confettiParticles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15,
                size: Math.random() * 6 + 3,
                rotation: Math.random() * 360,
                vrot: (Math.random() - 0.5) * 15,
                color: ['#ff6b9d', '#c44569', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'][Math.floor(Math.random() * 6)]
            });
        }
    }

    // Smooth animation loop
    function animate() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiParticles = confettiParticles.filter((p, i) => {
            if (i % 3 !== 0 && currentPage === 3) {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.08;
                p.rotation += p.vrot;
                p.vx *= 0.99;
                
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();
            }
            return p.y < canvas.height + 50 && currentPage === 3;
        });
        
        requestAnimationFrame(animate);
    }

    animate();

    // Progress dots navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const pageNum = parseInt(dot.dataset.page);
            showPage(pageNum);
            if (pageNum === 3) createConfetti();
        });
    });

    // Responsive canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
