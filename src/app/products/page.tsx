
'use client';

import type React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { products as allProducts, type Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ListFilter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const uniqueCategories = ["All Categories", ...Array.from(new Set(allProducts.map(p => p.category)))];

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  minPriceInput: string;
  onMinPriceChange: (value: string) => void;
  maxPriceInput: string;
  onMaxPriceChange: (value: string) => void;
  onApplyPriceFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minPriceInput,
  onMinPriceChange,
  maxPriceInput,
  onMaxPriceChange,
  onApplyPriceFilters,
}) => (
  <div className="space-y-6 p-4 rounded-lg shadow bg-card">
    <h3 className="text-xl font-headline font-semibold mb-4">Filters</h3>
    
    <div>
      <label htmlFor="category-select" className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger id="category-select" className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(category => (
            <SelectItem key={category} value={category}>{category}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div>
      <label htmlFor="price-range" className="block text-sm font-medium text-muted-foreground mb-1">Price Range</label>
      <div className="flex space-x-2">
        <Input 
          type="number" 
          placeholder="Min" 
          className="w-1/2" 
          value={minPriceInput}
          onChange={(e) => onMinPriceChange(e.target.value)}
        />
        <Input 
          type="number" 
          placeholder="Max" 
          className="w-1/2" 
          value={maxPriceInput}
          onChange={(e) => onMaxPriceChange(e.target.value)}
        />
      </div>
    </div>
    
    <Button className="w-full" onClick={onApplyPriceFilters}>Apply Price Filters</Button>
  </div>
);

export default function ProductsPage() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [minPriceInput, setMinPriceInput] = useState<string>("");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | null>(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("relevance");

  useEffect(() => {
    let products = [...allProducts];

    // Filter by category
    if (selectedCategory !== "All Categories") {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Filter by price
    if (appliedMinPrice !== null) {
      products = products.filter(p => p.price >= appliedMinPrice);
    }
    if (appliedMaxPrice !== null) {
      products = products.filter(p => p.price <= appliedMaxPrice);
    }

    // Sort products
    if (sortOption === "price-asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      // For now, newest is same as relevance due to lack of timestamp in mock data
      // products.sort((a, b) => (b.dateAdded || 0) - (a.dateAdded || 0));
    }
    // 'relevance' uses the default order from allProducts or after category/price filtering

    setDisplayedProducts(products);
  }, [selectedCategory, appliedMinPrice, appliedMaxPrice, sortOption]);

  const handleApplyPriceFilters = () => {
    const min = parseFloat(minPriceInput);
    const max = parseFloat(maxPriceInput);
    setAppliedMinPrice(isNaN(min) || min < 0 ? null : min);
    setAppliedMaxPrice(isNaN(max) || max < 0 ? null : max);
  };

  const productFiltersProps = {
    categories: uniqueCategories,
    selectedCategory,
    onCategoryChange: setSelectedCategory,
    minPriceInput,
    onMinPriceChange: setMinPriceInput,
    maxPriceInput,
    onMaxPriceChange: setMaxPriceInput,
    onApplyPriceFilters: handleApplyPriceFilters,
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Desktop Filters */}
      <aside className="hidden md:block md:w-1/4 lg:w-1/5">
        <ProductFilters {...productFiltersProps} />
      </aside>

      {/* Mobile Filters */}
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <ListFilter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-card p-0 overflow-y-auto">
             <ProductFilters {...productFiltersProps} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-headline font-bold">Our Products</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">No products found matching your criteria.</p>
        )}
        
        {/* Pagination Placeholder */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mr-2" disabled>Previous</Button>
          <Button disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
