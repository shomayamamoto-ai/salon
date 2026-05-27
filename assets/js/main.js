/* =========================================================
   実り MINORI — LP interactions
   ========================================================= */
(function () {
  "use strict";

  /* ----- Header shadow on scroll ----- */
  const header = document.getElementById("siteHeader");
  const stickyCta = document.getElementById("stickyCta");
  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    header.classList.toggle("scrolled", y > 8);
    // show sticky CTA after the hero (~520px), hide near the footer
    const nearBottom = window.innerHeight + y > document.body.offsetHeight - 320;
    if (stickyCta) stickyCta.classList.toggle("show", y > 520 && !nearBottom);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Mobile nav toggle ----- */
  const toggle = document.getElementById("navToggle");
  const gnav = document.getElementById("gnav");
  const closeNav = () => {
    gnav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
  };
  if (toggle && gnav) {
    toggle.addEventListener("click", () => {
      const open = gnav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    });
    gnav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ----- FAQ accordion ----- */
  document.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const panel = btn.nextElementSibling;
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.style.maxHeight = expanded ? null : panel.scrollHeight + "px";
    });
  });

  /* ----- Scroll reveal ----- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ----- Footer year ----- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
