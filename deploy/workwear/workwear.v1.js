/* Affinity Creative /workwear/ landing page behaviour. No dependencies. */
(function () {
  'use strict';

  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var data = JSON.parse($('#ww-data').textContent);
  var byId = {};
  data.products.forEach(function (p) { byId[p.id] = p; });
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var store = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };

  // Analytics: uses the site's existing gtag. Never send names, emails, phones or files.
  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) { /* ignore */ }
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('.menu-btn'), nav = $('#nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });

  /* ---------- Campaign attribution ---------- */
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var utm = {};
  try { utm = JSON.parse(store.get('ww_utm') || '{}'); } catch (e) { utm = {}; }
  try {
    var qs = new URLSearchParams(window.location.search);
    var fresh = false;
    UTM_KEYS.forEach(function (k) {
      var v = (qs.get(k) || '').replace(/[^A-Za-z0-9 _.\-]/g, '').slice(0, 100);
      if (v) { utm[k] = v; fresh = true; }
    });
    if (fresh) store.set('ww_utm', JSON.stringify(utm));
  } catch (e) { /* old browser */ }
  var form = $('#quote-form');
  UTM_KEYS.forEach(function (k) { var el = form.elements[k]; if (el) el.value = utm[k] || ''; });

  /* ---------- Quote selection ---------- */
  var colourDefault = 'Not sure yet';
  var selection = {};
  try { selection = JSON.parse(store.get('ww_selection') || '{}') || {}; } catch (e) { selection = {}; }
  Object.keys(selection).forEach(function (id) { if (!byId[id]) delete selection[id]; });

  function money(n) { return '$' + n.toLocaleString('en-CA', { minimumFractionDigits: 0, maximumFractionDigits: 2 }); }
  function lineQty(s) { var q = parseInt(s.qty, 10); return q > 0 ? q : 0; }
  function total() {
    return Object.keys(selection).reduce(function (sum, id) { return sum + lineQty(selection[id]) * byId[id].price; }, 0);
  }
  function persist() { store.set('ww_selection', JSON.stringify(selection)); }

  function waUrl() {
    var msg = data.whatsappMessage;
    var ids = Object.keys(selection);
    if (ids.length) {
      msg += '\n\nI\'m looking at:\n' + ids.map(function (id) {
        var s = selection[id], q = lineQty(s);
        return '- ' + (q ? q + ' x ' : '') + byId[id].name + (s.colour && s.colour !== colourDefault ? ' (' + s.colour + ')' : '');
      }).join('\n');
    }
    return 'https://wa.me/' + data.whatsappNumber + '?text=' + encodeURIComponent(msg);
  }

  function renderSelection() {
    var ids = Object.keys(selection);
    var list = $('#selection-list'), empty = $('#selection-empty'), totalEl = $('#selection-total');
    // Cards
    $$('.card').forEach(function (card) {
      var id = card.getAttribute('data-product'), s = selection[id];
      card.classList.toggle('is-selected', !!s);
      $('[data-remove]', card).hidden = !s;
      var btn = $('[data-pick]', card);
      btn.setAttribute('aria-pressed', s ? 'true' : 'false');
      var q = $('[data-qty]', card), c = $('[data-colour]', card);
      if (doc.activeElement !== q) q.value = s && lineQty(s) ? lineQty(s) : '';
      c.value = s ? s.colour : colourDefault;
    });
    // Form list
    list.innerHTML = '';
    ids.forEach(function (id) {
      var s = selection[id], p = byId[id], q = lineQty(s);
      var li = doc.createElement('li');
      li.className = 'sel';
      li.setAttribute('data-id', id);
      var name = doc.createElement('div');
      name.innerHTML = '<p class="sel__name"></p><p class="sel__meta"></p>';
      name.firstChild.textContent = p.name;
      name.lastChild.textContent = (q ? q + ' pcs' : 'Quantity not set') + ' · ' + (s.colour || colourDefault) + ' · from ' + money(p.price) + ' each';
      var line = doc.createElement('p');
      line.className = 'sel__line';
      line.textContent = q ? money(q * p.price) : '';
      var notes = doc.createElement('input');
      notes.type = 'text'; notes.maxLength = 400; notes.value = s.notes || '';
      notes.placeholder = 'Sizes or notes, e.g. 4 M, 6 L, 2 XL';
      notes.setAttribute('aria-label', 'Sizes or notes for ' + p.name);
      notes.addEventListener('input', function () { selection[id].notes = notes.value; persist(); syncHidden(); });
      var rm = doc.createElement('button');
      rm.type = 'button'; rm.className = 'sel__remove'; rm.textContent = 'Remove';
      rm.setAttribute('aria-label', 'Remove ' + p.name + ' from quote');
      rm.addEventListener('click', function () { removeProduct(id); });
      li.appendChild(name); li.appendChild(line); li.appendChild(notes); li.appendChild(rm);
      list.appendChild(li);
    });
    empty.hidden = ids.length > 0;
    var t = total();
    totalEl.hidden = !(ids.length && t > 0);
    if (!totalEl.hidden) {
      totalEl.innerHTML = '<strong></strong><span>Estimated starting total — final quote subject to artwork, quantities, sizes and garment availability.</span>';
      totalEl.firstChild.textContent = money(t) + ' CAD, before tax';
    }
    syncHidden();
    $$('[data-wa]').forEach(function (a) { a.href = waUrl(); });
  }

  function syncHidden() {
    var rows = Object.keys(selection).map(function (id) {
      var s = selection[id];
      return { id: id, qty: lineQty(s), colour: s.colour || colourDefault, notes: s.notes || '' };
    });
    $('#f-selection').value = JSON.stringify(rows);
  }

  function addProduct(id) {
    if (!selection[id]) {
      selection[id] = { qty: '', colour: colourDefault, notes: '' };
      track('workwear_product_select', { product_id: id, product_name: byId[id].name });
    }
    persist(); renderSelection();
  }
  function removeProduct(id) { delete selection[id]; persist(); renderSelection(); }

  $$('.card').forEach(function (card) {
    var id = card.getAttribute('data-product');
    var qty = $('[data-qty]', card), colour = $('[data-colour]', card);
    qty.addEventListener('input', function () {
      var q = parseInt(qty.value, 10);
      if (q > 0) { if (!selection[id]) addProduct(id); selection[id].qty = q; }
      else if (selection[id]) selection[id].qty = '';
      persist(); renderSelection();
    });
    colour.addEventListener('change', function () {
      if (!selection[id]) addProduct(id);
      selection[id].colour = colour.value; persist(); renderSelection();
    });
    $('[data-pick]', card).addEventListener('click', function () {
      addProduct(id);
      goToForm();
    });
    $('[data-remove]', card).addEventListener('click', function () { removeProduct(id); });
  });

  function goToForm() {
    var target = $('#quote');
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(function () {
      var first = $('.sel input', form) || $('#f-name');
      try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); }
    }, reduceMotion ? 0 : 600);
  }

  /* ---------- Tracking clicks ---------- */
  doc.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]');
    if (a) track(a.getAttribute('data-track'), { location: a.getAttribute('data-where') || '' });
  });

  /* ---------- Form ---------- */
  var started = false;
  function quoteStart() { if (!started) { started = true; track('workwear_quote_start'); } }
  form.addEventListener('focusin', quoteStart);
  $$('.card [data-pick]').forEach(function (b) { b.addEventListener('click', quoteStart); });

  $('#f-started').value = String(Math.floor(Date.now() / 1000));
  function loadToken() {
    return fetch('/api/csrf.php', { credentials: 'same-origin', cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j && j.token) $('#f-csrf').value = j.token; })
      .catch(function () { /* handled on submit */ });
  }
  loadToken();

  var FIELD_IDS = ['fullName', 'email', 'phone', 'requiredDate', 'artwork', 'projectDetails', 'consent'];
  function inputFor(name) { return form.elements[name]; }
  function setError(name, msg) {
    var err = $('#e-' + name), input = inputFor(name);
    if (!err) return;
    err.textContent = msg || '';
    if (input && input.setAttribute) {
      if (msg) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', 'e-' + name); }
      else { input.removeAttribute('aria-invalid'); }
    }
  }
  function clearErrors() { FIELD_IDS.forEach(function (n) { setError(n, ''); }); }

  var ALLOWED_EXT = ['pdf', 'png', 'jpg', 'jpeg', 'webp', 'ai', 'eps'];
  function validate() {
    var errs = {};
    if (!form.elements.fullName.value.trim()) errs.fullName = 'Please enter your name.';
    var email = form.elements.email.value.trim();
    if (!email) errs.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = 'Please enter a valid email address.';
    var phone = form.elements.phone.value.trim();
    if (phone && !/^[0-9+().\-\s]{7,30}$/.test(phone)) errs.phone = 'Please enter a valid phone number.';
    if (!Object.keys(selection).length && !form.elements.projectDetails.value.trim()) {
      errs.projectDetails = 'Choose at least one product above, or tell us what you need.';
    }
    var files = form.elements.artwork.files, total = 0;
    if (files.length > 3) errs.artwork = 'Attach up to 3 files.';
    for (var i = 0; i < files.length && !errs.artwork; i++) {
      var ext = files[i].name.split('.').pop().toLowerCase();
      total += files[i].size;
      if (ALLOWED_EXT.indexOf(ext) < 0) errs.artwork = 'Artwork must be a PDF, PNG, JPG, WebP, AI or EPS file.';
      else if (files[i].size > 8 * 1024 * 1024 || total > 15 * 1024 * 1024) errs.artwork = 'Each file must be under 8 MB (15 MB total).';
    }
    if (!form.elements.consent.checked) errs.consent = 'Please confirm we can contact you about this request.';
    return errs;
  }

  var statusEl = $('#form-status'), submitBtn = $('#submit');
  function setStatus(kind, msg, moveFocus) {
    statusEl.className = 'form__status' + (kind ? ' is-' + kind : '');
    statusEl.textContent = msg || '';
    if (msg && moveFocus) { try { statusEl.focus({ preventScroll: false }); } catch (e) { /* ignore */ } }
  }
  function focusFirst(errs) {
    for (var i = 0; i < FIELD_IDS.length; i++) {
      if (errs[FIELD_IDS[i]]) { var el = inputFor(FIELD_IDS[i]); if (el && el.focus) el.focus(); return; }
    }
  }
  function showErrors(errs) { FIELD_IDS.forEach(function (n) { setError(n, errs[n] || ''); }); focusFirst(errs); }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (submitBtn.disabled) return;
    setStatus('', '');
    var errs = validate();
    if (Object.keys(errs).length) { showErrors(errs); setStatus('error', 'Please check the highlighted fields.', false); return; }
    clearErrors();
    syncHidden();

    submitBtn.disabled = true; submitBtn.classList.add('is-loading');
    submitBtn.querySelector('.btn__label').textContent = 'Sending...';

    var ready = $('#f-csrf').value ? Promise.resolve() : loadToken();
    ready.then(function () {
      return fetch('/api/workwear-quote.php', { method: 'POST', body: new FormData(form), credentials: 'same-origin' });
    }).then(function (res) {
      return res.json().catch(function () { return { ok: false }; }).then(function (j) { return { res: res, j: j }; });
    }).then(function (r) {
      if (r.res.ok && r.j && r.j.ok === true) {
        track('workwear_quote_submit', { products: Object.keys(selection).join(','), items: Object.keys(selection).length });
        selection = {}; persist();
        form.reset(); started = false;
        $('#f-started').value = String(Math.floor(Date.now() / 1000));
        UTM_KEYS.forEach(function (k) { if (form.elements[k]) form.elements[k].value = utm[k] || ''; });
        renderSelection();
        setStatus('ok', "Thanks for your request. We've received your workwear details and will be in touch to discuss your quote.", true);
        loadToken();
      } else {
        if (r.j && r.j.errors) showErrors(r.j.errors);
        setStatus('error', (r.j && r.j.message) || 'We could not send your request. Please email info@affinitycreative.ca or call 437-313-1510.', !(r.j && r.j.errors));
        if (r.res.status === 422) loadToken();
      }
    }).catch(function () {
      setStatus('error', 'We could not reach the server. Please check your connection, or email info@affinitycreative.ca or call 437-313-1510.', true);
    }).then(function () {
      submitBtn.disabled = false; submitBtn.classList.remove('is-loading');
      submitBtn.querySelector('.btn__label').textContent = 'Request My Quote';
    });
  });

  /* ---------- Mobile bar: hide while the form is on screen so it never covers fields ---------- */
  var mbar = $('#mbar');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { mbar.classList.toggle('is-hidden', en.isIntersecting); });
    }, { threshold: 0.12 }).observe($('#quote'));
  }

  /* ---------- Scroll reveal (progressive: content is visible without JS) ---------- */
  doc.documentElement.classList.add('js');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var vh = window.innerHeight;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach(function (el) {
      if (el.getBoundingClientRect().top > vh * 0.9) { el.classList.add('will-reveal'); io.observe(el); }
    });
  }

  renderSelection();
  track('workwear_view', { campaign: utm.utm_campaign || data.campaign });
})();
