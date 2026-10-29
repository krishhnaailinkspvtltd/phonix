import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { PRODUCTS_CATALOG } from '@/data/tradeData'

export function ProductDetailPage() {
  const { id } = useParams<{id:string}>()
  const product = PRODUCTS_CATALOG.find(p=>p.id===id)
  const [imageIndex, setImageIndex] = useState(0)
  useEffect(()=>{window.scrollTo(0,0);document.title=product?`${product.title} | PHONIX GLOBAL TRADE`:'Product | PHONIX GLOBAL TRADE';setImageIndex(0)},[id,product])
  if(!product) return <div className="pt-36 pb-32 max-w-5xl mx-auto px-6"><h1 className="text-4xl font-display font-bold mb-6">Product not found</h1><Link className="text-accent" to="/products">← Browse all products</Link></div>
  const images = [product.image,...product.secondaryImages]
  const related = PRODUCTS_CATALOG.filter(p=>p.id!==product.id&&p.categoryId===product.categoryId).slice(0,3)
  return <div className="pt-28 sm:pt-36 pb-24 text-primary-text">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-text hover:text-accent mb-10"><ArrowLeft size={17}/> Back to product collection</Link>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 mb-20 items-start">
        <div className="lg:col-span-7">
          <div className="aspect-[5/4] bg-surface overflow-hidden"><img src={images[imageIndex]} alt={`Illustrative photo for ${product.title}`} className="w-full h-full object-cover" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='/images/categories/cat-commodity.jpg'}} /></div>
          {images.length>1&&<div className="flex gap-2 mt-3">{images.map((img,i)=><button key={img} onClick={()=>setImageIndex(i)} aria-label={`View product image ${i+1}`} className={`h-18 w-24 border-2 ${i===imageIndex?'border-accent':'border-transparent'}`}><img src={img} alt="" className="w-full h-full object-cover"/></button>)}</div>}
          <p className="mt-3 text-sm text-secondary-text">Illustrative image. Actual product appearance and specifications to be confirmed.</p>
        </div>
        <div className="lg:col-span-5">
          <p className="text-accent text-xs font-semibold tracking-[.16em] uppercase mb-4">{product.category} / Product enquiry</p>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tight leading-[1.04] mb-5">{product.title}</h1>
          <p className="text-xl font-editorial italic text-secondary-text mb-6">{product.tagline}</p>
          <p className="text-base lg:text-lg text-secondary-text leading-relaxed mb-8">{product.description}</p>
          <div className="border-y border-border-strong mb-8">
            <div className="grid grid-cols-[140px_1fr] gap-4 py-4 border-b border-border-subtle text-sm"><span className="text-secondary-text">Source region</span><strong className="font-medium">{product.originHub}</strong></div>
            <div className="grid grid-cols-[140px_1fr] gap-4 py-4 border-b border-border-subtle text-sm"><span className="text-secondary-text">Order quantity</span><strong className="font-medium">{product.moq}</strong></div>
            <div className="grid grid-cols-[140px_1fr] gap-4 py-4 border-b border-border-subtle text-sm"><span className="text-secondary-text">Packaging</span><strong className="font-medium">{product.packaging}</strong></div>
            <div className="grid grid-cols-[140px_1fr] gap-4 py-4 text-sm"><span className="text-secondary-text">Lead time</span><strong className="font-medium">{product.leadTime}</strong></div>
          </div>
          <Link to={`/contact?subject=${encodeURIComponent('Product enquiry: '+product.title)}`} className="flex w-full items-center justify-between px-7 py-5 bg-primary-text text-white hover:bg-accent transition-colors font-semibold">Request product details <ArrowUpRight size={20}/></Link>
        </div>
      </div>
      <section className="max-w-4xl mb-20 border-t border-border-strong pt-10">
        <p className="text-xs text-accent font-semibold uppercase tracking-widest mb-3">Product information</p>
        <h2 className="text-3xl lg:text-4xl font-display font-bold mb-5">Let's discuss your requirements.</h2>
        <p className="text-secondary-text text-base leading-relaxed mb-8">Product forms shown below are examples for enquiry, not guaranteed available specifications. Final grade, documents, pricing and trade terms will be determined for each product and destination.</p>
        <div className="border border-border-strong">{product.specifications.map(spec=><div key={spec.key} className="grid sm:grid-cols-[230px_1fr] gap-3 sm:gap-8 px-5 py-4 border-b last:border-b-0 border-border-subtle"><span className="font-medium text-secondary-text">{spec.key}</span><span className="text-primary-text">{spec.value}</span></div>)}</div>
      </section>
      {related.length>0&&<section className="border-t border-border-strong pt-10"><div className="flex items-end justify-between gap-5 mb-8"><h2 className="text-3xl font-display font-bold">Explore related products</h2><Link className="text-accent font-semibold" to="/products">Full collection ↗</Link></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">{related.map(p=><Link key={p.id} to={`/products/${p.id}`} className="group"><div className="aspect-[4/3] overflow-hidden bg-surface mb-4"><img src={p.image} alt={`Illustrative photo for ${p.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='/images/categories/cat-commodity.jpg'}}/></div><h3 className="text-xl font-bold">{p.title} ↗</h3></Link>)}</div></section>}
    </div>
  </div>
}
