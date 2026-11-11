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
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let previous = window.scrollY
    const handler = () => {
      const current = window.scrollY
      setScrolled(current > 55)
      if (current < 90 || open || window.matchMedia('(max-width: 768px)').matches) {
        setHidden(false)
        previous = current
      } else if (current - previous > 14) {
        setHidden(true)
        previous = current
      } else if (previous - current > 10) {
        setHidden(false)
        previous = current
      }
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [location.pathname, open])
  useEffect(() => { setOpen(false) }, [location.pathname])
  const overHero = location.pathname === '/' && !scrolled
  return <>
    <header className={`pg-header ${overHero ? 'pg-header--over-hero' : 'pg-header--solid'} ${scrolled ? 'pg-header--scrolled' : ''} ${hidden ? 'phx-header--hidden' : ''}`}>
      <nav className="pg-nav" aria-label="Primary navigation">
        <Link to="/" className="pg-wordmark pg-official-brand" aria-label="PHONIX GLOBAL TRADERS home"><img src="/images/branding/phonix-official-logo.jpg" alt="PHONIX GLOBAL TRADERS" width="300" height="100" decoding="async" fetchPriority="high" /></Link>
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
