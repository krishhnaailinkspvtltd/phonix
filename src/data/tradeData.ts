/**
 * PHONIX GLOBAL TRADE — editable demo catalog.
 * Product families and trade directions come from the client's brief.
 * Individual sample items, photography and product options illustrate potential inquiries,
 * not confirmed SKUs, inventories, certifications, origins, or delivery commitments.
 */
export interface TradePanel { id:string; number:string; tag:string; title:string; italicTitle?:string; description:string; metrics:{label:string;value:string}[]; image:string; accentColor?:string }
export interface ProductCategory { id:string; index:string; name:string; subhead:string; description:string; itemCount:number; keyCommodities:string[]; image:string }
export interface ProductItem { id:string; slug:string; category:string; categoryId:string; title:string; tagline:string; description:string; image:string; secondaryImages:string[]; hsCode:string; originHub:string; primaryMarkets:string[]; moq:string; packaging:string; leadTime:string; specifications:{key:string;value:string}[]; complianceStandards:string[] }
export interface TradeRoute { id:string; name:string; origin:string; destination:string; transitDays:number; primaryCargo:string; keyHubs:string[]; volumeAnnual:string; coordinates:{x:number;y:number}[]; status:'OPTIMAL'|'CONGESTED'|'SEASONAL' }
export interface GalleryPhoto { id:string; title:string; category:'Products'|'Sourcing'|'Logistics'|'Manufacturing'; location:string; coordinates:string; image:string; aspect:'wide'|'tall'|'square' }

// Pexels photography links have an illustrated/demo purpose and require network access.
// Swap these with verified client product photos before launch. See IMAGE_SOURCES.md.
const photo = (id:number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
export const PHOTO = {
  driedVegetables: photo(26823080),
  onionGarlic: photo(10444827),
  driedFruit: photo(36326594),
  driedMango: photo(26604407),
  spices: photo(32144895),
  mangoes: photo(4023132),
  produce: photo(33180338),
  textile: photo(34375574),
  manufacturing: photo(10406128),
  importedGoods: photo(5953729),
  driedGinger: photo(16122304),
  foodIngredients: photo(3872418),
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id:'dehydrated-vegetables', index:'01', name:'Dehydrated Vegetables', subhead:'Indian onion, garlic & vegetable ingredients', description:'A showcase of export-oriented dehydrated onions, garlic, ginger and vegetable ingredients for food manufacturers, distributors and buyers.', itemCount:3, keyCommodities:['Dehydrated onion flakes','Dehydrated garlic','Dried ginger & vegetables'], image:PHOTO.driedVegetables },
  { id:'dehydrated-fruits', index:'02', name:'Dehydrated Fruits', subhead:'Dried mango & fruit-based ingredients', description:'Explore dried fruit slices and fruit-based ingredients, with product form, packing and quality requirements discussed for every inquiry.', itemCount:2, keyCommodities:['Dried mango','Dried fruit slices'], image:PHOTO.driedFruit },
  { id:'spices-food', index:'03', name:'Indian Spices & Food', subhead:'Flavours & food products from India', description:'Indian spices, seasonings and selected food products for buyers looking to source from India.', itemCount:2, keyCommodities:['Turmeric & cumin','Red chilli & seasonings'], image:PHOTO.spices },
  { id:'agri-products', index:'04', name:'Agricultural Products', subhead:'Produce & food ingredients', description:'Indian agricultural products and food ingredients, including fresh and processed produce, according to buyer requirements and seasonality.', itemCount:2, keyCommodities:['Fresh fruit & produce','Food ingredients'], image:PHOTO.produce },
  { id:'manufactured-goods', index:'05', name:'Indian Manufactured Goods', subhead:'Made in India, made for global markets', description:'A broad enquiry-led category for India-made textiles, packaging, household articles and industrial products.', itemCount:2, keyCommodities:['Textiles & fabric','Manufactured components'], image:PHOTO.textile },
  { id:'imports', index:'06', name:'International Imports', subhead:'Connecting overseas suppliers with buyers in India', description:'Product sourcing from other countries for Indian buyers, based on category, supplier suitability and import requirements.', itemCount:1, keyCommodities:['Internationally sourced goods','Buyer-specific requirements'], image:PHOTO.importedGoods },
]

const item = (id:string, categoryId:string, title:string, tagline:string, description:string, image:string, options:string[], direction:'Export from India'|'Import to India'='Export from India'):ProductItem => {
  const cat = PRODUCT_CATEGORIES.find(c=>c.id===categoryId)!
  return { id, slug:id, category:cat.name, categoryId, title, tagline, description, image, secondaryImages:[], hsCode:'Confirm for specific product', originHub:direction==='Export from India'?'India (supplier dependent)':'International (supplier dependent)', primaryMarkets:direction==='Export from India'?['International buyers — destination on inquiry']:['Indian buyers — origin on inquiry'], moq:'On request', packaging:'Customisable — subject to supplier confirmation', leadTime:'Quoted after enquiry', specifications:[{key:'Trade direction',value:direction}, {key:'Available forms / discussion points',value:options.join(' · ')}, {key:'Grades, moisture & quality',value:'Confirmed against the buyer’s written requirements'}, {key:'Packaging & quantities',value:'Quoted based on product and destination'}, {key:'Documentation',value:'Discussed according to product and applicable rules'}], complianceStandards:[] }
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  item('dehydrated-onion','dehydrated-vegetables','Dehydrated Onion','A versatile ingredient for global food businesses.','Explore export enquiries for dehydrated onion. Flakes, granules or powder can be discussed according to buyer needs; actual formats and grades require supplier confirmation.',PHOTO.onionGarlic,['Flakes','Granules','Powder']),
  item('dehydrated-garlic','dehydrated-vegetables','Dehydrated Garlic','Indian-origin garlic ingredients for professional kitchens and manufacturers.','Explore dehydrated garlic enquiries for ingredient sourcing. Form, cut, colour, moisture and packaging will be confirmed for each product request.',PHOTO.driedVegetables,['Flakes','Granules','Powder']),
  item('dried-ginger','dehydrated-vegetables','Dried Ginger & Vegetable Ingredients','Ingredient sourcing shaped around your specification.','Dried ginger and other dehydrated vegetables can be explored through a buyer-specific inquiry, including form, grade and intended food application.',PHOTO.driedGinger,['Slices','Pieces','Powder']),
  item('dried-mango','dehydrated-fruits','Dried Mango','A tropical flavour for international ingredient and retail buyers.','Explore dried mango sourcing from India. The final product specification, origin, processing method and packaging depend on availability and buyer requirements.',PHOTO.driedMango,['Dried slices','Pieces','Ingredient formats']),
  item('dried-fruit-selection','dehydrated-fruits','Dehydrated Fruit Selection','Fruit ingredients for a variety of food applications.','Ask about dried fruit products and blends. Fruit variety, cut, packaging and destination-market requirements will be assessed individually.',PHOTO.driedFruit,['Fruit slices','Dried fruit pieces','Custom inquiries']),
  item('indian-spices','spices-food','Indian Whole & Ground Spices','India’s distinctive flavours, for global markets.','Enquire about selected Indian spices and seasonings including turmeric, cumin and chilli. Requested grade, handling and packing can be discussed with suppliers.',PHOTO.spices,['Whole spices','Ground spices','Seasoning requirements']),
  item('chilli-turmeric','spices-food','Turmeric, Chilli & Seasonings','Versatile ingredients for international food buyers.','A practical starting point for enquiries about Indian turmeric, chilli and seasoning ingredients. Actual quality parameters must be approved before quotation.',PHOTO.foodIngredients,['Powder','Whole or dried','Buyer-specific grades']),
  item('fresh-produce','agri-products','Fresh Fruits & Produce','Seasonal agricultural products from India.','Explore enquiries for Indian fruits and vegetables. Availability, grade, packing and export eligibility vary by product and season.',PHOTO.mangoes,['Seasonal fruit','Vegetables','Market-specific packing']),
  item('food-ingredients','agri-products','Indian Food Ingredients','From agricultural sourcing to food processing needs.','Discuss requirements for selected Indian-origin agricultural and food ingredients, based on the buyer’s desired product form and destination.',PHOTO.produce,['Raw ingredients','Processed ingredients','Bulk sourcing']),
  item('indian-textiles','manufactured-goods','Indian Textiles & Fabrics','Manufactured in India, explored for markets abroad.','Showcase category for enquiries about India-made textiles and fabrics. Material, dimensions, colour, finishing and quantities are confirmed case by case.',PHOTO.textile,['Fabric rolls','Finished textile goods','Custom specifications']),
  item('made-in-india','manufactured-goods','Made-in-India Products','Broader sourcing possibilities across Indian manufacturing.','For buyers looking for Indian manufactured products, PHONIX can discuss the product category and required supplier specifications. This is not a claim of stocked inventory.',PHOTO.manufacturing,['Manufactured goods','Packaging products','Buyer-defined products']),
  item('global-import-sourcing','imports','International Product Sourcing','Import enquiries for the Indian market.','Looking for products from overseas? Share your target category, origin preference, quality and volume requirements to discuss international sourcing options.',PHOTO.importedGoods,['Overseas supplier enquiry','Buyer-defined items','Import to India'],'Import to India'),
]

// Backward compatible data for optional legacy demo components; no invented statistics.
export const PINNED_TEMPLATE_PANELS: TradePanel[] = [
  {id:'indian-origin',number:'01',tag:'INDIAN EXPORTS',title:'INDIAN',italicTitle:'Origins.',description:'Explore agricultural, food and manufactured products sourced from India.',metrics:[{label:'PRODUCT INFORMATION',value:'On enquiry'}],image:'/images/hero/hero-port.jpg'},
  {id:'dehydrated',number:'02',tag:'FOOD INGREDIENTS',title:'DRIED',italicTitle:'Ingredients.',description:'Enquiries for dehydrated vegetables, fruit and Indian spices.',metrics:[{label:'SPECIFICATIONS',value:'On enquiry'}],image:'/images/panels/panel-2-sourcing.jpg'},
  {id:'manufacturing',number:'03',tag:'MADE IN INDIA',title:'MADE',italicTitle:'in India.',description:'Explore textile and manufactured-product requirements for export.',metrics:[{label:'PRODUCTION',value:'Supplier dependent'}],image:'/images/panels/panel-3-logistics.jpg'},
  {id:'imports',number:'04',tag:'INTERNATIONAL IMPORTS',title:'GLOBAL',italicTitle:'Sourcing.',description:'Import enquiries connecting overseas supply with buyers in India.',metrics:[{label:'ORIGINS',value:'On enquiry'}],image:'/images/panels/panel-4-markets.jpg'},
]
export const HORIZONTAL_PANELS = PINNED_TEMPLATE_PANELS.map(p=>({id:p.id,num:p.number,heading:p.title+' '+(p.italicTitle||''),sub:p.description,image:p.image,metric:'Explore on enquiry'}))
export const TRADE_CORRIDORS: TradeRoute[] = [
  {id:'exports',name:'India → International Markets',origin:'India',destination:'Buyer-designated destination',transitDays:0,primaryCargo:'Dehydrated foods, spices, produce, manufactured goods',keyHubs:['Origin and destination confirmed for each enquiry'],volumeAnnual:'Not published',coordinates:[{x:65,y:50},{x:32,y:40}],status:'SEASONAL'},
  {id:'imports',name:'International Markets → India',origin:'Overseas supplier',destination:'India',transitDays:0,primaryCargo:'Buyer-requested products',keyHubs:['Supplier and logistics details confirmed for each enquiry'],volumeAnnual:'Not published',coordinates:[{x:35,y:39},{x:65,y:50}],status:'SEASONAL'},
]
export const GLOBAL_DESKS = [{city:'Enquiries',region:'IMPORT & EXPORT',timezone:'On request',address:'Business address to be confirmed by client',phone:'Contact details pending client confirmation',email:'Contact details pending client confirmation'}]
export const GALLERY_ITEMS: GalleryPhoto[] = [
  {id:'gallery-01',title:'Global shipping and supply connections',category:'Logistics',location:'Illustrative stock photograph',coordinates:'',image:'/images/gallery/gallery-1.jpg',aspect:'wide'},
  {id:'gallery-02',title:'International trade infrastructure',category:'Logistics',location:'Illustrative stock photograph',coordinates:'',image:'/images/gallery/gallery-2.jpg',aspect:'tall'},
  {id:'gallery-03',title:'Industrial production and sourcing',category:'Manufacturing',location:'Illustrative stock photograph',coordinates:'',image:'/images/gallery/gallery-3.jpg',aspect:'square'},
  {id:'gallery-04',title:'Ocean freight in global commerce',category:'Logistics',location:'Illustrative stock photograph',coordinates:'',image:'/images/gallery/gallery-4.jpg',aspect:'wide'},
  {id:'gallery-05',title:'Products connecting markets',category:'Products',location:'Illustrative stock photograph',coordinates:'',image:PHOTO.spices,aspect:'tall'},
  {id:'gallery-06',title:'Sourcing across borders',category:'Sourcing',location:'Illustrative stock photograph',coordinates:'',image:PHOTO.produce,aspect:'square'},
]
