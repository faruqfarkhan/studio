
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/mock-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type React from 'react';
import { addToCart } from '@/lib/cart-utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Determine data-ai-hint based on category or name
  let aiHint = product.category.toLowerCase();
  if (product.category === 'Apparel' || product.category === 'Footwear') {
    aiHint = "fashion model";
  } else if (product.category === 'Accessories') {
    aiHint = "lifestyle accessory";
  } else if (product.category === 'Electronics') {
    aiHint = "tech gadget";
  }


  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block aspect-[3/4] overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={800}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
            data-ai-hint={aiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-headline mb-1 hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">{product.description.substring(0, 60)}...</p>
        {product.rating && (
          <div className="flex items-center mb-2">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ))}
            {product.rating % 1 !== 0 && (
              <Star key="half" className="h-4 w-4 text-yellow-400 fill-yellow-200" /> /* Simplified half star */
            )}
            {[...Array(5 - Math.ceil(product.rating))].map((_, i) => (
              <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        )}
        <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" aria-label={`Add ${product.name} to cart`}>
          <ShoppingCart size={18} className="mr-2" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
