export const IMAGES = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWdpKQK-FY4AGoqcKLMfQHvhVcB-wifp_pznznSaQCQw2-ZaTFxmcWqMi8Zjvp4PPtffx0yrfKzSxBXDaScJhUQIO_IZnzgWW92ygBQFhgjwWpuoTBFwbeQyCsKPdP_IC6wZXqLo806EsCifLN11Csk0Wao5vUzGjCk29RlJK0krkQrvi0MS5zhrnY6g9QPkqMZK6twfQBVcN902-XRUec-1bSOnv5PvCiiVpti9cobmIkAOAfbjqWbIYcMcEQxjyq_wMWsTAHEx3G",
  hero: "https://lh3.googleusercontent.com/aida/ADBb0uiox1NxEzufZOuZflFKJACZYgniIBdb6r17WKHXWO3UiwMiFb2ypO8wS2DcRadfSxaS7oi74rV4IBO9vROFMvZwGPtikGa_rGiBhMngp_IBopYAFi4fV-jd9X4cIzwdP_EU-94zM7tZu7rlmkuGFRRgbwtVFe8hH4Jm1xHpmq0zuWSbSORnL-CVIAuPDjfqztpUdSHCaluwiYQhnfxf2OCsuz4Pb8sHECxExReZY8YM5BVMx5sfLfXEbgNRlH4FwhxWOEdB2MIaIv8",
  product1: "https://lh3.googleusercontent.com/aida/ADBb0uiu669mLZhfEVlmOqzpF0y6-uwhvkuwmF09RCzoMIm5JrJWZvhuRCnS5y7LgJL_FaC3HSNd0tudk0g_Ue8NrE2gaJEoM33b8pPCsCkB2aAMSbMf__uGC-gnMbS13NcExx63c6bWcWp2opx5aFmSB_LcULHsYbXv7t_QG5xyCTLoAyZGRtqaSnGVX4z8Yo3RJmkl95VbJREC1yrV5p-bco8yiC5Gzwx9zHK6XydcgCBhys0KaRO9qTxzCMhJ4JGVJchYtq5N22TG1oo",
  product2: "https://lh3.googleusercontent.com/aida/ADBb0uhW8148dKV5XaqNRcm2Gw8V5S9MWLPGQKtOQuuDUsyrzENMXDV3hBuxW82eQKiUl6D1q6aHN_hD5H4oCJK5g-i3nrUz9M7xALgWFDPW9UV4-62qKqjLz-JKYs52W8MgmxpNQTlKvopcX7ME3iX4ePOysdPlt57KGsRAyDy3vOwJhJnUCF8GinXA430go4YXQ_BNk-PFIcO3M8GJLWJyAvDVLzozlD7P2qA7zX4AnhtSRK3Sdi4pnqrAbt1W1-1UAGcMzTYcM-cL4SU",
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
    material: "Italian Wool Blend",
    image: IMAGES.product1,
    description: "An architectural blazer with feminine proportions. Tailored from Italian wool blend with a subtle drape that flatters every silhouette.",
    isNew: true,
  },
  {
    id: "4",
    name: "Silk Camisole",
    price: 290,
    category: "Tops",
    color: "Champagne",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Mulberry Silk",
    image: IMAGES.product2,
    description: "Liquid silk that skims the body with effortless grace. French seam finishing and adjustable straps for a custom fit.",
  },
  {
    id: "5",
    name: "High-Waist Trouser",
    price: 520,
    category: "Bottoms",
    color: "Espresso",
    sizes: ["XS", "S", "M", "L"],
    material: "Organic Cotton Twill",
    image: IMAGES.product1,
    description: "A monument to modern tailoring. These high-waisted trousers are cut from organic cotton twill with a wide leg that elongates the frame.",
  },
  {
    id: "6",
    name: "Atelier Wrap Dress",
    price: 680,
    category: "Dresses",
    color: "Dusty Rose",
    sizes: ["S", "M", "L"],
    material: "Crepe de Chine",
    image: IMAGES.product2,
    description: "Our signature wrap dress in a romantic dusty rose. The crepe de chine drapes beautifully, creating a fluid silhouette.",
    isNew: true,
  },
  {
    id: "7",
    name: "Cashmere Knit Cardigan",
    price: 890,
    category: "Outerwear",
    color: "Oat",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Mongolian Cashmere",
    image: IMAGES.product1,
    description: "Pure Mongolian cashmere, hand-finished in our atelier. An heirloom piece that improves with every wear.",
  },
  {
    id: "8",
    name: "Pleated Midi Skirt",
    price: 460,
    category: "Bottoms",
    color: "Stone",
    sizes: ["XS", "S", "M", "L"],
    material: "Japanese Crepe",
    image: IMAGES.product2,
    description: "Micro-pleating creates mesmerizing movement. Cut from Japanese crepe for a structured yet fluid aesthetic.",
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
