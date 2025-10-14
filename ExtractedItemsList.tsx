import { useState } from "react";
import { Check, X, Edit3, Calendar, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSupabaseFoodData } from "@/hooks/useSupabaseFoodData";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ExtractedItem {
  name: string;
  expiration_date: string;
  category: string;
  estimatedShelfLife: number;
}

interface ExtractedItemsListProps {
  items: ExtractedItem[];
  onClear: () => void;
}

export const ExtractedItemsList = ({ items, onClear }: ExtractedItemsListProps) => {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set(Array.from({ length: items.length }, (_, i) => i)));
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editedItems, setEditedItems] = useState<ExtractedItem[]>(items);
  const [isAdding, setIsAdding] = useState(false);
  
  const { addFoodItem } = useSupabaseFoodData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleItemSelection = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
  };

  const handleEdit = (index: number) => {
    setEditingItem(index);
  };

  const handleSaveEdit = (index: number, newName: string, newDate: string) => {
    const updated = [...editedItems];
    updated[index] = { ...updated[index], name: newName, expiration_date: newDate };
    setEditedItems(updated);
    setEditingItem(null);
  };

  const handleAddItems = async () => {
    setIsAdding(true);
    try {
      const itemsToAdd = Array.from(selectedItems).map(index => editedItems[index]);
      
      // Add all selected items
      for (const item of itemsToAdd) {
        const { error } = await addFoodItem({
          name: item.name,
          expiration_date: item.expiration_date,
        });
        
        if (error) {
          throw error;
        }
      }
      
      toast({
        title: "Items Added Successfully!",
        description: `Added ${itemsToAdd.length} item${itemsToAdd.length !== 1 ? 's' : ''} to your kitchen.`,
      });
      
      // Navigate back to dashboard
      navigate("/");
      
    } catch (error) {
      console.error('Error adding items:', error);
      toast({
        title: "Error Adding Items",
        description: "Some items couldn't be added. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      dairy: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      produce: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      meat: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      frozen: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
      pantry: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      bakery: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  if (items.length === 0) return null;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Package size={20} className="mr-2" />
            Scanned Items ({items.length})
          </div>
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X size={16} />
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Review and edit the items before adding them to your kitchen
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {editedItems.map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border transition-all ${
              selectedItems.has(index) 
                ? 'border-primary bg-primary/5' 
                : 'border-muted bg-muted/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <button
                  onClick={() => toggleItemSelection(index)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedItems.has(index)
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground hover:border-primary'
                  }`}
                >
                  {selectedItems.has(index) && <Check size={12} />}
                </button>
                
                <div className="flex-1">
                  {editingItem === index ? (
                    <EditItemForm
                      item={item}
                      onSave={(name, date) => handleSaveEdit(index, name, date)}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.name}</span>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <Calendar size={12} />
                        <span>Expires: {new Date(item.expiration_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {editingItem !== index && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(index)}
                    className="h-8 w-8"
                  >
                    <Edit3 size={14} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex space-x-3 pt-4">
          <Button
            onClick={handleAddItems}
            disabled={selectedItems.size === 0 || isAdding}
            className="flex-1 bg-gradient-primary hover:opacity-90"
          >
            {isAdding ? (
              "Adding Items..."
            ) : (
              `Add ${selectedItems.size} Selected Item${selectedItems.size !== 1 ? 's' : ''}`
            )}
          </Button>
          <Button variant="outline" onClick={onClear}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface EditItemFormProps {
  item: ExtractedItem;
  onSave: (name: string, date: string) => void;
  onCancel: () => void;
}

const EditItemForm = ({ item, onSave, onCancel }: EditItemFormProps) => {
  const [name, setName] = useState(item.name);
  const [date, setDate] = useState(item.expiration_date);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && date) {
      onSave(name.trim(), date);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Food name"
        className="h-8"
      />
      <div className="flex space-x-2">
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-8 flex-1"
          min={new Date().toISOString().split('T')[0]}
        />
        <Button type="submit" size="sm" className="h-8">
          <Check size={14} />
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onCancel} className="h-8">
          <X size={14} />
        </Button>
      </div>
    </form>
  );
};