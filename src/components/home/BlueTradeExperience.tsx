import { useEffect, useRef, useState } from 'react'
import type { PointerEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PRODUCT_CATEGORIES, PHOTO } from '@/data/tradeData'

gsap.registerPlugin(ScrollTrigger)

const SCENES = [
  { number:'01', eyebrow:'EXPORTING FROM INDIA', title:'From India,', italic:'to the world.', description:'Bringing Indian food ingredients, agricultural products and manufactured goods into conversations with buyers worldwide.', image:'/images/hero/hero-port.jpg', position:'center' },
  { number:'02', eyebrow:'DEHYDRATED VEGETABLES & FRUITS', title:'Goodness,', italic:'in every form.', description:'Explore onion, garlic, ginger, dried mango and other food ingredients based on your specifications.', image:PHOTO.driedVegetables, position:'center' },
  { number:'03', eyebrow:'MADE IN INDIA', title:'Crafted here.', italic:'Chosen globally.', description:'From agricultural produce to textiles and manufacturer-made goods, discover Indian sourcing possibilities.', image:PHOTO.textile, position:'center' },
  { number:'04', eyebrow:'IMPORTING INTO INDIA', title:'The world,', italic:'within reach.', description:'We also welcome import enquiries for products from overseas suppliers to the Indian market.', image:'/images/hero/hero-vessel.jpg', position:'center' },
]
const FEATURES = [
  { title:'India to the world.', tag:'01 / EXPORTS', image:PHOTO.driedFruit, copy:'Dehydrated vegetables, fruit, spices and other India-origin products.' },
  { title:'Made in India.', tag:'02 / MANUFACTURING', image:PHOTO.manufacturing, copy:'Explore textiles, household goods and products from Indian manufacturers.' },
  { title:'The world to India.', tag:'03 / IMPORTS', image:'/images/hero/hero-port.jpg', copy:'International sourcing enquiries for buyers in the Indian market.' },
]

function Heading({ label, title, accent, children }: { label: string, title: string, accent?: string, children?: ReactNode }) {
  return <div className="ph-editorial-heading ph-reveal"><span className="ph-kicker">{label}</span><div className="ph-editorial-heading-grid"><h2>{title} {accent && <em>{accent}</em>}</h2>{children && <p>{children}</p>}</div></div>
}

export function BlueTradeExperience() {
  const homeRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [activeFilm, setActiveFilm] = useState(0)
  const drag = useRef({ down: false, x: 0, scroll: 0, moved: false })

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context = gsap.context(() => {
      const hero = homeRef.current?.querySelector('.ph-hero') as HTMLElement | null
      if (hero) {
        gsap.fromTo('.ph-hero-photo', { scale: 1.12 }, { scale: 1, duration: 2.5, ease: 'power2.out', delay: .2 })
        gsap.to('.ph-hero-photo', {
          scale: 1.22, yPercent: 12, ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.ph-hero-content', {
          yPercent: -30, opacity: .1, ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
      gsap.utils.toArray<HTMLElement>('.ph-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 70 }, {
          opacity: 1, y: 0, duration: 1.15, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
      gsap.utils.toArray<HTMLElement>('.ph-picture-reveal').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(10% 0 10% 0)', scale: .96 }, {
          clipPath: 'inset(0% 0 0% 0)', scale: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 83%', once: true },
        })
      })

      const media = gsap.matchMedia()
      media.add('(min-width: 769px)', () => {
        if (!storyRef.current) return
        const stage = storyRef.current.querySelector('.ph-story-stage') as HTMLElement
        const scenes = gsap.utils.toArray<HTMLElement>(storyRef.current.querySelectorAll('.ph-story-scene'))
        gsap.set(scenes.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage, pin: true, start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * 3.65)}`,
            scrub: 1.05, anticipatePin: 1, invalidateOnRefresh: true,
            fastScrollEnd: false,
          },
        })
        scenes.slice(1).forEach((scene, index) => {
          const previous = scenes[index]
          const photo = scene.querySelector('.ph-story-image')
          const copy = scene.querySelector('.ph-story-copy')
          gsap.set(photo, { scale: 1.18 })
          gsap.set(copy, { y: 85, opacity: 0 })
          timeline.to(previous.querySelector('.ph-story-image'), { scale: 1.17, duration: 1, ease: 'none' }, index * 1.15)
          timeline.to(scene, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' }, index * 1.15)
          timeline.to(photo, { scale: 1, duration: 1, ease: 'none' }, index * 1.15)
          timeline.to(copy, { y: 0, opacity: 1, duration: .6, ease: 'power2.out' }, index * 1.15 + .28)
        })
        timeline.to({}, { duration: .38 })
      })
      return () => media.revert()
    }, homeRef)
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('phonix:intro-complete', refresh)
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('phonix:intro-complete', refresh)
      window.removeEventListener('load', refresh)
      context.revert()
    }
  }, [])

  const moveGallery = (dir: number) => {
    if (!galleryRef.current) return
    const first = galleryRef.current.querySelector<HTMLElement>('.ph-product')
    galleryRef.current.scrollBy({ left: dir * ((first?.offsetWidth || 360) + 18), behavior: 'smooth' })
  }
  const pointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !galleryRef.current) return
    drag.current = { down: true, x: e.clientX, scroll: galleryRef.current.scrollLeft, moved: false }
  }
  const pointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down || !galleryRef.current) return
    const diff = e.clientX - drag.current.x
    if (Math.abs(diff) > 6) drag.current.moved = true
    if (drag.current.moved) galleryRef.current.scrollLeft = drag.current.scroll - diff
  }
  const pointerEnd = () => { drag.current.down = false; setTimeout(() => { drag.current.moved = false }, 60) }
  const onHeroPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - .5
    const y = (event.clientY - rect.top) / rect.height - .5
    event.currentTarget.style.setProperty('--hero-mouse-x', `${x * 16}px`)
    event.currentTarget.style.setProperty('--hero-mouse-y', `${y * 12}px`)
  }

  return <div ref={homeRef} className="ph-home">
    {/* 01 — full-bleed, photographic first impression */}
    <section className="ph-hero" onPointerMove={onHeroPointer} aria-label="Introducing PHONIX Global Trade">
      <div className="ph-hero-photo" role="img" aria-label="Cargo ship at an international shipping terminal"/>
      <div className="ph-hero-shade"/>
      <div className="ph-hero-content">
        <span className="ph-hero-kicker">INDIAN EXPORTS · GLOBAL IMPORTS</span>
        <h1><span className="ph-word-mask"><span>From India.</span></span><span className="ph-word-mask"><span><em>To the world.</em></span></span></h1>
        <div className="ph-hero-detail"><p>Exporting Indian products worldwide and exploring imports from international suppliers — one opportunity at a time.</p><Link to="/about" className="ph-button ph-button--white">Discover PHONIX <ArrowUpRight size={20}/></Link></div>
      </div>
      <div className="ph-hero-edge"><span>INDIAN EXPORTS · GLOBAL IMPORTS</span><a href="#in-motion">SCROLL TO DISCOVER <ArrowDown size={18}/></a><span>01 / 06</span></div>
    </section>

    {/* 02 — reference-inspired three-panel film/editorial showcase */}
    <section className="ph-films ph-pad" id="in-motion">
      <Heading label="01 / IN MOTION" title="Discover the" accent="possibilities.">Dehydrated vegetables, fruits, spices and made-in-India products — plus international sourcing for India.</Heading>
      <div className="ph-film-instruction ph-reveal"><span>EXPLORE THE JOURNEY</span><span>SELECT A PANEL TO DISCOVER <ArrowUpRight size={17}/></span></div>
      <div className="ph-film-row">
        {FEATURES.map((feature,index) => <button type="button" key={feature.tag} className={`ph-film ${index === activeFilm ? 'is-active' : ''}`}
          onMouseEnter={() => setActiveFilm(index)} onFocus={() => setActiveFilm(index)} onClick={() => setActiveFilm(index)} aria-pressed={index === activeFilm}>
          <img loading="lazy" src={feature.image} alt="Illustrative product and sourcing photography" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="/images/panels/panel-2-sourcing.jpg"}}/>
          <span className="ph-film-scrim"/><span className="ph-film-label">{feature.tag}</span>
          <span className="ph-film-body"><strong>{feature.title}</strong><span>{feature.copy}</span></span>
          <span className="ph-film-arrow" aria-hidden="true"><ArrowUpRight size={23}/></span>
        </button>)}
      </div>
    </section>

    {/* 03 — spacious product collection: touch + mouse-drag */}
    <section className="ph-collection ph-pad">
      <Heading label="02 / THE COLLECTION" title="A world of" accent="products.">Explore export product families and international import enquiries. Exact products and specifications are confirmed on request.</Heading>
      <div className="ph-collection-toolbar ph-reveal"><span>FROM INDIAN FARMS, FOOD PROCESSORS & MANUFACTURERS</span><div><span>DRAG / SWIPE TO BROWSE</span><button onClick={() => moveGallery(-1)} aria-label="Previous categories"><ArrowLeft size={22}/></button><button onClick={() => moveGallery(1)} aria-label="Next categories"><ArrowRight size={22}/></button></div></div>
      <div ref={galleryRef} className="ph-product-track" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerLeave={pointerEnd}
        onClickCapture={e => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation() } }}>
        {PRODUCT_CATEGORIES.map((category,index) => <Link to={`/products?category=${category.id}`} className="ph-product" draggable={false} key={category.id}>
          <div className="ph-product-image"><img loading="lazy" src={category.image} alt={`Illustrative photograph for ${category.name}`} draggable={false} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src="/images/categories/cat-commodity.jpg"}}/><span>0{index+1}</span><span className="ph-product-view"><ArrowUpRight size={24}/></span></div>
          <div className="ph-product-meta"><h3>{category.name}</h3><span>Explore category ↗</span></div>
        </Link>)}
      </div>
      <div className="ph-collection-footer"><Link to="/products" className="ph-line-link">Explore the full collection <ArrowUpRight size={19}/></Link></div>
    </section>

    {/* 04 — visible fullscreen, scroll-scrubbed editorial chapters */}
    <section className="ph-story" ref={storyRef} aria-label="Scroll through four global-trade scenes">
      <div className="ph-story-stage">
        {SCENES.map((scene,index) => <article key={scene.number} className={`ph-story-scene ph-story-scene--${index+1}`} style={{ zIndex: index + 1 }}>
          <div className="ph-story-image" style={{ backgroundImage: `url(${scene.image}), url(/images/hero/hero-port.jpg)`, backgroundPosition: scene.position }}/>
          <div className="ph-story-shade"/>
          <div className="ph-story-top"><span>PHONIX / INDIA & THE WORLD</span><span>{scene.number} / 04</span></div>
          <div className="ph-story-copy"><span className="ph-kicker">{scene.eyebrow}</span><h2>{scene.title}<br/><em>{scene.italic}</em></h2><p>{scene.description}</p></div>
          <div className="ph-story-foot"><span>SCROLL TO EXPLORE</span><span>{scene.number} — 04</span></div>
        </article>)}
      </div>
    </section>

    {/* 05 — quiet, editorial credibility section; no fabricated metrics */}
    <section className="ph-philosophy ph-pad"><div className="ph-philosophy-photo ph-picture-reveal"><img loading="lazy" src="/images/hero/hero-vessel.jpg" alt="Aerial photograph of an international container port"/></div><div className="ph-philosophy-copy ph-reveal"><span className="ph-kicker">03 / INDIAN ROOTS</span><h2>Rooted in India.<br/><em>Open to the world.</em></h2><p>Our focus is on understanding buyer requirements, connecting with product sources, and discussing a suitable path for Indian exports and overseas imports.</p><Link to="/global-trade" className="ph-line-link">Explore import & export <ArrowUpRight size={19}/></Link></div></section>

    {/* 06 — large photographic closing statement */}
    <section className="ph-close"><div className="ph-close-photo"/><div className="ph-close-shade"/><div className="ph-close-inner ph-reveal"><span className="ph-kicker">WHERE THE NEXT JOURNEY BEGINS</span><h2>Let's move<br/><em>forward.</em></h2><p>Looking to import from India or source products from overseas? Tell us what you need.</p><Link to="/contact" className="ph-button ph-button--white">Get in touch <ArrowUpRight size={20}/></Link></div></section>
  </div>
}
