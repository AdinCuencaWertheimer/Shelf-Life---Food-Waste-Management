import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

export interface Recipe {
  id: string
  name: string
  description: string
  ingredients: string[]
  instructions: string[]
  prep_time_minutes: number
  cook_time_minutes: number
  servings: number
  difficulty: string
  cuisine_type: string
  meal_type: string
  created_at: string
  updated_at: string
  protein_grams: number
  carbs_grams: number
  fat_grams: number
  calories: number
  fiber_grams: number
  sugar_grams: number
  sodium_mg: number
}

export interface RecipeMatch {
  recipe_id: string
  recipe_name: string
  recipe_description: string
  matching_ingredients: string[]
  missing_ingredients: string[]
  match_percentage: number
}

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [recipeMatches, setRecipeMatches] = useState<RecipeMatch[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  // Fetch all recipes
  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('name')

      if (error) throw error
      setRecipes(data || [])
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch recipes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Find recipe matches based on user's food items
  const findRecipeMatches = async (userIngredients: string[]) => {
    if (userIngredients.length === 0) {
      setRecipeMatches([])
      return
    }

    try {
      const { data, error } = await supabase
        .rpc('find_recipes_by_ingredients', {
          user_ingredients: userIngredients
        })

      if (error) throw error
      setRecipeMatches(data || [])
    } catch (error: any) {
      console.error('Error finding recipe matches:', error)
      toast({
        title: "Error",
        description: "Failed to find recipe matches",
        variant: "destructive",
      })
    }
  }

  // Get user's food items and find matches
  const updateRecipeMatches = async () => {
    if (!user) {
      setRecipeMatches([])
      return
    }

    try {
      const { data: foodItems, error } = await supabase
        .from('food_items')
        .select('name')
        .eq('user_id', user.id)

      if (error) throw error

      const ingredients = foodItems?.map(item => item.name.toLowerCase()) || []
      await findRecipeMatches(ingredients)
    } catch (error: any) {
      console.error('Error updating recipe matches:', error)
    }
  }

  // Get recipe by ID
  const getRecipeById = async (id: string): Promise<Recipe | null> => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error: any) {
      console.error('Error fetching recipe:', error)
      return null
    }
  }

  // Filter recipes by criteria
  const filterRecipes = (
    difficulty?: string,
    mealType?: string,
    cuisineType?: string,
    maxPrepTime?: number
  ) => {
    return recipes.filter(recipe => {
      if (difficulty && recipe.difficulty !== difficulty) return false
      if (mealType && recipe.meal_type !== mealType) return false
      if (cuisineType && recipe.cuisine_type !== cuisineType) return false
      if (maxPrepTime && recipe.prep_time_minutes > maxPrepTime) return false
      return true
    })
  }

  // Get recipes that match specific ingredients
  const getRecipesByIngredients = (ingredients: string[]) => {
    return recipes.filter(recipe => 
      ingredients.some(ingredient => 
        recipe.ingredients.some(recipeIngredient => 
          recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      )
    )
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  useEffect(() => {
    updateRecipeMatches()
  }, [user])

  return {
    recipes,
    recipeMatches,
    loading,
    fetchRecipes,
    findRecipeMatches,
    updateRecipeMatches,
    getRecipeById,
    filterRecipes,
    getRecipesByIngredients,
    refetch: fetchRecipes
  }
}