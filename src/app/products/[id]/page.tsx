
'use client'; 

import type React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductById, type Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { notFound } from "next/navigation";
import { addToCart } from '@/lib/cart-utils';


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
      // If product not found on initial sync fetch, call notFound.
      // This is okay here because it's before any stateful logic that depends on the product.
    }
  }, [params.id]);
  
  // Moved this check outside useEffect to call notFound() correctly for 'use client'
  // This check runs once when the component first renders.
  if (!product) {
    const initialProductCheck = getProductById(params.id);
    if (!initialProductCheck) {
      notFound(); 
    }
    // If product is still null but initialProductCheck found it,
    // it means useEffect will set it soon. Show loading.
    // If initialProductCheck didn't find it, notFound() is called.
    // This structure handles the case where product might be found after an initial null state.
    if (!initialProductCheck && !product) { // Redundant check, but safe.
         return <p className="text-center text-lg text-muted-foreground py-12">Loading product details...</p>;
    }
  }


  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };
  
  const handleWishlist = () => {
    if (product) {
      toast({
        title: "Added to wishlist!",
        description: `${product.name} has been added to your wishlist.`,
        variant: "default", 
      });
    }
  };

  const currentImageIndex = product?.images?.indexOf(selectedImage || product.imageUrl) ?? 0;

  const nextImage = () => {
    if (product && product.images && product.images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % product.images.length;
      setSelectedImage(product.images[nextIndex]);
    }
  };

  const prevImage = () => {
     if (product && product.images && product.images.length > 1) {
      const prevIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
      setSelectedImage(product.images[prevIndex]);
    }
  };
  
  // Determine data-ai-hint
  let aiHint = product?.category.toLowerCase() || "product";
  if (product?.category === 'Apparel' || product?.category === 'Footwear') {
    aiHint = "fashion model";
  } else if (product?.category === 'Accessories') {
    aiHint = "lifestyle accessory";
  } else if (product?.category === 'Electronics') {
    aiHint = "tech gadget";
  }

  // This is a fallback for when the component first renders and product might be null
  // The main notFound() call is now at the top level of the component function body
  if (!product) {
     // This will show loading until useEffect sets the product or notFound() is triggered
     return <p className="text-center text-lg text-muted-foreground py-12">Loading product details...</p>;
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
