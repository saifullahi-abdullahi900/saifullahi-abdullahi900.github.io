var CONTACT_EMAIL = "saifullahiabdullahi900@gmail.com";

// Hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.addEventListener("click", function () {
      const isOpen = hamburger.classList.toggle("open");
      navLinks.classList.toggle("open", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });
    // Close on link click
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});

// Form validation helper
function validateForm(form) {
  let valid = true;
  form.querySelectorAll(".form-error-msg").forEach(function (el) {
    el.classList.remove("visible");
  });
  form.querySelectorAll("input, textarea, select").forEach(function (field) {
    field.classList.remove("field-error");
  });

  form
    .querySelectorAll("input[required], textarea[required], select[required]")
    .forEach(function (field) {
      if (!field.value.trim()) {
        valid = false;
        field.classList.add("field-error");
        var err =
          field.closest("label") &&
          field.closest("label").querySelector(".form-error-msg");
        if (err) err.classList.add("visible");
      }
      if (
        field.type === "email" &&
        field.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      ) {
        valid = false;
        field.classList.add("field-error");
        var err =
          field.closest("label") &&
          field.closest("label").querySelector(".form-error-msg");
        if (err) err.classList.add("visible");
      }
    });
  return valid;
}

function submitMailForm(form, subject) {
  if (!validateForm(form)) return;

  var data = new FormData(form);
  var name = data.get("name") || "";
  var email = data.get("email") || "";
  var type = data.get("type") || "Portfolio inquiry";
  var message = data.get("message") || "";
  var body = [
    "Name: " + name,
    "Email: " + email,
    "Project type: " + type,
    "",
    message,
  ].join("\n");

  window.location.href =
    "mailto:" +
    CONTACT_EMAIL +
    "?subject=" +
    encodeURIComponent(subject || "Portfolio inquiry") +
    "&body=" +
    encodeURIComponent(body);

  form.querySelector(".form-success").classList.add("visible");
}

// Filter bar logic for work page
document.addEventListener("DOMContentLoaded", function () {
  var filterBtns = document.querySelectorAll(".filter-bar button");
  var cards = document.querySelectorAll("#gallery .gallery-card");

  function showCard(card) {
    if (!card.classList.contains("hidden")) {
      card.classList.remove("filtered-out");
      return;
    }

    card.classList.remove("hidden");
    requestAnimationFrame(function () {
      card.classList.remove("filtered-out");
    });
  }

  function hideCard(card) {
    if (card.classList.contains("filtered-out")) return;

    function onTransitionEnd(event) {
      if (event.propertyName !== "opacity") return;
      if (card.classList.contains("filtered-out")) {
        card.classList.add("hidden");
      }
      card.removeEventListener("transitionend", onTransitionEnd);
    }

    card.addEventListener("transitionend", onTransitionEnd);
    card.classList.add("filtered-out");
  }

  if (filterBtns.length > 0 && cards.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        var filter = btn.getAttribute("data-filter");
        cards.forEach(function (card) {
          var tags = (card.getAttribute("data-tags") || "")
            .split(",")
            .map(function (t) {
              return t.trim();
            });

          if (
            filter === "all" ||
            tags.some(function (t) {
              return t === filter;
            })
          ) {
            showCard(card);
          } else {
            hideCard(card);
          }
        });
      });
    });
  }
});
