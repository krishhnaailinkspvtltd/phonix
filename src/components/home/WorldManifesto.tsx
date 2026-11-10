import { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MESSAGE = 'A world of possibilities begins with a single connection.'
const WORDS = MESSAGE.split(' ')

/**
 * A Phonix-original editorial interlude using the supplied motion pack's
 * split-headline, image-wipe and parallax techniques. The section deliberately
 * does not pin: two adjacent pinned regions created overlapping GSAP pin-spacers
 * and a white gap before this section on desktop.
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
        // Scroll-driven visual narrative, with no extra document-height pin spacer.
        gsap.fromTo(words, { opacity: 0.28, y: 20 }, {
          opacity: 1, y: 0, stagger: 0.045, ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top 84%', end: 'center 48%',
            scrub: 0.8, invalidateOnRefresh: true,
          },
        })
        gsap.fromTo(frames, { opacity: 0.65, y: 35, scale: 0.98 }, {
          opacity: 1, y: 0, scale: 1, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: section, start: 'top 76%', end: 'center 45%',
            scrub: 0.7, invalidateOnRefresh: true,
          },
        })
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
          <h2 id="phx-manifesto-heading" className="phx-manifesto-heading" aria-label={MESSAGE}>
            {WORDS.map((word, index) => (
              <Fragment key={index}>{index > 0 ? ' ' : null}<span className="phx-word-wrap"><span data-phx-word>{word}</span></span></Fragment>
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
