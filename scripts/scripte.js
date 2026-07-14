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
  emailjs.init("nyNjo9NkAUQM_UOw7");
  const EMAILJS_SERVICE_ID = "service_ec8xt88";
  const EMAILJS_TEMPLATE_ID = "template_zla39td";

  const forms = document.querySelectorAll(".emailjs-form");

  forms.forEach((form) => {
    const statusId = form.getAttribute("data-status-target");
    const statusNode = statusId ? document.getElementById(statusId) : null;
    const serviceId = EMAILJS_SERVICE_ID;
    const templateId = EMAILJS_TEMPLATE_ID;
    if (!statusNode) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      statusNode.textContent = "Envoi en cours...";

      const ensureHiddenField = (name, value) => {
        let input = this.querySelector(`input[name="${name}"]`);
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          this.appendChild(input);
        }
        input.value = value;
      };

      const userName = this.querySelector('[name="user_name"]')?.value || "";
      const userEmail = this.querySelector('[name="user_email"]')?.value || "";
      const userPhone = this.querySelector('[name="user_phone"]')?.value || "";
      const userAddress = this.querySelector('[name="user_address"]')?.value || "";
      const participantCount = this.querySelector('[name="participant_count"]')?.value || "";
      const serviceType = this.querySelector('[name="service_type"]')?.value || "";

      // Fallback fields that help when the EmailJS template still references older variables.
      ensureHiddenField("name", userName);
      ensureHiddenField("email", userEmail);
      ensureHiddenField("phone", userPhone);
      ensureHiddenField("address", userAddress);
      ensureHiddenField("participants", participantCount);
      ensureHiddenField("service", serviceType);
      ensureHiddenField("time", new Date().toLocaleString("fr-FR"));

      emailjs.sendForm(serviceId, templateId, this).then(
        () => {
          statusNode.textContent = "Votre demande a été envoyée avec succès.";
          this.reset();
        },
        (error) => {
          const detail = error?.text || error?.message || "Erreur inconnue";
          statusNode.textContent = `L'envoi a échoué : ${detail}`;
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
