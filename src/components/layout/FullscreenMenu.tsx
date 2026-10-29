import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { NAV_LINKS } from './Navigation'

type Props = { isOpen: boolean; onClose: () => void }
export function FullscreenMenu({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return
    const esc = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [isOpen, onClose])
  return <AnimatePresence>
    {isOpen && <motion.div role="dialog" aria-modal="true" aria-label="Site menu" className="pg-fullmenu" initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: .62, ease: [.76, 0, .24, 1] }}>
      <div className="pg-fullmenu-top"><span>PHONIX. <small>GLOBAL TRADE</small></span><button onClick={onClose} aria-label="Close menu"><X size={26}/></button></div>
      <div className="pg-fullmenu-grid"><div className="pg-fullmenu-links">{[...NAV_LINKS, {label:'Contact',path:'/contact'}].map((item,i)=><motion.div key={item.path} initial={{opacity:0,x:-40}} animate={{opacity:1,x:0}} transition={{delay:.2+i*.06}}><Link to={item.path} onClick={onClose}><small>0{i+1}</small><span>{item.label}</span><ArrowUpRight size={24}/></Link></motion.div>)}</div><div className="pg-fullmenu-image"><img src="/images/hero/hero-port.jpg" alt="Cargo vessel at the port"/><p>Indian products. International possibilities.</p></div></div>
      <div className="pg-fullmenu-bottom">Exports from India. Imports to India.</div>
    </motion.div>}
  </AnimatePresence>
}
