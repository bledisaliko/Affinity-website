<script setup lang="ts">
import {
  ArrowRight,
  ArrowUpRight,
  Instagram,
  MapPin,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Truck,
  X
} from 'lucide-vue-next'
import { featuredServiceLinks, serviceMenuItems } from '../../data/serviceMenu'
import { trackEventForHref } from '../../utils/tracking'

const route = useRoute()
const { site } = useSiteContent()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isMobileServicesOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const menuOverlay = ref<HTMLElement | null>(null)

const secondaryNavigation = [
  { number: '03', label: 'How It Works', to: '/#process' },
  { number: '04', label: 'Blog', to: '/blog/' },
  { number: '05', label: 'Contact', to: '/contact/' }
]

const embroideryTo = featuredServiceLinks.find(link => link.label === 'Embroidery')?.to ?? '/embroidery/'
const vinylTo = featuredServiceLinks.find(link => link.label === 'Vinyl Graphics')?.to ?? '/vinyl-graphics/'
const mobileServiceItems = [
  { ...serviceMenuItems.find(item => item.to === '/apparel/')!, popular: false },
  {
    title: 'Custom Embroidery',
    description: 'Stitched logos for polos, jackets, hats and uniforms',
    to: embroideryTo,
    popular: true
  },
  { ...serviceMenuItems.find(item => item.to === '/business-print/')!, popular: false },
  { ...serviceMenuItems.find(item => item.to === '/signs-vehicle-graphics/')!, popular: false },
  {
    title: 'Vinyl Graphics',
    description: 'Vehicle decals, fleet graphics and storefront lettering',
    to: vinylTo,
    popular: true
  },
  { ...serviceMenuItems.find(item => item.to === '/glass-finishes/')!, popular: false },
  { ...serviceMenuItems.find(item => item.to === '/digital-marketing/')!, popular: false }
]

const whatsappUrl = computed(
  () => site.socialLinks.find(link => link.label.toLowerCase() === 'whatsapp')?.url ?? '#'
)
const instagramUrl = computed(
  () => site.socialLinks.find(link => link.label.toLowerCase() === 'instagram')?.url ?? '#'
)

let savedScrollY = 0
let previousBodyPosition = ''
let previousBodyTop = ''
let previousBodyWidth = ''
let previousBodyOverflow = ''
let previousHtmlOverflow = ''
let inertTargets: HTMLElement[] = []

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function setUnderlyingPageInert(value: boolean) {
  if (value) {
    inertTargets = Array.from(document.querySelectorAll<HTMLElement>('#main-content, footer'))
    inertTargets.forEach(element => {
      element.inert = true
    })
    return
  }

  inertTargets.forEach(element => {
    element.inert = false
  })
  inertTargets = []
}

function lockPage() {
  savedScrollY = window.scrollY
  previousBodyPosition = document.body.style.position
  previousBodyTop = document.body.style.top
  previousBodyWidth = document.body.style.width
  previousBodyOverflow = document.body.style.overflow
  previousHtmlOverflow = document.documentElement.style.overflow

  document.body.style.position = 'fixed'
  document.body.style.top = `-${savedScrollY}px`
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
  setUnderlyingPageInert(true)
}

function unlockPage() {
  document.body.style.position = previousBodyPosition
  document.body.style.top = previousBodyTop
  document.body.style.width = previousBodyWidth
  document.body.style.overflow = previousBodyOverflow
  document.documentElement.style.overflow = previousHtmlOverflow
  setUnderlyingPageInert(false)
  window.scrollTo(0, savedScrollY)
}

async function openMenu() {
  if (isMenuOpen.value) return
  isMenuOpen.value = true
  lockPage()
  await nextTick()
  closeButton.value?.focus()
}

async function closeMenu(restoreFocus = false) {
  if (!isMenuOpen.value) return
  isMenuOpen.value = false
  isMobileServicesOpen.value = false
  unlockPage()

  if (restoreFocus) {
    await nextTick()
    menuButton.value?.focus()
  }
}

function trackAndClose(href: string) {
  trackEventForHref(href)
  void closeMenu(false)
}

function handleKeydown(event: KeyboardEvent) {
  if (!isMenuOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    void closeMenu(true)
    return
  }

  if (event.key !== 'Tab' || !menuOverlay.value) return

  const focusable = Array.from(
    menuOverlay.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(element => !element.hasAttribute('hidden'))

  if (!focusable.length) return

  const first = focusable[0]!
  const last = focusable[focusable.length - 1]!

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function handleResize() {
  if (window.innerWidth > 900 && isMenuOpen.value) {
    void closeMenu(false)
  }
}

function isCurrentLink(to: string) {
  const [path, hash = ''] = to.split('#')
  if (path !== route.path) return false
  if (to === '/') return route.hash !== '#process'
  if (hash) return route.hash === `#${hash}`
  return true
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('keydown', handleKeydown)
  if (isMenuOpen.value) unlockPage()
})

watch(
  () => route.fullPath,
  () => {
    void closeMenu(false)
  }
)
</script>

<template>
  <div class="topbar">
    <div class="container topbar__inner">
      <span class="home-topbar-group home-topbar-group--left">
        <MapPin aria-hidden="true" />
        <span>Serving Toronto and the Greater Toronto Area</span>
      </span>
      <span class="home-topbar-group home-topbar-group--center">
        <Truck aria-hidden="true" />
        <span>Local production. Fast turnaround.</span>
      </span>
      <span class="home-topbar-group home-topbar-group--right">
        <a :href="site.phoneHref" @click="trackEventForHref(site.phoneHref)">
          <Phone aria-hidden="true" />
          <span>{{ site.phone }}</span>
        </a>
        <span class="home-topbar-separator" aria-hidden="true" />
        <a :href="site.emailHref" @click="trackEventForHref(site.emailHref)">
          <Mail aria-hidden="true" />
          <span>{{ site.email }}</span>
        </a>
      </span>
    </div>
  </div>

  <header class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <div class="container nav">
      <NuxtLink class="brand" to="/" aria-label="Affinity Creative home" @click="closeMenu(false)">
        <img src="/brand/affinity-header-logo.png" :alt="site.companyName" width="2048" height="546" loading="eager" decoding="async">
      </NuxtLink>

      <nav id="primary-nav" class="nav__links" aria-label="Primary navigation">
        <div class="home-nav-menu">
          <NuxtLink to="/">Home</NuxtLink>
          <ServicesDropdown class="nav__services-desktop" />
          <NuxtLink to="/#process">How It Works</NuxtLink>
          <NuxtLink to="/blog/">Blog</NuxtLink>
          <NuxtLink to="/contact/">Contact</NuxtLink>
        </div>
        <span class="home-nav-divider" aria-hidden="true" />
        <NuxtLink class="button button--primary home-nav-quote" to="/contact/#quote">
          <span>Request a Quote</span>
          <ArrowRight aria-hidden="true" />
        </NuxtLink>
      </nav>

      <button
        ref="menuButton"
        class="menu-button"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Open navigation"
        @click="openMenu"
      >
        <Menu :size="24" aria-hidden="true" />
      </button>
    </div>
  </header>

  <Teleport to="body">
    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        ref="menuOverlay"
        class="mobile-menu"
        :class="{ 'mobile-menu--expanded': isMobileServicesOpen }"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div class="mobile-menu__shell">
          <header class="mobile-menu__header">
            <NuxtLink class="mobile-menu__brand" to="/" aria-label="Affinity Creative home" @click="closeMenu(false)">
              <img src="/brand/affinity-header-logo.png" :alt="site.companyName" width="2048" height="546" decoding="async">
            </NuxtLink>
            <button
              ref="closeButton"
              class="mobile-menu__close"
              type="button"
              aria-label="Close navigation"
              @click="closeMenu(true)"
            >
              <X aria-hidden="true" />
            </button>
          </header>

          <nav class="mobile-menu__navigation" aria-label="Mobile navigation links">
            <NuxtLink
              class="mobile-menu-link"
              to="/"
              :aria-current="isCurrentLink('/') ? 'page' : undefined"
              style="--menu-index: 0"
              @click="closeMenu(false)"
            >
              <span class="mobile-menu-link__number">01</span>
              <span class="mobile-menu-link__label">Home</span>
              <ArrowUpRight class="mobile-menu-link__arrow" aria-hidden="true" />
            </NuxtLink>

            <div class="mobile-menu-services">
              <button
                class="mobile-menu-link mobile-menu-link--button"
                type="button"
                :aria-expanded="isMobileServicesOpen"
                aria-controls="mobile-menu-services"
                style="--menu-index: 1"
                @click="isMobileServicesOpen = !isMobileServicesOpen"
              >
                <span class="mobile-menu-link__number">02</span>
                <span class="mobile-menu-link__label">Services</span>
                <Minus v-if="isMobileServicesOpen" class="mobile-menu-link__disclosure" aria-hidden="true" />
                <Plus v-else class="mobile-menu-link__disclosure" aria-hidden="true" />
              </button>

              <Transition name="mobile-services">
                <div v-if="isMobileServicesOpen" id="mobile-menu-services" class="mobile-menu-services__list">
                  <NuxtLink
                    v-for="(item, index) in mobileServiceItems"
                    :key="item.to"
                    class="mobile-menu-service"
                    :to="item.to"
                    :aria-current="route.path === item.to ? 'page' : undefined"
                    @click="trackAndClose(item.to)"
                  >
                    <span class="mobile-menu-service__number">{{ String(index + 1).padStart(2, '0') }}</span>
                    <span class="mobile-menu-service__copy">
                      <span class="mobile-menu-service__title">
                        {{ item.title }}
                        <small v-if="item.popular">Popular</small>
                      </span>
                      <span>{{ item.description }}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </NuxtLink>
                </div>
              </Transition>
            </div>

            <NuxtLink
              v-for="(item, index) in secondaryNavigation"
              :key="item.to"
              class="mobile-menu-link"
              :to="item.to"
              :aria-current="isCurrentLink(item.to) ? 'page' : undefined"
              :style="{ '--menu-index': index + 2 }"
              @click="closeMenu(false)"
            >
              <span class="mobile-menu-link__number">{{ item.number }}</span>
              <span class="mobile-menu-link__label">{{ item.label }}</span>
              <ArrowUpRight class="mobile-menu-link__arrow" aria-hidden="true" />
            </NuxtLink>
          </nav>

          <section class="mobile-menu__contact" aria-labelledby="mobile-menu-contact-heading">
            <span class="mobile-menu__monogram" aria-hidden="true">AC</span>

            <div class="mobile-menu__cta">
              <p class="mobile-menu__eyebrow">Let's Talk</p>
              <h2 id="mobile-menu-contact-heading">
                Ready to start your <span>project?</span>
              </h2>
              <p>Tell us what you need and when you need it.</p>

              <div class="mobile-menu__actions">
                <NuxtLink class="mobile-menu__quote" to="/contact/#quote" @click="trackAndClose('/contact/#quote')">
                  <ArrowRight aria-hidden="true" />
                  <span>Request a Quote</span>
                </NuxtLink>
                <a
                  class="mobile-menu__call"
                  :href="site.phoneHref"
                  :aria-label="`Call Affinity Creative at ${site.phone}`"
                  @click="trackAndClose(site.phoneHref)"
                >
                  <Phone aria-hidden="true" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            <div class="mobile-menu__quick-contact">
              <a :href="site.emailHref" @click="trackEventForHref(site.emailHref)">
                <Mail aria-hidden="true" />
                <span>{{ site.email }}</span>
              </a>

              <div class="mobile-menu__socials">
                <a
                  class="mobile-menu-social"
                  :href="instagramUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Affinity Creative on Instagram"
                  @click="trackEventForHref(instagramUrl)"
                >
                  <Instagram aria-hidden="true" />
                </a>
                <a
                  class="mobile-menu-social"
                  :href="whatsappUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Affinity Creative on WhatsApp"
                  @click="trackEventForHref(whatsappUrl)"
                >
                  <MessageCircle aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.topbar {
  background: var(--color-ink);
  color: var(--color-white);
  font-size: 0.82rem;
}

.topbar__inner {
  display: flex;
  min-height: 2.4rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
}

.site-header {
  position: sticky;
  inset-block-start: 0;
  z-index: 30;
  border-block-end: 1px solid var(--color-line);
  background: rgb(244 241 234 / 0.94);
  backdrop-filter: blur(12px);
  box-shadow: 0 0 0 rgb(17 17 15 / 0);
  transition: background 220ms var(--ease), box-shadow 220ms var(--ease), backdrop-filter 220ms var(--ease);
}

.site-header--scrolled {
  background: rgb(244 241 234 / 0.97);
  box-shadow: 0 0.55rem 1.5rem rgb(17 17 15 / 0.08);
  backdrop-filter: blur(18px);
}

.nav {
  display: flex;
  min-height: 4.75rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  transition: min-height 220ms var(--ease);
}

.site-header--scrolled .nav {
  min-height: 4.4rem;
}

.brand {
  display: inline-flex;
  align-items: center;
}

.brand img {
  display: block;
  width: clamp(13.1rem, 18vw, 14.7rem);
  height: auto;
  object-fit: contain;
}

.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 1.75rem);
  font-size: 0.9rem;
  font-weight: 800;
}

.nav__links a:not(.button):hover,
.nav__links a:not(.button):focus-visible {
  opacity: 0.58;
}

@media (width > 900px) {
  .topbar {
    min-height: 44px;
    background: #121212;
    color: #f6f0e7;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0;
  }

  .topbar__inner {
    display: grid;
    width: calc(100% - 72px);
    max-width: 1368px;
    min-height: 44px;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
    gap: 28px;
    margin-inline: auto;
    padding-inline: 0;
  }

  .home-topbar-group {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: 9px;
    color: #f6f0e7;
    white-space: nowrap;
  }

  .home-topbar-group :deep(svg) {
    width: 15px;
    height: 15px;
    flex: 0 0 auto;
    color: #ff512e;
    stroke-width: 1.9;
  }

  .home-topbar-group--center { justify-self: center; }

  .home-topbar-group--right {
    justify-self: end;
    gap: 13px;
  }

  .home-topbar-group a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: inherit;
    text-decoration: none;
  }

  .home-topbar-separator {
    width: 1px;
    height: 18px;
    background: rgb(246 240 231 / 0.32);
  }

  .site-header,
  .site-header--scrolled {
    border-block-end: 1px solid rgb(20 20 20 / 0.14);
    background: #f7f1e9;
    box-shadow: none;
    backdrop-filter: none;
  }

  .nav,
  .site-header--scrolled .nav {
    display: grid;
    width: calc(100% - 64px);
    max-width: 1368px;
    min-height: 122px;
    grid-template-columns: 300px minmax(0, 1fr);
    align-items: center;
    gap: 28px;
    margin-inline: auto;
    padding-inline: 0;
  }

  .brand {
    display: flex;
    height: 58px;
    align-items: center;
    border-inline-end: 1px solid rgb(20 20 20 / 0.18);
    padding-inline-end: 32px;
  }

  .brand img {
    display: block;
    width: 254px;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  .nav__links {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 1px 216px;
    align-items: center;
    gap: 28px;
    font-size: 15.5px;
  }

  .home-nav-menu {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: center;
    gap: clamp(28px, 3.1vw, 42px);
  }

  .home-nav-menu > a:not(.button),
  .home-nav-menu :deep(.services-dropdown__button) {
    color: #111111;
    font-size: 15.5px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }

  .home-nav-divider {
    width: 1px;
    height: 54px;
    background: rgb(20 20 20 / 0.18);
  }

  .nav__links .home-nav-quote {
    display: inline-flex;
    width: 216px;
    min-width: 0;
    min-height: 54px;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin: 0;
    border: 0;
    border-radius: 999px;
    background: #ff512e;
    box-shadow: none;
    color: #ffffff;
    font-size: 15px;
    font-weight: 750;
    line-height: 1;
    padding: 0 25px 0 28px;
    text-decoration: none;
    transition: background 180ms ease, transform 180ms ease;
  }

  .nav__links .home-nav-quote::before { display: none; }

  .nav__links .home-nav-quote :deep(svg) {
    width: 17px;
    height: 17px;
    flex: 0 0 auto;
    transition: transform 180ms ease;
  }

  .nav__links .home-nav-quote:hover { background: #e84623; }
  .nav__links .home-nav-quote:hover :deep(svg) { transform: translateX(4px); }
}

@media (width > 900px) and (width <= 1240px) {
  .nav,
  .site-header--scrolled .nav {
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 22px;
  }

  .brand img { width: 226px; }
  .home-nav-menu { gap: 24px; }
}

.menu-button {
  display: none;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border: 0;
  background: transparent;
  color: var(--color-ink);
}

@media (width <= 900px) {
  .topbar {
    display: none;
  }

  .nav {
    min-height: 4.25rem;
  }

  .brand img {
    width: clamp(9.4rem, 43vw, 11.25rem);
  }

  .nav__links {
    display: none;
  }

  .menu-button {
    display: grid;
  }

  .mobile-menu {
    position: fixed;
    z-index: 10000;
    inset: 0;
    display: grid;
    width: 100%;
    height: 100dvh;
    min-height: 100dvh;
    overflow: hidden;
    overscroll-behavior: contain;
    background:
      radial-gradient(circle at 70% 12%, rgb(255 90 47 / 0.045), transparent 34%),
      #10100f;
    color: var(--color-white);
    -webkit-overflow-scrolling: touch;
  }

  .mobile-menu--expanded {
    display: block;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .mobile-menu__shell {
    position: relative;
    display: grid;
    width: min(100%, 48rem);
    height: 100dvh;
    min-height: 100dvh;
    grid-template-rows: auto auto auto;
    align-content: start;
    margin-inline: auto;
    overflow: hidden;
    padding-inline: 1.25rem;
  }

  .mobile-menu--expanded .mobile-menu__shell {
    height: auto;
    overflow: visible;
  }

  .mobile-menu__header {
    position: sticky;
    z-index: 5;
    inset-block-start: 0;
    display: flex;
    min-height: 4.25rem;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-inline: -1.25rem;
    background: #10100f;
    padding:
      calc(0.625rem + env(safe-area-inset-top))
      1.25rem
      0.5rem;
  }

  .mobile-menu__brand {
    display: inline-flex;
    max-width: calc(100% - 3.75rem);
    align-items: center;
  }

  .mobile-menu__brand img {
    display: block;
    width: clamp(10rem, 43vw, 11.5625rem);
    height: auto;
    filter: invert(1) hue-rotate(180deg) saturate(1.35);
  }

  .mobile-menu__close {
    display: grid;
    width: 2.875rem;
    height: 2.875rem;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid transparent;
    border-radius: 50%;
    background: transparent;
    color: var(--color-white);
    transition:
      border-color 180ms ease,
      background 180ms ease,
      color 180ms ease;
  }

  .mobile-menu__close svg {
    width: 1.65rem;
    height: 1.65rem;
    stroke-width: 1.6;
  }

  .mobile-menu__close:hover,
  .mobile-menu__close:focus-visible {
    border-color: var(--color-orange);
    background: rgb(255 90 47 / 0.1);
    color: var(--color-orange);
    outline: none;
  }

  .mobile-menu__navigation {
    display: grid;
    align-content: start;
    border-block-start: 1px solid rgb(255 255 255 / 0.13);
    padding: 0.125rem 0 0.25rem;
  }

  .mobile-menu-link {
    --menu-index: 0;
    display: grid;
    width: 100%;
    min-height: 3.625rem;
    grid-template-columns: 2.25rem minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.65rem;
    border: 0;
    border-block-end: 1px solid rgb(255 255 255 / 0.15);
    background: transparent;
    color: var(--color-white);
    padding: 0.5625rem 0 0.625rem;
    text-align: start;
    opacity: 0;
    transform: translateY(10px);
    animation: mobile-menu-row-in 420ms var(--ease) forwards;
    animation-delay: calc(110ms + var(--menu-index) * 45ms);
    transition: border-color 180ms ease;
  }

  .mobile-menu-link__number {
    align-self: center;
    color: var(--color-orange);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.04em;
  }

  .mobile-menu-link__label {
    font-size: clamp(2rem, 9vw, 3rem);
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.045em;
    white-space: nowrap;
    transition: transform 180ms var(--ease);
  }

  .mobile-menu-link__arrow,
  .mobile-menu-link__disclosure {
    width: 1.2rem;
    height: 1.2rem;
    justify-self: end;
    color: var(--color-orange);
    stroke-width: 1.8;
    transition: transform 180ms var(--ease);
  }

  .mobile-menu-link:hover,
  .mobile-menu-link:focus-visible,
  .mobile-menu-link[aria-current="page"] {
    border-block-end-color: rgb(255 90 47 / 0.7);
    outline: none;
  }

  .mobile-menu-link:hover .mobile-menu-link__label,
  .mobile-menu-link:focus-visible .mobile-menu-link__label {
    transform: translateX(4px);
  }

  .mobile-menu-link:hover .mobile-menu-link__arrow,
  .mobile-menu-link:focus-visible .mobile-menu-link__arrow {
    transform: translate(3px, -3px);
  }

  .mobile-menu-services__list {
    display: grid;
    border-block-end: 1px solid rgb(255 255 255 / 0.15);
    padding: 0.25rem 0 0.5rem 2.9rem;
  }

  .mobile-menu-service {
    display: grid;
    min-height: 3.5rem;
    grid-template-columns: 1.8rem minmax(0, 1fr) 1.25rem;
    align-items: center;
    gap: 0.65rem;
    border-block-end: 1px solid rgb(255 255 255 / 0.09);
    color: var(--color-white);
    padding: 0.5rem 0;
  }

  .mobile-menu-service:last-child {
    border-block-end: 0;
  }

  .mobile-menu-service__number {
    color: var(--color-orange);
    font-size: 0.72rem;
    font-weight: 900;
  }

  .mobile-menu-service__copy {
    display: grid;
    gap: 0.2rem;
    min-width: 0;
  }

  .mobile-menu-service__title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.45rem;
    font-size: 1rem;
    font-weight: 900;
  }

  .mobile-menu-service__title small {
    border: 1px solid rgb(255 90 47 / 0.55);
    border-radius: 999px;
    color: var(--color-orange);
    padding: 0.18rem 0.4rem;
    font-size: 0.58rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .mobile-menu-service__copy > span:last-child {
    overflow: hidden;
    color: rgb(255 255 255 / 0.56);
    font-size: 0.76rem;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mobile-menu-service > svg {
    width: 1rem;
    color: var(--color-orange);
  }

  .mobile-menu-service:hover,
  .mobile-menu-service:focus-visible,
  .mobile-menu-service[aria-current="page"] {
    color: var(--color-orange);
    outline: none;
  }

  .mobile-menu__contact {
    position: relative;
    isolation: isolate;
    margin-inline: -1.25rem;
    overflow: hidden;
    border-block-start: 1px solid rgb(255 255 255 / 0.15);
    padding:
      0.875rem
      1.25rem
      calc(0.875rem + env(safe-area-inset-bottom));
    opacity: 0;
    transform: translateY(12px);
    animation: mobile-menu-contact-in 440ms var(--ease) 340ms forwards;
  }

  .mobile-menu__cta,
  .mobile-menu__quick-contact {
    position: relative;
    z-index: 2;
  }

  .mobile-menu__eyebrow {
    margin: 0;
    color: var(--color-orange);
    font-size: 0.7rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .mobile-menu__cta h2 {
    max-width: 18ch;
    margin: 0.1875rem 0 0.4375rem;
    color: var(--color-white);
    font-size: clamp(1.55rem, 7vw, 2.1rem);
    font-weight: 900;
    line-height: 0.98;
    letter-spacing: -0.035em;
  }

  .mobile-menu__cta h2 span {
    color: var(--color-orange);
  }

  .mobile-menu__cta > p:last-of-type {
    max-width: 30rem;
    margin: 0 0 0.625rem;
    color: rgb(255 255 255 / 0.64);
    font-size: 0.9rem;
    line-height: 1.35;
  }

  .mobile-menu__actions {
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    gap: 0.5rem;
    margin-block-start: 0.625rem;
  }

  .mobile-menu__quote,
  .mobile-menu__call {
    display: inline-flex;
    min-height: 2.875rem;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    border: 1px solid var(--color-white);
    border-radius: 999px;
    padding: 0.6rem 0.8rem;
    font-size: 0.88rem;
    font-weight: 900;
    transition:
      transform 180ms var(--ease),
      background 180ms ease,
      border-color 180ms ease,
      color 180ms ease;
  }

  .mobile-menu__quote {
    border-color: var(--color-orange);
    background: var(--color-orange);
    color: var(--color-white);
  }

  .mobile-menu__call {
    background: transparent;
    color: var(--color-white);
  }

  .mobile-menu__quote svg,
  .mobile-menu__call svg {
    width: 1.05rem;
    height: 1.05rem;
    color: inherit;
  }

  .mobile-menu__quote:hover,
  .mobile-menu__quote:focus-visible,
  .mobile-menu__call:hover,
  .mobile-menu__call:focus-visible {
    transform: translateY(-2px);
    outline: none;
  }

  .mobile-menu__call:hover,
  .mobile-menu__call:focus-visible {
    border-color: var(--color-orange);
    color: var(--color-orange);
  }

  .mobile-menu__quick-contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.625rem;
    margin-block-start: 0.625rem;
    font-size: 0.78rem;
  }

  .mobile-menu__quick-contact > a {
    display: inline-flex;
    min-width: 0;
    align-items: center;
    gap: 0.4rem;
    color: rgb(255 255 255 / 0.78);
  }

  .mobile-menu__quick-contact > a svg {
    width: 1rem;
    height: 1rem;
    flex: 0 0 auto;
    color: var(--color-orange);
  }

  .mobile-menu__quick-contact > a span {
    overflow-wrap: anywhere;
  }

  .mobile-menu__quick-contact > a:hover,
  .mobile-menu__quick-contact > a:focus-visible {
    color: var(--color-orange);
    outline: none;
  }

  .mobile-menu__socials {
    display: flex;
    flex: 0 0 auto;
    gap: 0.45rem;
  }

  .mobile-menu-social {
    display: inline-grid;
    width: 2.375rem;
    height: 2.375rem;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 0.16);
    border-radius: 50%;
    background: rgb(255 255 255 / 0.06);
    color: var(--color-white);
    transition:
      transform 180ms var(--ease),
      background 180ms ease,
      border-color 180ms ease,
      color 180ms ease;
  }

  .mobile-menu-social svg {
    width: 1.1rem;
    height: 1.1rem;
    stroke-width: 1.8;
  }

  .mobile-menu-social:hover,
  .mobile-menu-social:focus-visible {
    border-color: var(--color-orange);
    background: var(--color-orange);
    color: #10100f;
    outline: none;
    transform: translateY(-3px);
  }

  .mobile-menu__monogram {
    position: absolute;
    z-index: 0;
    inset-inline-end: -3rem;
    inset-block-end: -1rem;
    color: rgb(255 255 255 / 0.035);
    font-size: 11rem;
    font-weight: 900;
    letter-spacing: -0.12em;
    line-height: 0.75;
    pointer-events: none;
    user-select: none;
  }

  .mobile-menu-enter-active {
    transition: opacity 360ms ease, transform 360ms var(--ease);
  }

  .mobile-menu-leave-active {
    transition: opacity 240ms ease, transform 240ms ease;
  }

  .mobile-menu-enter-from,
  .mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }

  .mobile-services-enter-active,
  .mobile-services-leave-active {
    overflow: hidden;
    transition: opacity 220ms ease, max-height 300ms var(--ease);
  }

  .mobile-services-enter-from,
  .mobile-services-leave-to {
    max-height: 0;
    opacity: 0;
  }

  .mobile-services-enter-to,
  .mobile-services-leave-from {
    max-height: 38rem;
    opacity: 1;
  }

  @keyframes mobile-menu-row-in {
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes mobile-menu-contact-in {
    to {
      opacity: 1;
      transform: none;
    }
  }
}

@media (width <= 370px) {
  .mobile-menu-link {
    grid-template-columns: 2.1rem minmax(0, 1fr) auto;
    gap: 0.5rem;
  }

  .mobile-menu-link__label {
    font-size: 1.95rem;
  }

  .mobile-menu-services__list {
    padding-inline-start: 2.6rem;
  }
}

@media (width <= 900px) and (height <= 900px) {
  .mobile-menu-link {
    min-height: 3.4375rem;
    padding-block: 0.4375rem;
  }

  .mobile-menu-link__label {
    font-size: clamp(1.95rem, 8.5vw, 2.7rem);
  }

  .mobile-menu__cta h2 {
    font-size: 1.75rem;
  }
}

@media (width <= 900px) and (height <= 800px) {
  .mobile-menu__header {
    min-height: 3.75rem;
    padding-block-start: calc(0.4375rem + env(safe-area-inset-top));
  }

  .mobile-menu__brand img {
    width: 9.375rem;
  }

  .mobile-menu-link {
    min-height: 3.0625rem;
    padding-block: 0.3125rem;
  }

  .mobile-menu-link__label {
    font-size: clamp(1.75rem, 8vw, 2.35rem);
  }

  .mobile-menu__contact {
    padding-block-start: 0.625rem;
  }

  .mobile-menu__cta > p:last-of-type {
    display: none;
  }
}

@media (width <= 900px) and (height <= 700px) {
  .mobile-menu__eyebrow,
  .mobile-menu__quick-contact {
    display: none;
  }

  .mobile-menu__contact {
    padding-block-start: 0.5rem;
  }

  .mobile-menu__cta h2 {
    margin-block-start: 0;
    font-size: 1.5rem;
  }

  .mobile-menu__actions {
    margin-block-start: 0.375rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu,
  .mobile-menu-link,
  .mobile-menu__contact,
  .mobile-menu__close,
  .mobile-menu-link__label,
  .mobile-menu-link__arrow,
  .mobile-menu-link__disclosure,
  .mobile-menu__quote,
  .mobile-menu__call,
  .mobile-menu-social,
  .mobile-services-enter-active,
  .mobile-services-leave-active {
    animation: none;
    transition-duration: 1ms;
  }

  .mobile-menu-link,
  .mobile-menu__contact {
    opacity: 1;
    transform: none;
  }
}
</style>
