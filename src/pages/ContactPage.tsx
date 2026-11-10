import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight, FileText, Copy, Check } from 'lucide-react'
import { PRODUCT_CATEGORIES } from '@/data/tradeData'

type Enquiry = { fullName:string; email:string; company:string; country:string; direction:string; product:string; quantity:string; destination:string; subject:string; message:string }
const empty:Enquiry={fullName:'',email:'',company:'',country:'',direction:'Export from India',product:'Dehydrated Vegetables',quantity:'',destination:'',subject:'',message:''}
export function ContactPage(){
 const [params]=useSearchParams()
 const [form,setForm]=useState<Enquiry>({...empty,subject:params.get('subject')||''})
 const [error,setError]=useState('')
 const [submitted,setSubmitted]=useState(false)
 const [copied,setCopied]=useState(false)
 const [copyError,setCopyError]=useState('')
 useEffect(()=>{window.scrollTo(0,0);document.title='Import & Export Product Enquiries | PHONIX GLOBAL TRADE'},[])
 useEffect(()=>{const subject=params.get('subject');if(subject)setForm(f=>({...f,subject}))},[params])
 const change=(e:ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>{setForm(s=>({...s,[e.target.name]:e.target.value}));setError('')}
 const submit=(e:FormEvent)=>{e.preventDefault();if(!form.fullName.trim()||!form.email.trim()||!form.message.trim()){setError('Please provide your name, email and product requirements.');return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){setError('Please enter a valid email address.');return}setSubmitted(true)}
 const enquiryText=[
  'PHONIX GLOBAL TRADE — Product Enquiry',
  'Name: '+form.fullName,
  'Email: '+form.email,
  'Company: '+(form.company||'Not provided'),
  'Country: '+(form.country||'Not provided'),
  'Trade direction: '+form.direction,
  'Product category: '+form.product,
  'Estimated quantity: '+(form.quantity||'To be discussed'),
  'Destination / origin: '+(form.destination||'To be discussed'),
  'Subject: '+(form.subject||'Product enquiry'),
  'Requirements: '+form.message,
 ].join('\\n')
 const copyEnquiry=async()=>{
  try { await navigator.clipboard.writeText(enquiryText); setCopied(true); setCopyError('') }
  catch { setCopyError('Copy is unavailable in this browser. Please select the enquiry details and copy them manually.') }
 }
 const fieldClass='w-full border border-border-strong px-4 py-3.5 bg-white text-primary-text text-base focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10'
 return <div className="pt-28 sm:pt-36 pb-24 text-primary-text min-h-screen">
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"><p className="uppercase tracking-[.16em] text-xs font-semibold text-accent mb-5">CONTACT / BUSINESS ENQUIRIES</p><div className="grid lg:grid-cols-12 gap-8 items-end pb-10 border-b border-border-strong"><h1 className="lg:col-span-8 display-heading font-display font-bold leading-[.95]">Let's talk <br/><span className="font-editorial italic font-normal text-accent">about your product.</span></h1><p className="lg:col-span-4 text-secondary-text text-base lg:text-lg leading-relaxed">Interested in importing Indian products or sourcing goods internationally for India? Tell us your requirements.</p></div></section>
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
   <div className="lg:col-span-8 bg-surface p-6 sm:p-9 lg:p-12">
    {submitted?<div className="py-8"><FileText size={42} className="text-accent mb-6"/><h2 className="text-3xl font-display font-bold mb-4">Your enquiry is ready to share.</h2><p className="text-secondary-text leading-relaxed mb-6">Review the details below and copy them for your business correspondence. <strong>This page does not send or store your enquiry.</strong></p><div className="bg-white border border-border-strong rounded-xl p-6 space-y-3 text-base"><p><strong>Name:</strong> {form.fullName}</p><p><strong>Email:</strong> {form.email}</p><p><strong>Trade direction:</strong> {form.direction}</p><p><strong>Product:</strong> {form.product}</p><p><strong>Quantity:</strong> {form.quantity || 'To be discussed'}</p><p><strong>Destination:</strong> {form.destination || 'To be discussed'}</p><p><strong>Requirements:</strong> {form.message}</p></div><div className="flex flex-wrap gap-3 items-center mt-7"><button type="button" className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-primary-text text-white hover:bg-accent transition-colors" onClick={copyEnquiry}>{copied?<Check size={19}/>:<Copy size={19}/>} {copied?'Copied to clipboard':'Copy enquiry details'}</button><button type="button" className="px-6 py-3.5 rounded-full border border-border-strong hover:border-accent" onClick={()=>{setSubmitted(false);setCopied(false)}}>Edit enquiry</button></div>{copied&&<p role="status" className="text-sm text-accent mt-3">Enquiry details copied. You can paste them into your preferred email or message app.</p>}{copyError&&<p role="alert" className="text-sm text-red-700 mt-3">{copyError}</p>}</div>
    :<form onSubmit={submit} noValidate className="space-y-6"><div className="flex justify-between items-center border-b border-border-strong pb-5 mb-6"><h2 className="text-2xl font-display font-bold">Product enquiry</h2><span className="text-accent text-sm font-semibold">* Required</span></div>
     <div className="grid sm:grid-cols-2 gap-5"><label className="space-y-2 block"><span className="text-sm font-semibold">Your name *</span><input className={fieldClass} type="text" autoComplete="name" name="fullName" value={form.fullName} onChange={change} placeholder="Full name" required/></label><label className="space-y-2 block"><span className="text-sm font-semibold">Email address *</span><input className={fieldClass} type="email" autoComplete="email" name="email" value={form.email} onChange={change} placeholder="you@company.com" required/></label></div>
     <div className="grid sm:grid-cols-2 gap-5"><label className="space-y-2 block"><span className="text-sm font-semibold">Company (optional)</span><input className={fieldClass} name="company" value={form.company} onChange={change} placeholder="Company name"/></label><label className="space-y-2 block"><span className="text-sm font-semibold">Your country</span><input className={fieldClass} name="country" value={form.country} onChange={change} placeholder="Country"/></label></div>
     <div className="grid sm:grid-cols-2 gap-5"><label className="space-y-2 block"><span className="text-sm font-semibold">I'm interested in</span><select className={fieldClass} name="direction" value={form.direction} onChange={change}><option>Export from India</option><option>Import to India</option><option>General business enquiry</option></select></label><label className="space-y-2 block"><span className="text-sm font-semibold">Product category</span><select className={fieldClass} name="product" value={form.product} onChange={change}>{PRODUCT_CATEGORIES.map(c=><option key={c.id}>{c.name}</option>)}<option>Other products</option></select></label></div>
     <div className="grid sm:grid-cols-2 gap-5"><label className="space-y-2 block"><span className="text-sm font-semibold">Estimated quantity (optional)</span><input className={fieldClass} name="quantity" value={form.quantity} onChange={change} placeholder="e.g. 500 kg or 1 container"/></label><label className="space-y-2 block"><span className="text-sm font-semibold">Destination / origin country</span><input className={fieldClass} name="destination" value={form.destination} onChange={change} placeholder="e.g. UAE, UK, India"/></label></div>
     <label className="space-y-2 block"><span className="text-sm font-semibold">Subject</span><input className={fieldClass} name="subject" value={form.subject} onChange={change} placeholder="What product are you looking for?"/></label>
     <label className="space-y-2 block"><span className="text-sm font-semibold">Product requirements *</span><textarea className={`${fieldClass} min-h-40 resize-y`} name="message" value={form.message} onChange={change} placeholder="Please describe the product, grade or form, packaging preference, target quantity and destination." required/></label>
     {error&&<p role="alert" className="text-red-700 text-sm font-semibold">{error}</p>}
     <button type="submit" className="flex justify-between items-center w-full sm:w-auto gap-8 bg-primary-text text-white hover:bg-accent transition-colors px-8 py-4 font-semibold">Review enquiry details <ArrowUpRight size={20}/></button>
     <p className="text-secondary-text text-sm leading-relaxed">This form helps prepare your enquiry. It does not transmit or store your information. Direct enquiry delivery will be enabled once a verified business contact address is available.</p>
    </form>}
   </div>
   <aside className="lg:col-span-4 space-y-8"><div className="border-t-2 border-primary-text pt-7"><p className="text-accent text-xs font-semibold uppercase tracking-widest mb-4">EXPORT ENQUIRIES</p><h3 className="text-2xl font-display font-bold mb-3">Sourcing from India?</h3><p className="text-secondary-text leading-relaxed">Tell us about your interest in dehydrated food products, spices, agricultural produce or Indian manufactured goods.</p></div><div className="border-t-2 border-primary-text pt-7"><p className="text-accent text-xs font-semibold uppercase tracking-widest mb-4">IMPORT ENQUIRIES</p><h3 className="text-2xl font-display font-bold mb-3">Importing into India?</h3><p className="text-secondary-text leading-relaxed">Share the product details and preferred supplier origin to start a discussion about international sourcing.</p></div><div className="border border-border-strong bg-white p-6"><p className="text-accent text-xs tracking-widest uppercase font-semibold mb-3">BUSINESS CONTACT INFORMATION</p><p className="text-secondary-text text-sm leading-relaxed">To help us assess your request, include product form or grade, estimated quantity, destination and preferred packaging or shipping terms.</p></div></aside>
  </section>
 </div>
}
