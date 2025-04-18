document.addEventListener("DOMContentLoaded", function () {
  const plansButton = document.getElementById("plans");
  const dietButton = document.getElementById("diet");
  const storeButton = document.getElementById("store");
  const ctaButton = document.getElementById("cta-button");
  const arrow = document.querySelector(".arrow"); // Select by class
  const target = document.getElementById("key-feature");

  // Add event listeners only if the elements exist
  if (plansButton) {
      plansButton.addEventListener("click", function () {
          window.location.href = "/program"; // Correct route
      });
  }

  if (dietButton) {
      dietButton.addEventListener("click", function () {
          window.location.href = "/diet"; // Correct route
      });
  }

  if (storeButton) {
      storeButton.addEventListener("click", function () {
          window.location.href = "/store"; // Correct route
      });
  }

  if (ctaButton) {
      ctaButton.addEventListener("click", function () {
          window.location.href = "/program"; // Correct route
      });
  }

  if (arrow && target) {
      arrow.addEventListener("click", function () {
          target.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
      });
  }
});