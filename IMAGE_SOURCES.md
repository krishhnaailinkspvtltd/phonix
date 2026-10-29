# Image provenance and production notes

This is a frontend client concept. Export product thumbnails use remote demonstration stock images from Pexels. These images are **not** photos of PHONIX inventory, suppliers, factories or shipments. Replace them with approved photographs of the client's real products before launch.

- Dehydrated vegetable study: https://www.pexels.com/photo/close-up-of-dried-vegetables-26823080/
- Dried onions: https://www.pexels.com/photo/onions-in-close-up-photography-10444827/
- Dehydrated citrus/fruit: https://www.pexels.com/photo/colorful-dehydrated-fruit-slices-on-tray-36326594/
- Dried mango: https://www.pexels.com/photo/dried-fruit-slices-in-a-tray-with-granules-26604407/
- Indian spices and lentils: https://www.pexels.com/photo/assorted-indian-spices-and-lentils-close-up-32144895/
- Mango slices: https://www.pexels.com/photo/yellow-sliced-fruit-on-white-plate-4023132/
- Food ingredients: https://www.pexels.com/photo/fresh-ingredients-for-cooking-preparation-33180338/
- Fabric rolls: https://www.pexels.com/photo/colorful-fabric-rolls-in-textile-shop-34375574/
- Manufacturing example: https://www.pexels.com/photo/close-up-photo-of-metal-tool-10406128/
- Industrial machine (international sourcing category illustration): https://www.pexels.com/photo/an-industrial-machine-in-a-factory-5953729/
- Ginger: https://www.pexels.com/photo/a-pile-of-sliced-ginger-16122304/
- Spices/ingredients: https://www.pexels.com/photo/photo-of-assorted-dried-spices-3872418/

Existing maritime/logistics imagery and their original sourcing remain documented in `ATTRIBUTION.md`.

## Technical note
The new product images are loaded from `images.pexels.com` and require internet access. For offline use, components fall back to bundled images, which show trade/logistics and are **not equivalent product photos**. For a production release, download/optimize approved images to `public/images/products/` and replace the corresponding URLs in `src/data/tradeData.ts`.
