import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, DollarSign } from 'lucide-react';

interface FilterSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  currency: 'NGN' | 'USD';
  onCurrencyChange: (currency: 'NGN' | 'USD') => void;
}

const categories = [
  'All',
  'Essentials',
  'Nursery', 
  'Feeding',
  'Bath',
  'On-the-Go',
  'Clothing',
  'Fun & Books'
];

export const FilterSection = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  currency,
  onCurrencyChange
}: FilterSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search for gifts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 rounded-xl border-celebration-light focus:border-celebration focus:ring-celebration/20 bg-white/80 backdrop-blur-sm"
        />
      </div>

      {/* Category Filters */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer transition-all duration-200 px-3 py-1 rounded-full ${
                selectedCategory === category
                  ? 'bg-gradient-celebration text-white shadow-soft hover:shadow-card'
                  : 'border-celebration-light hover:bg-celebration-light hover:border-celebration'
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Currency Toggle */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Currency</h3>
        <div className="flex gap-2">
          <Button
            variant={currency === 'NGN' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCurrencyChange('NGN')}
            className={`rounded-full ${
              currency === 'NGN'
                ? 'bg-gradient-celebration text-white shadow-soft'
                : 'border-celebration-light hover:bg-celebration-light'
            }`}
          >
            <DollarSign className="w-3 h-3 mr-1" />
            NGN (₦)
          </Button>
          <Button
            variant={currency === 'USD' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCurrencyChange('USD')}
            className={`rounded-full ${
              currency === 'USD'
                ? 'bg-gradient-celebration text-white shadow-soft'
                : 'border-celebration-light hover:bg-celebration-light'
            }`}
          >
            <DollarSign className="w-3 h-3 mr-1" />
            USD ($)
          </Button>
        </div>
      </div>
    </div>
  );
};