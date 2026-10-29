import React, { createContext, useContext, useState } from 'react'

type CursorVariant = 'default' | 'hover' | 'action' | 'drag' | 'hidden'

interface CursorContextType {
  cursorText: string
  cursorVariant: CursorVariant
  setCursor: (text?: string, variant?: CursorVariant) => void
  resetCursor: () => void
}

const CursorContext = createContext<CursorContextType | undefined>(undefined)

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorText, setCursorText] = useState<string>('')
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default')

  const setCursor = (text = '', variant: CursorVariant = 'action') => {
    setCursorText(text)
    setCursorVariant(variant)
  }

  const resetCursor = () => {
    setCursorText('')
    setCursorVariant('default')
  }

  return (
    <CursorContext.Provider value={{ cursorText, cursorVariant, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  )
}

export const useCursor = () => {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
