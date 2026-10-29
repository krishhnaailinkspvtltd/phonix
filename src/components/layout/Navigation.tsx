import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, ArrowUpRight } from 'lucide-react'
import { FullscreenMenu } from '@/components/layout/FullscreenMenu'

export const NAV_LINKS = [
  { label: 'Home', path: '/' }, { label: 'Our story', path: '/about' },
  { label: 'Products', path: '/products' }, { label: 'Import & export', path: '/global-trade' },
  { label: 'Gallery', path: '/gallery' },
]

export function Navigation() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 55)
    handler(); window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [location.pathname])
  useEffect(() => { setOpen(false) }, [location.pathname])
  const overHero = location.pathname === '/' && !scrolled
  return <>
    <header className={`pg-header ${overHero ? 'pg-header--over-hero' : 'pg-header--solid'} ${scrolled ? 'pg-header--scrolled' : ''}`}>
      <nav className="pg-nav" aria-label="Primary navigation">
        <Link to="/" className="pg-wordmark" aria-label="PHONIX GLOBAL TRADE home"><span className="pg-wordmark-main">PHONIX<span className="pg-period">.</span></span><span className="pg-wordmark-sub">GLOBAL TRADE</span></Link>
        <div className="pg-nav-links">{NAV_LINKS.map(link => <NavLink key={link.path} to={link.path} end={link.path === '/'} className={({ isActive }) => isActive ? 'active' : ''}>{link.label}</NavLink>)}</div>
        <div className="pg-nav-actions">
          <Link to="/contact" className="pg-nav-contact">Get in touch <ArrowUpRight size={16} /></Link>
          <button className="pg-menu-trigger" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={23} /></button>
        </div>
      </nav>
    </header>
    <FullscreenMenu isOpen={open} onClose={() => setOpen(false)} />
  </>
}
