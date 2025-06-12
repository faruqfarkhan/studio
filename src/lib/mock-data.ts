export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  featured?: boolean;
  images?: string[];
  rating?: number;
  reviews?: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Playful Polka Dot Dress',
    description: 'A fun and flirty polka dot dress, perfect for sunny days. Made with lightweight, breathable cotton.',
    price: 49.99,
    category: 'Apparel',
    imageUrl: 'https://placehold.co/600x800.png',
    featured: true,
    images: ['https://placehold.co/600x800.png', 'https://placehold.co/600x800.png?a=1', 'https://placehold.co/600x800.png?a=2'],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: '2',
    name: 'Vibrant Striped Tee',
    description: 'Brighten up your wardrobe with this vibrant striped t-shirt. Soft and comfortable for everyday wear.',
    price: 24.99,
    category: 'Apparel',
    imageUrl: 'https://placehold.co/600x800.png?p=2',
    images: ['https://placehold.co/600x800.png?p=2', 'https://placehold.co/600x800.png?p=2&a=1'],
    rating: 4.2,
    reviews: 85,
  },
  {
    id: '3',
    name: 'Aqua Adventure Backpack',
    description: 'A durable and stylish backpack in a cool aqua color. Plenty of space for all your essentials.',
    price: 79.99,
    category: 'Accessories',
    imageUrl: 'https://placehold.co/600x800.png?p=3',
    featured: true,
    images: ['https://placehold.co/600x800.png?p=3', 'https://placehold.co/600x800.png?p=3&a=1'],
    rating: 4.8,
    reviews: 210,
  },
  {
    id: '4',
    name: 'Coral Comfort Sneakers',
    description: 'Step out in style and comfort with these bright coral sneakers. Perfect for active days.',
    price: 89.99,
    category: 'Footwear',
    imageUrl: 'https://placehold.co/600x800.png?p=4',
    rating: 4.6,
    reviews: 150,
  },
  {
    id: '5',
    name: 'Sunshine Yellow Scarf',
    description: 'Add a pop of color to any outfit with this soft, sunshine yellow scarf. Lightweight and versatile.',
    price: 19.99,
    category: 'Accessories',
    imageUrl: 'https://placehold.co/600x800.png?p=5',
    featured: true,
    images: ['https://placehold.co/600x800.png?p=5'],
    rating: 4.3,
    reviews: 65,
  },
  {
    id: '6',
    name: 'Turquoise Tech Watch',
    description: 'Stay connected with this sleek smartwatch featuring a vibrant turquoise band. Tracks fitness and notifications.',
    price: 129.99,
    category: 'Electronics',
    imageUrl: 'https://placehold.co/600x800.png?p=6',
    rating: 4.7,
    reviews: 95,
  },
   {
    id: '7',
    name: 'Bohemian Print Maxi Skirt',
    description: 'Flowy and comfortable maxi skirt with a unique bohemian print. Perfect for festivals or casual outings.',
    price: 55.00,
    category: 'Apparel',
    imageUrl: 'https://placehold.co/600x800.png?p=7',
    images: ['https://placehold.co/600x800.png?p=7', 'https://placehold.co/600x800.png?p=7&a=1'],
    rating: 4.4,
    reviews: 77,
  },
  {
    id: '8',
    name: 'Minimalist Leather Wallet',
    description: 'A sleek and minimalist wallet crafted from genuine leather, available in coral or turquoise.',
    price: 39.99,
    category: 'Accessories',
    imageUrl: 'https://placehold.co/600x400.png?p=8',
    rating: 4.9,
    reviews: 130,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
