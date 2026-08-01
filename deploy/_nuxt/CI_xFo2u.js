import{u as v,_ as y}from"./B4b_Xrst.js";import{_}from"./DM8ZfhZf.js";import{p as h,d as b,m as k,c as w,a as e,b as o,i as a,t as l,f as i,o as C,j as P,k as S,_ as A}from"./BcDunPTi.js";import{t as r}from"./Bd1lDybd.js";import{b as M}from"./uWPKOr4b.js";import{c as s}from"./FsGqGL7C.js";import{M as u,P as H,a as p,A as c,S as B}from"./CmtjK6hu.js";import"./BlSR2rm8.js";const E=s("BadgeCheckIcon",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);const L=s("Clock3Icon",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);const q=s("HeadphonesIcon",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]);const x=s("ShoppingBagIcon",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);const I=s("SparklesIcon",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);const D=s("TagIcon",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]),F=h("/images/contact/affinity-contact-merch.webp"),T=h("/images/contact/polo-guide-2026.webp"),G={class:"contact-page"},V={class:"container"},W={class:"contact-hero"},j={class:"container"},z={class:"contact-proof","aria-label":"Why work with Affinity Creative"},O={class:"contact-proof__item"},R={class:"contact-proof__item"},$={class:"contact-proof__item"},N={class:"contact-proof__item"},Q={class:"section contact-form-section"},U={class:"container contact-form-layout"},Z={class:"contact-sidebar","aria-label":"Contact information","data-reveal":""},Y={class:"contact-card contact-card--information"},J=["href"],K=["href"],X=["href"],ee={class:"contact-card contact-card--action"},te={href:"https://shop.affinitycreative.ca/",target:"_blank",rel:"noopener noreferrer"},ae={class:"contact-card contact-card--action"},oe=["href"],ne={class:"contact-catalogue",href:"https://www.zoomcats.com/catalog/affinity-creative-polo-guide",target:"_blank",rel:"noopener noreferrer","aria-label":"Open the Affinity Creative Polo Guide 2026 catalogue"},se={class:"contact-catalogue__footer"},le={class:"contact-catalogue__button"},ie={class:"contact-form-card","data-reveal":""},re={class:"container contact-benefits","aria-label":"Quote benefits"},ce=`
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
`,de=b({__name:"contact",setup(ue){const{site:n}=P(),m=S(()=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.address)}`);return v({title:"Contact Affinity Creative | Request a Quote",description:"Tell Affinity Creative about your apparel, print, signs, glass finishes, website or marketing project. Serving Toronto and the Greater Toronto Area.",path:"/contact/",image:"/images/simple/business-print.jpg",schema:[M(n,[{name:"Home",path:"/"},{name:"Contact",path:"/contact/"}])]}),k({script:[{key:"quote-service-prefill",textContent:ce}]}),(pe,t)=>{const f=y,g=_;return C(),w("div",G,[e("div",V,[o(f,{items:[{label:"Home",href:"/"},{label:"Contact"}]})]),e("section",W,[e("div",j,[t[7]||(t[7]=e("div",{class:"contact-hero__grid"},[e("div",{class:"contact-hero__copy","data-reveal":""},[e("p",{class:"eyebrow"},"Contact"),e("h1",null,"Tell us what you are planning."),e("p",null,"Share the product, quantity, artwork and required date. We will review the details and help you choose the next step.")]),e("figure",{class:"contact-hero__media","data-reveal":""},[e("img",{src:F,alt:"Affinity Creative branded hoodie, embroidered hat and tumbler",width:"1536",height:"1024",loading:"eager",fetchpriority:"high",decoding:"async"})])],-1)),e("div",z,[e("div",O,[o(a(L),{"aria-hidden":"true"}),t[3]||(t[3]=e("span",null,[e("strong",null,"Fast Turnaround"),e("small",null,"On time, every time.")],-1))]),e("div",R,[o(a(u),{"aria-hidden":"true"}),t[4]||(t[4]=e("span",null,[e("strong",null,"GTA Service"),e("small",null,"Local and reliable.")],-1))]),e("div",$,[o(a(E),{"aria-hidden":"true"}),t[5]||(t[5]=e("span",null,[e("strong",null,"Local Production"),e("small",null,"Made with practical care.")],-1))]),e("div",N,[o(a(I),{"aria-hidden":"true"}),t[6]||(t[6]=e("span",null,[e("strong",null,"Quality Focus"),e("small",null,"Details checked before production.")],-1))])])])]),e("section",Q,[e("div",U,[e("aside",Z,[e("section",Y,[t[11]||(t[11]=e("h2",null,"Contact Information",-1)),e("a",{class:"contact-detail",href:a(n).phoneHref,onClick:t[0]||(t[0]=d=>a(r)(a(n).phoneHref,{location:"contact_panel"}))},[o(a(H),{"aria-hidden":"true"}),e("span",null,[e("strong",null,l(a(n).phone),1),t[8]||(t[8]=e("small",null,"Call to discuss your project.",-1))])],8,J),e("a",{class:"contact-detail",href:a(n).emailHref,onClick:t[1]||(t[1]=d=>a(r)(a(n).emailHref,{location:"contact_panel"}))},[o(a(p),{"aria-hidden":"true"}),e("span",null,[e("strong",null,l(a(n).email),1),t[9]||(t[9]=e("small",null,"We typically respond within one business day.",-1))])],8,K),e("a",{class:"contact-detail",href:a(m),target:"_blank",rel:"noopener noreferrer"},[o(a(u),{"aria-hidden":"true"}),e("span",null,[e("strong",null,l(a(n).address),1),t[10]||(t[10]=e("small",null,"Local pickup available.",-1))])],8,X)]),e("section",ee,[o(a(x),{"aria-hidden":"true"}),t[13]||(t[13]=e("div",null,[e("h2",null,"Need inspiration?"),e("p",null,"Browse products and ideas for apparel, print and branded merchandise.")],-1)),e("a",te,[t[12]||(t[12]=i(" Visit the Shop ",-1)),o(a(c),{"aria-hidden":"true"})])]),e("section",ae,[o(a(p),{"aria-hidden":"true"}),t[15]||(t[15]=e("div",null,[e("h2",null,"Already have artwork?"),e("p",null,"Email your logo or files and include the quantity and required date.")],-1)),e("a",{href:a(n).emailHref,onClick:t[2]||(t[2]=d=>a(r)(a(n).emailHref,{location:"contact_artwork_card"}))},[t[14]||(t[14]=i(" Email Your Artwork ",-1)),o(a(c),{"aria-hidden":"true"})],8,oe)]),e("a",ne,[t[18]||(t[18]=e("img",{src:T,alt:"Affinity Creative Polo Guide 2026 catalogue cover",width:"724",height:"908",loading:"lazy",decoding:"async"},null,-1)),e("span",se,[t[17]||(t[17]=e("span",null,[e("small",null,"Product Catalogue"),e("strong",null,"Explore the 2026 Polo Guide")],-1)),e("span",le,[t[16]||(t[16]=i("Open Guide ",-1)),o(a(c),{"aria-hidden":"true"})])])])]),e("div",ie,[t[19]||(t[19]=e("header",{class:"contact-form-card__header"},[e("p",{class:"eyebrow"},"Project details"),e("h2",null,"Send the useful details."),e("p",null,"If you already have artwork, include a link or notes. If you are still choosing the product, describe how it will be used.")],-1)),o(g)])]),e("div",re,[e("div",null,[o(a(B),{"aria-hidden":"true"}),t[20]||(t[20]=e("span",null,[e("strong",null,"Solutions for every brand"),e("small",null,"From small orders to larger programs.")],-1))]),e("div",null,[o(a(D),{"aria-hidden":"true"}),t[21]||(t[21]=e("span",null,[e("strong",null,"Clear next steps"),e("small",null,"Practical details before production.")],-1))]),e("div",null,[o(a(q),{"aria-hidden":"true"}),t[22]||(t[22]=e("span",null,[e("strong",null,"Dedicated support"),e("small",null,"We are here to help you succeed.")],-1))])])])])}}}),ke=A(de,[["__scopeId","data-v-6d1a6ae0"]]);export{ke as default};
