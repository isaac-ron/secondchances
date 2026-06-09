/* Second Chances mockup — shared behaviour
   - Quick Exit: leave fast + try to neutralise back-button history
   - Mobile nav toggle
   - Floating exit appears after scroll
   - Language toggle (visual only in mockup) */

(function () {
  "use strict";

  // ---- Quick exit -------------------------------------------------
  function quickExit() {
    // Open a neutral page in this tab; replace() so the site isn't in history.
    try { window.history.replaceState(null, "", "https://www.google.com"); } catch (e) {}
    window.location.replace("https://www.google.com");
  }
  document.querySelectorAll("[data-exit]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); quickExit(); });
  });
  // Single Esc exits (safety-critical: easy to press in a panic)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") quickExit();
  });

  // ---- Mobile nav -------------------------------------------------
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // ---- Floating exit after scroll ---------------------------------
  var floatExit = document.querySelector(".exit-float");
  if (floatExit) {
    window.addEventListener("scroll", function () {
      floatExit.style.display = window.scrollY > 400 ? "inline-flex" : "";
    }, { passive: true });
  }

  // ---- Language toggle (mockup: visual state only) ----------------
  document.querySelectorAll(".lang button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".lang button").forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
      });
      btn.setAttribute("aria-pressed", "true");
    });
  });

  // ---- Animate funds bars on view (Impact page) -------------------
  var fills = document.querySelectorAll(".fund-fill[data-pct]");
  if (fills.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.width = en.target.dataset.pct + "%";
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    fills.forEach(function (f) { f.style.width = "0%"; io.observe(f); });
  }
})();
