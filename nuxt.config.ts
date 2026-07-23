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
        { rel: 'apple-touch-icon', href: '/brand/affinity-favicon.png' }
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-3CCCVJ8TLL'
        },
        {
          textContent: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-3CCCVJ8TLL');`
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
