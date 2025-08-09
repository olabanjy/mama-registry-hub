import { GiftItem } from '@/components/GiftCard';

export const sampleGifts: GiftItem[] = [
  {
    id: 1,
    name: "Newborn Diaper Pack (Size 1)",
    image_url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
    category: "Essentials",
    note: "Fragrance-free, ultra-soft for sensitive skin",
    currency: "NGN",
    price: 15000,
    stores: [
      { label: "Monmartt (NG)", url: "https://www.monmartt.com", region: "NG" },
      { label: "Jumia (NG)", url: "https://www.jumia.com.ng", region: "NG" },
      { label: "Amazon", url: "https://www.amazon.com", region: "INTL" }
    ]
  },
  {
    id: 2,
    name: "Muslin Swaddle Set (3-pack)",
    image_url: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop&crop=center",
    category: "Clothing",
    note: "Breathable organic cotton, perfect for Lagos weather",
    currency: "USD",
    price: 25,
    stores: [
      { label: "Baby Shop Nigeria", url: "https://www.babyshopnigeria.com", region: "NG" },
      { label: "Babylist", url: "https://www.babylist.com", region: "INTL" }
    ]
  },
  {
    id: 3,
    name: "Nursing Pillow",
    image_url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
    category: "Feeding",
    note: "Supportive U-shape design with removable cover",
    currency: "NGN",
    price: 22000,
    stores: [
      { label: "Monmartt (NG)", url: "https://www.monmartt.com", region: "NG" },
      { label: "Mamas & Papas", url: "https://www.mamasandpapas.com", region: "INTL" }
    ]
  },
  {
    id: 4,
    name: "Baby Bath Set",
    image_url: "https://images.unsplash.com/photo-1608089982572-5531dd41f3ff?w=400&h=400&fit=crop&crop=center",
    category: "Bath",
    note: "Gentle shampoo, body wash, and soft towels",
    currency: "NGN",
    price: 8500,
    stores: [
      { label: "Jumia (NG)", url: "https://www.jumia.com.ng", region: "NG" },
      { label: "Konga (NG)", url: "https://www.konga.com", region: "NG" }
    ]
  },
  {
    id: 5,
    name: "Soft Toy Elephant",
    image_url: "https://images.unsplash.com/photo-1585814062503-0b1e39fe5a1d?w=400&h=400&fit=crop&crop=center",
    category: "Fun & Books",
    note: "Plush, cuddly elephant in soft gray",
    currency: "USD",
    price: 18,
    stores: [
      { label: "Target", url: "https://www.target.com", region: "INTL" },
      { label: "Local Toy Store", url: "#", region: "NG" }
    ]
  },
  {
    id: 6,
    name: "Baby Monitor with Video",
    image_url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop&crop=center",
    category: "Nursery",
    note: "HD camera with night vision and two-way audio",
    currency: "NGN",
    price: 45000,
    stores: [
      { label: "Jumia (NG)", url: "https://www.jumia.com.ng", region: "NG" },
      { label: "Best Buy", url: "https://www.bestbuy.com", region: "INTL" }
    ]
  },
  {
    id: 7,
    name: "Stroller for City Adventures",
    image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop&crop=center",
    category: "On-the-Go",
    note: "Lightweight, compact fold, perfect for Lagos traffic",
    currency: "USD",
    price: 120,
    stores: [
      { label: "Baby Shop Nigeria", url: "https://www.babyshopnigeria.com", region: "NG" },
      { label: "Buy Buy Baby", url: "https://www.buybabybaby.com", region: "INTL" }
    ]
  },
  {
    id: 8,
    name: "Bottle Feeding Starter Kit",
    image_url: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop&crop=center",
    category: "Feeding",
    note: "Anti-colic bottles with slow-flow nipples",
    currency: "NGN",
    price: 12000,
    stores: [
      { label: "Monmartt (NG)", url: "https://www.monmartt.com", region: "NG" },
      { label: "Amazon", url: "https://www.amazon.com", region: "INTL" }
    ]
  },
  {
    id: 9,
    name: "Baby Onesies Set (6-pack)",
    image_url: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop&crop=center",
    category: "Clothing",
    note: "100% cotton in neutral colors, sizes 0-3 months",
    currency: "NGN",
    price: 9500,
    stores: [
      { label: "Jumia (NG)", url: "https://www.jumia.com.ng", region: "NG" },
      { label: "H&M", url: "https://www.hm.com", region: "INTL" }
    ]
  },
  {
    id: 10,
    name: "Night Light with Lullabies",
    image_url: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop&crop=center",
    category: "Nursery",
    note: "Soft projection with soothing sounds and timer",
    currency: "USD",
    price: 32,
    stores: [
      { label: "Amazon", url: "https://www.amazon.com", region: "INTL" },
      { label: "Local Electronics", url: "#", region: "NG" }
    ]
  },
  {
    id: 11,
    name: "Baby Carrier Wrap",
    image_url: "https://images.unsplash.com/photo-1576089073624-19cc1e4976ae?w=400&h=400&fit=crop&crop=center",
    category: "On-the-Go",
    note: "Ergonomic wrap for newborns, breathable fabric",
    currency: "NGN",
    price: 18000,
    stores: [
      { label: "Baby Shop Nigeria", url: "https://www.babyshopnigeria.com", region: "NG" },
      { label: "Ergobaby", url: "https://www.ergobaby.com", region: "INTL" }
    ]
  },
  {
    id: 12,
    name: "Board Books Collection",
    image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center",
    category: "Fun & Books",
    note: "Set of 5 durable books perfect for tiny hands",
    currency: "USD",
    price: 22,
    stores: [
      { label: "Barnes & Noble", url: "https://www.barnesandnoble.com", region: "INTL" },
      { label: "Local Bookstore", url: "#", region: "NG" }
    ]
  }
];

// Mock claims data - in real app this would come from Supabase
export const mockClaims = [
  { item_id: 2, claimer_name: "Adunni Ogbechie", claimer_email: "adunni@example.com", created_at: "2024-01-15T10:30:00Z" },
  { item_id: 5, claimer_name: "Chioma Nwosu", claimer_email: "chioma@example.com", created_at: "2024-01-16T14:20:00Z" }
];