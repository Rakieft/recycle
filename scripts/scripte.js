const yearNode = document.getElementById("currentyear");
const lastModifiedNode = document.getElementById("lastModified");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (lastModifiedNode) {
  lastModifiedNode.textContent = `Dernière mise à jour : ${document.lastModified}`;
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealTargets = document.querySelectorAll(
  ".service-card, .audience-card, .gallery-card, .detail-card, .process-card, .product-card, .faq-card, .timeline-card, .commitment-card, .testimonial-card, .team-card, .event-card, .rsvp-card, .event-photo-card"
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

  const forms = document.querySelectorAll(".emailjs-form");

  forms.forEach((form) => {
    const statusId = form.getAttribute("data-status-target");
    const statusNode = statusId ? document.getElementById(statusId) : null;
    const serviceId = form.getAttribute("data-emailjs-service") || "service_ye8qwrk";
    const templateId = form.getAttribute("data-emailjs-template") || "template_ksgadah";
    if (!statusNode) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      statusNode.textContent = "Envoi en cours...";

      emailjs.sendForm(serviceId, templateId, this).then(
        () => {
          statusNode.textContent = "Votre demande a été envoyée avec succès.";
          this.reset();
        },
        (error) => {
          statusNode.textContent = "L'envoi a échoué. Merci de réessayer ou de nous appeler directement.";
          console.error("EmailJS Error:", error);
        }
      );
    });
  });
}

const carouselPrevButtons = document.querySelectorAll("[data-carousel-prev]");
const carouselNextButtons = document.querySelectorAll("[data-carousel-next]");

carouselPrevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.getAttribute("data-carousel-prev"));
    if (!target) return;
    target.scrollBy({ left: -280, behavior: "smooth" });
  });
});

carouselNextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.getAttribute("data-carousel-next"));
    if (!target) return;
    target.scrollBy({ left: 280, behavior: "smooth" });
  });
});
