import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
export function Footer() {
  return <footer className="pg-footer">
    <div className="pg-footer-main">
      <div><span className="pg-eyebrow">INDIAN PRODUCTS. GLOBAL POSSIBILITIES.</span><h2>From India.<br/><em>To the world.</em></h2><Link to="/contact" className="pg-footer-action">Start a conversation <ArrowUpRight size={20}/></Link></div>
      <div className="pg-footer-directory"><span>EXPLORE</span><Link to="/about">Our story</Link><Link to="/products">Products</Link><Link to="/global-trade">Import & export</Link><Link to="/gallery">Gallery</Link><Link to="/contact">Contact</Link></div>
    </div>
    <div className="pg-footer-end"><strong>PHONIX<span>.</span></strong><span>GLOBAL TRADE · IMPORT &amp; EXPORT</span><span>© {new Date().getFullYear()} PHONIX GLOBAL TRADE. Demo frontend.</span><button onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>Back to top ↑</button></div>
  </footer>
}
