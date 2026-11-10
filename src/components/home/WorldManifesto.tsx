import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MESSAGE = 'A world of possibilities begins with a single connection.'
const WORDS = MESSAGE.split(' ')

/**
 * A Phonix-original editorial interlude using the supplied motion pack's
 * split-headline, pinned-manifesto, image-wipe and parallax techniques.
 * All imagery and copy belong to the Phonix project.
 */
export function WorldManifesto() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('[data-phx-word]')
      const frames = gsap.utils.toArray<HTMLElement>('[data-phx-frame]')
      const reveals = gsap.utils.toArray<HTMLElement>('.phx-frame-image')
      const images = gsap.utils.toArray<HTMLElement>('[data-phx-image]')
      const large = window.matchMedia('(min-width: 1024px)').matches && window.innerHeight >= 860

      if (large) {
        gsap.set(words, { opacity: 0.15 })
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        timeline.to(words, { opacity: 1, y: 0, duration: 1, stagger: 0.045, ease: 'none' }, 0)
        timeline.fromTo(frames, { opacity: 0.25, y: 55, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.16, duration: 0.9, ease: 'power2.out' }, 0.18)
      } else {
        gsap.fromTo(words, { yPercent: 38, opacity: 0.25 },
          { yPercent: 0, opacity: 1, stagger: 0.035, duration: 0.72, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 76%', once: true } })
        gsap.fromTo(frames, { y: 35, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 82%', once: true } })
      }

      reveals.forEach((reveal) => {
        gsap.fromTo(reveal, { clipPath: 'inset(0% 0% 100% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: reveal, start: 'top 86%', once: true },
        })
      })
      images.forEach((image) => {
        gsap.fromTo(image, { scale: 1.13 }, {
          scale: 1, duration: 1.35, ease: 'power3.out',
          scrollTrigger: { trigger: image.parentElement, start: 'top 87%', once: true },
        })
      })
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    return () => { ctx.revert() }
  }, [])

  return (
    <section className="phx-manifesto" ref={sectionRef} aria-labelledby="phx-manifesto-heading">
      <div className="phx-manifesto-grid" aria-hidden="true" />
      <div className="phx-manifesto-top">
        <span><i aria-hidden="true" /> THE PHONIX PERSPECTIVE</span>
        <span>INDIA <ArrowUpRight size={14} aria-hidden="true" /> GLOBAL MARKETS</span>
      </div>
      <div className="phx-manifesto-content">
        <div className="phx-manifesto-copy">
          <p className="phx-manifesto-eyebrow">03 / BEYOND BORDERS</p>
          <h2 id="phx-manifesto-heading" className="phx-manifesto-heading">
            {WORDS.map((word, index) => (
              <span className="phx-word-wrap" key={index}><span data-phx-word>{word}</span>{index < WORDS.length - 1 ? ' ' : null}</span>
            ))}
          </h2>
          <p className="phx-manifesto-description">Thoughtful sourcing. Clear conversations. New opportunities across borders. We help connect enquiries with the right product possibilities.</p>
          <Link to="/global-trade" className="phx-manifesto-link">Explore our trade approach <ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
        <div className="phx-manifesto-collage" aria-label="Imagery of global logistics and products from India">
          <figure data-phx-frame className="phx-frame phx-frame--one">
            <div className="phx-frame-image"><img data-phx-image src="/images/hero/hero-vessel.jpg" alt="Container vessel at an international port" loading="lazy" /></div>
            <figcaption><span>01 / MOVEMENT</span><ArrowUpRight size={17} aria-hidden="true" /></figcaption>
          </figure>
          <figure data-phx-frame className="phx-frame phx-frame--two">
            <div className="phx-frame-image"><img data-phx-image src="/images/categories/cat-commodity.jpg" alt="Agricultural products available for export enquiries" loading="lazy" /></div>
            <figcaption><span>02 / ORIGINS</span><ArrowDownRight size={17} aria-hidden="true" /></figcaption>
          </figure>
          <div className="phx-orbit-mark" aria-hidden="true"><span>PHONIX</span><span>GLOBAL TRADE</span></div>
        </div>
      </div>
      <div className="phx-manifesto-bottom"><span>ROOTED IN INDIA / BUILT FOR CONNECTION</span><span>EXPLORE MORE <ArrowDownRight size={16} aria-hidden="true" /></span></div>
    </section>
  )
}
