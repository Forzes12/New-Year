const regions = [
    { offset: 12, name: 'Камчатка' },
    { offset: 12, name: 'Анадырь' },
    { offset: 11, name: 'Магадан' },
    { offset: 10, name: 'Владивосток' },
    { offset: 10, name: 'Хабаровск' },
    { offset: 9, name: 'Якутск' },
    { offset: 8, name: 'Иркутск' },
    { offset: 7, name: 'Красноярск' },
    { offset: 7, name: 'Новосибирск' },
    { offset: 7, name: 'Барнаул' },
    { offset: 6, name: 'Омск' },
    { offset: 5, name: 'Екатеринбург' },
    { offset: 5, name: 'Челябинск' },
    { offset: 5, name: 'Уфа' },
    { offset: 4, name: 'Самара' },
    { offset: 4, name: 'Саратов' },
    { offset: 4, name: 'Астрахань' },
    { offset: 3, name: 'Москва' },
    { offset: 3, name: 'Санкт-Петербург' },
    { offset: 3, name: 'Краснодар' },
    { offset: 3, name: 'Белгород' },
    { offset: 3, name: 'Воронеж' },
    { offset: 3, name: 'Казань' },
    { offset: 3, name: 'Нижний Новгород' },
    { offset: 3, name: 'Ростов-на-Дону' },
    { offset: 3, name: 'Волгоград' },
    { offset: 5, name: 'Пермь' },
    { offset: 7, name: 'Томск' },
    { offset: 2, name: 'Калининград' }
];

let currentRegionIndex = 0;

function getTargetDate(offset) {
    // New Year 2026 at 00:00 in the selected time zone
    // UTC time = local time - offset hours
    return new Date(Date.UTC(2026, 0, 1, 0, 0, 0, 0) - offset * 60 * 60 * 1000);
}

let targetDate = getTargetDate(regions[currentRegionIndex].offset);

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        // If time's up for this region, show message
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.getElementById('milliseconds').textContent = '000';
        // But continue cycling
    } else {
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
    }

    updateProgressBar(now);
    updateAllRegions();
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

// Cycle through regions every 10 seconds
setInterval(() => {
    let nextIndex = (currentRegionIndex + 1) % regions.length;
    switchRegion(nextIndex);
}, 10000);

// Play music
const music = document.getElementById('newyear-music');
music.volume = 0.5;

// Play music automatically since it's local file
function playMusic() {
    music.play().catch(e => {
        console.log('Autoplay blocked:', e);
    });
}
playMusic();

// Debug audio loading
music.addEventListener('loadstart', () => console.log('Audio load started'));
music.addEventListener('canplay', () => console.log('Audio can play'));
music.addEventListener('error', (e) => console.error('Audio error:', e));
music.addEventListener('stalled', () => console.log('Audio stalled'));
music.addEventListener('suspend', () => console.log('Audio suspended'));


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

function switchRegion(newIndex) {
    const timerContainer = document.getElementById('timer-container');
    const regionName = document.getElementById('region-name');
    timerContainer.classList.add('fade');
    setTimeout(() => {
        currentRegionIndex = newIndex;
        targetDate = getTargetDate(regions[currentRegionIndex].offset);
        regionName.textContent = `${regions[currentRegionIndex].name} (UTC+${regions[currentRegionIndex].offset})`;
        updateCountdown(); // Update immediately
        updateAllRegions();
        timerContainer.classList.remove('fade');
    }, 500);
}

// Initialize region name
document.getElementById('region-name').textContent = `${regions[currentRegionIndex].name} (UTC+${regions[currentRegionIndex].offset})`;

// Create regions list
function createRegionsList() {
    const regionsList = document.getElementById('regions-list');
    regions.forEach((region, index) => {
        const item = document.createElement('div');
        item.className = 'region-item';
        item.id = `region-${index}`;
        item.innerHTML = `
            <div class="region-title">${region.name}</div>
            <div class="region-timer" id="region-timer-${index}">00:00:00</div>
        `;
        regionsList.appendChild(item);
    });
}

function updateAllRegions() {
    const now = new Date();
    regions.forEach((region, index) => {
        const target = getTargetDate(region.offset);
        const diff = target - now;
        const item = document.getElementById(`region-${index}`);
        const timer = document.getElementById(`region-timer-${index}`);
        if (diff > 0) {
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            item.classList.remove('active');
        } else {
            timer.textContent = 'Новый Год!';
            item.classList.add('active');
        }
    });
}

createRegionsList();
updateAllRegions();
