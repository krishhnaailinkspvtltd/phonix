import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import { GALLERY_ITEMS } from '@/data/tradeData'

export function GalleryPage(){
 const [filter,setFilter]=useState('All')
 const [selected,setSelected]=useState<number|null>(null)
 const categories=['All','Products','Sourcing','Manufacturing','Logistics']
 const shown=filter==='All'?GALLERY_ITEMS:GALLERY_ITEMS.filter(g=>g.category===filter)
 const visibleIndexes=shown.map(g=>GALLERY_ITEMS.findIndex(item=>item.id===g.id))
 const moveImage=(direction:number)=>setSelected(current=>{
  if(current===null||visibleIndexes.length===0)return null
  const index=visibleIndexes.indexOf(current)
  return visibleIndexes[(index+direction+visibleIndexes.length)%visibleIndexes.length]
 })
 useEffect(()=>{window.scrollTo(0,0);document.title='Products, Sourcing & Trade Gallery | PHONIX GLOBAL TRADE'},[])
 useEffect(()=>{const handler=(e:KeyboardEvent)=>{if(selected===null)return;if(e.key==='Escape')setSelected(null);if(e.key==='ArrowRight')moveImage(1);if(e.key==='ArrowLeft')moveImage(-1)};document.addEventListener('keydown',handler);return()=>document.removeEventListener('keydown',handler)},[selected,filter])
 useEffect(()=>{if(selected===null)return;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=overflow}},[selected])
 const current=selected===null?null:GALLERY_ITEMS[selected]
 return <div className="pt-28 sm:pt-36 pb-24 text-primary-text">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p className="text-xs font-semibold uppercase tracking-[.16em] text-accent mb-5">GALLERY / PRODUCTS & GLOBAL SOURCING</p><div className="grid lg:grid-cols-12 gap-8 items-end pb-10 border-b border-border-strong mb-10"><h1 className="lg:col-span-8 display-heading font-display font-bold leading-[.95]">From the source.<br/><span className="font-editorial italic font-normal text-accent">To the world.</span></h1><p className="lg:col-span-4 text-secondary-text text-lg leading-relaxed">Explore the products, sourcing possibilities and global logistics behind international trade. Photography is representative.</p></div>
    <div className="flex flex-wrap gap-2 mb-10">{categories.map(cat=><button key={cat} onClick={()=>{setFilter(cat);setSelected(null)}} aria-pressed={filter===cat} className={`px-5 py-3 text-sm font-medium border transition-colors ${filter===cat?'bg-primary-text text-white border-primary-text':'bg-white text-secondary-text border-border-strong hover:border-accent'}`}>{cat}</button>)}</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{shown.map((g)=>{const index=GALLERY_ITEMS.findIndex(i=>i.id===g.id);return <button key={g.id} onClick={()=>setSelected(index)} className="text-left group"><div className="aspect-[4/3] bg-surface overflow-hidden"><img src={g.image} loading="lazy" alt={g.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='/images/gallery/gallery-2.jpg'}}/></div><div className="flex items-center justify-between mt-4 gap-4"><div><p className="text-xs uppercase text-accent font-semibold tracking-wider mb-1">{g.category}</p><h2 className="text-xl font-display font-bold">{g.title}</h2></div><span aria-hidden="true">↗</span></div></button>})}</div>

  </div>
  <AnimatePresence>{current&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[200] bg-[#061a36]/95 flex flex-col items-center justify-center p-5" role="dialog" aria-modal="true" aria-label={current.title} onClick={()=>setSelected(null)}><button className="absolute top-6 right-6 z-10 text-white bg-white/10 rounded-full p-3" onClick={()=>setSelected(null)} aria-label="Close image"><X size={24}/></button><div className="flex items-center w-full justify-center gap-2 max-w-6xl" onClick={e=>e.stopPropagation()}><button className="text-white p-2" aria-label="Previous image" onClick={()=>moveImage(-1)}><ArrowLeft/></button><img src={current.image} alt={current.title} className="max-h-[75vh] max-w-[calc(100%-5rem)] object-contain" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='/images/gallery/gallery-2.jpg'}}/><button className="text-white p-2" aria-label="Next image" onClick={()=>moveImage(1)}><ArrowRight/></button></div><p className="text-white mt-5 text-center font-medium">{current.title} · Product & trade gallery</p></motion.div>}</AnimatePresence>
 </div>
}
