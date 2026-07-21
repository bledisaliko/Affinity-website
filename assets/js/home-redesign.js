(function () {
  var productSrc = "/images/home-hero/banner-products-cutout.png";
  var stripHtml =
    '<div class="home-hero-strip" aria-label="Affinity Creative service advantages">' +
    '<div class="home-hero-strip__item"><span class="home-hero-strip__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h5"></path><path d="M2 12h6"></path><path d="M4 16h4"></path><circle cx="15" cy="12" r="6.5"></circle><path d="M15 8.8v3.5l2.4 1.4"></path></svg></span><span><strong>Fast Turnaround</strong><span>On time, every time.</span></span></div>' +
    '<div class="home-hero-strip__item"><span class="home-hero-strip__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s6.5-4.9 6.5-10.4a6.5 6.5 0 1 0-13 0C5.5 16.1 12 21 12 21Z"></path><circle cx="12" cy="10.6" r="2.3"></circle></svg></span><span><strong>GTA Service</strong><span>Local and reliable.</span></span></div>' +
    '<div class="home-hero-strip__item"><span class="home-hero-strip__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5l1.5 3.8 3.7-1-1.5 3.6 3.9 1.5-4.1 1.3 1.2 4-3.7-1.6-1 4.4-1-4.4-3.7 1.6 1.2-4-4.1-1.3 3.9-1.5-1.5-3.6 3.7 1L12 3.5Z"></path><path d="M12 15.1v5.4"></path></svg></span><span><strong>Local Production</strong><span>Proudly made in Canada.</span></span></div>' +
    "</div>";

  function applyHomeRedesign() {
    var hero = document.querySelector(".hero");
    if (!hero) return;

    var eyebrow = hero.querySelector(".eyebrow");
    if (eyebrow) eyebrow.textContent = "APPAREL. PRINT. GRAPHICS.";

    var heading = hero.querySelector("h1");
    if (heading) {
      heading.innerHTML = "Your brand.<br>Every surface.<br><span>Total impact.</span>";
    }

    var lead = hero.querySelector(".hero__lead");
    if (lead) {
      lead.textContent =
        "Custom apparel your team will wear. Print pieces people can hold onto. Graphics that keep you moving forward. One partner. Every detail.";
    }

    var servicesLink = hero.querySelector('a[href="/services/"]');
    if (servicesLink) servicesLink.textContent = "Explore Our Services";

    var img = hero.querySelector(".hero__photo--main img");
    if (img) {
      img.setAttribute("src", productSrc);
      img.setAttribute("srcset", productSrc + " 1x");
      img.setAttribute("alt", "Apparel, print, vehicle graphics and storefront branding examples");
      img.setAttribute("width", "1500");
      img.setAttribute("height", "1252");
    }

    if (!hero.querySelector(".home-hero-strip")) {
      hero.insertAdjacentHTML("beforeend", stripHtml);
    }
  }

  function scheduleHomeRedesign() {
    [40, 260, 800].forEach(function (delay) {
      window.setTimeout(applyHomeRedesign, delay);
    });
  }

  if (document.readyState === "complete") {
    scheduleHomeRedesign();
  } else {
    window.addEventListener("load", scheduleHomeRedesign, { once: true });
  }
})();
