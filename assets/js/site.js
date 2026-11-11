/* The Mind Curator Studio — motion layer.
   GSAP 3.13 + ScrollTrigger + Lenis, self-hosted in assets/js/vendor/,
   per the official gsap-core / gsap-scrolltrigger skills. Content is
   visible by default: every hidden state is set from JS only, so a failed
   script load still shows the site. */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Smooth anchor scrolling (native fallback when Lenis is absent).
  var lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    if (window.gsap) {
      lenis.on("scroll", function () {
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      });
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(0);
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  if (!window.gsap || reduceMotion) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ---- Load sequence: headline lines rise, stickers pop, cards fan in.
     Trigger: on load. What moves: lines y 110% -> 0, stickers scale .6 -> 1
     with rotation to resting tilt, cards y 60 + fade. Timing: 0.9s lines,
     stagger 0.12s, power3.out; stickers back.out(1.7). End state: rest. ---- */
  var loadTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  loadTl
    .from(".hero-title .line-inner", { yPercent: 110, duration: 0.9, stagger: 0.12 })
    .from(".nav", { y: -24, autoAlpha: 0, duration: 0.6 }, 0.1)
    .from(".hero .sticker", { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1 }, 0.55)
    .from(".browser-card", { y: 60, autoAlpha: 0, duration: 0.8, stagger: 0.12 }, 0.5)
    .from(".hero-sub, .hero-cta, .trust-line", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.75);

  /* ---- Marquee: continuous loop, linear, no easing. ---- */
  gsap.to(".marquee-track", {
    xPercent: -50,
    duration: 22,
    ease: "none",
    repeat: -1
  });

  /* ---- About: word-by-word scrub, cream -> ink as you scroll. ---- */
  var aboutEl = document.getElementById("about-text");
  if (aboutEl) {
    aboutEl.innerHTML = aboutEl.textContent.trim().split(/\s+/)
      .map(function (w) { return '<span class="w">' + w + "</span>"; })
      .join(" ");
    gsap.to("#about-text .w", {
      opacity: 1,
      stagger: 0.06,
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "top 75%",
        end: "top 25%",
        scrub: true
      }
    });
  }

  /* ---- Section reveals, batched on enter. ---- */
  gsap.set(".rv", { autoAlpha: 0, y: 40 });
  ScrollTrigger.batch(".rv", {
    start: "top 88%",
    once: true,
    onEnter: function (batch) {
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, overwrite: true });
    }
  });

  /* ---- Work tiles: gentle parallax on scroll. ---- */
  gsap.utils.toArray(".work-tile").forEach(function (tile) {
    gsap.fromTo(tile, { y: 24 }, {
      y: -12,
      ease: "none",
      scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  /* ---- Footer wordmark: slides up on enter. ---- */
  gsap.from(".footer-word", {
    yPercent: 40,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".footer", start: "top 85%", once: true }
  });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
