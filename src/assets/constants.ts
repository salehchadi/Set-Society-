import logoImg from './images/logo.png';
import heroImg from './images/Home.png';
import blackJacketImg from './images/black resized jacket.png';
import blackPantsImg from './images/black resized pant.png';
import blackDressImg from './images/black resized set.png';
import whiteJacketImg from './images/white resized jacket.png';
import whitePantsImg from './images/white final pants.png';
import whiteDressImg from './images/white final set.png';

export const IMAGES = {
  logo: logoImg,
  hero: heroImg,
  blackJacket: blackJacketImg,
  blackPants: blackPantsImg,
  blackDress: blackDressImg,
  whiteJacket: whiteJacketImg,
  whitePants: whitePantsImg,
  whiteDress: whiteDressImg,
};

export interface SizeChartRow {
  feature: string;
  xs: string;
  s: string;
  m: string;
  l: string;
  xl: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  sizes: string[];
  material: string;
  image: string;
  description: string;
  isNew?: boolean;
  sizeChart?: SizeChartRow[];
}

const topSizeChart: SizeChartRow[] = [
  { feature: "Length", xs: "59", s: "61", m: "63", l: "65", xl: "67" },
  { feature: "Chest", xs: "49", s: "51", m: "53", l: "55", xl: "57" },
  { feature: "Sleeve Length", xs: "59.25", s: "60", m: "60.75", l: "61.5", xl: "62.5", notes: "Cuff = 6cm" },
  { feature: "Biceps", xs: "27.25", s: "28", m: "28.75", l: "29.5", xl: "30.25" },
];

const pantSizeChart: SizeChartRow[] = [
  { feature: "Pant - Length", xs: "111", s: "111", m: "111", l: "111", xl: "111" },
  { feature: "Pant - Waist", xs: "40.5", s: "42.5", m: "44.5", l: "46.5", xl: "48.5" },
  { feature: "Pant - Hip", xs: "47", s: "49.25", m: "51.5", l: "54", xl: "56" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Everyday Black Jacket",
    price: 1300,
    category: "Outerwear",
    color: "Black",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.blackJacket,
    description: "A fitted silhouette with an effortless feel.\nCrafted with a pure cotton inner layer for a soft, breathable touch against the skin, while the outer layer features a textured ribbed cotton-blend fabric that adds structure and dimension. Designed with a cinched waist and relaxed sleeves to create a balanced, flattering shape that feels both comfortable and elevated.",
    isNew: true,
    sizeChart: topSizeChart,
  },
  {
    id: "2",
    name: "Everyday Black Pants",
    price: 1250,
    category: "Bottoms",
    color: "Black",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.blackPants,
    description: "Designed for comfort without compromising structure.\nMade with a soft pure cotton inner layer for a breathable, lightweight feel, while the outer side features a ribbed cotton-blend fabric that gives the pants a refined textured finish. The silhouette is relaxed yet flattering, offering ease of movement with a clean elevated look perfect for everyday wear.\n\nCold wash only to preserve the fabric and fit.",
    isNew: true,
    sizeChart: pantSizeChart,
  },
  {
    id: "3",
    name: "Everyday Set",
    price: 2400,
    category: "Sets",
    color: "Black",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.blackDress,
    description: "This set is crafted from a thoughtfully engineered dual-sided fabric, combining comfort with durability. One side is made from 100% cotton, offering a soft, breathable feel against the skin—perfect for all-day wear. The other side features a cotton blend with 50% polyester, adding structure, resilience, and shape retention.\n\nThe result is a balanced piece that feels natural and lightweight while maintaining its form and finish over time. Designed for ease, movement, and everyday versatility.\n\nCare instructions: Wash in cold water only to preserve the fabric’s quality, softness, and fit.",
    isNew: true,
    sizeChart: topSizeChart, // Assuming top measurements serve as dress proxy
  },
  {
    id: "4",
    name: "Everyday Off White Jacket",
    price: 1300,
    category: "Outerwear",
    color: "Off White",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.whiteJacket,
    description: "A fitted silhouette with an effortless feel.\nCrafted with a pure cotton inner layer for a soft, breathable touch against the skin, while the outer layer features a textured ribbed cotton-blend fabric that adds structure and dimension. Designed with a cinched waist and relaxed sleeves to create a balanced, flattering shape that feels both comfortable and elevated.",
    isNew: true,
    sizeChart: topSizeChart,
  },
  {
    id: "5",
    name: "Everyday Off White Pants",
    price: 1250,
    category: "Bottoms",
    color: "Off White",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.whitePants,
    description: "Designed for comfort without compromising structure.\nMade with a soft pure cotton inner layer for a breathable, lightweight feel, while the outer side features a ribbed cotton-blend fabric that gives the pants a refined textured finish. The silhouette is relaxed yet flattering, offering ease of movement with a clean elevated look perfect for everyday wear.\n\nCold wash only to preserve the fabric and fit.",
    isNew: true,
    sizeChart: pantSizeChart,
  },
  {
    id: "6",
    name: "Everyday Off White Set",
    price: 2400,
    category: "Sets",
    color: "Off White",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.whiteDress,
    description: "This set is crafted from a thoughtfully engineered dual-sided fabric, combining comfort with durability. One side is made from 100% cotton, offering a soft, breathable feel against the skin—perfect for all-day wear. The other side features a cotton blend with 50% polyester, adding structure, resilience, and shape retention.\n\nThe result is a balanced piece that feels natural and lightweight while maintaining its form and finish over time. Designed for ease, movement, and everyday versatility.\n\nCare instructions: Wash in cold water only to preserve the fabric’s quality, softness, and fit.",
    isNew: true,
    sizeChart: topSizeChart, // Assuming top measurements serve as dress proxy
  },
];

export const CATEGORIES = ["All", "Sets", "Outerwear", "Bottoms"];
export const COLORS = ["All", "Black", "Off White"];
export const SIZES = ["XS", "S", "M", "L", "XL"];
export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A — Z" },
  { value: "name-desc", label: "Name: Z — A" },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Returns & Refunds", path: "/returns" },
];

export const FOOTER_LINKS = [
  { label: "Privacy Policy", path: "#" },
  { label: "Terms of Service", path: "#" },
  { label: "Shipping & Returns", path: "/returns" },
];
