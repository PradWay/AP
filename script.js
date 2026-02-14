const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const buttonContainer = document.querySelector('.button-container');

// Yes button - Shows success message
yesBtn.addEventListener('click', function() {
    buttonContainer.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Optional: Trigger confetti or celebration animation
    celebrateClick();
});

// No button - Runs away from cursor
noBtn.addEventListener('mouseenter', function() {
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.4s ease-out';
});

// Celebration effect (optional)
function celebrateClick() {
    // Create multiple hearts bursting effect
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = Math.random() * window.innerHeight + 'px';
        heart.style.fontSize = (Math.random() * 30 + 30) + 'px';
        heart.style.animation = 'heartFly 2s ease-out forwards';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }
}

// Add animation for celebration hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFly {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, -300px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);
