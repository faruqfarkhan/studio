import Link from 'next/link';
import { Home, ShoppingBag, ShoppingCart, Mail, Menu } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type React from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Products', icon: ShoppingBag },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export const Header: React.FC = () => {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" aria-label="eCommSim Home">
          <Logo />
        </Link>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="flex items-center space-x-2 text-foreground hover:text-primary">
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-card">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button key={item.label} variant="ghost" asChild className="justify-start">
                    <Link href={item.href} className="flex items-center space-x-3 py-2 text-lg text-foreground hover:text-primary">
                      <item.icon size={24} />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
