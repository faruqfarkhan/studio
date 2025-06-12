import type React from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { products as allProducts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Filter, ListFilter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// This would typically come from API/state
const categories = Array.from(new Set(allProducts.map(p => p.category)));

const ProductFilters = () => (
  <div className="space-y-6 p-4 rounded-lg shadow bg-card">
    <h3 className="text-xl font-headline font-semibold mb-4">Filters</h3>
    
    <div>
      <label htmlFor="category-select" className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
      <Select>
        <SelectTrigger id="category-select" className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(category => (
            <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div>
      <label htmlFor="price-range" className="block text-sm font-medium text-muted-foreground mb-1">Price Range</label>
      {/* Placeholder for price range slider - ShadCN Slider can be used here */}
      <div className="flex space-x-2">
        <Input type="number" placeholder="Min" className="w-1/2" />
        <Input type="number" placeholder="Max" className="w-1/2" />
      </div>
    </div>
    
    <Button className="w-full">Apply Filters</Button>
  </div>
);

export default function ProductsPage() {
  // In a real app, products would be filtered based on state/query params
  const productsToDisplay = allProducts;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Desktop Filters */}
      <aside className="hidden md:block md:w-1/4 lg:w-1/5">
        <ProductFilters />
      </aside>

      {/* Mobile Filters */}
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <ListFilter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-card">
             <ProductFilters />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-headline font-bold">Our Products</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select>
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
        
        {productsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">No products found matching your criteria.</p>
        )}
        
        {/* Pagination Placeholder */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button>Next</Button>
        </div>
      </div>
    </div>
  );
}
