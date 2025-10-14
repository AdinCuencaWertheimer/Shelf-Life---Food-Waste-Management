import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasShownWelcome, setHasShownWelcome] = useState(false)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      // Mark that we've handled the initial session
      if (session) {
        setHasShownWelcome(true)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Only show welcome message for actual sign-in events, not session restoration
        if (event === 'SIGNED_IN' && !hasShownWelcome) {
          toast.success("Welcome! Successfully signed in to Shelf Life")
          setHasShownWelcome(true)
        } else if (event === 'SIGNED_OUT') {
          toast.success("Goodbye! Successfully signed out")
          setHasShownWelcome(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [hasShownWelcome])

  const signUp = async (phoneNumber: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        phone: phoneNumber,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      })

      if (error) {
        // Check if user already exists
        if (error.message.includes('User already registered') || 
            error.message.includes('already exists') ||
            error.message.includes('duplicate')) {
          throw new Error('An account already exists with this phone number. Please sign in instead.')
        }
        throw error
      }

      toast.success("Account created!")

      return { data, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  const signIn = async (phoneNumber: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: phoneNumber,
        password,
      })

      if (error) {
        // Check if credentials are invalid (user doesn't exist or wrong password)
        if (error.message.includes('Invalid login credentials') || 
            error.message.includes('invalid_credentials')) {
          throw new Error('No account found with this phone number. Please sign up to create an account.')
        }
        throw error
      }
      return { data, error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) throw error

      toast.success("Profile updated successfully!")

      return { error: null }
    } catch (error: any) {
      toast.error(error.message)
      return { error }
    }
  }

  const clearUserData = async () => {
    try {
      if (!user) throw new Error('No user found')

      // Delete all user's food items but keep the profile
      const { error: foodError } = await supabase
        .from('food_items')
        .delete()
        .eq('user_id', user.id)

      if (foodError) throw foodError

      return { error: null }
    } catch (error: any) {
      return { error }
    }
  }

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    clearUserData,
  }
}