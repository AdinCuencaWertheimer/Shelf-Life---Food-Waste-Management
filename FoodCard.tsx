import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Trash2, Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FoodItem } from '@/types/food';
import { cn } from '@/lib/utils';
import greenFoodPattern from '@/assets/green-food-pattern.png';
import { EditFoodModal } from './EditFoodModal';

interface FoodCardProps {
  item: FoodItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, updates: { name?: string; expiration_date?: string }) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onRemove, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const statusColors = {
    fresh: 'status-fresh',
    expiring: 'status-expiring',
    expired: 'status-expired'
  };

  return (
    <Card 
      className="overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] relative group"
      style={{
        backgroundImage: `url(${greenFoodPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-card/95 via-card/90 to-secondary/95 backdrop-blur-sm group-hover:from-card/98 group-hover:via-card/95 group-hover:to-secondary/98 transition-all duration-300"></div>
      <CardContent className="p-4 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                {(() => {
                  const now = new Date()
                  const expDate = new Date(item.expiration_date)
                  const diffTime = expDate.getTime() - now.getTime()
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                  
                  if (diffDays < 0) return `expired ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`
                  if (diffDays === 0) return 'expires today'
                  if (diffDays === 1) return 'expires in 1 day'
                  return `expires in ${diffDays} days`
                })()}
              </p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditModalOpen(true)}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-8 w-8 transition-colors"
            >
              <Edit size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 transition-colors"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              statusColors[item.status]
            )}
          >
            {item.status}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {format(new Date(item.expiration_date), 'MMM dd, yyyy')}
          </span>
        </div>
      </CardContent>
      
      <EditFoodModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={item}
        onUpdate={onUpdate}
      />
    </Card>
  );
};