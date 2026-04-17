(function () {
    // Year in footer
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // Mobile nav
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    if (burger && nav) {
        burger.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        nav.querySelectorAll('.nav__link').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Reviews carousel
    var track = document.getElementById('reviewsTrack');
    var prevBtn = document.getElementById('reviewsPrev');
    var nextBtn = document.getElementById('reviewsNext');
    var dotsContainer = document.getElementById('reviewsDots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        var cards = track.querySelectorAll('.review-card');
        var total = cards.length;
        var current = 0;
        var autoTimer;

        // Build dots
        cards.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.className = 'reviews-dot' + (i === 0 ? ' is-active' : '');
            dot.setAttribute('aria-label', 'Отзыв ' + (i + 1));
            dot.addEventListener('click', function () { goTo(i); });
            dotsContainer.appendChild(dot);
        });

        function updateDots() {
            dotsContainer.querySelectorAll('.reviews-dot').forEach(function (d, i) {
                d.classList.toggle('is-active', i === current);
            });
        }

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            updateDots();
            resetAuto();
        }

        function resetAuto() {
            clearInterval(autoTimer);
            autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
        }

        prevBtn.addEventListener('click', function () { goTo(current - 1); });
        nextBtn.addEventListener('click', function () { goTo(current + 1); });

        // Touch swipe
        var startX = 0;
        track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', function (e) {
            var diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
        });

        resetAuto();
    }

    // Auto-close other service accordions when one opens (single-open)
    var services = document.querySelectorAll('.service');
    services.forEach(function (s) {
        s.addEventListener('toggle', function () {
            if (s.open) {
                services.forEach(function (other) {
                    if (other !== s) other.removeAttribute('open');
                });
            }
        });
    });
})();
