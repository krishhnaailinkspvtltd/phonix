import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

/** Progressive scroll motion on all inner pages, with reduced-motion support. */
export function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let context: gsap.Context | undefined
    let active = true
    const frame = requestAnimationFrame(() => {
      const root = document.querySelector<HTMLElement>('#main-content > div')
      if (!root || !active) return
      context = gsap.context(() => {
        const heading = root.querySelector('h1')
        if (heading) gsap.fromTo(heading, { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.05, ease: 'power3.out', clearProps: 'transform,opacity,visibility' })
        root.querySelectorAll<HTMLElement>('h2, h3').forEach(el => {
          gsap.fromTo(el, { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85, ease: 'power3.out',
            clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: el, start: 'top 92%', once: true } })
        })
        root.querySelectorAll<HTMLImageElement>('section img').forEach(img => {
          gsap.fromTo(img, { scale: 1.085 }, { scale: 1, duration: 1.55, ease: 'power2.out',
            clearProps: 'transform', scrollTrigger: { trigger: img, start: 'top 96%', once: true } })
        })
        const cards = Array.from(root.querySelectorAll<HTMLElement>('section article, section .group, section form, section > div > .grid > div'))
        cards.filter(el => !el.parentElement?.closest('article, .group, form')).forEach((el, index) => {
          gsap.fromTo(el, { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9, delay: (index % 3) * .065,
            ease: 'power3.out', clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: el, start: 'top 96%', once: true } })
        })
      }, root)
      ScrollTrigger.refresh()
    })
    const refresh = () => { if (active) ScrollTrigger.refresh() }
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { active = false; cancelAnimationFrame(frame); window.removeEventListener('load', refresh); context?.revert() }
  }, [pathname])
  return null
}

export function ScrollProgress() {
  useEffect(() => {
    let raf = 0
    const rail = document.querySelector<HTMLElement>('.ph-scroll-progress')
    const paint = () => {
      raf = 0
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      if (rail) rail.style.transform = `scaleX(${Math.max(0, Math.min(1, window.scrollY / max))})`
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(paint) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    paint()
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(raf) }
  }, [])
  return <div className="ph-scroll-progress" aria-hidden="true" />
}
