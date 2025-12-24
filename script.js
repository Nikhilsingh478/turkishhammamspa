// script for navbar
const menuBtn = document.getElementById("menu-toggle");
const navOverlay = document.getElementById("fullscreen-nav");
const navLinks = document.querySelectorAll(".elem");

let isNavOpen = false;

menuBtn.addEventListener("click", () => {
  if (!isNavOpen) {
    navOverlay.classList.add("active");
    menuBtn.classList.add("open");

    gsap.from(navLinks, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    });

    isNavOpen = true;
  } else {
    gsap.to(navOverlay, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        navOverlay.classList.remove("active");
        navOverlay.style.opacity = ""; // reset inline style
        isNavOpen = false;
      },
    });
    menuBtn.classList.remove("open");
  }
});

navLinks.forEach((elem) => {
  elem.addEventListener("click", () => {
    // Get the target section name (from <li> text or href inside <a>)
    let targetText = elem.querySelector("li")?.innerText.toLowerCase();

    // Special case for the one that uses an anchor tag with href
    const anchor = elem.querySelector("a");
    if (anchor && anchor.getAttribute("href").startsWith("#")) {
      const id = anchor.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Fallback: Use innerText to match section ID
      const section = document.getElementById(targetText);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }

    // Animate closing the overlay
    gsap.to(navOverlay, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        navOverlay.classList.remove("active");
        navOverlay.style.opacity = "";
        isNavOpen = false;
      },
    });

    // Reset hamburger button
    menuBtn.classList.remove("open");
  });
});

// js for copying email and number
// Email functionality
const emailElement = document.getElementById("email1");
emailElement.addEventListener("click", () => {
  const email = emailElement.textContent;
  window.location.href = `mailto:${email}`;
});

// Mobile number copy functionality
const mobileElement = document.getElementById("mobile");
const popup = document.getElementById("popup");

mobileElement.addEventListener("click", () => {
  const mobileNumber = mobileElement.textContent;

  // Copy to clipboard
  navigator.clipboard
    .writeText(mobileNumber)
    .then(() => {
      // Show popup notification
      popup.classList.remove("hidden");
      popup.classList.add("show");

      // Hide popup after 2 seconds
      setTimeout(() => {
        popup.classList.remove("show");
        popup.classList.add("hidden");
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
});

// Handle book now clicks with ripple effect
function handleBookNow(button, serviceName) {
  // Create ripple effect
  const ripple = document.createElement("div");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.className = "ripple-effect";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = "50%";
  ripple.style.top = "50%";
  ripple.style.transform = "translate(-50%, -50%) scale(0)";

  button.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);

  // Show booking alert
  setTimeout(() => {
    alert(
      "Booking functionality would be implemented here for: " + serviceName
    );
  }, 150);
}

// Dark mode toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.documentElement.classList.contains("dark")
  );
}

// Load saved dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark");
}

// Handle keyboard navigation
document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Enter" || e.key === " ") &&
    e.target.classList.contains("spa-card")
  ) {
    e.preventDefault();
    const button = e.target.querySelector(".book-btn");
    if (button) {
      button.click();
    }
  }
});

// Add enhanced shadow effects on hover
document.querySelectorAll(".spa-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 25px 50px rgba(189, 175, 113, 0.4)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.boxShadow = "0 20px 25px rgba(0, 0, 0, 0.1)";
  });
});

// IntersectionObserver-based scroll animations with graceful fallback
(function () {
  var animated = document.querySelectorAll("[data-animate]");
  if (!("IntersectionObserver" in window)) {
    animated.forEach(function (el) {
      el.classList.add("in-view");
    });
    return;
  }
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );

  animated.forEach(function (el) {
    observer.observe(el);
  });
})();

// Hours config (edit to change timings; use "Closed" as needed)
// 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
const hours = {
  1: "09:00 – 19:00",
  2: "09:00 – 19:00",
  3: "09:00 – 19:00",
  4: "09:00 – 19:00",
  5: "09:00 – 20:00",
  6: "10:00 – 18:00",
  0: "10:00 – 16:00",
};

(function populateHours() {
  var table = document.querySelector(".hours-table");
  if (!table) return;

  // Fill the timings row from the hours config
  table.querySelectorAll("tbody td[data-day]").forEach(function (td) {
    var d = Number(td.getAttribute("data-day"));
    td.textContent = hours[d] || "Closed";
  });

  // Highlight today's column (both header and timing cell)
  var today = new Date().getDay();
  var th = table.querySelector('thead th[data-day="' + today + '"]');
  var td = table.querySelector('tbody td[data-day="' + today + '"]');
  if (th) th.classList.add("is-today");
  if (td) td.classList.add("is-today");
})();

// Fallback system for about me animations using Intersection Observer
const aboutObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Check if animations haven't started yet
        const aboutAnimations = document.querySelectorAll(
          "#about .animate-left, #about .animate-right, #about .animate-top, #about .animate-bottom"
        );

        const hasRunningAnimations = Array.from(aboutAnimations).some(
          (el) => el.style.animationPlayState === "running"
        );

        if (!hasRunningAnimations) {
          // Force start animations if they haven't started
          aboutAnimations.forEach((el) => {
            el.style.animationPlayState = "running";
            // Force restart
            el.style.animation = "none";
            el.offsetHeight;
            el.style.animation = null;
          });
        }

        // Stop observing after ensuring animations are running
        aboutObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of about section is visible
    rootMargin: "0px 0px -50px 0px",
  }
);

// Start observing about section
const aboutSection = document.querySelector("#about");
if (aboutSection) {
  aboutObserver.observe(aboutSection);
}




// =============================
(function () {
    var root = document.querySelector('.wa-fab');
    if (!root) return;
    var btn = root.querySelector('.wa-fab__btn');
    var number = (root.getAttribute('data-number') || '').replace(/[^\d]/g, '');
    var message = root.getAttribute('data-message') || '';
    function buildLink(num, msg) {
      var base = 'https://wa.me/' + num;
      if (msg) base += '?text=' + encodeURIComponent(msg);
      return base;
    }
    btn.addEventListener('click', function () {
      if (!number) return;
      window.open(buildLink(number, message), '_blank', 'noopener');
    });
  })();