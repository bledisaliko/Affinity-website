/* =====================================================================
   Affinity Creative — 2026 refinement layer (v1)
   Adds, after Nuxt has finished hydrating (so Vue never sees it):
     - Google reviews (Elfsight) on key pages
     - the embroidery / DTF / screen printing comparison on the homepage
     - the 3-step layout on the existing quote form
   Everything is idempotent and re-applied on client-side navigation.
   The WhatsApp button is plain HTML in each page, not injected here.
   ===================================================================== */
(function () {
  'use strict';

  var ELFSIGHT_SRC = 'https://elfsightcdn.com/platform.js';
  var ELFSIGHT_APP = 'elfsight-app-70e18599-8c9f-411f-902d-f13a6c9333a0';

  var REVIEW_PATHS = {
    '/': 1, '/services': 1, '/contact': 1,
    '/apparel': 1, '/business-print': 1, '/signs-vehicle-graphics': 1,
    '/glass-finishes': 1, '/digital-marketing': 1, '/embroidery': 1, '/vinyl-graphics': 1
  };

  function path() {
    return (location.pathname.replace(/\/+$/, '') || '/');
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* ---- remove anything we injected for a different page --------------- */
  function cleanup() {
    var here = path();
    var nodes = document.querySelectorAll('[data-a26][data-a26-path]');
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].getAttribute('data-a26-path') !== here) nodes[i].remove();
    }
  }

  /* ---- Google reviews ------------------------------------------------- */
  function loadElfsight(force) {
    var existing = document.querySelector('script[data-a26-elfsight]');
    if (existing && !force) return;
    if (existing) existing.remove();
    var s = document.createElement('script');
    s.src = ELFSIGHT_SRC + (force ? '?a26=' + Date.now() : '');
    s.async = true;
    s.setAttribute('data-a26-elfsight', '1');
    document.body.appendChild(s);
  }

  function injectReviews() {
    var here = path();
    if (!REVIEW_PATHS[here]) return;
    if (document.querySelector('[data-a26="reviews"][data-a26-path="' + here + '"]')) return;

    var main = document.getElementById('main-content');
    if (!main) return;

    var isHome = here === '/';
    var section = el('section', {
      'class': 'a26-reviews' + (isHome ? '' : ' a26-reviews--page'),
      'data-a26': 'reviews',
      'data-a26-path': here,
      'aria-labelledby': 'a26-reviews-title'
    });
    section.innerHTML =
      '<div class="container">' +
        '<div class="a26-reviews__head">' +
          '<h2 id="a26-reviews-title">What customers say.</h2>' +
        '</div>' +
        '<div class="a26-reviews__widget"><div class="' + ELFSIGHT_APP + '" data-elfsight-app-lazy></div></div>' +
      '</div>';

    var anchor = document.getElementById('contact') ||
                 main.querySelector('section.service-quote');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(section, anchor);
    else main.appendChild(section);

    var hadScript = !!document.querySelector('script[data-a26-elfsight]');
    loadElfsight(hadScript);   // re-run the platform script so it finds the new container

    // If the widget never renders (blocked, offline, wrong app id) do not leave an empty heading behind.
    // The timer only starts once the section has actually been scrolled into view (the widget is lazy).
    var host = section.querySelector('.a26-reviews__widget');
    function watch() {
      setTimeout(function () {
        var w = section.querySelector('.' + ELFSIGHT_APP);
        if (w && w.offsetHeight < 40 && section.isConnected) section.style.display = 'none';
      }, 12000);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0] && entries[0].isIntersecting) { io.disconnect(); watch(); }
      }, { rootMargin: '200px' });
      io.observe(host);
    } else {
      watch();
    }
  }

  /* ---- finish comparison (homepage) ----------------------------------- */
  function injectCompare() {
    if (path() !== '/') return;
    var section = document.getElementById('methods');
    if (!section || section.querySelector('[data-a26="compare"]')) return;
    var host = section.querySelector('.container');
    if (!host) return;

    var cols = [
      { name: 'Embroidery',      href: '/embroidery/', img: '/images/homepage-methods/embroidery.png',
        rows: ['Polos, jackets, hats, work shirts and uniforms.',
               'Stitched, textured and long-lasting.',
               'Simple logos work best. Small text and fine lines may be simplified.',
               'You want a clean, professional finish on workwear.'] },
      { name: 'DTF Printing',    href: '/apparel/',    img: '/images/homepage-methods/dtf.png',
        rows: ['T-shirts, hoodies and smaller runs.',
               'Full colour, smooth and detailed.',
               'Gradients and multi-colour artwork are fine.',
               'You need full colour or a smaller order.'] },
      { name: 'Screen Printing', href: '/apparel/',    img: '/images/homepage-methods/screenprint.png',
        rows: ['Events, teams, repeat orders and larger quantities.',
               'Bold, solid colour with a classic printed feel.',
               'Strongest with solid colours and repeated designs.',
               'You are ordering more pieces or repeating a design.'] }
    ];
    var labels = ['Best for', 'Look and feel', 'Artwork', 'Choose it when'];

    var head = '<td class="a26-corner"></td>';
    cols.forEach(function (c) {
      head += '<th scope="col"><a class="a26-compare__col" href="' + c.href + '">' +
              '<img src="' + c.img + '" alt="" width="418" height="224" loading="lazy" decoding="async">' +
              '<span>' + c.name + '</span></a></th>';
    });

    var body = '';
    labels.forEach(function (label, r) {
      body += '<tr><th scope="row">' + label + '</th>';
      cols.forEach(function (c) {
        body += '<td data-label="' + c.name + '">' + c.rows[r] + '</td>';
      });
      body += '</tr>';
    });

    var wrap = el('div', { 'class': 'a26-compare', 'data-a26': 'compare', 'data-a26-path': '/' });
    wrap.innerHTML =
      '<table class="a26-compare__table">' +
        '<caption class="a26-sr">Embroidery, DTF printing and screen printing compared</caption>' +
        '<colgroup><col class="a26-c0"><col><col><col></colgroup>' +
        '<thead><tr>' + head + '</tr></thead>' +
        '<tbody>' + body + '</tbody>' +
      '</table>' +
      '<div class="a26-compare__ask">' +
        '<p><strong>Not sure which fits?</strong> Send the garment, quantity and artwork and we will recommend a method.</p>' +
        '<a class="button button--primary" href="/contact/#quote">Request a Quote</a>' +
      '</div>';
    host.appendChild(wrap);
  }

  /* ---- quote form: three steps ---------------------------------------- */
  var STEP_OF = {
    serviceCategory: 1, estimatedQuantity: 1, requiredDate: 1, projectDescription: 1,
    artworkNotes: 2,
    fullName: 3, companyName: 3, email: 3, phone: 3, preferredContact: 3, consent: 3
  };
  var STEP_TITLE = { 1: 'Your project', 2: 'Artwork', 3: 'Your details' };

  function stepOfField(node) {
    var f = node.closest('.form-field');
    return f ? parseInt(f.getAttribute('data-a26-step') || '0', 10) : 0;
  }

  function showStep(form, n) {
    n = Math.max(1, Math.min(3, n));
    form.setAttribute('data-a26-step', String(n));
    var bars = form.querySelectorAll('.a26-progress__bar span');
    for (var i = 0; i < bars.length; i++) bars[i].className = i < n ? 'is-done' : '';
    var t = form.querySelector('.a26-progress__label strong');
    var c = form.querySelector('.a26-progress__label span');
    if (t) t.textContent = STEP_TITLE[n];
    if (c) c.textContent = 'Step ' + n + ' of 3';
  }

  function currentStep(form) {
    return parseInt(form.getAttribute('data-a26-step') || '1', 10);
  }

  function stepValid(form, n) {
    var fields = form.querySelectorAll('.form-field[data-a26-step="' + n + '"] input, ' +
                                       '.form-field[data-a26-step="' + n + '"] select, ' +
                                       '.form-field[data-a26-step="' + n + '"] textarea');
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.required && !f.checkValidity()) {
        if (typeof f.reportValidity === 'function') f.reportValidity();
        f.focus();
        return false;
      }
    }
    return true;
  }

  function enhanceForm(form) {
    if (!form || form.getAttribute('data-a26-form')) return;
    var grid = form.querySelector('.form-grid');
    if (!grid) return;
    form.setAttribute('data-a26-form', '1');

    Object.keys(STEP_OF).forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      var field = input && input.closest('.form-field');
      if (field) field.setAttribute('data-a26-step', String(STEP_OF[name]));
    });

    // helper copy per step
    var h1 = el('p', { 'class': 'a26-hint', 'data-a26-step': '1' }, 'Tell us what you need and roughly how many. We will take it from there.');
    var h2 = el('p', { 'class': 'a26-hint', 'data-a26-step': '2' }, 'Paste a link to your logo or artwork, or describe what you have. No artwork yet? That is fine, we can help.');
    var h3 = el('p', { 'class': 'a26-hint', 'data-a26-step': '3' }, 'Last step. How should we reach you?');
    grid.insertBefore(h1, grid.firstChild);
    var art = form.querySelector('[name="artworkNotes"]');
    var artField = art && art.closest('.form-field');
    if (artField) grid.insertBefore(h2, artField);
    var nameField = form.querySelector('[name="fullName"]');
    nameField = nameField && nameField.closest('.form-field');
    if (nameField) grid.insertBefore(h3, nameField);

    // progress header
    var progress = el('div', { 'class': 'a26-progress', 'data-a26-ui': '1' },
      '<div class="a26-progress__bar" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '<p class="a26-progress__label" aria-live="polite"><strong></strong><span></span></p>');
    form.insertBefore(progress, form.firstChild);

    // back / continue
    var nav = el('div', { 'class': 'a26-nav', 'data-a26-ui': '1' },
      '<button type="button" class="a26-back">Back</button>' +
      '<button type="button" class="a26-next button button--primary">Continue</button>');
    grid.parentNode.insertBefore(nav, grid.nextSibling);

    nav.querySelector('.a26-back').addEventListener('click', function () {
      showStep(form, currentStep(form) - 1);
    });
    nav.querySelector('.a26-next').addEventListener('click', function () {
      var n = currentStep(form);
      if (!stepValid(form, n)) return;
      showStep(form, n + 1);
      var first = form.querySelector('.form-field[data-a26-step="' + (n + 1) + '"] input, .form-field[data-a26-step="' + (n + 1) + '"] select, .form-field[data-a26-step="' + (n + 1) + '"] textarea');
      if (first) first.focus({ preventScroll: true });
    });

    // Enter inside a step-1/2 field should move on, not submit half a form.
    form.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && e.target && e.target.tagName !== 'TEXTAREA' && currentStep(form) < 3) {
        e.preventDefault();
        var nx = form.querySelector('.a26-next');
        if (nx) nx.click();
      }
    });

    // Submit: make sure earlier steps are complete, then let the site's own handler run.
    form.addEventListener('submit', function (e) {
      for (var n = 1; n <= 3; n++) {
        if (!stepValid(form, n)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showStep(form, n);
          return;
        }
      }
      // after the site's validation runs, jump to the step that holds the first server/Vue error
      setTimeout(function () {
        var bad = form.querySelector('[aria-invalid="true"]');
        if (bad) {
          var s = stepOfField(bad);
          if (s) showStep(form, s);
        }
        var ok = form.querySelector('.status-message[data-kind="success"]');
        if (ok) showStep(form, 1);
      }, 400);
    }, true);

    showStep(form, 1);
  }

  function enhanceForms() {
    var forms = document.querySelectorAll('form.quote-form');
    for (var i = 0; i < forms.length; i++) enhanceForm(forms[i]);
  }

  /* ---- run -------------------------------------------------------------- */
  var busy = false;
  function apply() {
    if (busy) return;
    busy = true;
    try {
      cleanup();
      injectCompare();
      injectReviews();
      enhanceForms();
    } catch (err) {
      if (window.console && console.warn) console.warn('[affinity-2026]', err);
    }
    busy = false;
  }

  function hydrated() {
    try {
      if (typeof window.useNuxtApp === 'function') {
        var app = window.useNuxtApp();
        if (app && typeof app.isHydrating === 'boolean') return !app.isHydrating;
      }
    } catch (e) { /* fall through */ }
    return null;
  }

  function start() {
    var tries = 0;
    (function poll() {
      var h = hydrated();
      var fallbackOk = document.readyState === 'complete' && tries > 30 && !!document.getElementById('__nuxt').getAttribute('data-v-app');
      if (h === true || fallbackOk || tries > 80) {
        setTimeout(function () {
          apply();
          var root = document.getElementById('__nuxt');
          if (root && 'MutationObserver' in window) {
            var t = null;
            new MutationObserver(function () {
              clearTimeout(t);
              t = setTimeout(apply, 150);
            }).observe(root, { childList: true, subtree: true });
          }
        }, 80);
        return;
      }
      tries++;
      setTimeout(poll, 100);
    })();
  }

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
})();
