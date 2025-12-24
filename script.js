/* ═══════════════════════════════════════════════════════════
   💕 PREMIUM VALENTINE'S DAY 2025
   Interactive Magic & Romantic Experience
   Mobile-First • Touch-Friendly • Audio Support
═══════════════════════════════════════════════════════════ */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with mobile-friendly settings
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: false  // Enable on all devices
    });

    // Register GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all modules
    initIntroScreen();
    initFloatingHearts();
    initRosePetals();
    initLoveCounter();
    initReasons();
    initGallery();
    initLoveLetter();
    initBouquet();
    initMusicPlayer();
    initSongPlayer();
    initPromises();
    initVideoPlayer();
    initFinaleHearts();
    initFireworks();
    initConfettiButton();
    initClickHearts();
    initScrollAnimations();
});

/* ═══════════════════════════════════════════════════════════
   INTRO SCREEN
═══════════════════════════════════════════════════════════ */

function initIntroScreen() {
    const introScreen = document.getElementById('intro-screen');
    const startBtn = document.getElementById('start-experience');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');

    if (!introScreen || !startBtn) return;

    // Prevent body scroll when intro is visible
    document.body.style.overflow = 'hidden';

    startBtn.addEventListener('click', () => {
        // Try to play music
        if (bgMusic) {
            bgMusic.volume = 0.5;
            const playPromise = bgMusic.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    if (musicToggle) musicToggle.classList.add('playing');
                    const vinylDisc = document.getElementById('vinyl-disc');
                    if (vinylDisc) vinylDisc.classList.add('spinning');
                }).catch(err => {
                    console.log('Audio autoplay blocked:', err);
                });
            }
        }

        // Fade out intro
        gsap.to(introScreen, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                introScreen.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   FLOATING HEARTS CANVAS
═══════════════════════════════════════════════════════════ */

function initFloatingHearts() {
    const canvas = document.getElementById('hearts-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let hearts = [];
    const maxHearts = window.innerWidth < 768 ? 8 : 15;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 50,
            size: Math.random() * 15 + 8,
            speed: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 1.5,
            wobblePhase: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.02 + 0.01
        };
    }

    function drawHeart(heart) {
        ctx.save();
        ctx.translate(heart.x, heart.y);
        ctx.rotate(heart.rotation * Math.PI / 180);
        ctx.globalAlpha = heart.opacity;

        const s = heart.size;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(s * 0.5, -s * 0.3, s, s * 0.3, 0, s);
        ctx.bezierCurveTo(-s, s * 0.3, -s * 0.5, -s * 0.3, 0, s * 0.3);

        const gradient = ctx.createRadialGradient(0, s * 0.3, 0, 0, s * 0.3, s);
        gradient.addColorStop(0, '#FF1493');
        gradient.addColorStop(1, '#DC143C');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add new hearts
        while (hearts.length < maxHearts) {
            hearts.push(createHeart());
        }

        hearts.forEach((heart, i) => {
            heart.y -= heart.speed;
            heart.rotation += heart.rotationSpeed;
            heart.wobblePhase += heart.wobbleSpeed;
            heart.x += Math.sin(heart.wobblePhase) * 0.5;

            drawHeart(heart);

            if (heart.y < -50) {
                hearts[i] = createHeart();
            }
        });

        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);
    animate();
}

/* ═══════════════════════════════════════════════════════════
   ROSE PETALS
═══════════════════════════════════════════════════════════ */

function initRosePetals() {
    const container = document.getElementById('rose-petals');
    if (!container) return;

    const petalCount = window.innerWidth < 768 ? 8 : 15;

    for (let i = 0; i < petalCount; i++) {
        createPetal(container, i);
    }

    function createPetal(container, index) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        petal.style.opacity = Math.random() * 0.4 + 0.3;
        petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;

        // Varied colors
        const colors = ['#DC143C', '#FF1493', '#E8A0B5', '#B76E79'];
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(petal);
    }
}

/* ═══════════════════════════════════════════════════════════
   LOVE COUNTER
═══════════════════════════════════════════════════════════ */

function initLoveCounter() {
    const loveDate = new Date('2020-03-20');
    const today = new Date();

    const diffTime = Math.abs(today - loveDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);

    const daysEl = document.getElementById('days-count');
    const monthsEl = document.getElementById('months-count');
    const yearsEl = document.getElementById('years-count');

    function animateValue(el, target, duration = 2000) {
        if (!el) return;

        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            el.textContent = current.toLocaleString('tr-TR');

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Trigger on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(daysEl, diffDays, 2500);
                animateValue(monthsEl, diffMonths, 2000);
                animateValue(yearsEl, diffYears, 1500);
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const counterSection = document.getElementById('love-counter');
    if (counterSection) observer.observe(counterSection);
}

/* ═══════════════════════════════════════════════════════════
   REASONS
═══════════════════════════════════════════════════════════ */

function initReasons() {
    const wrapper = document.getElementById('reasons-wrapper');
    if (!wrapper) return;

    const reasons = [
        "Gülüşün güneşim gibi aydınlatıyor",
        "Kalbini benimle paylaştığın için",
        "Her zaman yanımda olduğun için",
        "Beni olduğum gibi sevdiğin için",
        "Hayallerimi desteklediğin için",
        "En zor anlarımda güç verdiğin için",
        "Sevgin sonsuz olduğu için",
        "Gözlerindeki ışık için",
        "Sesinin melodisi için",
        "Ellerinin sıcaklığı için",
        "Kahkahaların müzik gibi",
        "Sarılışların huzur gibi",
        "Her şeyi güzelleştirdiğin için",
        "Beni daha iyi biri yaptığın için"
    ];

    reasons.forEach((reason, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="reason-card">
                <div class="reason-heart"><i class="fas fa-heart"></i></div>
                <div class="reason-number">${index + 1}</div>
                <p class="reason-text">${reason}</p>
            </div>
        `;
        wrapper.appendChild(slide);
    });

    // Initialize Swiper
    new Swiper('.reasons-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 16,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.reasons-pagination',
            clickable: true
        },
        breakpoints: {
            480: { slidesPerView: 1.5, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 }
        }
    });
}

/* ═══════════════════════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════════════════════ */

function initGallery() {
    const wrapper = document.getElementById('gallery-wrapper');
    if (!wrapper) return;

    const images = [
        './images/Gemini_Generated_Image_2zxvsk2zxvsk2zxv.png',
        './images/Gemini_Generated_Image_3vdz6c3vdz6c3vdz.png',
        './images/Gemini_Generated_Image_4n90894n90894n90.png',
        './images/Gemini_Generated_Image_952ron952ron952r.png',
        './images/Gemini_Generated_Image_9fi9jr9fi9jr9fi9.png',
        './images/Gemini_Generated_Image_a35zlna35zlna35z.png',
        './images/Gemini_Generated_Image_aqrlmkaqrlmkaqrl.png',
        './images/Gemini_Generated_Image_hvilgmhvilgmhvil.png',
        './images/Gemini_Generated_Image_j6hxtbj6hxtbj6hx.png'
    ];

    images.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="gallery-item" data-index="${index}">
                <img src="${src}" alt="Anı ${index + 1}" loading="lazy">
            </div>
        `;
        wrapper.appendChild(slide);
    });

    // Initialize Swiper
    new Swiper('.gallery-swiper', {
        slidesPerView: 1.3,
        spaceBetween: 16,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.gallery-pagination',
            clickable: true
        },
        breakpoints: {
            480: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.5, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
        }
    });

    // Lightbox
    wrapper.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        const index = parseInt(item.dataset.index);
        openLightbox(images, index);
    });
}

function openLightbox(images, startIndex) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';

    let currentIndex = startIndex;

    function updateImage() {
        const img = overlay.querySelector('img');
        if (img) img.src = images[currentIndex];
    }

    overlay.innerHTML = `
        <button class="absolute top-4 right-4 w-12 h-12 flex items-center justify-center text-white text-3xl hover:text-primary transition-colors z-10" aria-label="Kapat">&times;</button>
        <button class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white text-2xl hover:text-primary transition-colors z-10 bg-black/30 rounded-full" aria-label="Önceki"><i class="fas fa-chevron-left"></i></button>
        <button class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white text-2xl hover:text-primary transition-colors z-10 bg-black/30 rounded-full" aria-label="Sonraki"><i class="fas fa-chevron-right"></i></button>
        <img src="${images[currentIndex]}" class="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain" alt="Fotoğraf">
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">${currentIndex + 1} / ${images.length}</div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => overlay.style.opacity = '1');

    // Event handlers
    const closeBtn = overlay.querySelector('button:first-child');
    const prevBtn = overlay.querySelectorAll('button')[1];
    const nextBtn = overlay.querySelectorAll('button')[2];

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
        overlay.querySelector('div:last-child').textContent = `${currentIndex + 1} / ${images.length}`;
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
        overlay.querySelector('div:last-child').textContent = `${currentIndex + 1} / ${images.length}`;
    });

    // Touch swipe
    let touchStartX = 0;
    overlay.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    overlay.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
    });

    // Keyboard
    function handleKey(e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    }

    document.addEventListener('keydown', handleKey);

    function closeLightbox() {
        overlay.style.opacity = '0';
        document.removeEventListener('keydown', handleKey);
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

/* ═══════════════════════════════════════════════════════════
   LOVE LETTER
═══════════════════════════════════════════════════════════ */

function initLoveLetter() {
    const letterText = document.getElementById('letter-text');
    if (!letterText) return;

    const paragraphs = [
        "Bu mektubu yazarken, seninle geçirdiğim her anı düşünüyorum. İlk bakışta başlayan bu hikaye, her gün daha da güzelleşiyor.",
        "Gülüşün, karanlık günlerimi aydınlatan bir güneş gibi. Sesini duyduğumda kalbim dans ediyor, gözlerine baktığımda kendimi evimde hissediyorum.",
        "Seninle olmak, her sabah yeni bir mucizeye uyanmak gibi. Her anımız, hafızama kazınmış birer hazine.",
        "Seni sevmek, hayatımda yaptığım en doğru şey. Ve bu sevgi, her geçen gün daha da derinleşiyor.",
        "Sen benim en güzel rüyam, en tatlı gerçeğimsin. Seninle sonsuza dek yürümek istiyorum..."
    ];

    paragraphs.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        letterText.appendChild(p);
    });
}

/* ═══════════════════════════════════════════════════════════
   ROSE BOUQUET & CARD
═══════════════════════════════════════════════════════════ */

function initBouquet() {
    const bouquet = document.getElementById('bouquet');
    const giftCard = document.getElementById('gift-card');

    if (!bouquet) return;

    // Bouquet hover effect
    bouquet.addEventListener('click', () => {
        // Create rose petals explosion
        createRosePetals(bouquet);

        // Haptic feedback on mobile
        if ('vibrate' in navigator) {
            navigator.vibrate([30, 20, 30]);
        }
    });

    // Card flip on click (for mobile)
    if (giftCard) {
        giftCard.addEventListener('click', () => {
            giftCard.classList.toggle('flipped');
        });
    }
}

function createRosePetals(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    const colors = ['#DC143C', '#FF1493', '#FF6B8A', '#E63950', '#B91030'];

    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        petal.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${Math.random() * 15 + 10}px;
            height: ${Math.random() * 15 + 10}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50% 0 50% 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.8;
        `;
        document.body.appendChild(petal);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 80;
        const rotation = Math.random() * 720;

        gsap.to(petal, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity + Math.random() * 100,
            rotation: rotation,
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
            onComplete: () => petal.remove()
        });
    }
}

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const colors = ['#DC143C', '#FF1493', '#FFB6C1', '#F7E7CE', '#D4AF37'];

    for (let i = 0; i < 40; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(confetti);

        const angle = (i / 40) * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        const rotation = Math.random() * 720;

        gsap.to(confetti, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity - 100,
            rotation: rotation,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => confetti.remove()
        });
    }
}

/* ═══════════════════════════════════════════════════════════
   MUSIC PLAYER
═══════════════════════════════════════════════════════════ */

function initMusicPlayer() {
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const vinylDisc = document.getElementById('vinyl-disc');

    if (!bgMusic || !musicToggle) return;

    // Set volume
    bgMusic.volume = 0.5;

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            const playPromise = bgMusic.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicToggle.classList.add('playing');
                    if (vinylDisc) vinylDisc.classList.add('spinning');
                }).catch(err => {
                    console.log('Play failed:', err);
                });
            }
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            if (vinylDisc) vinylDisc.classList.remove('spinning');
        }
    });

    // Sync vinyl with music state
    bgMusic.addEventListener('play', () => {
        musicToggle.classList.add('playing');
        if (vinylDisc) vinylDisc.classList.add('spinning');
    });

    bgMusic.addEventListener('pause', () => {
        musicToggle.classList.remove('playing');
        if (vinylDisc) vinylDisc.classList.remove('spinning');
    });
}

/* ═══════════════════════════════════════════════════════════
   SONG PLAYER (Section specific)
═══════════════════════════════════════════════════════════ */

function initSongPlayer() {
    const bgMusic = document.getElementById('bg-music');
    const songPlayBtn = document.getElementById('song-play-btn');
    const progressBar = document.getElementById('song-progress');
    const vinylDisc = document.getElementById('vinyl-disc');
    const musicToggle = document.getElementById('music-toggle');

    if (!bgMusic || !songPlayBtn) return;

    songPlayBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                songPlayBtn.classList.add('playing');
            }).catch(console.log);
        } else {
            bgMusic.pause();
            songPlayBtn.classList.remove('playing');
        }
    });

    // Sync states
    bgMusic.addEventListener('play', () => {
        songPlayBtn.classList.add('playing');
    });

    bgMusic.addEventListener('pause', () => {
        songPlayBtn.classList.remove('playing');
    });

    // Progress bar
    bgMusic.addEventListener('timeupdate', () => {
        if (progressBar && bgMusic.duration) {
            const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
            progressBar.style.width = progress + '%';
        }
    });
}

/* ═══════════════════════════════════════════════════════════
   PROMISES
═══════════════════════════════════════════════════════════ */

function initPromises() {
    const container = document.getElementById('promises-container');
    if (!container) return;

    const promises = [
        "Seni her gün daha çok seveceğim ve bunu sana hissettireceğim",
        "Zor günlerde yanında olacak, elini hiç bırakmayacağım",
        "Hayallerini destekleyecek, seninle birlikte gerçekleştireceğim",
        "Seni her zaman güldürecek, mutluluğun için çabalayacağım",
        "Kalbimi sadece sana açık tutacak, aşkımızı koruyacağım",
        "Sonsuza dek sadık kalacak, güvenini asla boşa çıkarmayacağım",
        "Her anı seninle özel kılacak, birlikte anılar biriktireceğiz"
    ];

    promises.forEach((promise, index) => {
        const item = document.createElement('div');
        item.className = 'promise-item';
        item.setAttribute('data-aos', 'fade-left');
        item.setAttribute('data-aos-delay', (index * 100).toString());
        item.innerHTML = `
            <div class="promise-number">${index + 1}</div>
            <p class="promise-text">${promise}</p>
        `;
        container.appendChild(item);
    });
}

/* ═══════════════════════════════════════════════════════════
   VIDEO PLAYER
═══════════════════════════════════════════════════════════ */

function initVideoPlayer() {
    const video = document.getElementById('love-video');
    const playBtn = document.getElementById('video-play-btn');

    if (!video || !playBtn) return;

    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play().then(() => {
                playBtn.classList.add('hidden');
            }).catch(console.log);
        }
    });

    video.addEventListener('pause', () => {
        playBtn.classList.remove('hidden');
    });

    video.addEventListener('ended', () => {
        playBtn.classList.remove('hidden');
    });

    video.addEventListener('click', () => {
        if (!video.paused) {
            video.pause();
        }
    });
}

/* ═══════════════════════════════════════════════════════════
   FINALE HEARTS
═══════════════════════════════════════════════════════════ */

function initFinaleHearts() {
    const canvas = document.getElementById('finale-hearts');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let hearts = [];
    const maxHearts = window.innerWidth < 768 ? 15 : 30;

    function resize() {
        const section = canvas.parentElement;
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 30,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 2 + 1.5,
            opacity: Math.random() * 0.5 + 0.3,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2
        };
    }

    function drawHeart(heart) {
        ctx.save();
        ctx.translate(heart.x, heart.y);
        ctx.rotate(heart.rotation * Math.PI / 180);
        ctx.globalAlpha = heart.opacity;

        const s = heart.size;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(s * 0.5, -s * 0.3, s, s * 0.3, 0, s);
        ctx.bezierCurveTo(-s, s * 0.3, -s * 0.5, -s * 0.3, 0, s * 0.3);

        const gradient = ctx.createRadialGradient(0, s * 0.3, 0, 0, s * 0.3, s);
        gradient.addColorStop(0, '#FFB6C1');
        gradient.addColorStop(1, '#DC143C');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        while (hearts.length < maxHearts) {
            hearts.push(createHeart());
        }

        hearts.forEach((heart, i) => {
            heart.y -= heart.speed;
            heart.rotation += heart.rotationSpeed;
            heart.x += Math.sin(heart.y * 0.01) * 0.5;

            drawHeart(heart);

            if (heart.y < -30) {
                hearts[i] = createHeart();
            }
        });

        requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener('resize', resize);

    // Only animate when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
                observer.disconnect();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(canvas);
}

/* ═══════════════════════════════════════════════════════════
   CLICK HEARTS
═══════════════════════════════════════════════════════════ */

function initClickHearts() {
    document.addEventListener('click', (e) => {
        // Skip interactive elements
        if (e.target.closest('button, a, .gift-box, .gallery-item, video, .swiper-slide')) return;

        createClickHearts(e.clientX, e.clientY);
    });
}

function createClickHearts(x, y) {
    const colors = ['#DC143C', '#FF1493', '#FFB6C1'];

    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${Math.random() * 12 + 8}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(heart);

        const angle = (i / 6) * Math.PI * 2;
        const distance = Math.random() * 60 + 30;

        gsap.to(heart, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance - 40,
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => heart.remove()
        });
    }
}

/* ═══════════════════════════════════════════════════════════
   SCROLL ANIMATIONS
═══════════════════════════════════════════════════════════ */

function initScrollAnimations() {
    // Hero parallax
    const heroImage = document.querySelector('#hero .hero-bg-img');
    if (heroImage) {
        gsap.to(heroImage, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

/* ═══════════════════════════════════════════════════════════
   FIREWORKS ANIMATION
═══════════════════════════════════════════════════════════ */

function initFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let fireworks = [];
    let particles = [];
    let isActive = false;

    function resize() {
        const section = canvas.parentElement;
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.5 + 50;
            this.speed = Math.random() * 3 + 4;
            this.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.3;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.color = ['#DC143C', '#FF1493', '#FFD700', '#FF6B8A', '#F7E7CE'][Math.floor(Math.random() * 5)];
            this.trail = [];
        }

        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 10) this.trail.shift();

            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.05;

            return this.y <= this.targetY || this.vy >= 0;
        }

        draw() {
            // Trail
            this.trail.forEach((pos, i) => {
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 2 * (i / this.trail.length), 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = i / this.trail.length * 0.5;
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Main dot
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        explode() {
            const particleCount = 80;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.color = color;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            this.size = Math.random() * 3 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.08;
            this.vx *= 0.98;
            this.alpha -= this.decay;
            return this.alpha > 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function animate() {
        if (!isActive) return;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw fireworks
        fireworks = fireworks.filter(fw => {
            if (fw.update()) {
                fw.explode();
                return false;
            }
            fw.draw();
            return true;
        });

        // Update and draw particles
        particles = particles.filter(p => {
            if (p.update()) {
                p.draw();
                return true;
            }
            return false;
        });

        requestAnimationFrame(animate);
    }

    function launchFirework() {
        fireworks.push(new Firework());
    }

    // Observe section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isActive) {
                isActive = true;
                resize();
                animate();

                // Launch fireworks periodically
                const interval = setInterval(() => {
                    if (isActive) {
                        launchFirework();
                        if (Math.random() > 0.5) launchFirework();
                    }
                }, 800);

                // Stop after some time
                setTimeout(() => {
                    clearInterval(interval);
                }, 10000);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(canvas.parentElement);
    window.addEventListener('resize', resize);
}

/* ═══════════════════════════════════════════════════════════
   CONFETTI BUTTON
═══════════════════════════════════════════════════════════ */

function initConfettiButton() {
    const btn = document.getElementById('confetti-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        createMassiveConfetti();

        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100, 50, 100]);
        }
    });
}

function createMassiveConfetti() {
    const colors = ['#DC143C', '#FF1493', '#FFD700', '#FF6B8A', '#F7E7CE', '#B76E79', '#FFA500'];
    const shapes = ['circle', 'square', 'heart'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 12 + 6;
            const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
            const startY = window.innerHeight * 0.7;

            confetti.style.cssText = `
                position: fixed;
                left: ${startX}px;
                top: ${startY}px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                pointer-events: none;
                z-index: 9999;
                ${shape === 'circle' ? 'border-radius: 50%;' : ''}
                ${shape === 'heart' ? `
                    background: transparent;
                    width: 0; height: 0;
                    &::before, &::after {
                        content: '';
                        position: absolute;
                        width: ${size}px;
                        height: ${size * 1.5}px;
                        background: ${color};
                        border-radius: 50px 50px 0 0;
                    }
                ` : ''}
            `;

            document.body.appendChild(confetti);

            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 400 + 200;
            const rotation = Math.random() * 1080;

            gsap.to(confetti, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity - 300 + Math.random() * 600,
                rotation: rotation,
                opacity: 0,
                duration: Math.random() * 2 + 2,
                ease: 'power2.out',
                onComplete: () => confetti.remove()
            });
        }, i * 10);
    }

    // Add hearts rain
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: -50px;
                font-size: ${Math.random() * 20 + 15}px;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(heart);

            gsap.to(heart, {
                y: window.innerHeight + 100,
                x: (Math.random() - 0.5) * 200,
                rotation: Math.random() * 360,
                duration: Math.random() * 3 + 3,
                ease: 'none',
                onComplete: () => heart.remove()
            });
        }, i * 100 + 500);
    }
}

/* ═══════════════════════════════════════════════════════════
   SHARE FUNCTIONS
═══════════════════════════════════════════════════════════ */

function shareWhatsApp() {
    const text = encodeURIComponent('💕 Sana özel hazırladığım romantik bir sürpriz! Sevgililer Günün kutlu olsun! ' + window.location.href);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const btn = event.target.closest('.share-btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.style.background = '#10B981';
        btn.style.borderColor = '#10B981';
        btn.style.color = 'white';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 2000);
    });
}

// Make functions global
window.shareWhatsApp = shareWhatsApp;
window.copyLink = copyLink;

console.log('💕 Made with love for someone special - Valentine\'s Day 2025');
