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

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let typingTimer;

    function typeText() {
        if (!typingElement) return;

        if (reducedMotion.matches) {
            typingElement.textContent = words[0];
            return;
        }

        const currentWord = words[wordIndex];

        characterIndex += deleting ? -1 : 1;
        typingElement.textContent = currentWord.slice(0, characterIndex);

        let delay = deleting ? 45 : 90;

        if (!deleting && characterIndex === currentWord.length) {
            deleting = true;
            delay = 1300;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        typingTimer = setTimeout(typeText, delay);
    }

    if (typingElement) {
        typeText();

        reducedMotion.addEventListener("change", () => {
            clearTimeout(typingTimer);

            if (reducedMotion.matches) {
                typingElement.textContent = words[0];
            } else {
                characterIndex = 0;
                deleting = false;
                typeText();
            }
        });
    }

    // 3. LEGAL INFORMATION DROPDOWN
    const legalToggle = document.getElementById("legalToggle");
    const legalMenu = document.getElementById("legalLinks");
    const footerLegal = document.querySelector(".footer-legal");

    function closeLegalMenu() {
        if (!legalToggle || !legalMenu) return;

        legalMenu.hidden = true;
        legalToggle.setAttribute("aria-expanded", "false");
    }

    if (legalToggle && legalMenu) {
        closeLegalMenu();

        legalToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                legalToggle.getAttribute("aria-expanded") === "true";

            legalMenu.hidden = isOpen;
            legalToggle.setAttribute("aria-expanded", String(!isOpen));
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (footerLegal && !footerLegal.contains(event.target)) {
                closeLegalMenu();
            }
        });

        // Close menu with Escape
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                const wasOpen =
                    legalToggle.getAttribute("aria-expanded") === "true";

                closeLegalMenu();

                if (wasOpen) {
                    legalToggle.focus();
                }
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