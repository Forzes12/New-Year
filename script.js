let targetDate = new Date('2025-12-31T21:00:00.000Z');

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        // Time's up, trigger fireworks
        triggerFireworks();
        clearInterval(interval);
        const timerContainer = document.getElementById('timer-container');
        timerContainer.innerHTML = '<h2>С Новым Годом!</h2>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((diff % 1000));

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('milliseconds').textContent = milliseconds.toString().padStart(3, '0');

    updateProgressBar(now);

}


function updateProgressBar(now) {
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    const totalMs = endOfYear - startOfYear;
    const elapsedMs = now - startOfYear;
    const percentage = (elapsedMs / totalMs) * 100;

    document.getElementById('progress-bar').style.width = percentage + '%';
    document.getElementById('progress-text').textContent = Math.round(percentage) + '% года 2025 завершено';
}

function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflakesContainer.appendChild(snowflake);
    }
}

function triggerFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    fireworksContainer.style.display = 'block';
    for (let i = 0; i < 10; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + '%';
        firework.style.top = Math.random() * 100 + '%';
        firework.style.animationDelay = Math.random() * 1 + 's';
        firework.style.background = ['gold', 'red', 'silver', 'blue', 'green'][Math.floor(Math.random() * 5)];
        fireworksContainer.appendChild(firework);
        setTimeout(() => firework.remove(), 1500);
    }
}


createSnowflakes();
const interval = setInterval(updateCountdown, 10);

// Play music
const music = document.getElementById('newyear-music');
music.volume = 0.5;
// Autoplay is set in HTML, no need to call play() here


// Mouse tracking for tree
const tree = document.querySelector('.christmas-tree');
document.addEventListener('mousemove', (e) => {
    const rect = tree.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let angleX = (e.clientX - centerX) / 30;
    let angleY = (e.clientY - centerY) / 30;
    angleX = Math.max(-15, Math.min(15, angleX));
    angleY = Math.max(-15, Math.min(15, angleY));
    tree.style.transform = `perspective(1000px) rotateY(${angleX}deg) rotateX(${angleY}deg)`;
});

// Prevent scrolling
document.addEventListener('wheel', preventScroll, { passive: false });
document.addEventListener('touchmove', preventScroll, { passive: false });
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
    }
});

function preventScroll(e) {
    e.preventDefault();
}
