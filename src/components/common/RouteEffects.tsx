import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Route-wide editorial reveals. Triggers are registered on entrance, rather than
 * hiding content in advance: slow devices and dynamically filtered lists never
 * end up with invisible cards. MutationObserver picks up new catalog/gallery
 * items without reanimating the whole page.
 */
export function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.querySelector<HTMLElement>('#main-content > div:not(.ph-home)')
    if (!root) return
    let active = true
    let refreshFrame = 0
    const observed = new WeakSet<HTMLElement>()
    const triggers: ScrollTrigger[] = []
    const tweens: gsap.core.Tween[] = []

    const refresh = () => {
      if (!active || refreshFrame) return
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0
        if (active) ScrollTrigger.refresh()
      })
    }

    // Very light page arrival motion; never locks the page or its controls.
    tweens.push(gsap.fromTo(root, { autoAlpha: 0.85, y: 14 }, {
      autoAlpha: 1, y: 0, duration: .65, ease: 'power2.out',
      clearProps: 'transform,opacity,visibility',
    }))

    const register = (el: HTMLElement, type: 'heading' | 'card' | 'image') => {
      if (observed.has(el) || el.closest('[role="dialog"], .pg-gallery-lightbox')) return
      observed.add(el)
      const distance = type === 'heading' ? 36 : type === 'card' ? 27 : 0
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 94%',
        once: true,
        onEnter: () => {
          if (!active || !el.isConnected) return
          // From the supplied motion archive: a subtle photographic clip-path
          // wipe paired with image scale-settle. No hidden pre-animation state.
          const from = type === 'image'
            ? { scale: 1.075, opacity: .87, clipPath: 'inset(0% 0% 9% 0%)' }
            : { y: distance, opacity: .45 }
          const to = type === 'image'
            ? { scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2, ease: 'power3.inOut', clearProps: 'transform,opacity,clipPath' }
            : { y: 0, opacity: 1,
                duration: type === 'heading' ? 1.05 : .9,
                ease: 'power3.out', clearProps: 'transform,opacity,visibility' }
          tweens.push(gsap.fromTo(el, from, to))
        },
      })
      triggers.push(trigger)
    }

    const scan = () => {
      if (!active) return
      // Cards first; don't animate their nested labels and photographs twice.
      root.querySelectorAll<HTMLElement>('section article, section .group, section form, section .grid > a, section .grid > button')
        .forEach(el => {
          if (!el.closest('.group, article, form') || el.matches('.group, article, form')) register(el, 'card')
        })
      root.querySelectorAll<HTMLElement>('h1, section h2, section h3').forEach(el => {
        if (!el.closest('article, .group, form')) register(el, 'heading')
      })
      // Image wipes work in product, gallery, about and trade cards as well.
      // Ignore thumbnails, dialogs and icon graphics; never hide media by CSS.
      root.querySelectorAll<HTMLImageElement>('section img, .grid img').forEach(el => {
        if (el.closest('form, [role="dialog"]') || el.classList.contains('h-full') && el.closest('button[aria-label^="View product image"]')) return
        el.dataset.phxWipe = 'true'
        register(el, 'image')
      })
      refresh()
    }

    scan()
    const observer = new MutationObserver(() => scan())
    observer.observe(root, { childList: true, subtree: true })
    const onLoad = () => refresh()
    window.addEventListener('load', onLoad)
    window.addEventListener('resize', onLoad, { passive: true })
    document.fonts?.ready.then(onLoad)

    return () => {
      active = false
      observer.disconnect()
      window.removeEventListener('load', onLoad)
      window.removeEventListener('resize', onLoad)
      cancelAnimationFrame(refreshFrame)
      triggers.forEach(trigger => trigger.kill())
      tweens.forEach(tween => tween.kill())
      gsap.set(root, { clearProps: 'transform,opacity,visibility' })
    }
  }, [pathname])

  return null
}

/** Thin, unobtrusive reading progress bar; updated without React rerenders. */
export function ScrollProgress() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/') return
    let frame = 0
    const rail = document.querySelector<HTMLElement>('.ph-scroll-progress')
    const paint = () => {
      frame = 0
      const maximum = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      if (rail) rail.style.transform = `scaleX(${Math.max(0, Math.min(1, window.scrollY / maximum))})`
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    paint()
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [pathname])
  if (pathname === '/') return null
  return <div className="ph-scroll-progress" aria-hidden="true" />
}
