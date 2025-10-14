export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      food_items: {
        Row: {
          created_at: string
          expiration_date: string
          id: string
          name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expiration_date: string
          id?: string
          name: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expiration_date?: string
          id?: string
          name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          allergies: string[] | null
          avatar_url: string | null
          created_at: string
          dietary_restrictions: string[] | null
          email: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          allergies?: string[] | null
          avatar_url?: string | null
          created_at?: string
          dietary_restrictions?: string[] | null
          email?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          allergies?: string[] | null
          avatar_url?: string | null
          created_at?: string
          dietary_restrictions?: string[] | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      recipes: {
        Row: {
          calories: number | null
          carbs_grams: number | null
          cook_time_minutes: number | null
          created_at: string
          cuisine_type: string | null
          description: string | null
          difficulty: string | null
          fat_grams: number | null
          fiber_grams: number | null
          id: string
          ingredients: string[]
          instructions: string[]
          meal_type: string | null
          name: string
          prep_time_minutes: number | null
          protein_grams: number | null
          servings: number | null
          sodium_mg: number | null
          sugar_grams: number | null
          updated_at: string
        }
        Insert: {
          calories?: number | null
          carbs_grams?: number | null
          cook_time_minutes?: number | null
          created_at?: string
          cuisine_type?: string | null
          description?: string | null
          difficulty?: string | null
          fat_grams?: number | null
          fiber_grams?: number | null
          id?: string
          ingredients: string[]
          instructions: string[]
          meal_type?: string | null
          name: string
          prep_time_minutes?: number | null
          protein_grams?: number | null
          servings?: number | null
          sodium_mg?: number | null
          sugar_grams?: number | null
          updated_at?: string
        }
        Update: {
          calories?: number | null
          carbs_grams?: number | null
          cook_time_minutes?: number | null
          created_at?: string
          cuisine_type?: string | null
          description?: string | null
          difficulty?: string | null
          fat_grams?: number | null
          fiber_grams?: number | null
          id?: string
          ingredients?: string[]
          instructions?: string[]
          meal_type?: string | null
          name?: string
          prep_time_minutes?: number | null
          protein_grams?: number | null
          servings?: number | null
          sodium_mg?: number | null
          sugar_grams?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_recipes_by_ingredients: {
        Args: { user_ingredients: string[] }
        Returns: {
          match_percentage: number
          matching_ingredients: string[]
          missing_ingredients: string[]
          recipe_description: string
          recipe_id: string
          recipe_name: string
        }[]
      }
      get_users_for_daily_reminder: {
        Args: Record<PropertyKey, never>
        Returns: {
          expired_count: number
          expiring_count: number
          phone_number: string
          user_id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
