import { useState } from "react";
import { Search, Filter, Apple, HelpCircle, Settings } from "lucide-react";
import { useSupabaseFoodData } from "@/hooks/useSupabaseFoodData";
import { FoodCard } from "@/components/FoodCard";
import { FoodCardSkeleton } from "@/components/FoodCardSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FoodStatus } from "@/types/food";
import { cn } from "@/lib/utils";

export const Foods = () => {
  const { foodItems, removeFoodItem, updateFoodItem, loading } = useSupabaseFoodData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<FoodStatus | 'all'>('all');

  const calculateStatus = (expirationDate: string) => {
    const now = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'expired';
    if (diffDays <= 3) return 'expiring';
    return 'fresh';
  };

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const currentStatus = calculateStatus(item.expiration_date);
    const matchesStatus = selectedStatus === 'all' || currentStatus === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen pb-20 bg-background">
        {/* Top Bar */}
        <div className="p-4 flex justify-between items-center">
          <img 
            src="/shelf-life-logo.png" 
            alt="Shelf Life Logo" 
            className="h-16 w-auto"
          />
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted"
            >
              <HelpCircle size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted"
            >
              <Settings size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Search Skeleton */}
          <div className="relative">
            <div className="animate-pulse h-10 bg-muted rounded-md"></div>
          </div>

          {/* Filter Skeleton */}
          <div className="space-y-4">
            <div className="animate-pulse h-4 bg-muted rounded w-20"></div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse h-8 bg-muted rounded w-16"></div>
              ))}
            </div>
          </div>

          {/* Food Items Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <FoodCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statuses: (FoodStatus | 'all')[] = ['all', 'fresh', 'expiring', 'expired'];

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Top Bar */}
      <div className="p-4 flex justify-between items-center">
        <img 
          src="/shelf-life-logo.png" 
          alt="Shelf Life Logo" 
          className="h-16 w-auto"
        />
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
          >
            <HelpCircle size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-muted"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          
          {/* Status Filter */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "whitespace-nowrap",
                    selectedStatus === status && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {(selectedStatus !== 'all' || searchTerm) && (
          <Button
            variant="outline"
            onClick={() => {
              setSelectedStatus('all');
              setSearchTerm('');
            }}
            className="w-full"
          >
            Clear Filters
          </Button>
        )}

        {/* Food Items */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
               <FoodCard
                 key={item.id}
                 item={item}
                 onRemove={removeFoodItem}
                 onUpdate={updateFoodItem}
               />
            ))
          ) : (
            <div className="text-center py-8">
              <Apple size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedStatus !== 'all'
                  ? "Try adjusting your filters"
                  : "Add some food items to get started"
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};