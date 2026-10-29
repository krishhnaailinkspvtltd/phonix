import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LoadingScreen } from '@/components/common/LoadingScreen'
import { RouteEffects, ScrollProgress } from '@/components/common/RouteEffects'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { ProductsPage } from '@/pages/ProductsPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { GlobalTradePage } from '@/pages/GlobalTradePage'
import { GalleryPage } from '@/pages/GalleryPage'
import { ContactPage } from '@/pages/ContactPage'
import './creative.css'
import './carysil-redesign.css'
import './motion.css'

function DemoNotice() {
  const { pathname } = useLocation()
  if (pathname === '/') return null
  return <aside className="pg-demo-notice" role="note">Product imagery and example listings are illustrative. Confirm specifications and availability directly with PHONIX.</aside>
}

function ScrollOnRouteChange() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); requestAnimationFrame(() => ScrollTrigger.refresh()) }, [pathname])
  return null
}

export default function App() {
  // Unlike the previous version, reloading always replays the intro. ?noIntro=1
  // provides a reliable screenshot/testing route; ?replayIntro=1 works naturally.
  const [hasLoaded, setHasLoaded] = useState(() =>
    typeof window !== 'undefined' && (new URLSearchParams(location.search).has('noIntro') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  )

  useEffect(() => {
    document.documentElement.classList.toggle('pg-ready', hasLoaded)
    document.body.style.overflow = hasLoaded ? '' : 'hidden'
    if (hasLoaded) { window.dispatchEvent(new Event('phonix:intro-complete')); ScrollTrigger.refresh() }
    return () => { document.body.style.overflow = '' }
  }, [hasLoaded])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 })
    lenis.on('scroll', ScrollTrigger.update)
    let rafId = 0
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  return (
    <BrowserRouter>
        <ScrollOnRouteChange />
        <RouteEffects />
        <ScrollProgress />
        {!hasLoaded && <LoadingScreen onComplete={() => setHasLoaded(true)} />}
        <div className="pg-app min-h-screen bg-canvas text-primary-text">
          <Navigation />
          <main id="main-content">
            <DemoNotice />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/global-trade" element={<GlobalTradePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
    </BrowserRouter>
  )
}
