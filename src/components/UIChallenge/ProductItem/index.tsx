import Item from "./Item";

function ProductItem() {
  return (
    <div className='px-6 max-w-[1375px] mx-auto mt-4'>
      <div className='grid  grid-cols-1 xs:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10'>
        {products.map((product, index) => (
          <Item key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

const products = [
  {
    title:
      "Best Friend Gift Personalized, Best Friend Birthday Gifts For Her, Custom Portrait, Friendship Gift, Best Friend Gift For Women Father's Day",
    price: 7.97,
    originalPrice: 15.95,
    freeShipping: true,
    shopName: "AnsAtelier",
    images: [
      "https://i.etsystatic.com/23229142/r/il/ec0df4/6123233925/il_300x300.6123233925_p7ob.jpg",
    ],
  },
  {
    title:
      "Personalized Vinyl Record with Photo - Acrylic Song Plaque - Anniversary Gift for Friends - Birthday Gift for Her Him - Christmas Gifts",
    price: 7.16,
    originalPrice: 9.55,
    freeShipping: true,
    shopName: "PennyPrintsx",
    images: [
      "https://i.etsystatic.com/32449061/c/1736/1736/1001/247/il/3016e0/5603975653/il_300x300.5603975653_lo3t.jpg",
    ],
  },
  {
    title:
      "Personalised gift for your best friend - choose your quote, Print for best friends, Xmas Gift for friends, best friend print, Christmas gift",
    price: 16.89,
    originalPrice: 33.79,
    freeShipping: false,
    shopName: "DaisyMorningStore",
    images: [
      "https://i.etsystatic.com/26908095/c/2025/2025/317/0/il/660a0b/5009305023/il_300x300.5009305023_4l8y.jpg",
    ],
  },
  {
    title:
      "Personalised Best Friend Print, Best Friend Gift, Friendship Gift, Keepsake, Birthday Bestie Gifts, Birthday Gift for Her",
    price: 9.58,
    originalPrice: 11.28,
    freeShipping: false,
    shopName: "PinkPaperieCo",
    images: [
      "https://i.etsystatic.com/26527410/c/2400/2400/239/0/il/600e9d/4396523073/il_300x300.4396523073_bdas.jpg",
    ],
  },
  {
    title:
      "Custom Makeup Bag, Bridal Shower Gift, Personalised Bridesmaid Gifts, Wedding Gift, Travel Toiletry Bag, Cosmetic Bag, Birthday Gift for Her",
    price: 17.69,
    originalPrice: 25.27,
    freeShipping: true,
    shopName: "WestwoodStudioDesign",
    images: [
      "https://i.etsystatic.com/36693553/c/1941/1941/41/0/il/10be80/5131842266/il_300x300.5131842266_kqg3.jpg",
    ],
  },
  {
    title:
      "Faceless Portrait, custom illustration, personalised photo, photo illustration, personalised portrait, boyfriend gift, girlfriend gift",
    price: 4.55,
    originalPrice: 13.0,
    freeShipping: true,
    shopName: "PunoPrints",
    images: [
      "https://i.etsystatic.com/24512514/r/il/038310/5918372292/il_300x300.5918372292_cm7r.jpg",
    ],
  },
  {
    title:
      "personalized jewelry box Custom Jewelry Boxes Bridesmaid Jewelry Box Travel Jewelry Case, Custom Name Jewelry box",
    price: 7.96,
    originalPrice: 15.92,
    freeShipping: true,
    shopName: "LittleEnglandGifts",
    images: [
      "https://i.etsystatic.com/11396698/c/2400/2400/357/0/il/7f825e/5110707930/il_300x300.5110707930_7529.jpg",
    ],
  },
  {
    title:
      "Custom Neon Sign | Neon Sign | Wedding Signs | Name Neon Signs | LED Neon Light Sign | Wedding Bridesmaid Gifts | Wall Decor | Home Decor",
    price: 15.0,
    originalPrice: 60.0,
    freeShipping: true,
    shopName: "ManhattanNeons",
    images: [
      "https://i.etsystatic.com/27519419/c/2112/2112/453/398/il/1b2443/3522827430/il_300x300.3522827430_lo4f.jpg",
    ],
  },
  {
    title:
      "Custom Birthstone Bracelet, Initial Bracelet, Unbiological Sister Bracelets Birthstone Jewelry Birthday Gift Friendship Bracelet for Women",
    price: 24.5,
    originalPrice: 35.0,
    freeShipping: false,
    shopName: "Vivominimalist",
    images: [
      "https://i.etsystatic.com/18017285/c/1538/1538/282/683/il/5edf47/2238527557/il_300x300.2238527557_8b0n.jpg",
    ],
  },
  {
    title:
      "PERIMADE Custom Engraving Photo Locket • Gold Mail Envelope Couple Necklace • Sentimental Relationship Jewelry • Trendy Best Friend Gift",
    price: 18.95,
    originalPrice: 18.95,
    freeShipping: true,
    shopName: "Perimade",
    images: [
      "https://i.etsystatic.com/17618956/r/il/0bf15d/4784292660/il_300x300.4784292660_clu0.jpg",
    ],
  },
  {
    title:
      "PERIMADE Custom Photo Projection Bracelet • Personalized Picture Inside Bracelet • Minimalist Pet Memorial Jewelry • Trendy Best Friend Gift",
    price: 16.95,
    originalPrice: 16.95,
    freeShipping: true,
    shopName: "Perimade",
    images: [
      "https://i.etsystatic.com/17618956/r/il/d99aa0/5162700048/il_300x300.5162700048_7n9k.jpg",
    ],
  },
  {
    title:
      "Personalized Jewelry Box • Wedding Favors • Custom Name Velvet Travel Jewelry Case • Personalized Bridesmaid Bridesmaid Gift • Birthday Gift",
    price: 15.96,
    originalPrice: 22.8,
    freeShipping: true,
    shopName: "StudioSiUSA",
    images: [
      "https://i.etsystatic.com/51169005/r/il/7caa92/6020876812/il_300x300.6020876812_raqj.jpg",
    ],
  },
  {
    title:
      "Locket Necklace with Photo, Engraved Oval Necklace, Photo Necklace in Gold, Memorial Jewelry, Anniversary Gift, Mom Gift, Mothers Day Gift",
    price: 24.53,
    originalPrice: 49.06,
    freeShipping: false,
    shopName: "AnyaShopStudio",
    images: [
      "https://i.etsystatic.com/34379934/c/1298/1298/366/405/il/e1e190/5286845407/il_300x300.5286845407_o0hc.jpg",
    ],
  },
  {
    title:
      "Engraved Birth Flower jewellery Box, Travel Jewelry Box, Birthday Gift, Bridal Party Gifts, Bridesmaid Gifts, Gift for her",
    price: 5.84,
    originalPrice: 10.61,
    freeShipping: false,
    shopName: "Lamoriea",
    images: [
      "https://i.etsystatic.com/25947065/r/il/a5b747/5936505819/il_300x300.5936505819_7bsw.jpg",
    ],
  },
  {
    title:
      "Personalized Birth Flower Tumbler, Gifts for Her, Mother's Day Gift, Bridesmaid Proposal Gift, Graduation Gift, Custom Glass Coffee Cup",
    price: 7.95,
    originalPrice: 13.25,
    freeShipping: true,
    shopName: "LoveSuna",
    images: [
      "https://i.etsystatic.com/22775504/r/il/0b6897/5953695333/il_300x300.5953695333_fome.jpg",
    ],
  },
  {
    title:
      "Personalised Tomato Ketchup Sauce Label Vinyl Sticker Funny Novelty Gift Birthday Anniversary",
    price: 3.65,
    originalPrice: 3.65,
    freeShipping: false,
    shopName: "A1GraphicsLtd",
    images: [
      "https://i.etsystatic.com/27931246/c/2000/2000/0/0/il/203f33/4025875732/il_300x300.4025875732_8851.jpg",
    ],
  },
];

export default ProductItem;
