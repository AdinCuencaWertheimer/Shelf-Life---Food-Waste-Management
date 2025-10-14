import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChefHat, Clock, Utensils, Zap, Flame, Heart, Shield } from "lucide-react";

interface Recipe {
  name: string;
  description: string;
  prep_time_minutes?: number;
  cook_time_minutes?: number;
  difficulty?: string;
  protein_grams?: number;
  carbs_grams?: number;
  fat_grams?: number;
  calories?: number;
  fiber_grams?: number;
  sugar_grams?: number;
  sodium_mg?: number;
  instructions?: string[];
  ingredients?: string[];
}

interface RecipeDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: Recipe | null;
  ingredients: Array<{ name: string }>;
}


export const RecipeDetailsModal = ({ open, onOpenChange, recipe, ingredients }: RecipeDetailsModalProps) => {
  if (!recipe) return null;

  // Use nutritional data from the recipe database
  const nutritionalData = {
    calories: recipe.calories || 0,
    protein: recipe.protein_grams || 0,
    carbs: recipe.carbs_grams || 0,
    fat: recipe.fat_grams || 0,
    fiber: recipe.fiber_grams || 0,
    sugar: recipe.sugar_grams || 0,
    sodium: recipe.sodium_mg || 0
  };

  const totalTime = (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto [&>button]:text-foreground [&>button]:hover:text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <div className="p-2 rounded-lg bg-gradient-fresh">
              <ChefHat size={20} className="text-fresh-foreground" />
            </div>
            <span>{recipe.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Recipe Overview */}
          <Card className="border-0 bg-gradient-to-br from-muted/30 to-muted/10">
            <CardContent className="p-3">
              <p className="text-muted-foreground text-sm mb-3">{recipe.description}</p>
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock size={12} className="text-primary" />
                  <span className="font-medium">{totalTime} min</span>
                </div>
                {recipe.difficulty && (
                  <Badge variant="outline" className="text-xs">
                    {recipe.difficulty}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Nutritional Overview */}
          <Card className="border-0 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Zap size={16} className="text-primary" />
                <span>Nutritional Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="flex items-center justify-center mb-1">
                    <Flame size={14} className="text-primary" />
                  </div>
                  <div className="text-xl font-bold text-foreground">{nutritionalData.calories}</div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-fresh/10 to-fresh/5">
                  <div className="flex items-center justify-center mb-1">
                    <Shield size={14} className="text-fresh" />
                  </div>
                  <div className="text-xl font-bold text-foreground">{nutritionalData.protein}g</div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-gradient-to-br from-expiring/10 to-expiring/5">
                  <div className="flex items-center justify-center mb-1">
                    <Heart size={14} className="text-expiring" />
                  </div>
                  <div className="text-xl font-bold text-foreground">{nutritionalData.fiber}g</div>
                  <div className="text-xs text-muted-foreground">Fiber</div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carbs:</span>
                  <span className="font-medium">{nutritionalData.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fat:</span>
                  <span className="font-medium">{nutritionalData.fat}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sugar:</span>
                  <span className="font-medium">{nutritionalData.sugar}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sodium:</span>
                  <span className="font-medium">{nutritionalData.sodium}mg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Instructions */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <Card className="border-0 shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Utensils size={16} className="text-primary" />
                  <span>Basic Instructions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Badge variant="outline" className="min-w-6 h-6 rounded-full text-xs flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {instruction}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};