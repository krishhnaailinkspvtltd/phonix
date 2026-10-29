import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type Props = { onComplete: () => void }

/** A branded editorial opening, not a fake download/progress bar.
 *  Replay on refresh; ?noIntro=1 bypasses it for automated captures.
 */
export function LoadingScreen({ onComplete }: Props) {
  const [leaving, setLeaving] = useState(false)
  const ended = useRef(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setLeaving(true), 2250)
    const skip = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') setLeaving(true)
    }
    window.addEventListener('keydown', skip)
    return () => { clearTimeout(timer); window.removeEventListener('keydown', skip) }
  }, [])

  const finish = () => {
    if (ended.current) return
    ended.current = true
    onComplete()
  }

  return (
    <AnimatePresence onExitComplete={finish}>
      {!leaving && <motion.div className="ph-intro" key="ph-intro" role="status" aria-label="PHONIX GLOBAL TRADE opening introduction"
        initial={{ opacity: 1 }} exit={{ y: '-100%' }}
        transition={{ duration: .95, ease: [.76, 0, .24, 1] }}>
        <div className="ph-intro-photo" aria-hidden="true" />
        <motion.div className="ph-intro-veil" initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ delay: .55, duration: 1.15, ease: [.65, 0, .15, 1] }}/>
        <div className="ph-intro-header"><span>PHONIX / INTERNATIONAL TRADE</span><button type="button" onClick={() => setLeaving(true)}>Skip introduction <span aria-hidden="true">↗</span></button></div>
        <div className="ph-intro-main">
          <div className="ph-intro-line"><motion.span initial={{ y: '112%' }} animate={{ y: 0 }} transition={{ duration: 1.05, ease: [.2,.8,.15,1], delay: .12 }}>From India,</motion.span></div>
          <div className="ph-intro-line ph-intro-line--second"><motion.span initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 1.05, ease: [.2,.8,.15,1], delay: .29 }}><em>to the world.</em></motion.span></div>
          <motion.div className="ph-intro-name" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9, duration: .7 }}>PHONIX <span>GLOBAL TRADE</span></motion.div>
        </div>
        <div className="ph-intro-bottom"><span>INDIAN ROOTS · GLOBAL REACH</span><span>DISCOVER PHONIX ↗</span></div>
        <motion.div className="ph-intro-progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .2, duration: 2, ease: 'easeInOut' }} aria-hidden="true"/>
      </motion.div>}
    </AnimatePresence>
  )
}
