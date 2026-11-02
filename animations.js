/* Portfolio motion and scroll reveals */
(() => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = document.querySelectorAll(
        "#about .section-heading, #about .about-card, " +
        "#skills .section-heading, #skills .skill-card, " +
        "#projects .section-heading, #projects .project-card, " +
        "#contact .section-heading, #contact .contact-description, " +
        "#contact .contact-email, #contact .social-links"
    );

    targets.forEach((element, index) => {
        element.classList.add("reveal");
        if (element.matches(".skill-card, .project-card")) {
            element.style.setProperty("--reveal-delay", `${(index % 5) * 90}ms`);
        }
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
        targets.forEach(element => element.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    targets.forEach(element => observer.observe(element));
})();
