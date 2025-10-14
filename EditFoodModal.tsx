import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FoodItem } from '@/types/food';

interface EditFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: FoodItem;
  onUpdate: (id: string, updates: { name?: string; expiration_date?: string }) => void;
}

export const EditFoodModal = ({ isOpen, onClose, item, onUpdate }: EditFoodModalProps) => {
  const [name, setName] = useState(item.name);
  const [expirationDate, setExpirationDate] = useState(item.expiration_date);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      await onUpdate(item.id, {
        name: name.trim(),
        expiration_date: expirationDate
      });
      onClose();
    } catch (error) {
      console.error('Error updating food item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName(item.name);
    setExpirationDate(item.expiration_date);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Food Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Food Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter food name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiration">Expiration Date</Label>
            <Input
              id="expiration"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};