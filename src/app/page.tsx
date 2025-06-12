import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { FeaturedProducts } from '@/components/product/FeaturedProducts';
import { getFeaturedProducts } from '@/lib/mock-data';
import type React from 'react';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-8 md:p-16 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Welcome, Faruq Farkhan Iskandar, to eCommSim!</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Discover vibrant styles and playful designs that bring joy to your everyday life.
        </p>
        <div className="relative h-64 md:h-96 w-full max-w-4xl mx-auto mb-8 rounded-lg overflow-hidden shadow-2xl">
           <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Promotional banner showing diverse happy people using colorful products"
            layout="fill"
            objectFit="cover"
            data-ai-hint="fashion lifestyle"
            priority
          />
        </div>
        <Button size="lg" asChild className="bg-background text-primary hover:bg-background/90">
          <Link href="/products">Shop All Products</Link>
        </Button>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts products={featuredProducts} />

      {/* Promotion Section */}
      <section className="bg-card p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 relative h-64 w-full md:h-auto aspect-video rounded-md overflow-hidden">
          <Image 
            src="https://placehold.co/600x400.png" 
            alt="Special offer graphic"
            layout="fill"
            objectFit="cover"
            data-ai-hint="sale promotion"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-headline font-bold text-primary mb-3">Limited Time Offer!</h2>
          <p className="text-muted-foreground mb-5">
            Get 20% off on all summer collection items. Don't miss out on these fantastic deals!
          </p>
          <Button asChild>
            <Link href="/products?category=summer">View Summer Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
