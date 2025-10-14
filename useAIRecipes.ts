import { useState, useCallback } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export interface AIGeneratedRecipe {
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
  using_ingredients: string[]
  expiring_ingredients_count?: number
  why_suggested: string
}

interface FoodItem {
  name: string
  expiration_date: string
  status: string
}

export const useAIRecipes = () => {
  const [aiRecipes, setAiRecipes] = useState<AIGeneratedRecipe[]>([])
  const [loading, setLoading] = useState(false)
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null)
  const [currentBatch, setCurrentBatch] = useState(1)
  const { toast } = useToast()

  const generateRecipes = useCallback(async (expiringItems: FoodItem[], userPreferences?: any, isGenerateMore = false) => {
    // Prevent multiple calls and require minimum items
    if (expiringItems.length === 0 || loading || (!isGenerateMore && expiringItems.length < 2)) {
      if (!isGenerateMore && expiringItems.length < 2) {
        toast({
          title: "Not enough items",
          description: "Add at least 2 items to generate recipes.",
          variant: "destructive",
        })
      }
      return
    }

    const batchNumber = isGenerateMore ? currentBatch + 1 : 1

    setLoading(true)
    if (!isGenerateMore) {
      setAiRecipes([]) // Clear previous recipes only for new generation
      setCurrentBatch(1)
    }
    try {
      const { data, error } = await supabase.functions.invoke('generate-recipes', {
        body: {
          expiringItems,
          userPreferences,
          batchNumber
        }
      })

      if (error) {
        throw error
      }

      if (data.success && data.recipes) {
        const newRecipes = data.recipes
        if (isGenerateMore) {
          setAiRecipes(prev => [...prev, ...newRecipes]) // Append new recipes
          setCurrentBatch(batchNumber)
        } else {
          setAiRecipes(newRecipes) // Replace with new recipes
        }
        setLastGenerated(new Date())
        
        const actionText = isGenerateMore ? 'generated' : 'found'
        if (newRecipes.length > 0) {
          toast({
            title: "Recipes Generated!",
            description: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} ${newRecipes.length} ${isGenerateMore ? 'more ' : ''}recipe suggestion${newRecipes.length !== 1 ? 's' : ''}.`,
          })
        }
      } else {
        throw new Error(data.error || 'Failed to generate recipes')
      }
    } catch (error: any) {
      console.error('Error generating AI recipes:', error)
      toast({
        title: "Error",
        description: "Failed to generate recipe suggestions. Please try again.",
        variant: "destructive",
      })
      setAiRecipes(isGenerateMore ? aiRecipes : []) // Keep existing recipes if generating more
    } finally {
      setLoading(false)
    }
  }, [loading, toast, currentBatch, aiRecipes])

  const clearRecipes = () => {
    setAiRecipes([])
    setLastGenerated(null)
    setCurrentBatch(1)
  }

  const generateMoreRecipes = useCallback(async (expiringItems: FoodItem[], userPreferences?: any) => {
    return generateRecipes(expiringItems, userPreferences, true)
  }, [generateRecipes])

  return {
    aiRecipes,
    loading,
    lastGenerated,
    currentBatch,
    generateRecipes,
    generateMoreRecipes,
    clearRecipes
  }
}