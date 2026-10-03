/* ============================================================
   Sahil Gore — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- avatar: swap monogram for photo if present ---------- */
  var avatarImg = document.getElementById('avatarImg');
  var avatarMono = document.getElementById('avatarMono');
  if (avatarImg) {
    var showPhoto = function () {
      avatarImg.hidden = false;
      if (avatarMono) avatarMono.style.display = 'none';
    };
    // Only reveal once the file actually decoded — avoids a broken-image flash
    if (avatarImg.complete && avatarImg.naturalWidth > 0) {
      showPhoto();
    } else {
      avatarImg.addEventListener('load', showPhoto);
      avatarImg.addEventListener('error', function () {
        avatarImg.hidden = true; // keep monogram
      });
    }
  }

  /* ---------- typed hero text ---------- */
  var typedEl = document.getElementById('typed');
  if (typedEl) {
    var phrases = [
      'Junior Penetration Tester',
      'Web Application Security',
      'OWASP Top 10 Specialist',
      'Ethical Hacker'
    ];

    if (reduceMotion) {
      typedEl.textContent = phrases[0];
    } else {
      var pIdx = 0, cIdx = 0, deleting = false;
      var TYPE = 62, DEL = 32, HOLD = 1700, GAP = 380;

      var tick = function () {
        var phrase = phrases[pIdx];

        if (!deleting) {
          cIdx++;
          typedEl.textContent = phrase.slice(0, cIdx);
          if (cIdx === phrase.length) {
            deleting = true;
            return setTimeout(tick, HOLD);
          }
          return setTimeout(tick, TYPE);
        }

        cIdx--;
        typedEl.textContent = phrase.slice(0, cIdx);
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
          return setTimeout(tick, GAP);
        }
        return setTimeout(tick, DEL);
      };

      setTimeout(tick, 600);
    }
  }

  /* ---------- theme toggle ---------- */
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    var root = document.documentElement;
    var syncLabel = function () {
      var isLight = root.getAttribute('data-theme') === 'light';
      themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    };
    syncLabel();

    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
      syncLabel();
    });
  }

  /* ---------- nav: shadow on scroll ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    var closeMenu = function () {
      menu.classList.remove('open');
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    };
    var openMenu = function () {
      menu.hidden = false;
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
    };

    toggle.addEventListener('click', function () {
      if (menu.hidden) openMenu(); else closeMenu();
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        closeMenu();
        toggle.focus();
      }
    });

    // Reset state if resized back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760 && !menu.hidden) closeMenu();
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(
          el.parentElement ? el.parentElement.children : []
        ).filter(function (n) { return n.classList.contains('reveal'); });
        var i = siblings.indexOf(el);
        el.style.transitionDelay = (i > 0 ? Math.min(i, 5) * 70 : 0) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- stat counters ---------- */
  var counters = document.querySelectorAll('.count');
  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.dataset.count; });
    } else {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.dataset.count, 10) || 0;
          var duration = 1100;
          var start = null;

          var step = function (ts) {
            if (start === null) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            // ease-out cubic
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target;
          };

          requestAnimationFrame(step);
          countObserver.unobserve(el);
        });
      }, { threshold: 0.5 });

      counters.forEach(function (el) { countObserver.observe(el); });
    }
  }

  /* ---------- year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
