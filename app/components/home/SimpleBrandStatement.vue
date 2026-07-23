<template>
  <section class="brand-statement" aria-labelledby="brand-statement-title">
    <div class="container brand-statement__panel" data-reveal>
      <div class="brand-statement__copy">
        <p class="eyebrow">WHY AFFINITY</p>
        <h2 id="brand-statement-title">Where your business, your brand and your customers connect.</h2>
        <p>
          From apparel and printed materials to signs, vehicle graphics and digital campaigns, we help each part of your business feel connected and recognizable.
        </p>
      </div>

      <div class="brand-statement__map" aria-hidden="true">
        <svg class="brand-statement__line" viewBox="0 0 320 116" focusable="false">
          <path
            d="M58 58 C104 20 146 20 160 58 C174 96 216 96 262 58"
            fill="none"
            stroke="var(--color-orange)"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
        <span class="brand-statement__node brand-statement__node--business">business</span>
        <span class="brand-statement__node brand-statement__node--brand">brand</span>
        <span class="brand-statement__node brand-statement__node--customers">customers</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brand-statement {
  padding-block: clamp(2rem, 4vw, 3rem);
  background: var(--color-warm-white);
}

.brand-statement__panel {
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(19rem, 0.96fr);
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
  min-height: 16rem;
  border-radius: 1.35rem;
  background: var(--color-ink);
  color: var(--color-white);
  padding: clamp(1.45rem, 4vw, 2.35rem);
  overflow: hidden;
}

.brand-statement__copy {
  display: grid;
  gap: 0.85rem;
}

.brand-statement__copy h2 {
  max-width: 52rem;
  color: var(--color-white);
  font-size: clamp(2rem, 4.8vw, 4rem);
  line-height: 0.98;
}

.brand-statement__copy p:last-child {
  max-width: 46rem;
  color: rgb(255 255 255 / 0.72);
}

.brand-statement__map {
  position: relative;
  min-height: 9rem;
}

.brand-statement__line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.brand-statement__line path {
  fill: none;
  stroke: var(--color-orange);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 340;
  stroke-dashoffset: 340;
  animation: brand-line-draw 4.8s ease-in-out infinite;
}

.brand-statement__node {
  position: absolute;
  display: inline-grid;
  min-height: 2.4rem;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 0.22);
  border-radius: 999px;
  background: rgb(255 255 255 / 0.08);
  color: var(--color-white);
  padding: 0.62rem 0.9rem;
  font-weight: 900;
}

.brand-statement__node--business {
  inset-inline-start: 0;
  inset-block-start: 2.35rem;
}

.brand-statement__node--brand {
  inset-inline-start: 50%;
  inset-block-start: 0;
  transform: translateX(-50%);
  color: var(--color-orange);
}

.brand-statement__node--customers {
  inset-inline-end: 0;
  inset-block-start: 2.35rem;
}

@keyframes brand-line-draw {
  0%,
  16% {
    stroke-dashoffset: 340;
  }

  48%,
  100% {
    stroke-dashoffset: 0;
  }
}

@media (width <= 760px) {
  .brand-statement__panel {
    grid-template-columns: 1fr;
  }

  .brand-statement__map {
    min-height: 8rem;
  }
}

@media (width <= 460px) {
  .brand-statement__node {
    font-size: 0.86rem;
    padding-inline: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .brand-statement__line path {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
