import{u as d,_ as p}from"./BACAUKNh.js";import{_ as u}from"./CIH6l5Q9.js";import{t as n}from"./Bd1lDybd.js";import{d as m,m as h,c as f,a as e,b as a,i as s,t as i,o as _,j as g,_ as v}from"./DAZZjB7c.js";import{b}from"./uWPKOr4b.js";import"./dlSGPYYs.js";import"./DLWur_Kr.js";const y={class:"contact-page"},w={class:"container"},S={class:"contact-hero"},C={class:"container contact-hero__grid"},P={class:"contact-hero__panel","data-reveal":""},k=["href"],E=["href"],B={class:"section contact-form-section"},D={class:"container contact-form-section__grid"},q=`
(() => {
  const services = {
    apparel: 'Custom Apparel',
    embroidery: 'Embroidery',
    dtf: 'DTF Printing',
    'screen-printing': 'Screen Printing',
    'business-print': 'Business Print',
    print: 'Business Print',
    'direct-mail': 'Direct Mail',
    signs: 'Signs',
    'vehicle-graphics': 'Vehicle Decals',
    'vehicle-decals': 'Vehicle Decals',
    'vehicle-wraps': 'Vehicle Wraps',
    fleet: 'Fleet Branding',
    'fleet-branding': 'Fleet Branding',
    'glass-finishes': 'Glass Finishes',
    glass: 'Glass Finishes',
    'digital-marketing': 'Website Design',
    website: 'Website Design',
    websites: 'Website Design',
    seo: 'Local SEO',
    'local-seo': 'Local SEO',
    'google-ads': 'Google Ads',
    'local-services-ads': 'Google Local Services Ads',
    social: 'Facebook & Instagram Advertising'
  }

  function applyPrefill() {
    const requested = new URLSearchParams(window.location.search).get('service')
    const matched = requested ? services[requested.trim().toLowerCase()] : ''
    const select = document.getElementById('serviceCategory')
    if (!matched || !select || select.value === matched) return

    select.value = matched
    select.dispatchEvent(new Event('input', { bubbles: true }))
    select.dispatchEvent(new Event('change', { bubbles: true }))
  }

  function runPrefill() {
    applyPrefill()
    ;[50, 150, 400, 800, 1600, 3200].forEach((delay) => {
      window.setTimeout(applyPrefill, delay)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPrefill, { once: true })
  } else {
    runPrefill()
  }
})()
`,A=m({__name:"contact",setup(F){const{site:o}=g();return d({title:"Contact Affinity Creative | Request a Quote",description:"Tell Affinity Creative about your apparel, print, signs, glass finishes, website or marketing project. Serving Toronto and the Greater Toronto Area.",path:"/contact/",image:"/images/simple/business-print.jpg",schema:[b(o,[{name:"Home",path:"/"},{name:"Contact",path:"/contact/"}])]}),h({script:[{key:"quote-service-prefill",textContent:q}]}),(H,t)=>{const r=p,c=u;return _(),f("div",y,[e("div",w,[a(r,{items:[{label:"Home",href:"/"},{label:"Contact"}]})]),e("section",S,[e("div",C,[t[3]||(t[3]=e("div",{class:"contact-hero__copy","data-reveal":""},[e("p",{class:"eyebrow"},"Contact"),e("h1",null,"Tell us what you are planning."),e("p",null,"Share the product, quantity, artwork and required date. We will review the details and help you choose the next step.")],-1)),e("div",P,[e("a",{href:s(o).phoneHref,onClick:t[0]||(t[0]=l=>s(n)(s(o).phoneHref,{location:"contact_panel"}))},i(s(o).phone),9,k),e("a",{href:s(o).emailHref,onClick:t[1]||(t[1]=l=>s(n)(s(o).emailHref,{location:"contact_panel"}))},i(s(o).email),9,E),t[2]||(t[2]=e("p",null,"Serving Toronto and the Greater Toronto Area",-1))])])]),e("section",B,[e("div",D,[t[4]||(t[4]=e("div",{class:"contact-form-section__copy","data-reveal":""},[e("h2",null,"Send the useful details."),e("p",null,"If you already have artwork, include a link or notes. If you are still choosing the product, describe how it will be used.")],-1)),a(c)])])])}}}),j=v(A,[["__scopeId","data-v-901d13e1"]]);export{j as default};
