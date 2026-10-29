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
      const distance = type === 'heading' ? 30 : type === 'card' ? 32 : 0
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 94%',
        once: true,
        onEnter: () => {
          if (!active || !el.isConnected) return
          const from = type === 'image'
            ? { scale: 1.065, opacity: .65 }
            : { y: distance, opacity: .2 }
          tweens.push(gsap.fromTo(el, from, {
            y: 0, scale: 1, opacity: 1,
            duration: type === 'image' ? 1.15 : .83,
            ease: type === 'image' ? 'power2.out' : 'power3.out',
            clearProps: 'transform,opacity,visibility',
          }))
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
      root.querySelectorAll<HTMLElement>('section h2, section h3').forEach(el => {
        if (!el.closest('article, .group, form')) register(el, 'heading')
      })
      root.querySelectorAll<HTMLImageElement>('section img').forEach(el => {
        if (!el.closest('article, .group, form, button, a')) register(el, 'image')
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
  useEffect(() => {
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
  }, [])
  return <div className="ph-scroll-progress" aria-hidden="true" />
}
