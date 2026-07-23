import { onBeforeUnmount } from 'vue'

export function useScrollReveal(selector = '[data-reveal]') {
  let observer: IntersectionObserver | undefined

  function refresh() {
    observer?.disconnect()
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    )

    elements.forEach((element) => observer?.observe(element))
  }

  onBeforeUnmount(() => observer?.disconnect())

  return { refresh }
}
