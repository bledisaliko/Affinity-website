import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  srcDir: 'app',
  compatibilityDate: '2026-07-14',
  devtools: { enabled: false },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/tokens.css',
    '~/assets/css/typography.css',
    '~/assets/css/utilities.css',
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'en-CA' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#11110f' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/brand/affinity-favicon.png' },
        { rel: 'apple-touch-icon', href: '/brand/affinity-favicon.png' },
        { rel: 'stylesheet', href: '/a26/affinity-2026.v2.css' }
      ],
      script: [
        {
          src: '/a26/affinity-2026.v2.js',
          defer: true,
          tagPosition: 'bodyClose'
        },
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-REF62SP9DJ',
          tagPriority: -100
        },
        {
          textContent: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-REF62SP9DJ');`,
          tagPriority: -100
        },
        {
          type: 'text/javascript',
          textContent: `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a892da232c63a3448b60f23/1k0jtkgft';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();`,
          tagPosition: 'bodyClose'
        }
      ]
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/services/',
        '/apparel/',
        '/embroidery/',
        '/business-print/',
        '/signs-vehicle-graphics/',
        '/vinyl-graphics/',
        '/glass-finishes/',
        '/digital-marketing/',
        '/blog/',
        '/blog/custom-apparel-logo-placement-guide/',
        '/blog/vehicle-graphics-marketing/',
        '/blog/local-seo-for-gta-businesses/',
        '/blog/direct-mail-canada-post/',
        '/blog/embroidery-dtf-screen-printing/',
        '/contact/',
        '/privacy/',
        '/terms/'
      ],
      failOnError: true
    }
  },
  typescript: {
    strict: true,
    typeCheck: false
  },
  sourcemap: {
    server: false,
    client: false
  }
})
