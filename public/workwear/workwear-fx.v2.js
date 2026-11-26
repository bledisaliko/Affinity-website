/* Affinity Creative /workwear/ motion layer. Pure enhancement: the page works without it. */
(function () {
  'use strict';
  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (n) { return Math.max(0, Math.min(1, n)); };

  var bar = $('#progress'), stepsEl = $('.steps'), stepEls = $$('.step');
  var ticking = false;
  function update() {
    ticking = false;
    var h = doc.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.setProperty('--sp', max > 0 ? clamp(h.scrollTop / max).toFixed(4) : 0);
    if (stepsEl) {
      var vh = window.innerHeight, r = stepsEl.getBoundingClientRect();
      var stacked = window.matchMedia('(max-width: 900px)').matches;
      var p = stacked ? clamp((vh * 0.7 - r.top) / r.height) : clamp((vh * 0.85 - r.top) / (vh * 0.4));
      stepsEl.style.setProperty('--p', p.toFixed(3));
      stepEls.forEach(function (s, i) {
        var on = stacked ? s.getBoundingClientRect().top < vh * 0.7 : (p > 0 && p >= i / (stepEls.length - 1) - 0.001);
        s.classList.toggle('is-on', on);
      });
    }
  }
  function request() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
  update();

  /* Hero hotspots jump to the matching product card */
  $$('.pin').forEach(function (pin) {
    pin.addEventListener('click', function (e) {
      var card = $('.card[data-product="' + pin.getAttribute('data-pin') + '"]');
      if (!card) return;
      e.preventDefault();
      card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      card.classList.remove('is-flash');
      void card.offsetWidth;
      card.classList.add('is-flash');
      try { if (typeof window.gtag === 'function') window.gtag('event', 'workwear_hero_pin', { product: pin.getAttribute('data-pin') }); } catch (err) { /* ignore */ }
    });
  });

  /* Card spotlight follows the cursor */
  var products = $('#products');
  if (products && finePointer) {
    products.addEventListener('pointermove', function (e) {
      var card = e.target.closest('.card');
      if (!card) return;
      var b = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - b.left) + 'px');
      card.style.setProperty('--my', (e.clientY - b.top) + 'px');
    });
  }

  /* Hero stage tilts toward the pointer */
  var stage = $('[data-stage]');
  if (stage && finePointer && !reduce) {
    stage.addEventListener('pointermove', function (e) {
      var b = stage.getBoundingClientRect();
      var x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
      stage.style.setProperty('--ry', (x * 7).toFixed(2));
      stage.style.setProperty('--rx', (-y * 5).toFixed(2));
    });
    stage.addEventListener('pointerleave', function () {
      stage.style.setProperty('--ry', 0); stage.style.setProperty('--rx', 0);
    });
  }

  /* Methods: colour spotlight follows the cursor over the photo */
  if (finePointer) {
    $$('[data-reveal]').forEach(function (box) {
      box.addEventListener('pointermove', function (e) {
        var b = box.getBoundingClientRect();
        box.style.setProperty('--mx', (e.clientX - b.left) + 'px');
        box.style.setProperty('--my', (e.clientY - b.top) + 'px');
      });
    });
  }

  /* Desktop quote pill: visible once the hero is gone, hidden over the form */
  var fab = $('#fab'), hero = $('.hero'), quote = $('#quote');
  if (fab && hero && quote && 'IntersectionObserver' in window) {
    var heroSeen = true, quoteSeen = false;
    var sync = function () { fab.classList.toggle('is-on', !heroSeen && !quoteSeen); };
    new IntersectionObserver(function (en) { heroSeen = en[0].isIntersecting; sync(); }).observe(hero);
    new IntersectionObserver(function (en) { quoteSeen = en[0].isIntersecting; sync(); }, { threshold: 0.12 }).observe(quote);
  }
})();
