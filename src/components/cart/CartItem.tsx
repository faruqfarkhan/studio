
import Image from 'next/image';
import type { CartProduct } from '@/lib/cart-utils'; // Updated to use CartProduct
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
// useToast is not directly used here for remove, as CartPage handles it
import type React from 'react';

interface CartItemProps {
  item: CartProduct; // Updated to use CartProduct
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onQuantityChange }) => {
  // Toast notifications are now handled in CartPage for consistency
  const handleRemove = () => {
    onRemove(item.id);
  };

  const handleQuantityIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleQuantityDecrement = () => {
    // onQuantityChange in CartPage will handle logic for quantity < 1
    onQuantityChange(item.id, item.quantity - 1);
  };
  
  let aiHint = item.category.toLowerCase();
  if (item.category === 'Apparel' || item.category === 'Footwear') {
    aiHint = "fashion item";
  } else if (item.category === 'Accessories') {
    aiHint = "product accessory";
  } else if (item.category === 'Electronics') {
    aiHint = "electronic device";
  }


  return (
    <div className="flex items-center space-x-4 p-4 border-b bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden">
        <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" data-ai-hint={aiHint} />
      </div>
      <div className="flex-grow space-y-1">
        <h3 className="text-md sm:text-lg font-headline font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">Category: {item.category}</p>
        <p className="text-md font-semibold text-primary">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleQuantityDecrement} aria-label="Decrease quantity" disabled={item.quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <Input 
            type="number" 
            value={item.quantity} 
            readOnly 
            className="w-12 text-center h-10"
            aria-label="Current quantity"
          />
          <Button variant="outline" size="icon" onClick={handleQuantityIncrement} aria-label="Increase quantity">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRemove} className="text-destructive hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4 mr-1" /> Remove
        </Button>
      </div>
      <div className="text-md sm:text-lg font-semibold w-20 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};
