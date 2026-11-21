/* DomeOS 系列官网 — 公共交互 */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var links = document.getElementById("navLinks");
  var toggle = document.getElementById("menuToggle");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var navHover = links ? links.querySelector(".nav-hover") : null;
  if (links && navHover) {
    var movePill = function (link) {
      if (!link || window.matchMedia("(max-width: 760px)").matches) return;
      navHover.style.setProperty("--pill-x", link.offsetLeft + "px");
      navHover.style.setProperty("--pill-w", link.offsetWidth + "px");
      links.classList.add("pill-on");
    };
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("mouseenter", function () { movePill(link); });
      link.addEventListener("focus", function () { movePill(link); });
    });
    links.addEventListener("mouseleave", function () {
      links.classList.remove("pill-on");
    });
    links.addEventListener("blur", function () {
      links.classList.remove("pill-on");
    }, true);
  }

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("in"); });
  }

  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      card.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
  });

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();


/* ---------- 自定义光标（参考 Moonshot） ---------- */
(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  var mx = -100, my = -100, rx = -100, ry = -100, shown = false;
  var hoverSel = 'a, button, .btn, [role="button"], [data-cursor-hover], .card, .member, .thanks-card, .product-card';

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    if (!shown) {
      shown = true;
      ring.style.opacity = '1';
      dot.style.opacity = '1';
    }
    dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
  }, { passive: true });

  (function loop() {
    rx += (mx - rx) * 0.2;
    ry += (my - ry) * 0.2;
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
    window.requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(hoverSel)) ring.classList.add('is-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(hoverSel)) ring.classList.remove('is-hover');
  });
  document.addEventListener('mousedown', function () { ring.classList.add('is-down'); });
  document.addEventListener('mouseup', function () { ring.classList.remove('is-down'); });
  document.addEventListener('mouseleave', function () {
    ring.style.opacity = '0';
    dot.style.opacity = '0';
    shown = false;
  });
})();