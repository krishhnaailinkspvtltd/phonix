import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

interface MagneticButtonProps {
  children: React.ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  showArrow?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  showArrow = true,
  className = '',
  size = 'md',
}) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    // Subtle damping magnetic factor
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-8 py-4.5 text-base',
  }

  const variantClasses = {
    primary:
      'bg-accent text-white hover:bg-accent/90 shadow-md hover:shadow-xl hover:shadow-accent/20 border border-transparent',
    secondary:
      'bg-surface/80 text-primary-text border border-border-strong hover:border-accent hover:text-accent backdrop-blur-md',
    outline:
      'bg-transparent text-primary-text border border-border-strong hover:border-accent hover:text-accent',
    ghost:
      'bg-transparent text-primary-text hover:text-accent p-0 underline-offset-8 hover:underline border-0 shadow-none',
  }

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full font-mono font-medium tracking-wider uppercase transition-colors duration-300 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
        {children}
      </span>
      {showArrow && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-current" />
      )}
    </motion.div>
  )

  if (to) {
    return <Link to={to} className="inline-block focus-visible:outline-none">{content}</Link>
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block focus-visible:outline-none">
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent p-0 border-0 focus-visible:outline-none">
      {content}
    </button>
  )
}
