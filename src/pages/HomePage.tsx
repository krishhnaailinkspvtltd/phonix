import { useEffect } from 'react'
import { BlueTradeExperience } from '@/components/home/BlueTradeExperience'
export function HomePage() {
  useEffect(() => { document.title = 'PHONIX GLOBAL TRADE — Indian Products, Global Markets' }, [])
  return <BlueTradeExperience />
}
