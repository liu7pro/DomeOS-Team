/* DomeOS 系列官网 — 公共交互 */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var links = document.getElementById("navLinks");
  var toggle = document.getElementById("menuToggle");

  /* ---------------- 深浅色 ---------------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");
  var themeMeta = document.getElementById("themeColor");

  function syncThemeUI() {
    var light = root.getAttribute("data-color-mode") === "light";
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", light ? "true" : "false");
      themeBtn.setAttribute("aria-label", light ? "切换到深色模式" : "切换到浅色模式");
    }
    if (themeMeta) themeMeta.setAttribute("content", light ? "#f6efe2" : "#0e0b08");
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-color-mode") === "light" ? "dark" : "light";
      root.setAttribute("data-color-mode", next);
      try { localStorage.setItem("team-theme", next); } catch (e) {}
      syncThemeUI();
    });
  }

  function applyStoredTheme() {
    var saved = null;
    try { saved = localStorage.getItem("team-theme"); } catch (e) {}
    if (saved === "light" || saved === "dark") {
      root.setAttribute("data-color-mode", saved);
    }
    syncThemeUI();
  }

  applyStoredTheme();
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) applyStoredTheme();
  });

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
  document.documentElement.classList.add('cursor-ready');

  var mx = -100, my = -100, rx = -100, ry = -100, shown = false, down = false;
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
    rx += (mx - rx) * 0.3;
    ry += (my - ry) * 0.3;
    ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) scale(' + (down ? 0.86 : 1) + ')';
    window.requestAnimationFrame(loop);
  })();

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(hoverSel)) ring.classList.add('is-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(hoverSel)) ring.classList.remove('is-hover');
  });
  document.addEventListener('mousedown', function () { down = true; });
  document.addEventListener('mouseup', function () { down = false; });
  document.addEventListener('mouseleave', function () {
    ring.style.opacity = '0';
    dot.style.opacity = '0';
    shown = false;
  });
})();

/* ---------- 超进化视觉层 ---------- */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  var top = document.createElement('button');
  top.className = 'back-top';
  top.type = 'button';
  top.setAttribute('aria-label', '返回顶部');
  top.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  document.body.appendChild(top);
  top.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = 'scaleX(' + p + ')';
      top.style.setProperty('--p', (p * 100).toFixed(1));
      top.classList.toggle('show', window.scrollY > 640);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!reduce) {
    document.querySelectorAll('.card, .thanks-card, .version-card, .product-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        card.style.setProperty('--rx', ((.5 - py) * 2.6).toFixed(2) + 'deg');
        card.style.setProperty('--ry', ((px - .5) * 2.6).toFixed(2) + 'deg');
      });
      card.addEventListener('mouseleave', function () {
        card.style.removeProperty('--rx');
        card.style.removeProperty('--ry');
      });
    });
  }

  var nav = document.getElementById('navLinks');
  if (nav) {
    var anchors = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var map = {};
    anchors.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1));
      if (sec) map[sec.id] = a;
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          anchors.forEach(function (a) { a.classList.remove('is-active'); });
          var active = map[en.target.id];
          if (active) active.classList.add('is-active');
        });
      }, { rootMargin: '-42% 0px -50% 0px' });
      Object.keys(map).forEach(function (id) {
        var sec = document.getElementById(id);
        if (sec) io.observe(sec);
      });
    }
  }
})();