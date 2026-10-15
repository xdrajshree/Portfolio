```javascript
/* ==========================================
   RAJ SHREE PORTFOLIO — MAIN JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       1. AUTOMATIC COPYRIGHT YEAR
    ====================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ======================================
       2. GOLD PARTICLE CANVAS ANIMATION
    ====================================== */

    const canvas = document.getElementById("gold-grid");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let ctx = null;
    let points = [];
    let animationFrame = null;

    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
    }

    function createPoints() {
        if (!canvas || !ctx) return;

        const count = Math.min(
            42,
            Math.floor(window.innerWidth / 32)
        );

        points = Array.from({ length: count }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * Math.min(window.innerHeight, 760),
            radius: Math.random() * 1.2 + 0.5,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.12
        }));
    }

    function resizeCanvas() {
        if (!canvas || !ctx) return;

        const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = Math.round(
            window.innerWidth * pixelRatio
        );

        canvas.height = Math.round(
            window.innerHeight * pixelRatio
        );

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        ctx.setTransform(
            pixelRatio, 0, 0, pixelRatio, 0, 0
        );

        createPoints();
        renderCanvas();
    }

    function renderCanvas() {
        if (!canvas || !ctx) return;

        ctx.clearRect(
            0, 0, window.innerWidth, window.innerHeight
        );

        ctx.fillStyle = "rgba(215, 173, 80, 0.42)";
        ctx.strokeStyle = "rgba(215, 173, 80, 0.08)";
        ctx.lineWidth = 1;

        points.forEach((point, index) => {

            if (!prefersReducedMotion.matches) {
                point.x += point.vx;
                point.y += point.vy;
            }

            if (
                point.x < 0 ||
                point.x > window.innerWidth
            ) {
                point.vx *= -1;
            }

            if (
                point.y < 0 ||
                point.y > window.innerHeight
            ) {
                point.vy *= -1;
            }

            // Draw particle
            ctx.beginPath();

            ctx.arc(
                point.x,
                point.y,
                point.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();

            // Connect nearby particles
            for (
                let next = index + 1;
                next < points.length;
                next++
            ) {
                const other = points[next];

                const distance = Math.hypot(
                    point.x - other.x,
                    point.y - other.y
                );

                if (distance < 150) {
                    ctx.globalAlpha = 1 - distance / 150;

                    ctx.beginPath();
                    ctx.moveTo(point.x, point.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();

                    ctx.globalAlpha = 1;
                }
            }
        });

        if (!prefersReducedMotion.matches) {
            animationFrame = requestAnimationFrame(
                renderCanvas
            );
        }
    }

    function startCanvasAnimation() {
        if (!canvas || !ctx) return;

        cancelAnimationFrame(animationFrame);
        renderCanvas();
    }

    function handleMotionPreferenceChange() {
        startCanvasAnimation();
    }

    if (canvas && ctx) {
        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas,
            { passive: true }
        );

        prefersReducedMotion.addEventListener(
            "change",
            handleMotionPreferenceChange
        );
    }


    /* ======================================
       3. PROJECT FILTERING
    ====================================== */

    const filterButtons = document.querySelectorAll(
        ".filter-button"
    );

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            // Update selected filter button
            filterButtons.forEach((item) => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);

                item.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            // Filter project cards
            projectCards.forEach((card) => {
                const category = card.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    category === selectedFilter;

                card.classList.toggle(
                    "hidden",
                    !shouldShow
                );

                card.setAttribute(
                    "aria-hidden",
                    String(!shouldShow)
                );
            });
        });
    });


    /* ======================================
       4. LEGAL FOOTER DROPDOWN
    ====================================== */

    const legalToggle = document.getElementById(
        "legalToggle"
    );

    const legalLinks = document.getElementById(
        "legalLinks"
    );

    const footerLegal = document.querySelector(
        ".footer-legal"
    );

    function closeLegalMenu(returnFocus = false) {
        if (!legalToggle || !legalLinks) return;

        legalToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        legalLinks.hidden = true;

        if (returnFocus) {
            legalToggle.focus();
        }
    }

    if (legalToggle && legalLinks) {

        // Ensure the initial state is closed
        closeLegalMenu();

        legalToggle.addEventListener("click", () => {

            const isExpanded =
                legalToggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            legalToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            legalLinks.hidden = isExpanded;
        });

        // Close when clicking outside the legal section
        document.addEventListener("click", (event) => {

            if (
                footerLegal &&
                !footerLegal.contains(event.target)
            ) {
                closeLegalMenu();
            }
        });

        // Close with Escape
        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                legalToggle.getAttribute(
                    "aria-expanded"
                ) === "true"
            ) {
                closeLegalMenu(true);
            }
        });
    }


    /* ======================================
       5. LIGHT / DARK MODE
    ====================================== */

    const themeToggle = document.querySelector(
        ".toggle"
    );

    function updateThemeIcon() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        const isLightMode =
            document.body.classList.contains("light-mode");

        icon.classList.toggle(
            "fa-moon",
            !isLightMode
        );

        icon.classList.toggle(
            "fa-sun",
            isLightMode
        );

        themeToggle.setAttribute(
            "aria-label",
            isLightMode
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    }

    // Keep compatibility with onclick="toggleMode()"
    window.toggleMode = function () {
        document.body.classList.toggle("light-mode");
        updateThemeIcon();
    };

    if (themeToggle) {
        updateThemeIcon();
    }

});
```