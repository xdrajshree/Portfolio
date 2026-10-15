
/* ========================================
   RAJ SHREE PORTFOLIO — JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. AUTOMATIC COPYRIGHT YEAR
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. TYPING ANIMATION
    const typingElement = document.getElementById("typing");
    const words = [
        "Web Developer",
        "Programmer",
        "Tech Enthusiast"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let typingTimer;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function typeText() {
        if (!typingElement) return;

        if (reducedMotion.matches) {
            typingElement.textContent = words[0];
            return;
        }

        const currentWord = words[wordIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingElement.textContent = currentWord.slice(
            0,
            characterIndex
        );

        let delay = deleting ? 45 : 90;

        if (!deleting && characterIndex === currentWord.length) {
            deleting = true;
            delay = 1300;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        typingTimer = window.setTimeout(typeText, delay);
    }

    if (typingElement) {
        typeText();
    }

    // Stop the animation if reduced motion is enabled later.
    reducedMotion.addEventListener("change", () => {
        window.clearTimeout(typingTimer);

        if (typingElement && reducedMotion.matches) {
            typingElement.textContent = words[0];
        } else if (typingElement) {
            characterIndex = 0;
            deleting = false;
            typeText();
        }
    });

    // 3. LEGAL INFORMATION DROPDOWN
    const legalToggle = document.getElementById("legalToggle");
    const legalMenu = document.getElementById("legalLinks");
    const footerLegal = document.querySelector(".footer-legal");

    function closeLegalMenu(returnFocus = false) {
        if (!legalToggle || !legalMenu) return;

        legalToggle.setAttribute("aria-expanded", "false");
        legalMenu.hidden = true;

        if (returnFocus) {
            legalToggle.focus();
        }
    }

    if (legalToggle && legalMenu) {
        // Start closed
        closeLegalMenu();

        legalToggle.addEventListener("click", () => {
            const isOpen =
                legalToggle.getAttribute("aria-expanded") === "true";

            legalToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            legalMenu.hidden = isOpen;
        });

        // Close when clicking outside the menu
        document.addEventListener("click", (event) => {
            if (
                footerLegal &&
                !footerLegal.contains(event.target)
            ) {
                closeLegalMenu();
            }
        });

        // Close when Escape is pressed
        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                legalToggle.getAttribute("aria-expanded") === "true"
            ) {
                closeLegalMenu(true);
            }
        });
    }

    // 4. DARK / LIGHT MODE
    const themeToggle = document.getElementById("themeToggle");

    function updateThemeButton() {
        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");
        const isLight = document.body.classList.contains("light-mode");

        if (icon) {
            icon.classList.toggle("fa-moon", !isLight);
            icon.classList.toggle("fa-sun", isLight);
        }

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

        themeToggle.title = isLight
            ? "Switch to dark mode"
            : "Switch to light mode";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            updateThemeButton();
        });

        updateThemeButton();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const legalToggle = document.getElementById("legalToggle");
    const legalMenu = document.getElementById("legalLinks");
    const themeToggle = document.getElementById("themeToggle");

    // Legal dropdown
    if (legalToggle && legalMenu) {
        legalToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                legalToggle.getAttribute("aria-expanded") === "true";

            legalToggle.setAttribute("aria-expanded", String(!isOpen));
            legalMenu.hidden = isOpen;
        });

        document.addEventListener("click", (event) => {
            if (!event.target.closest(".footer-legal")) {
                legalMenu.hidden = true;
                legalToggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                legalMenu.hidden = true;
                legalToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Dark / light mode
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            const isLight =
                document.body.classList.contains("light-mode");
            const icon = themeToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-moon", !isLight);
                icon.classList.toggle("fa-sun", isLight);
            }

            themeToggle.setAttribute(
                "aria-label",
                isLight ? "Switch to dark mode" : "Switch to light mode"
            );
        });
    }
});
