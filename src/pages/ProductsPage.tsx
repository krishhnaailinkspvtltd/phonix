import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { PRODUCT_CATEGORIES, PRODUCTS_CATALOG } from '@/data/tradeData'

export function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(params.get('category') || 'all')
  useEffect(() => { window.scrollTo(0,0); document.title = 'Indian Export Products & International Imports | PHONIX GLOBAL TRADE' }, [])
  useEffect(() => { setCategory(params.get('category') || 'all') }, [params])
  const filtered = category === 'all' ? PRODUCTS_CATALOG : PRODUCTS_CATALOG.filter(item=>item.categoryId===category)
  const select = (id:string) => { setCategory(id); setParams(id==='all'?{}:{category:id}) }
  return <div className="pt-28 sm:pt-36 pb-24 text-primary-text">
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <p className="text-accent font-semibold uppercase tracking-[.16em] text-xs mb-5">OUR PRODUCT COLLECTION / IMPORT &amp; EXPORT</p>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border-strong pb-10">
        <h1 className="display-heading font-display font-bold leading-[.95]">Made in India.<br/><span className="font-editorial italic font-normal text-accent">Open to the world.</span></h1>
        <p className="text-secondary-text text-base md:text-lg leading-relaxed max-w-lg">Discover Indian dehydrated vegetables, dried fruits, spices, agricultural products and manufacturer-made goods. We also welcome enquiries for imports into India.</p>
      </div>
      <div className="mt-6 py-4 px-5 bg-surface border-l-2 border-accent text-secondary-text text-sm leading-relaxed">This is a product enquiry showcase, not a confirmed inventory or quotation. Please contact us to confirm availability, grade, origin, quantities, packaging and destination-specific requirements.</div>
    </section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap gap-2.5 mb-12" aria-label="Filter product categories">
        <button onClick={()=>select('all')} className={`px-5 py-3 border text-sm font-medium transition-colors ${category==='all'?'bg-primary-text text-white border-primary-text':'bg-white border-border-strong text-secondary-text hover:border-accent'}`}>All products ({PRODUCTS_CATALOG.length})</button>
        {PRODUCT_CATEGORIES.map(cat=><button key={cat.id} onClick={()=>select(cat.id)} className={`px-5 py-3 border text-sm font-medium transition-colors ${category===cat.id?'bg-primary-text text-white border-primary-text':'bg-white border-border-strong text-secondary-text hover:border-accent'}`}>{cat.name}</button>)}
      </div>
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-7 gap-y-14">
        <AnimatePresence mode="popLayout">
          {filtered.map(product=><motion.div layout key={product.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} transition={{duration:.25}}>
            <Link to={`/products/${product.id}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-surface mb-5">
                <img src={product.image} alt={`Illustrative photograph for ${product.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='/images/categories/cat-commodity.jpg'}} />
                <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold uppercase bg-white/90 text-primary-text">{product.category}</span>
                <span className="absolute bottom-4 right-4 rounded-full w-11 h-11 flex items-center justify-center bg-white text-primary-text transition-transform group-hover:-translate-y-1"><ArrowUpRight size={20}/></span>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight mb-2">{product.title}</h2>
              <p className="text-secondary-text leading-relaxed text-base mb-3">{product.tagline}</p>
              <span className="text-accent font-semibold text-sm inline-flex items-center gap-2">View product enquiry <ArrowUpRight size={16}/></span>
            </Link>
          </motion.div>)}
        </AnimatePresence>
      </motion.div>
      {filtered.length===0 && <p className="text-secondary-text">No products in this category yet. Please explore another category.</p>}
    </section>
  </div>
}
