import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { FoodItem, FoodStatus } from '@/types/food'

const calculateFoodStatus = (expirationDate: string): FoodStatus => {
  const now = new Date()
  const expDate = new Date(expirationDate)
  const diffTime = expDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'expired'
  if (diffDays <= 3) return 'expiring'
  return 'fresh'
}

export const useSupabaseFoodData = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  const fetchFoodItems = async () => {
    if (!user) {
      setFoodItems([])
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('food_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Update statuses based on current date
      const itemsWithStatus = data.map(item => ({
        ...item,
        status: calculateFoodStatus(item.expiration_date) as FoodStatus
      }))

      setFoodItems(itemsWithStatus)
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch food items",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFoodItems()
  }, [user])

  const addFoodItem = async (item: {
    name: string
    expiration_date: string
  }) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be signed in to add food items",
        variant: "destructive",
      })
      return
    }

    try {
      const newItem = {
        ...item,
        user_id: user.id,
        status: calculateFoodStatus(item.expiration_date)
      }

      const { data, error } = await supabase
        .from('food_items')
        .insert([newItem])
        .select()
        .single()

      if (error) throw error

      setFoodItems(prev => [{
        ...data,
        status: data.status as FoodStatus
      }, ...prev])
      
      toast({
        title: "Food item added!",
        description: `${item.name} has been added to your inventory`,
      })

      return { data, error: null }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      return { data: null, error }
    }
  }

  const removeFoodItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('food_items')
        .delete()
        .eq('id', id)

      if (error) throw error

      setFoodItems(prev => prev.filter(item => item.id !== id))
      
      toast({
        title: "Food item removed",
        description: "The item has been removed from your inventory",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove food item",
        variant: "destructive",
      })
    }
  }

  const updateFoodItem = async (id: string, updates: Partial<FoodItem>) => {
    try {
      const updatedData = {
        ...updates,
        status: updates.expiration_date 
          ? calculateFoodStatus(updates.expiration_date)
          : undefined
      }

      const { data, error } = await supabase
        .from('food_items')
        .update(updatedData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setFoodItems(prev => 
        prev.map(item => item.id === id ? {
          ...data,
          status: data.status as FoodStatus
        } : item)
      )

      toast({
        title: "Food item updated",
        description: "The item has been successfully updated",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update food item",
        variant: "destructive",
      })
    }
  }

  const getStats = () => {
    const stats = foodItems.reduce(
      (acc, item) => {
        const currentStatus = calculateFoodStatus(item.expiration_date)
        acc.total++
        acc[currentStatus]++
        return acc
      },
      {
        total: 0,
        fresh: 0,
        expiring: 0,
        expired: 0
      }
    )
    return stats
  }

  const getFilteredItems = (status?: FoodStatus) => {
    return foodItems.filter(item => {
      const currentStatus = calculateFoodStatus(item.expiration_date)
      if (status && currentStatus !== status) return false
      return true
    })
  }

  const getFrequentItems = () => {
    if (!foodItems.length) return [];
    
    // Count frequency of each food name (case insensitive)
    const itemCounts = foodItems.reduce((acc, item) => {
      const normalizedName = item.name.toLowerCase().trim();
      acc[normalizedName] = (acc[normalizedName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get items that appear more than once, sorted by frequency
    const frequentItems = Object.entries(itemCounts)
      .filter(([_, count]) => count > 1)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6) // Top 6 most frequent
      .map(([name, count]) => {
        // Find the most recent item with this name
        const recentItem = foodItems
          .filter(item => item.name.toLowerCase().trim() === name)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
        
        return {
          name: recentItem.name, // Use original casing
          count,
          // Default shelf life
          days: 7
        };
      });

    return frequentItems;
  };

  return {
    foodItems,
    loading,
    addFoodItem,
    removeFoodItem,
    updateFoodItem,
    getStats,
    getFilteredItems,
    getFrequentItems,
    refetch: fetchFoodItems
  }
}