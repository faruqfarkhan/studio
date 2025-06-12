'use client'; // For useState and toast

import type React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductById, type Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {notFound} from "next/navigation";


interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    const fetchedProduct = getProductById(params.id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setSelectedImage(fetchedProduct.imageUrl);
    } else {
       // In a real app, you might want to redirect or show a 404 component
      // For now, to avoid build errors for non-existent dynamic paths:
      // This would ideally be handled by generateStaticParams or server-side checks
    }
  }, [params.id]);

  if (!product) {
    // Check if useEffect has run and product is confirmed not found
    // This is tricky client-side only. For true 404, server-side logic is better.
    // If after a brief moment, product is still null, we can assume not found for client side.
    // A better approach for Next.js App Router is to fetch server-side or use generateStaticParams
    // For now, if the effect ran and product is still null:
    // The user will see "Loading product details..." or a blank page briefly.
    // If getProductById were async, we'd have a loading state.
    // Given it's sync, if params.id is bad, product remains null.
    // A robust solution for 404 is typically done server-side or with generateStaticParams.
    // This page is a client component, so we'll handle it gracefully.
    // For this specific scenario, if `getProductById` returns `undefined` immediately, 
    // we can call `notFound()` from `next/navigation` (requires this to be a Server Component initially or specific setup).
    // Since it's 'use client', `notFound()` needs to be called carefully.
    // Let's make it so if product is not found after initial sync fetch, call notFound.
    // This requires a small restructuring or making this component async if data fetching is async.
    // Given current mock-data structure, if `getProductById(params.id)` is `undefined` immediately,
    // and we want a proper 404, this component should ideally fetch server-side first.
    // Or, we use `generateStaticParams` in a `layout.tsx` or `page.tsx` at `products/[id]` level.
    // Since it's just mock data, we'll simulate.
    // If the component is rendered and product is not found (from mock data), call notFound.
    // This needs to be at the top level of the component:
    // const product = getProductById(params.id);
    // if (!product) { notFound(); }
    // But since we use useState for selectedImage, we need 'use client'.
    // A common pattern is a server component wrapper for data fetching.
    // For simplicity, let's proceed with client-side handling.
    // A true "Not Found" experience requires deeper integration.
    // We'll keep the loading text for now.
    // Or, if product is not found based on initial sync call, we call `notFound()`
    // This can be done before setting up state.
    const initialProductCheck = getProductById(params.id);
    if (!initialProductCheck) {
      notFound(); // This will render the nearest not-found.js or Next.js default 404
    }
    // If it passes, useEffect will set it. This is a bit of a hack due to 'use client' and sync data.
    return <p className="text-center text-lg text-muted-foreground py-12">Loading product details...</p>;
  }


  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleWishlist = () => {
    toast({
      title: "Added to wishlist!",
      description: `${product.name} has been added to your wishlist.`,
      variant: "default", 
    });
  };

  const currentImageIndex = product.images?.indexOf(selectedImage || product.imageUrl) ?? 0;

  const nextImage = () => {
    if (product.images && product.images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % product.images.length;
      setSelectedImage(product.images[nextIndex]);
    }
  };

  const prevImage = () => {
     if (product.images && product.images.length > 1) {
      const prevIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
      setSelectedImage(product.images[prevIndex]);
    }
  };
  
  // Determine data-ai-hint
  let aiHint = product.category.toLowerCase();
  if (product.category === 'Apparel' || product.category === 'Footwear') {
    aiHint = "fashion model";
  } else if (product.category === 'Accessories') {
    aiHint = "lifestyle accessory";
  } else if (product.category === 'Electronics') {
    aiHint = "tech gadget";
  }


  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg bg-card group">
            <Image
              src={selectedImage || product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              priority
              data-ai-hint={aiHint}
            />
             {product.images && product.images.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white" onClick={prevImage} aria-label="Previous image">
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white" onClick={nextImage} aria-label="Next image">
                  <ChevronRight />
                </Button>
              </>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'} hover:border-primary transition-all`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" data-ai-hint={aiHint} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <Badge variant="outline" className="text-sm">{product.category}</Badge>
          <h1 className="text-4xl font-headline font-bold text-foreground">{product.name}</h1>
          
          {product.rating && (
            <div className="flex items-center space-x-1">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <Star key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
              {product.rating % 1 !== 0 && (
                <Star key="half" className="h-5 w-5 text-yellow-400 fill-yellow-200" />
              )}
              {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
                <Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
              ))}
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          )}

          <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          
          <Separator />
          
          <div>
            <h2 className="text-xl font-semibold mb-2 font-headline">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button size="lg" onClick={handleAddToCart} className="flex-1">
              <ShoppingCart size={20} className="mr-2" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={handleWishlist} className="flex-1 border-primary text-primary hover:bg-primary/10 hover:text-primary">
              <Heart size={20} className="mr-2" /> Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
