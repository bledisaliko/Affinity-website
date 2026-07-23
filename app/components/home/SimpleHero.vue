<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { trackEventForHref } from '../../utils/tracking'

type HeroServiceKey = 'apparel' | 'print' | 'signs' | 'promotional'

interface HeroCard {
  image: string
  alt: string
  label?: string
  objectPosition?: string
}

interface HeroService {
  title: string
  titleLines: string[]
  url: string
  cards: [HeroCard, HeroCard, HeroCard, HeroCard]
}

const heroServices: Record<HeroServiceKey, HeroService> = {
  apparel: {
    title: 'Custom Apparel',
    titleLines: ['Custom Apparel'],
    url: '/apparel/',
    cards: [
      { image: '/images/apparel/apparel-mix.png', alt: 'Custom embroidered shirts, hoodies, jackets, hats and caps', objectPosition: '52% center' },
      { image: '/images/apparel/team-screen-printed-shirts.webp', alt: 'Team T-shirts with screen-printed graphics', label: 'T-Shirts & Printing', objectPosition: 'center 54%' },
      { image: '/images/apparel/branded-work-jacket.webp', alt: 'Branded work jacket with custom decoration', label: 'Jackets & Workwear', objectPosition: 'center 42%' },
      { image: '/images/embroidery/embroidered-company-polo.webp', alt: 'Custom embroidered polo shirts', label: 'Polos & Embroidery', objectPosition: '51% center' }
    ]
  },
  print: {
    title: 'Business Print',
    titleLines: ['Business Print'],
    url: '/business-print/',
    cards: [
      { image: '/images/business-print/business-cards.webp', alt: 'Business cards and coordinated stationery', objectPosition: 'center 52%' },
      { image: '/images/business-print/flyers-brochures.webp', alt: 'Printed flyers, brochures and presentation materials', label: 'Flyers & Brochures', objectPosition: 'center 55%' },
      { image: '/images/business-print/brochures-print-generated.png', alt: 'Folded brochures and presentation folders', label: 'Folders & Brochures', objectPosition: 'center' },
      { image: '/images/business-print/postcards-direct-mail.webp', alt: 'Printed postcards, menus and direct-mail stationery', label: 'Postcards & Stationery', objectPosition: 'center' }
    ]
  },
  signs: {
    title: 'Signs & Vehicle Graphics',
    titleLines: ['Signs & Vehicle', 'Graphics'],
    url: '/signs-vehicle-graphics/',
    cards: [
      { image: '/images/vehicle-graphics/commercial-vehicle-wrap.webp', alt: 'Wrapped commercial van with large-format graphics', objectPosition: '64% center' },
      { image: '/images/signs/storefront-vinyl.webp', alt: 'Storefront signs and window graphics', label: 'Storefront & Window', objectPosition: 'center 58%' },
      { image: '/images/signs/coroplast-signs.webp', alt: 'Printed coroplast signs for business promotion', label: 'Coroplast Signs', objectPosition: 'center' },
      { image: '/images/signs/vinyl-banners.webp', alt: 'Printed banners and large-format graphics', label: 'Banners & Large Format', objectPosition: 'center' }
    ]
  },
  promotional: {
    title: 'Promotional Products',
    titleLines: ['Promotional', 'Products'],
    url: '/services/',
    cards: [
      { image: '/images/promotional-products/corporate-gifts.jpg', alt: 'Corporate gift box with branded merchandise and treats', objectPosition: 'center' },
      { image: '/images/promotional-products/branded-mugs.webp', alt: 'Branded ceramic mugs and stainless travel tumbler', label: 'Mugs & Drinkware', objectPosition: 'center 72%' },
      { image: '/images/promotional-products/tote-bags.png', alt: 'Black, natural and white branded tote bags', label: 'Tote Bags', objectPosition: 'center' },
      { image: '/images/promotional-products/corporate-gifts.jpg', alt: 'Corporate gift box with branded merchandise', label: 'Corporate Gifts', objectPosition: 'center' }
    ]
  }
}

const serviceKeys = Object.keys(heroServices) as HeroServiceKey[]
const cardSlotClasses = ['home-hero__card--apparel', 'home-hero__card--print', 'home-hero__card--vehicle', 'home-hero__card--polo']
const activeServiceKey = ref<HeroServiceKey>('apparel')
const activeService = computed(() => heroServices[activeServiceKey.value])
const servicesElement = ref<HTMLElement | null>(null)
const serviceElements: Partial<Record<HeroServiceKey, HTMLElement>> = {}
const supportsHover = ref(true)
const keyboardMode = ref(false)
const indicator = reactive({ x: 0, y: 0, width: 0, height: 0, ready: false })

let resetTimer: ReturnType<typeof setTimeout> | undefined
let resizeObserver: ResizeObserver | undefined

const indicatorStyle = computed(() => ({
  width: `${indicator.width}px`,
  height: `${indicator.height}px`,
  transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0)`
}))

function setServiceElement(key: HeroServiceKey, element: Element | ComponentPublicInstance | null) {
  if (element instanceof HTMLElement) serviceElements[key] = element
}

function updateIndicator() {
  nextTick(() => {
    const container = servicesElement.value
    const item = serviceElements[activeServiceKey.value]
    if (!container || !item) return
    const containerRect = container.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const inset = Number.parseFloat(getComputedStyle(container).getPropertyValue('--service-indicator-inset')) || 8
    indicator.x = itemRect.left - containerRect.left + inset
    indicator.y = itemRect.top - containerRect.top + inset
    indicator.width = Math.max(0, itemRect.width - inset * 2)
    indicator.height = Math.max(0, itemRect.height - inset * 2)
    indicator.ready = true
  })
}

function clearResetTimer() {
  if (resetTimer) clearTimeout(resetTimer)
  resetTimer = undefined
}

function previewService(key: HeroServiceKey) {
  clearResetTimer()
  activeServiceKey.value = key
}

function handlePointerPreview(key: HeroServiceKey, event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  supportsHover.value = true
  previewService(key)
}

function scheduleDefaultService() {
  clearResetTimer()
  resetTimer = setTimeout(() => {
    activeServiceKey.value = 'apparel'
  }, 160)
}

function handleFocusPreview(key: HeroServiceKey) {
  if (keyboardMode.value || supportsHover.value) previewService(key)
}

function handleServiceClick(key: HeroServiceKey) {
  const service = heroServices[key]
  if (!supportsHover.value && activeServiceKey.value !== key) {
    previewService(key)
    return
  }
  trackEventForHref(service.url, { location: 'homepage_hero_service_selector', service: key })
  navigateTo(service.url)
}

function handleServiceKeydown(event: KeyboardEvent, key: HeroServiceKey) {
  const currentIndex = serviceKeys.indexOf(key)
  let nextIndex = currentIndex
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % serviceKeys.length
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + serviceKeys.length) % serviceKeys.length
  else if (event.key === 'Home') nextIndex = 0
  else if (event.key === 'End') nextIndex = serviceKeys.length - 1
  else return

  event.preventDefault()
  const nextKey = serviceKeys[nextIndex]!
  previewService(nextKey)
  serviceElements[nextKey]?.focus()
}

function handleImageClick() {
  trackEventForHref(activeService.value.url, { location: 'homepage_hero_service_image', service: activeServiceKey.value })
}

function preloadServiceImages() {
  const urls = new Set(serviceKeys.flatMap(key => heroServices[key].cards.map(card => card.image)))
  urls.forEach((url) => {
    const image = new Image()
    image.src = url
  })
}

function markKeyboardInput() {
  keyboardMode.value = true
}

function markPointerInput(event: PointerEvent) {
  keyboardMode.value = false
  if (event.pointerType === 'mouse') supportsHover.value = true
}

watch(activeServiceKey, updateIndicator)

onMounted(() => {
  supportsHover.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  preloadServiceImages()
  updateIndicator()
  resizeObserver = new ResizeObserver(updateIndicator)
  if (servicesElement.value) resizeObserver.observe(servicesElement.value)
  window.addEventListener('keydown', markKeyboardInput, { passive: true })
  window.addEventListener('pointerdown', markPointerInput, { passive: true })
})

onBeforeUnmount(() => {
  clearResetTimer()
  resizeObserver?.disconnect()
  window.removeEventListener('keydown', markKeyboardInput)
  window.removeEventListener('pointerdown', markPointerInput)
})
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__inner">
      <div class="home-hero__copy">
        <p class="home-hero__eyebrow">Custom solutions. Local impact.</p>
        <h1 class="home-hero__title">
          <span>Stand out.</span>
          <span>Make an impact.</span>
          <span class="home-hero__title-accent">We’ll handle</span>
          <span class="home-hero__title-accent">the details.</span>
        </h1>
        <p class="home-hero__description">
          From custom apparel to business print and vehicle graphics, we deliver high-quality print solutions that help your brand look professional and get noticed.
        </p>
        <div class="home-hero__actions">
          <NuxtLink
            class="button button--primary"
            to="/contact/#quote"
            @click="trackEventForHref('/contact/#quote', { location: 'homepage_hero' })"
          >
            Request a Quote
          </NuxtLink>
          <NuxtLink class="button button--ghost" to="/services/">Explore All Services</NuxtLink>
        </div>
      </div>

      <div
        id="home-hero-service-preview"
        class="home-hero__visual"
        :aria-label="`${activeService.title} examples`"
        @pointerenter="clearResetTimer"
        @pointerleave="scheduleDefaultService"
      >
        <NuxtLink
          v-for="(card, index) in activeService.cards"
          :key="cardSlotClasses[index]"
          class="home-hero__card"
          :class="cardSlotClasses[index]"
          :to="activeService.url"
          :aria-label="`Open ${activeService.title}: ${card.label || card.alt}`"
          @click="handleImageClick"
        >
          <Transition name="home-hero-card-swap">
            <span v-if="card.label" :key="`${activeServiceKey}-${card.label}`" class="home-hero__card-copy">
              <strong>{{ card.label }}</strong>
              <span class="home-hero__card-arrow" aria-hidden="true">→</span>
            </span>
          </Transition>
          <Transition name="home-hero-image-swap">
            <img
              :key="`${activeServiceKey}-${card.image}-${index}`"
              :src="card.image"
              :alt="card.alt"
              width="1448"
              height="1086"
              :style="{ objectPosition: card.objectPosition || 'center' }"
              loading="eager"
              :fetchpriority="activeServiceKey === 'apparel' && index === 0 ? 'high' : 'auto'"
              decoding="async"
            >
          </Transition>
        </NuxtLink>
      </div>

      <div class="home-hero__proof" aria-label="Affinity Creative service advantages">
        <div class="home-hero__proof-inner">
          <div class="home-hero__proof-item">
            <svg class="home-hero__proof-icon" viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15h12"/><path d="M1 24h14"/><path d="M5 33h10"/><circle cx="30" cy="24" r="13"/><path d="M30 16v9l6 3"/><path d="M25 8h10"/></g></svg>
            <span class="home-hero__proof-copy"><strong>Fast Turnaround</strong><span>On time, every time.</span></span>
          </div>
          <div class="home-hero__proof-item">
            <svg class="home-hero__proof-icon" viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 44 C24 44 38 31 38 18 C38 10.3 31.7 4 24 4 C16.3 4 10 10.3 10 18 C10 31 24 44 24 44Z"/><circle cx="24" cy="18" r="5"/></g></svg>
            <span class="home-hero__proof-copy"><strong>GTA Service</strong><span>Local &amp; reliable.</span></span>
          </div>
          <div class="home-hero__proof-item">
            <svg class="home-hero__proof-icon home-hero__proof-icon--leaf" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M383.8 351.7c2.5-2.5 105.2-92.4 105.2-92.4l-17.5-7.5c-10-4.9-7.4-11.5-5-17.4 2.4-7.6 20.1-67.3 20.1-67.3s-47.7 10-57.7 12.5c-7.5 2.4-10-2.5-12.5-7.5s-15-32.4-15-32.4-52.6 59.9-55.1 62.3c-10 7.5-20.1 0-17.6-10 0-10 27.6-129.6 27.6-129.6s-30.1 17.4-40.1 22.4c-7.5 5-12.6 5-17.6-5C293.5 72.3 255.9 0 255.9 0s-37.5 72.3-42.5 79.8c-5 10-10 10-17.6 5-10-5-40.1-22.4-40.1-22.4S183.3 182 183.3 192c2.5 10-7.5 17.5-17.6 10-2.5-2.5-55.1-62.3-55.1-62.3S98.1 167 95.6 172s-5 9.9-12.5 7.5C73 177 25.4 167 25.4 167s17.6 59.7 20.1 67.3c2.4 6 5 12.5-5 17.4L23 259.3s102.6 89.9 105.2 92.4c5.1 5 10 7.5 5.1 22.5-5.1 15-10.1 35.1-10.1 35.1s95.2-20.1 105.3-22.6c8.7-.9 18.3 2.5 18.3 12.5S241 512 241 512h30s-5.8-102.7-5.8-112.8 9.5-13.4 18.4-12.5c10 2.5 105.2 22.6 105.2 22.6s-5-20.1-10-35.1 0-17.5 5-22.5z"/></svg>
            <span class="home-hero__proof-copy"><strong>Local Production</strong><span>Proudly made in Canada.</span></span>
          </div>
        </div>
      </div>

      <nav
        ref="servicesElement"
        class="home-hero__services"
        :class="{ 'home-hero__services--ready': indicator.ready }"
        role="tablist"
        aria-label="Featured services"
        @pointerenter="clearResetTimer"
        @pointerleave="scheduleDefaultService"
      >
        <span class="home-hero__service-indicator" :style="indicatorStyle" aria-hidden="true"></span>
        <button
          v-for="key in serviceKeys"
          :key="key"
          :ref="element => setServiceElement(key, element)"
          class="home-hero__service"
          :class="{ 'home-hero__service--active': activeServiceKey === key }"
          type="button"
          role="tab"
          :aria-selected="activeServiceKey === key"
          aria-controls="home-hero-service-preview"
          :aria-label="`${heroServices[key].title}: preview service images`"
          @pointerenter="handlePointerPreview(key, $event)"
          @focus="handleFocusPreview(key)"
          @blur="scheduleDefaultService"
          @keydown="handleServiceKeydown($event, key)"
          @click="handleServiceClick(key)"
        >
          <svg v-if="key === 'apparel'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 5 2 9l3 2 2-2v12h10V9l2 2 3-2-2-4-4-2a4 4 0 0 1-8 0Z"/></svg>
          <svg v-else-if="key === 'print'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>
          <svg v-else-if="key === 'signs'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 17-2-2v-4l2-1 2-4h10l2 4 2 1v4l-2 2"/><path d="M5 17v2h3v-2h8v2h3v-2"/><path d="M5 10h14"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M7.5 8C5 8 5 4 7.5 4 10 4 12 8 12 8s2-4 4.5-4S19 8 16.5 8"/></svg>
          <span>
            <template v-for="(line, lineIndex) in heroServices[key].titleLines" :key="line">
              {{ line }}<br v-if="lineIndex < heroServices[key].titleLines.length - 1">
            </template>
          </span>
        </button>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  --home-orange: #ff512e;
  --home-orange-dark: #e84623;
  --home-ink: #111111;
  position: relative;
  width: 100%;
  margin-block-end: 0;
  background:
    radial-gradient(circle at 64% 34%, rgb(255 255 255 / 0.92), transparent 31%),
    radial-gradient(circle at 83% 70%, rgb(240 229 216 / 0.68), transparent 30%),
    #f7f4ee;
  color: var(--home-ink);
  overflow: hidden;
}

.home-hero__inner {
  position: relative;
  display: grid;
  box-sizing: border-box;
  width: min(calc(100% - 72px), 1460px);
  min-height: 700px;
  grid-template-columns: minmax(390px, 0.86fr) minmax(0, 1.14fr);
  grid-template-rows: minmax(0, 550px) 82px;
  gap: 22px clamp(32px, 3.4vw, 54px);
  margin: 0 auto;
  padding: 46px 0 16px;
}

.home-hero__copy {
  position: relative;
  display: flex;
  max-width: 610px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
}

.home-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 13px;
  margin: 0 0 24px;
  color: var(--home-orange);
  font-size: 13.5px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.home-hero__eyebrow::before {
  content: "";
  width: 31px;
  height: 2px;
  background: currentColor;
}

.home-hero__title {
  max-width: 610px;
  margin: 0;
  color: var(--home-ink);
  font-family: var(--font-display), "Arial Black", Impact, sans-serif;
  font-size: clamp(54px, 4.7vw, 76px);
  font-weight: 900;
  line-height: 0.94;
  letter-spacing: -0.055em;
}

.home-hero__title span {
  display: block;
  color: var(--home-ink);
  white-space: nowrap;
}

.home-hero__title .home-hero__title-accent {
  color: var(--home-orange);
}

.home-hero__description {
  width: 100%;
  max-width: 530px;
  margin: 26px 0 0;
  color: rgb(17 17 17 / 0.76);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.62;
}

.home-hero__actions {
  display: flex;
  flex-wrap: nowrap;
  gap: 18px;
  margin-block-start: 26px;
}

.home-hero__actions .button {
  display: inline-flex;
  min-width: 194px;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border-radius: 999px;
  box-shadow: none;
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  padding: 0 24px;
  white-space: nowrap;
}

.home-hero__actions .button--primary {
  border: 0;
  background: var(--home-orange);
  color: #ffffff;
}

.home-hero__actions .button--ghost {
  border: 1px solid rgb(17 17 17 / 0.82);
  background: rgb(255 255 255 / 0.22);
  color: var(--home-ink);
}

.home-hero__actions .button::after {
  content: "";
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
  background: currentColor;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12h14'/%3E%3Cpath d='m13 6 6 6-6 6'/%3E%3C/svg%3E") center / contain no-repeat;
}

.home-hero__actions .button--ghost::after {
  background: var(--home-orange);
}

.home-hero__visual {
  display: grid;
  height: 550px;
  min-width: 0;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.72fr) minmax(0, 0.72fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1.08fr);
  gap: 16px;
}

.home-hero__card {
  position: relative;
  display: block;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgb(17 17 17 / 0.06);
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 15px 36px rgb(38 31 24 / 0.1);
  color: var(--home-ink);
  isolation: isolate;
}

.home-hero__card--apparel { grid-column: 1; grid-row: 1 / 3; }
.home-hero__card--print { grid-column: 2 / 4; grid-row: 1; }
.home-hero__card--vehicle { grid-column: 2; grid-row: 2; }
.home-hero__card--polo { grid-column: 3; grid-row: 2; }

.home-hero__card > img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
}

.home-hero__card--apparel > img { object-position: 52% center; }
.home-hero__card--print > img { object-position: center 58%; }
.home-hero__card--vehicle > img { object-position: 68% center; }
.home-hero__card--polo > img { object-position: 51% center; }

.home-hero__card-copy {
  position: absolute;
  z-index: 2;
  top: 17px;
  left: 17px;
  display: grid;
  justify-items: start;
  gap: 10px;
}

.home-hero-image-swap-enter-active,
.home-hero-image-swap-leave-active {
  transition:
    opacity 380ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
}

.home-hero-image-swap-enter-from {
  opacity: 0;
  transform: scale(1.025);
}

.home-hero-image-swap-leave-to {
  opacity: 0;
  transform: scale(0.985);
}

.home-hero-card-swap-enter-active,
.home-hero-card-swap-leave-active {
  transition:
    opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.home-hero-card-swap-enter-from,
.home-hero-card-swap-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.home-hero__card-copy strong {
  border-radius: 10px;
  background: rgb(255 255 255 / 0.88);
  box-shadow: 0 5px 16px rgb(17 17 17 / 0.08);
  color: var(--home-ink);
  font-size: clamp(14px, 1.15vw, 18px);
  font-weight: 900;
  line-height: 1.12;
  padding: 7px 9px;
}

.home-hero__card-arrow {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  background: var(--home-orange);
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.home-hero__card:hover > img,
.home-hero__card:focus-visible > img {
  transform: scale(1.025);
}

.home-hero__card:focus-visible {
  outline: 3px solid var(--home-orange);
  outline-offset: 3px;
}

.home-hero__proof {
  display: flex;
  width: 100%;
  min-width: 0;
  height: 82px;
  align-items: center;
  color: #171717;
}

.home-hero__proof-inner {
  display: flex;
  width: 100%;
  align-items: center;
}

.home-hero__proof-item {
  display: flex;
  min-width: 0;
  min-height: 54px;
  flex: 1 1 0;
  align-items: center;
  gap: 11px;
  padding: 0 16px;
}

.home-hero__proof-item:first-child { padding-left: 0; }

.home-hero__proof-item + .home-hero__proof-item {
  border-left: 1px solid rgb(17 17 17 / 0.14);
}

.home-hero__proof-icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  color: var(--home-orange);
}

.home-hero__proof strong {
  display: block;
  color: #151515;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.2;
  white-space: nowrap;
}

.home-hero__proof-copy span {
  display: block;
  margin-block-start: 4px;
  color: rgb(20 20 20 / 0.62);
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;
}

.home-hero__services {
  --service-indicator-inset: 8px;
  position: relative;
  display: flex;
  height: 82px;
  min-width: 0;
  align-items: stretch;
  overflow: hidden;
  border: 1px solid rgb(17 17 17 / 0.06);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.78);
  box-shadow: 0 14px 32px rgb(39 32 25 / 0.09);
}

.home-hero__service-indicator {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  display: block;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgb(29 24 20 / 0.08);
  pointer-events: none;
  transition:
    width 300ms cubic-bezier(0.22, 1, 0.36, 1),
    height 300ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.home-hero__service {
  position: relative;
  z-index: 1;
  display: flex;
  min-width: 0;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--home-ink);
  font-size: clamp(10.5px, 0.9vw, 13px);
  font-weight: 800;
  font-family: inherit;
  line-height: 1.2;
  padding: 10px 12px;
  border: 0;
  background: transparent;
  text-decoration: none;
  cursor: pointer;
}

.home-hero__service + .home-hero__service {
  border-left: 1px solid rgb(17 17 17 / 0.13);
}

.home-hero__service svg {
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
}

.home-hero__service--active {
  color: var(--home-orange);
}

.home-hero__services:not(.home-hero__services--ready) .home-hero__service--active::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: var(--service-indicator-inset);
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 6px 18px rgb(29 24 20 / 0.08);
}

.home-hero__service--active + .home-hero__service { border-left: 0; }

.home-hero__service:hover,
.home-hero__service:focus-visible { color: var(--home-orange); }

.home-hero__service:focus-visible {
  outline: 3px solid var(--home-orange);
  outline-offset: -3px;
}

@media (width <= 1100px) and (width > 900px) {
  .home-hero__inner {
    width: min(calc(100% - 48px), 1460px);
    grid-template-columns: minmax(340px, 0.9fr) minmax(0, 1.1fr);
    column-gap: 28px;
  }

  .home-hero__title { font-size: clamp(50px, 5.1vw, 58px); }
  .home-hero__actions { gap: 12px; }
  .home-hero__actions .button { min-width: 0; padding-inline: 19px; }
  .home-hero__proof-item { padding-inline: 10px; }
  .home-hero__proof-copy span { font-size: 10.5px; }
}

@media (width <= 900px) {
  .home-hero__inner {
    width: min(calc(100% - 40px), 760px);
    min-height: 0;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 30px;
    padding: 42px 0 30px;
  }

  .home-hero__copy { max-width: 650px; }
  .home-hero__eyebrow { margin-block-end: 20px; }
  .home-hero__title { font-size: clamp(48px, 10vw, 68px); }
  .home-hero__description { margin-block-start: 22px; }
  .home-hero__actions { flex-wrap: wrap; margin-block-start: 22px; }

  .home-hero__visual {
    height: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 260px 190px 220px;
    gap: 14px;
  }

  .home-hero__card--apparel { grid-column: 1 / 3; grid-row: 1; }
  .home-hero__card--print { grid-column: 1 / 3; grid-row: 2; }
  .home-hero__card--vehicle { grid-column: 1; grid-row: 3; }
  .home-hero__card--polo { grid-column: 2; grid-row: 3; }

  .home-hero__proof { height: auto; }
  .home-hero__proof-inner { align-items: stretch; }
  .home-hero__proof-item { min-height: 64px; padding-inline: 14px; }
  .home-hero__proof-item:first-child { padding-left: 0; }

  .home-hero__services {
    --service-indicator-inset: 6px;
    display: grid;
    height: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-radius: 24px;
  }

  .home-hero__service {
    min-height: 76px;
    font-size: 12px;
  }

  .home-hero__service--active {
    border-radius: 18px;
  }

  .home-hero__service-indicator,
  .home-hero__services:not(.home-hero__services--ready) .home-hero__service--active::before {
    border-radius: 18px;
  }

  .home-hero__service:nth-child(3),
  .home-hero__service:nth-child(4) { border-top: 1px solid rgb(17 17 17 / 0.13); }
}

@media (width <= 600px) {
  .home-hero__inner {
    width: min(calc(100% - 32px), 560px);
    gap: 24px;
    padding-block-start: 34px;
  }

  .home-hero__eyebrow { font-size: 11.5px; }
  .home-hero__title { font-size: clamp(42px, 12.4vw, 56px); }
  .home-hero__description { font-size: 15px; line-height: 1.55; }

  .home-hero__actions {
    display: grid;
    width: 100%;
    gap: 12px;
  }

  .home-hero__actions .button { width: 100%; }

  .home-hero__visual {
    grid-template-rows: 210px 150px 170px;
    gap: 10px;
  }

  .home-hero__card { border-radius: 16px; }
  .home-hero__card-copy { top: 10px; left: 10px; gap: 7px; }
  .home-hero__card-copy strong { font-size: 12px; padding: 6px 7px; }
  .home-hero__card-arrow { width: 30px; height: 30px; font-size: 17px; }

  .home-hero__proof-inner {
    display: grid;
    grid-template-columns: 1fr;
  }

  .home-hero__proof-item,
  .home-hero__proof-item:first-child {
    min-height: 62px;
    padding: 7px 0;
  }

  .home-hero__proof-item + .home-hero__proof-item {
    border-top: 1px solid rgb(17 17 17 / 0.14);
    border-left: 0;
  }

  .home-hero__service {
    min-height: 72px;
    gap: 8px;
    padding: 9px;
  }

  .home-hero__service svg {
    width: 24px;
    height: 24px;
    flex-basis: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero__card > img,
  .home-hero__service-indicator,
  .home-hero-image-swap-enter-active,
  .home-hero-image-swap-leave-active,
  .home-hero-card-swap-enter-active,
  .home-hero-card-swap-leave-active { transition: none; }
}
</style>
