import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useCursor } from '@/context/CursorContext'

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant } = useCursor()
  const [isEnabled, setIsEnabled] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for smooth trailing
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    if (!hasFinePointer) return

    setIsEnabled(true)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  if (!isEnabled || cursorVariant === 'hidden') return null

  const hasText = cursorText.length > 0

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      {/* Primary Follower Ring / Pill */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          hasText
            ? 'w-24 h-24 bg-accent text-white font-mono text-xs font-semibold tracking-widest shadow-2xl backdrop-blur-md border border-white/20'
            : cursorVariant === 'hover'
            ? 'w-12 h-12 border-2 border-accent bg-accent/15'
            : cursorVariant === 'drag'
            ? 'w-20 h-20 bg-accent-blue text-white font-mono text-xs font-semibold tracking-wider'
            : 'w-8 h-8 border border-accent/60 bg-accent/5'
        }`}
      >
        {hasText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="select-none tracking-widest uppercase font-mono text-[10px]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Tiny Centered Dot */}
      {!hasText && (
        <motion.div
          style={{
            x: mouseX,
            y: mouseY,
          }}
          className="fixed top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        />
      )}
    </div>
  )
}
