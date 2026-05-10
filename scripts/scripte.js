const yearNode = document.getElementById("currentyear");
const lastModifiedNode = document.getElementById("lastModified");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (lastModifiedNode) {
  lastModifiedNode.textContent = `Derniere mise a jour: ${document.lastModified}`;
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealTargets = document.querySelectorAll(
  ".service-card, .audience-card, .gallery-card, .detail-card, .process-card, .product-card, .faq-card, .timeline-card, .commitment-card"
);

if ("IntersectionObserver" in window && revealTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealTargets.forEach((node) => observer.observe(node));
}

if (typeof emailjs !== "undefined") {
  emailjs.init("LPlQ6mTEaqauPp-P9");

  const form = document.getElementById("contact-form");
  const statusNode = document.getElementById("form-status");

  if (form && statusNode) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      statusNode.textContent = "Envoi en cours...";

      emailjs.sendForm("service_ye8qwrk", "template_ksgadah", this).then(
        () => {
          statusNode.textContent = "Votre message a ete envoye avec succes.";
          this.reset();
        },
        (error) => {
          statusNode.textContent = "L'envoi a echoue. Merci de reessayer ou de nous appeler directement.";
          console.error("EmailJS Error:", error);
        }
      );
    });
  }
}
