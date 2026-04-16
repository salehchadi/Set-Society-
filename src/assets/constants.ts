import logoImg from './images/logo.png';
import mainImg from './images/main_image.png';
import whiteDressImg from './images/white_dress.png';
import blackDressImg from './images/black_dress.png';

export const IMAGES = {
  logo: logoImg,
  hero: mainImg,
  product1: whiteDressImg,
  product2: blackDressImg,
};

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
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Running Errands Set",
    price: 420,
    category: "Sets",
    color: "Ivory",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Technical Knit",
    image: IMAGES.product1,
    description: "A refined two-piece set crafted from our signature technical knit. Designed for the woman who moves with intention, from morning errands to afternoon meetings.",
    isNew: true,
  },
  {
    id: "2",
    name: "Running Errands Set",
    price: 580,
    category: "Sets",
    color: "Black",
    sizes: ["XS", "S", "M", "L"],
    material: "Premium Technical Knit",
    image: IMAGES.product2,
    description: "Our bestselling set reimagined in timeless black. The same impeccable fit with an edge of sophistication for evening transitions.",
    isNew: true,
  },
  {
    id: "3",
    name: "La Femme Blazer",
    price: 780,
    category: "Outerwear",
    color: "Taupe",
    sizes: ["XS", "S", "M", "L"],
    material: "Quality Wool Blend",
    image: IMAGES.product1,
    description: "An architectural blazer with feminine proportions. Tailored from high quality wool blend with a subtle drape that flatters every silhouette.",
    isNew: true,
  },
  {
    id: "4",
    name: "Silk Camisole",
    price: 290,
    category: "Tops",
    color: "Champagne",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Silk",
    image: IMAGES.product2,
    description: "Liquid silk that skims the body with effortless grace. Beautiful seam finishing and adjustable straps for a custom fit.",
  },
  {
    id: "5",
    name: "High-Waist Trouser",
    price: 520,
    category: "Bottoms",
    color: "Espresso",
    sizes: ["XS", "S", "M", "L"],
    material: "Cotton Twill",
    image: IMAGES.product1,
    description: "A monument to modern tailoring. These high-waisted trousers are cut with a wide leg that elongates the frame.",
  },
  {
    id: "6",
    name: "Classic Wrap Dress",
    price: 680,
    category: "Dresses",
    color: "Dusty Rose",
    sizes: ["S", "M", "L"],
    material: "Crepe",
    image: IMAGES.product2,
    description: "Our new wrap dress in a romantic dusty rose. The crepe fabric drapes beautifully, creating a fluid silhouette.",
    isNew: true,
  },
  {
    id: "7",
    name: "Cozy Knit Cardigan",
    price: 890,
    category: "Outerwear",
    color: "Oat",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Premium Knit",
    image: IMAGES.product1,
    description: "Pure soft knit, crafted with care. A cozy piece designed to be your everyday go-to.",
  },
  {
    id: "8",
    name: "Pleated Midi Skirt",
    price: 460,
    category: "Bottoms",
    color: "Stone",
    sizes: ["XS", "S", "M", "L"],
    material: "Premium Crepe",
    image: IMAGES.product2,
    description: "Micro-pleating creates mesmerizing movement. Cut for a structured yet fluid aesthetic.",
    isNew: true,
  },
];

export const CATEGORIES = ["All", "Sets", "Tops", "Bottoms", "Dresses", "Outerwear"];
export const COLORS = ["All", "Ivory", "Black", "Taupe", "Champagne", "Espresso", "Dusty Rose", "Oat", "Stone"];
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
