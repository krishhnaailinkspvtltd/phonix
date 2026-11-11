import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { PHONIX_LOGO_WHITE } from '@/lib/brandAssets'
export function Footer() {
  return <footer className="pg-footer">
    <div className="pg-footer-main">
      <div><span className="pg-eyebrow">INDIAN PRODUCTS. GLOBAL POSSIBILITIES.</span><h2>From India.<br/><em>To the world.</em></h2><Link to="/contact" className="pg-footer-action">Start a conversation <ArrowUpRight size={20}/></Link></div>
      <div className="pg-footer-directory"><span>EXPLORE</span><Link to="/about">Our story</Link><Link to="/products">Products</Link><Link to="/global-trade">Import & export</Link><Link to="/gallery">Gallery</Link><Link to="/contact">Contact</Link></div>
    </div>
    <div className="pg-footer-end"><Link to="/" className="pg-official-brand pg-official-brand--footer" aria-label="PHONIX GLOBAL TRADERS home"><img src={PHONIX_LOGO_WHITE} alt="PHONIX GLOBAL TRADERS" width="900" height="300" loading="lazy" /></Link><span>IMPORT &amp; EXPORT · INDIA</span><span>© {new Date().getFullYear()} PHONIX GLOBAL TRADERS. All rights reserved.</span><button onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button></div>
  </footer>
}
