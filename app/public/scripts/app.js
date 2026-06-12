/* Second Chances — shared behaviour (DAYLIGHT)
   - Quick exit: single Esc + any [data-exit], history replaced
   - Animated header (scrolled state), mobile nav
   - Hero entrance + light parallax
   - Reveal-on-view, count-up stats, fund-bar fill
   All motion respects prefers-reduced-motion. */

(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Quick exit -------------------------------------------------
  function quickExit() {
    try { window.history.replaceState(null, "", "https://www.google.com"); } catch (e) {}
    window.location.replace("https://www.google.com");
  }
  document.querySelectorAll("[data-exit]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); quickExit(); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") quickExit(); });

  // ---- Header scrolled state -------------------------------------
  var header = document.querySelector(".site-header");
  function onScrollHeader() { if (header) header.classList.toggle("scrolled", window.scrollY > 40); }
  onScrollHeader();

  // ---- Mobile nav -------------------------------------------------
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      if (open && header) header.classList.add("scrolled");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); onScrollHeader(); }
    });
  }

  // ---- Hero parallax ---------------------------------------------
  var heroMedia = document.querySelector(".hero-media");
  var ticking = false;
  window.addEventListener("scroll", function () {
    onScrollHeader();
    if (heroMedia && !reduce && !ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < 1000) heroMedia.style.transform = "translate3d(0," + (y * 0.10) + "px,0)";
        ticking = false;
      });
    }
  }, { passive: true });

  // ---- Language toggle (visual state only) -----------------------
  document.querySelectorAll(".lang button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
    });
  });

  // ---- Hero entrance ---------------------------------------------
  var hero = document.querySelector(".hero");
  if (hero) { requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add("ready"); }); }); }

  // ---- Reveal on view --------------------------------------------
  var reveals = document.querySelectorAll("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); } });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  // ---- Fund bars fill on view ------------------------------------
  var fills = document.querySelectorAll(".fund-fill[data-pct]");
  if (fills.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      fills.forEach(function (f) { f.style.width = f.dataset.pct + "%"; });
    } else {
      var fo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.style.width = en.target.dataset.pct + "%"; fo.unobserve(en.target); } });
      }, { threshold: 0.5 });
      fills.forEach(function (f) { fo.observe(f); });
    }
  }

  // ---- Count-up stats --------------------------------------------
  var nums = document.querySelectorAll(".num[data-count]");
  if (nums.length && !reduce && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || "", start = null, dur = 950;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step); co.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { co.observe(n); });
  }
})();
