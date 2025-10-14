import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";
import { AIGeneratedRecipe } from "@/hooks/useAIRecipes";

interface AIRecipeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: AIGeneratedRecipe | null;
}

export const AIRecipeModal = ({ open, onOpenChange, recipe }: AIRecipeModalProps) => {
  if (!recipe) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-2xl">
            <ChefHat className="h-6 w-6" />
            <span>{recipe.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Recipe Info */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>Prep: {recipe.prep_time_minutes}m | Cook: {recipe.cook_time_minutes}m</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{recipe.servings} servings</span>
            </div>
            <Badge className={getDifficultyColor(recipe.difficulty)}>
              {recipe.difficulty}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{recipe.description}</p>

          {/* Why Suggested */}
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Why this recipe was suggested:</h4>
            <p className="text-sm text-muted-foreground">{recipe.why_suggested}</p>
          </div>

          {/* Using Your Ingredients */}
          <div>
            <h4 className="font-semibold mb-3">Using your expiring ingredients:</h4>
            <div className="flex flex-wrap gap-2">
              {recipe.using_ingredients.map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="bg-fresh/20 text-fresh border-fresh/30">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          {/* All Ingredients */}
          <div>
            <h4 className="font-semibold mb-3">All Ingredients:</h4>
            <ul className="space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  • {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="font-semibold mb-3">Instructions:</h4>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};