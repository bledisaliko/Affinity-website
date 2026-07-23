(function () {
  var desktopQuery = window.matchMedia("(min-width: 901px)");

  function icon(name) {
    var icons = {
      pin:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.25 7-11a7 7 0 1 0-14 0c0 5.75 7 11 7 11Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>',
      truck:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.6a1 1 0 0 0-.22-.63l-3.5-4.37A1 1 0 0 0 17.5 8H14"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle></svg>',
      phone:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"></path></svg>',
      mail:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7"></path></svg>',
      shirt:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 5 2 9l3 2 2-2v12h10V9l2 2 3-2-2-4-4-2a4 4 0 0 1-8 0Z"></path></svg>',
      file:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path><path d="M14 2v6h6"></path></svg>',
      car:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 17-2-2v-4l2-1 2-4h10l2 4 2 1v4l-2 2"></path><path d="M5 17v2h3v-2h8v2h3v-2"></path><path d="M5 10h14"></path><circle cx="7.5" cy="14" r="1"></circle><circle cx="16.5" cy="14" r="1"></circle></svg>',
      gift:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="13" rx="2"></rect><path d="M12 8v13M3 12h18M7.5 8C5 8 5 4 7.5 4 10 4 12 8 12 8s2-4 4.5-4S19 8 16.5 8"></path></svg>'
    };

    return icons[name] || "";
  }

  function buildTopbar() {
    var inner = document.querySelector(".topbar__inner");
    if (!inner || inner.querySelector(".home-topbar-group--center")) return;

    inner.setAttribute("data-home-hero", "true");
    inner.innerHTML =
      '<span class="home-topbar-group home-topbar-group--left">' +
      icon("pin") +
      "<span>Serving Toronto and the Greater Toronto Area</span></span>" +
      '<span class="home-topbar-group home-topbar-group--center">' +
      icon("truck") +
      "<span>Local production. Fast turnaround.</span></span>" +
      '<span class="home-topbar-group home-topbar-group--right">' +
      '<a href="tel:+16473131510">' +
      icon("phone") +
      "<span>647-313-1510</span></a>" +
      '<span class="home-topbar-separator" aria-hidden="true"></span>' +
      '<a href="mailto:info@affinitycreative.ca">' +
      icon("mail") +
      "<span>info@affinitycreative.ca</span></a></span>";
  }

  function buildNavigation() {
    var links = document.querySelector(".nav__links");
    if (!links) return;

    var existingMenu = links.querySelector(".home-nav-menu");
    var candidates = existingMenu
      ? Array.prototype.slice.call(existingMenu.children).concat(Array.prototype.slice.call(links.children))
      : Array.prototype.slice.call(links.children);

    function findByHref(href) {
      return candidates.find(function (child) {
        return child.getAttribute && child.getAttribute("href") === href;
      });
    }

    function findByText(text) {
      return candidates.find(function (child) {
        return (child.textContent || "").trim() === text;
      });
    }

    var home = findByHref("/") || findByText("Home");
    var services = candidates.find(function (child) {
      return child.classList && child.classList.contains("services-dropdown");
    });
    var how = findByHref("/#process") || findByText("How It Works");
    var blog = findByHref("/blog/") || findByText("Blog");
    var contact = findByHref("/contact/") || findByText("Contact");
    var quote = candidates.find(function (child) {
      return (
        child.getAttribute &&
        (child.getAttribute("href") === "/contact/#quote" ||
          (child.classList && child.classList.contains("button")))
      );
    });

    if (how) {
      how.removeAttribute("aria-current");
      how.classList.remove("router-link-active", "router-link-exact-active");
    }

    if (!how) {
      how = document.createElement("a");
      how.href = "/#process";
      how.textContent = "How It Works";
    }

    var menu = document.createElement("div");
    menu.className = "home-nav-menu";

    [home, services, how, blog, contact].forEach(function (item) {
      if (item) menu.appendChild(item);
    });

    var divider = document.createElement("span");
    divider.className = "home-nav-divider";
    divider.setAttribute("aria-hidden", "true");

    links.textContent = "";
    links.setAttribute("data-home-nav", "true");
    links.appendChild(menu);
    links.appendChild(divider);

    if (quote) {
      quote.classList.add("home-nav-quote");
      quote.textContent = "Request a Quote";
      links.appendChild(quote);
    }
  }

  function buildHero() {
    if (document.querySelector(".home-hero")) return;

    var hero = document.querySelector(".hero");
    if (!hero) return;

    var grid = hero.querySelector(".hero__grid");
    var copy = hero.querySelector(".hero__copy");
    var media = hero.querySelector(".hero__media");
    if (!grid || !copy || !media || !hero.parentNode) return;

    var eyebrow = hero.querySelector(".eyebrow");
    if (eyebrow) {
      eyebrow.className = "home-hero__eyebrow";
      eyebrow.textContent = "CUSTOM SOLUTIONS. LOCAL IMPACT.";
    }

    var heading = hero.querySelector("h1");
    if (heading) {
      heading.className = "home-hero__title";
      heading.innerHTML =
        '<span>Stand out.</span><span>Make an impact.</span><span class="home-hero__title-accent">We\u2019ll handle</span><span class="home-hero__title-accent">the details.</span>';
    }

    var lead = hero.querySelector(".hero__lead");
    if (lead) {
      lead.className = "home-hero__description";
      lead.textContent =
        "From custom apparel to business print and vehicle graphics, we deliver high-quality print solutions that help your brand look professional and get noticed.";
    }

    var quoteLink = hero.querySelector('a[href="/contact/#quote"]') || hero.querySelector(".button--primary");
    if (quoteLink) quoteLink.textContent = "Request a Quote";

    var servicesLink = hero.querySelector('a[href="/services/"]');
    if (servicesLink) servicesLink.textContent = "Explore All Services";

    var legacyNote = copy.querySelector(".hero__note");
    if (legacyNote) legacyNote.remove();

    copy.className = "home-hero__copy";
    var actions = copy.querySelector(".button-row");
    if (actions) actions.classList.add("home-hero__actions");

    media.className = "home-hero__visual";
    media.removeAttribute("aria-label");
    media.innerHTML =
      '<a class="home-hero__card home-hero__card--apparel" href="/apparel/" aria-label="Explore custom apparel">' +
        '<img src="/images/apparel/apparel-mix.png" alt="Custom embroidered shirts and hats" width="1448" height="1086" loading="eager" decoding="async">' +
      '</a>' +
      '<a class="home-hero__card home-hero__card--print" href="/business-print/">' +
        '<span class="home-hero__card-copy"><strong>Business<br>Print</strong><span class="home-hero__card-arrow" aria-hidden="true">\u2192</span></span>' +
        '<img src="/images/simple/business-print.jpg" alt="Custom business cards and print materials" width="1400" height="933" loading="eager" decoding="async">' +
      '</a>' +
      '<a class="home-hero__card home-hero__card--vehicle" href="/signs-vehicle-graphics/">' +
        '<span class="home-hero__card-copy"><strong>Signs &amp;<br>Vehicle Graphics</strong><span class="home-hero__card-arrow" aria-hidden="true">\u2192</span></span>' +
        '<img src="/images/vehicle-graphics/commercial-vehicle-wrap.webp" alt="Branded commercial vehicle graphics" width="1200" height="900" loading="eager" decoding="async">' +
      '</a>' +
      '<a class="home-hero__card home-hero__card--polo" href="/embroidery/">' +
        '<span class="home-hero__card-copy"><strong>Custom<br>Apparel</strong><span class="home-hero__card-arrow" aria-hidden="true">\u2192</span></span>' +
        '<img src="/images/embroidery/embroidered-company-polo.webp" alt="Custom embroidered polo shirts" width="1200" height="900" loading="eager" decoding="async">' +
      '</a>';

    var proof = document.createElement("div");
    proof.className = "home-hero__proof";
    proof.setAttribute("aria-label", "Affinity Creative service advantages");
    proof.innerHTML =
      '<div class="home-hero__proof-inner">' +
        '<div class="home-hero__proof-item">' +
          '<svg class="home-hero__proof-icon" viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15h12"/><path d="M1 24h14"/><path d="M5 33h10"/><circle cx="30" cy="24" r="13"/><path d="M30 16v9l6 3"/><path d="M25 8h10"/></g></svg>' +
          '<span class="home-hero__proof-copy"><strong>Fast Turnaround</strong><span>On time, every time.</span></span>' +
        '</div>' +
        '<div class="home-hero__proof-item">' +
          '<svg class="home-hero__proof-icon" viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 44 C24 44 38 31 38 18 C38 10.3 31.7 4 24 4 C16.3 4 10 10.3 10 18 C10 31 24 44 24 44Z"/><circle cx="24" cy="18" r="5"/></g></svg>' +
          '<span class="home-hero__proof-copy"><strong>GTA Service</strong><span>Local &amp; reliable.</span></span>' +
        '</div>' +
        '<div class="home-hero__proof-item">' +
          '<svg class="home-hero__proof-icon home-hero__proof-icon--leaf" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/></svg>' +
          '<span class="home-hero__proof-copy"><strong>Local Production</strong><span>Proudly made in Canada.</span></span>' +
        '</div>' +
      '</div>';

    var services = document.createElement("nav");
    services.className = "home-hero__services";
    services.setAttribute("aria-label", "Featured services");
    services.innerHTML =
      '<a class="home-hero__service home-hero__service--active" href="/apparel/">' + icon("shirt") + '<span>Custom Apparel</span></a>' +
      '<a class="home-hero__service" href="/business-print/">' + icon("file") + '<span>Business Print</span></a>' +
      '<a class="home-hero__service" href="/signs-vehicle-graphics/">' + icon("car") + '<span>Signs &amp; Vehicle<br>Graphics</span></a>' +
      '<a class="home-hero__service" href="/services/">' + icon("gift") + '<span>Promotional<br>Products</span></a>';

    grid.className = "home-hero__inner";
    grid.textContent = "";
    grid.appendChild(copy);
    grid.appendChild(media);
    grid.appendChild(proof);
    grid.appendChild(services);

    var section = document.createElement("section");
    section.className = "home-hero";
    section.appendChild(grid);
    hero.parentNode.replaceChild(section, hero);
  }

  function applyHomeHero() {
    if (!desktopQuery.matches) return;

    buildTopbar();
    buildNavigation();
    buildHero();
  }

  function scheduleApply() {
    [1200, 1700, 2400].forEach(function (delay) {
      window.setTimeout(applyHomeHero, delay);
    });
  }

  if (document.readyState === "complete") {
    scheduleApply();
  } else {
    window.addEventListener("load", scheduleApply, { once: true });
  }

  window.addEventListener("resize", function () {
    window.clearTimeout(window.__homeHeroResizeTimer);
    window.__homeHeroResizeTimer = window.setTimeout(applyHomeHero, 120);
  });
})();
