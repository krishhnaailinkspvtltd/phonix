import { useEffect } from 'react'
import { BlueTradeExperience } from '@/components/home/BlueTradeExperience'
export function HomePage() {
  useEffect(() => { document.title = 'PHOENIX GLOBAL TRADERS — Indian Products, Global Markets' }, [])
  return <BlueTradeExperience />
}
