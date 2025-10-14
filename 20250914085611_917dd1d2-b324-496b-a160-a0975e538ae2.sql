-- Add dietary restrictions column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN dietary_restrictions TEXT[] DEFAULT '{}';

-- Add index for better performance when filtering by dietary restrictions
CREATE INDEX idx_profiles_dietary_restrictions ON public.profiles USING GIN(dietary_restrictions);