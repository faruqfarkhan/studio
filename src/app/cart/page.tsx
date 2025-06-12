
'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { CartProduct } from '@/lib/cart-utils';
import { getCartFromLocalStorage, removeFromCart, updateCartQuantity, clearCart } from '@/lib/cart-utils';
import { useToast } from '@/hooks/use-toast';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadCartItems = () => {
      setCartItems(getCartFromLocalStorage());
    };

    loadCartItems(); // Initial load

    // Listen for custom event when cart is updated elsewhere
    window.addEventListener('cartUpdated', loadCartItems);

    return () => {
      window.removeEventListener('cartUpdated', loadCartItems);
    };
  }, []);

  const handleRemoveItem = (id: string) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    removeFromCart(id);
    // Optimistically update UI, or rely on 'cartUpdated' event.
    // For immediate feedback, direct state update is good.
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    if (itemToRemove) {
      toast({
        title: "Item removed",
        description: `${itemToRemove.name} has been removed from your cart.`,
      });
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      toast({
        title: "Minimum quantity",
        description: "Quantity cannot be less than 1. Remove item instead.",
        variant: "destructive"
      });
      return;
    }
    updateCartQuantity(id, quantity);
    setCartItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0)
    );
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to your cart before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }

    // Simulate checkout process
    clearCart();
    setCartItems([]); // Immediately clear items from state for UI update
    toast({
      title: "Checkout Initiated!",
      description: "Your order has been (simulated) placed and your cart has been cleared.",
    });
    // In a real app, you would redirect to a checkout page or handle payment here.
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 10; // Example shipping logic
  const total = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-headline font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-headline font-bold mb-8 text-center">Your Shopping Cart</h1>
      
      <div className="space-y-4 mb-8">
        {cartItems.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={handleRemoveItem}
            onQuantityChange={handleQuantityChange} 
          />
        ))}
      </div>

      <div className="bg-card p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-headline font-semibold mb-6">Order Summary</h2>
        <div className="space-y-3 text-md">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Button size="lg" className="w-full mt-8" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
