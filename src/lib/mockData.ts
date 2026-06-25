import { ProductCardProps } from "@/components/product/ProductCard";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const mockCategories: Category[] = [
  { id: "c1", name: "Fashion", slug: "fashion" },
  { id: "c2", name: "Electronics", slug: "electronics" },
  { id: "c3", name: "Home Appliances", slug: "appliances" },
  { id: "c4", name: "Cosmetics", slug: "cosmetics" },
  { id: "c5", name: "Grocery", slug: "grocery" },
];

export const mockFlashSales: ProductCardProps[] = [
  {
    id: "f1",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry leading noise canceling headphones",
    imageUrl: "/images/mock/electronics_gadget_1782386491755.png",
    price: 350000,
    discountedPrice: 299000,
    rating: 4.8,
    reviewCount: 1245,
    saleEndTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), // 5 hours from now
    showDealLabel: true,
  },
  {
    id: "f2",
    name: "Nike Air Max 270 React",
    description: "Premium comfort running shoes",
    imageUrl: "/images/mock/fashion_sneakers_1782386513542.png",
    price: 120000,
    discountedPrice: 85000,
    rating: 4.5,
    reviewCount: 890,
    saleEndTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    showDealLabel: true,
  },
  {
    id: "f3",
    name: "Dyson Pure Cool Air Purifier",
    description: "Advanced HEPA filtration for your home",
    imageUrl: "/images/mock/home_appliance_1782386534658.png",
    price: 450000,
    discountedPrice: 380000,
    rating: 4.9,
    reviewCount: 450,
    saleEndTime: new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(),
    showDealLabel: true,
  },
  {
    id: "f4",
    name: "Apple iPad Pro 11-inch",
    description: "M2 Chip, 128GB, Liquid Retina Display",
    imageUrl: "/images/mock/electronics_gadget_1782386491755.png",
    price: 850000,
    discountedPrice: 780000,
    rating: 4.9,
    reviewCount: 3200,
    saleEndTime: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    showDealLabel: true,
  },
];

export const mockTrending: ProductCardProps[] = [
  {
    id: "t1",
    name: "Adidas Ultraboost 22",
    imageUrl: "/images/mock/fashion_sneakers_1782386513542.png",
    price: 95000,
    rating: 4.6,
    reviewCount: 620,
  },
  {
    id: "t2",
    name: "Samsung Galaxy Watch 6",
    imageUrl: "/images/mock/electronics_gadget_1782386491755.png",
    price: 250000,
    discountedPrice: 220000,
    rating: 4.7,
    reviewCount: 1050,
  },
  {
    id: "t3",
    name: "Philips Essential Airfryer",
    imageUrl: "/images/mock/home_appliance_1782386534658.png",
    price: 85000,
    rating: 4.5,
    reviewCount: 430,
  },
];

export const mockGadgets: ProductCardProps[] = [
  {
    id: "g1",
    name: "Wireless Over-Ear Headphones",
    imageUrl: "/images/mock/electronics_gadget_1782386491755.png",
    price: 150000,
    discountedPrice: 120000,
    rating: 4.4,
    reviewCount: 320,
  },
  {
    id: "g2",
    name: "Smart Watch Pro",
    imageUrl: "/images/mock/electronics_gadget_1782386491755.png",
    price: 85000,
    rating: 4.2,
    reviewCount: 150,
  },
  {
    id: "g3",
    name: "Bluetooth Speaker 360",
    imageUrl: "/images/mock/electronics_gadget_1782386491755.png",
    price: 45000,
    discountedPrice: 38000,
    rating: 4.5,
    reviewCount: 890,
  },
  {
    id: "g4",
    name: "Fast Charging Powerbank 20000mAh",
    imageUrl: "/images/mock/electronics_gadget_1782386491755.png",
    price: 25000,
    rating: 4.8,
    reviewCount: 2100,
  },
];

export const mockAppliances: ProductCardProps[] = [
  {
    id: "a1",
    name: "Smart Air Purifier Elite",
    imageUrl: "/images/mock/home_appliance_1782386534658.png",
    price: 180000,
    discountedPrice: 150000,
    rating: 4.7,
    reviewCount: 420,
  },
  {
    id: "a2",
    name: "Robot Vacuum Cleaner",
    imageUrl: "/images/mock/home_appliance_1782386534658.png",
    price: 320000,
    rating: 4.6,
    reviewCount: 180,
  },
  {
    id: "a3",
    name: "High-Speed Blender Pro",
    imageUrl: "/images/mock/home_appliance_1782386534658.png",
    price: 65000,
    discountedPrice: 55000,
    rating: 4.8,
    reviewCount: 650,
  },
  {
    id: "a4",
    name: "Espresso Coffee Maker",
    imageUrl: "/images/mock/home_appliance_1782386534658.png",
    price: 120000,
    rating: 4.5,
    reviewCount: 310,
  },
];

export const mockFashion: ProductCardProps[] = [
  {
    id: "fa1",
    name: "Vibrant Orange Sneakers",
    imageUrl: "/images/mock/fashion_sneakers_1782386513542.png",
    price: 75000,
    discountedPrice: 60000,
    rating: 4.8,
    reviewCount: 850,
  },
  {
    id: "fa2",
    name: "Classic White Trainers",
    imageUrl: "/images/mock/fashion_sneakers_1782386513542.png",
    price: 65000,
    rating: 4.5,
    reviewCount: 420,
  },
  {
    id: "fa3",
    name: "Urban Running Shoes",
    imageUrl: "/images/mock/fashion_sneakers_1782386513542.png",
    price: 85000,
    discountedPrice: 70000,
    rating: 4.7,
    reviewCount: 610,
  },
  {
    id: "fa4",
    name: "Sport Casual Kicks",
    imageUrl: "/images/mock/fashion_sneakers_1782386513542.png",
    price: 55000,
    rating: 4.3,
    reviewCount: 240,
  },
];

export const allMockProducts: ProductCardProps[] = [
  ...mockFlashSales,
  ...mockTrending,
  ...mockGadgets,
  ...mockAppliances,
  ...mockFashion,
];

export const heroBannerImage = "/images/mock/hero_banner_ecommerce_1782386469847.png";
