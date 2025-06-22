
'use client';

import type { Product } from '@/lib/mock-data';

export const CART_STORAGE_KEY = 'eCommSimCart';

export interface CartProduct extends Product {
  quantity: number;
}

export const getCartFromLocalStorage = (): CartProduct[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        return JSON.parse(storedCart) as CartProduct[];
      } catch (e) {
        console.error("Error parsing cart from localStorage", e);
        return [];
      }
    }
  }
  return [];
};

export const saveCartToLocalStorage = (cart: CartProduct[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }
};

export const addToCart = (product: Product): void => {
  if (typeof window === 'undefined') return;

  const cart = getCartFromLocalStorage();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    const newCartItem: CartProduct = { 
      ...product, 
      quantity: 1 
    };
    cart.push(newCartItem);
  }
  saveCartToLocalStorage(cart);
  
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'USD',
        value: product.price,
        items: [{
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: 1
        }]
      }
    });
  }
};

export const removeFromCart = (productId: string): void => {
  if (typeof window === 'undefined') return;
  
  let cart = getCartFromLocalStorage();
  const itemToRemove = cart.find(item => item.id === productId);

  if (itemToRemove && typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'remove_from_cart',
      ecommerce: {
        currency: 'USD',
        value: itemToRemove.price * itemToRemove.quantity,
        items: [{
          item_id: itemToRemove.id,
          item_name: itemToRemove.name,
          item_category: itemToRemove.category,
          price: itemToRemove.price,
          quantity: itemToRemove.quantity
        }]
      }
    });
  }
  
  cart = cart.filter(item => item.id !== productId);
  saveCartToLocalStorage(cart);
};

export const updateCartQuantity = (productId: string, quantity: number): void => {
  if (typeof window === 'undefined') return;
  const cart = getCartFromLocalStorage();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex > -1) {
    if (quantity > 0) {
      cart[itemIndex].quantity = quantity;
      saveCartToLocalStorage(cart);
    } else {
      // If quantity is 0 or less, remove the item.
      // This will also fire the remove_from_cart event.
      removeFromCart(productId);
    }
  }
};

export const clearCart = (): void => {
  if (typeof window !== 'undefined') {
    saveCartToLocalStorage([]);
  }
};
