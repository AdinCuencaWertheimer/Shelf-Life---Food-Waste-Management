import { useState, useEffect } from "react";
import { ChefHat, Clock, Users, AlertTriangle, Star, Settings, Zap, HelpCircle, Utensils, Sparkles, Heart, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSupabaseFoodData } from "@/hooks/useSupabaseFoodData";
import { useAIRecipes, AIGeneratedRecipe } from "@/hooks/useAIRecipes";
import { useAuth } from '@/hooks/useAuth'
import { AuthModal } from '@/components/AuthModal'
import { WelcomeModal } from '@/components/WelcomeModal'
import { AIRecipeModal } from '@/components/AIRecipeModal'
import { RecipeCardSkeleton } from '@/components/RecipeCardSkeleton';
import { useNavigate } from "react-router-dom";
import darkGreenFoodPattern from "@/assets/dark-green-food-pattern.png";

export const Recipes = () => {
  const { user } = useAuth()
  const { getFilteredItems, foodItems } = useSupabaseFoodData();
  const { aiRecipes, loading, generateRecipes, generateMoreRecipes } = useAIRecipes();
  const allItems = foodItems; // Use all food items instead of just expiring ones
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<AIGeneratedRecipe | null>(null)
  const [showRecipeModal, setShowRecipeModal] = useState(false)

  // Generate AI recipes when food items change
  useEffect(() => {
    if (user && allItems.length > 0 && !loading) {
      // Check if we have meaningful ingredients (not just generic ones)
      const genericIngredients = [
        'milk', 'cream', 'butter', 'oil', 'olive oil', 'salt', 'pepper', 
        'sugar', 'flour', 'water', 'vinegar', 'garlic', 'onion',
        'half-and-half', 'buttermilk', 'margarine', 'honey', 'maple syrup'
      ];
      
      const specificIngredients = allItems.filter(item => 
        !genericIngredients.includes(item.name.toLowerCase().trim())
      );
      
      if (specificIngredients.length >= 1) {
        // Small delay to prevent rapid successive calls
        const timer = setTimeout(() => {
          generateRecipes(allItems);
        }, 300);
        
        return () => clearTimeout(timer);
      }
    }
  }, [user, allItems.length]); // Remove generateRecipes from dependencies to prevent loops

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'status-fresh';
      case 'medium':
        return 'status-expiring';
      case 'hard':
        return 'status-expired';
      default:
        return 'bg-muted';
    }
  };

  const handleViewRecipe = (recipe: AIGeneratedRecipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const handleGenerateMore = () => {
    if (allItems.length > 0) {
      generateMoreRecipes(allItems);
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
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
            onClick={() => setShowWelcomeModal(true)}
            className="hover:bg-muted"
          >
            <HelpCircle size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
            className="hover:bg-muted"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Recipe Suggestions Based on Kitchen Ingredients */}
        {allItems.length > 0 ? (
          <div className="space-y-6">
            {/* Check if we have enough specific ingredients for recipes */}
            {(() => {
              // Generic ingredients that shouldn't trigger recipe suggestions on their own
              const genericIngredients = [
                'milk', 'cream', 'butter', 'oil', 'olive oil', 'salt', 'pepper', 
                'sugar', 'flour', 'water', 'vinegar', 'garlic', 'onion',
                'half-and-half', 'buttermilk', 'margarine', 'honey', 'maple syrup'
              ];
              
              // Check if user has specific ingredients (not just generic ones)
              const specificIngredients = allItems.filter(item => 
                !genericIngredients.includes(item.name.toLowerCase().trim())
              );
              
              const hasEnoughSpecificIngredients = specificIngredients.length >= 1;

              if (hasEnoughSpecificIngredients && (aiRecipes.length > 0 || loading)) {
                return (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-fresh">
                        <Utensils size={20} className="text-fresh-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">Suggested Recipes</h3>
                    </div>
                    
                    {loading ? (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <RecipeCardSkeleton key={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {aiRecipes.slice(0, 6).map((recipe, index) => (
                        <Card 
                          key={`${recipe.name}-${index}`} 
                          className="group overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 bg-gradient-to-br from-card to-card/80 hover:scale-[1.02] animate-scale-in"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="p-1.5 rounded-lg bg-gradient-fresh">
                                  <ChefHat size={16} className="text-fresh-foreground" />
                                </div>
                                <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                  {recipe.name}
                                </CardTitle>
                              </div>
                              <Badge variant="secondary" className={`text-xs ${getDifficultyColor(recipe.difficulty)}`}>
                                {recipe.difficulty}
                              </Badge>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="p-4 space-y-4">
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {recipe.description}
                            </p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-medium text-muted-foreground">Using your ingredients:</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {recipe.using_ingredients.slice(0, 3).map((ingredient, i) => {
                                  // Check if this ingredient is expiring soon (3 days or less)
                                  const matchingItem = allItems.find(item => 
                                    item.name.toLowerCase().includes(ingredient.toLowerCase()) ||
                                    ingredient.toLowerCase().includes(item.name.toLowerCase())
                                  );
                                  const isExpiring = matchingItem ? (() => {
                                    const today = new Date();
                                    const expDate = new Date(matchingItem.expiration_date);
                                    const daysUntilExpiration = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                                    return daysUntilExpiration <= 3;
                                  })() : false;

                                  return (
                                    <Badge 
                                      key={i} 
                                      variant="secondary" 
                                      className={`text-xs ${isExpiring ? 'bg-expiring/20 text-expiring border-expiring/30' : 'bg-fresh/20 text-fresh border-fresh/30'}`}
                                    >
                                      {ingredient}
                                    </Badge>
                                  );
                                })}
                                {recipe.using_ingredients.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{recipe.using_ingredients.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Clock size={12} />
                                  <span>{recipe.prep_time_minutes + recipe.cook_time_minutes}m</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users size={12} />
                                  <span>{recipe.servings}</span>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-primary hover:bg-primary/10"
                                onClick={() => handleViewRecipe(recipe)}
                              >
                                <Sparkles size={14} className="mr-1" />
                                View Recipe
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    )}
                    
                    {!loading && aiRecipes.length > 0 && (
                      <div className="flex justify-center mt-6">
                        <Button 
                          variant="default"
                          onClick={handleGenerateMore}
                          className="flex items-center space-x-2 bg-gradient-primary"
                        >
                          <Plus size={16} />
                          <span>New Ideas</span>
                        </Button>
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <Card className="text-center py-8 border-0 shadow-card bg-gradient-to-br from-card to-muted/20">
                    <CardContent className="space-y-4">
                      <div className="flex justify-center">
                        <div className="p-3 rounded-full bg-gradient-primary/20">
                          <ChefHat size={32} className="text-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground">Add More Ingredients for Recipe Ideas</h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          {specificIngredients.length === 0 
                            ? "Basic ingredients like milk, butter, and spices can be used in many dishes! Add some main ingredients (proteins, vegetables, or grains) to get personalized recipe suggestions."
                            : "Add a few more ingredients to get better recipe matches that make the most of what you have!"
                          }
                        </p>
                      </div>
                      <Button 
                        onClick={() => navigate('/add')} 
                        size="lg"
                        className="bg-gradient-primary hover:shadow-elegant transition-all duration-200 font-semibold px-8"
                      >
                        <Sparkles size={18} className="mr-2" />
                        Add More Ingredients
                      </Button>
                    </CardContent>
                  </Card>
                );
              }
            })()}
          </div>
        ) : (
          <Card className="text-center py-12 border-0 shadow-elegant bg-gradient-to-br from-card to-muted/20">
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-gradient-primary shadow-glow">
                  <ChefHat size={48} className="text-primary-foreground" />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">Ready to Cook Something Amazing?</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Add some foods to your kitchen and I'll suggest personalized recipes to help you create delicious meals
                </p>
              </div>
              <Button 
                onClick={() => navigate('/add')} 
                size="lg"
                className="bg-gradient-primary hover:shadow-elegant transition-all duration-200 font-semibold px-8"
              >
                <Sparkles size={18} className="mr-2" />
                Add Foods
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
      
      <WelcomeModal
        open={showWelcomeModal}
        onOpenChange={setShowWelcomeModal}
        onSignUpClick={() => setShowAuthModal(true)}
      />

      <AIRecipeModal
        open={showRecipeModal}
        onOpenChange={setShowRecipeModal}
        recipe={selectedRecipe}
      />
    </div>
  );
};