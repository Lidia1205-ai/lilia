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
