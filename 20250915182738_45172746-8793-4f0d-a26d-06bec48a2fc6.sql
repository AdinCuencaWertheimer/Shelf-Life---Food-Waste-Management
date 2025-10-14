-- Add missing DELETE policy for profiles table to complete RLS protection
-- This ensures users cannot delete other users' profiles, closing a security gap

CREATE POLICY "Users can delete their own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = id);

-- Add a comment for documentation
COMMENT ON POLICY "Users can delete their own profile" ON public.profiles 
IS 'Allows authenticated users to delete only their own profile record. Completes RLS protection for the profiles table.';