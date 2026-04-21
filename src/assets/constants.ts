import logoImg from './images/logo.png';
import comingSoonImg from './images/coming soon.jpg';
import blackJacketImg from './images/BLACK_jacket.jpg';
import blackPantsImg from './images/black pants.jpg';
import blackDressImg from './images/black_dress.png';
import whiteJacketImg from './images/white jacket.jpg';
import whitePantsImg from './images/white pants.jpg';
import whiteDressImg from './images/white_dress.png';

export const IMAGES = {
  logo: logoImg,
  hero: comingSoonImg,
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
    name: "Classic Black Jacket",
    price: 1300,
    category: "Outerwear",
    color: "Black",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.blackJacket,
    description: "Our signature high-quality black jacket, built for everyday elegance.",
    isNew: true,
    sizeChart: topSizeChart,
  },
  {
    id: "2",
    name: "Classic Black Pants",
    price: 1250,
    category: "Bottoms",
    color: "Black",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.blackPants,
    description: "Elevated black trousers that fit perfectly and flow with you.",
    isNew: true,
    sizeChart: pantSizeChart,
  },
  {
    id: "3",
    name: "Modern Black Dress Set",
    price: 2300,
    category: "Sets",
    color: "Black",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.blackDress,
    description: "The complete modern uniform. An exquisite black dress set for any occasion.",
    isNew: true,
    sizeChart: topSizeChart, // Assuming top measurements serve as dress proxy
  },
  {
    id: "4",
    name: "Classic White Jacket",
    price: 1300,
    category: "Outerwear",
    color: "White",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.whiteJacket,
    description: "Our signature high-quality white jacket, bringing a refined brightness to your wardrobe.",
    isNew: true,
    sizeChart: topSizeChart,
  },
  {
    id: "5",
    name: "Classic White Pants",
    price: 1250,
    category: "Bottoms",
    color: "White",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.whitePants,
    description: "Elegant white trousers designed for ease and sophistication.",
    isNew: true,
    sizeChart: pantSizeChart,
  },
  {
    id: "6",
    name: "Modern White Dress Set",
    price: 2300,
    category: "Sets",
    color: "White",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Blend",
    image: IMAGES.whiteDress,
    description: "A breathtaking white dress set offering effortless grace and a clean silhouette.",
    isNew: true,
    sizeChart: topSizeChart, // Assuming top measurements serve as dress proxy
  },
];

export const CATEGORIES = ["All", "Sets", "Outerwear", "Bottoms"];
export const COLORS = ["All", "Black", "White"];
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
