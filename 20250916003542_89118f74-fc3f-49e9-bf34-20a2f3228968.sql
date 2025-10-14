-- First, let's see what the current function is doing wrong
-- and create an improved version

-- Test the current logic manually
SELECT 
  p.id as user_id,
  p.phone_number,
  COUNT(CASE WHEN fi.expiration_date < CURRENT_DATE THEN 1 END) as expired_count,
  COUNT(CASE WHEN fi.expiration_date = CURRENT_DATE OR fi.expiration_date = CURRENT_DATE + 1 THEN 1 END) as expiring_count,
  COUNT(fi.id) as total_items
FROM public.profiles p
LEFT JOIN public.food_items fi ON p.id = fi.user_id
WHERE p.phone_number IS NOT NULL
GROUP BY p.id, p.phone_number;

-- Drop and recreate the function with better logic
DROP FUNCTION IF EXISTS public.get_users_for_daily_reminder();

-- Create improved function that returns users with phone numbers regardless of whether they have items
CREATE OR REPLACE FUNCTION public.get_users_for_daily_reminder()
RETURNS TABLE(user_id uuid, phone_number text, expired_count bigint, expiring_count bigint)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as user_id,
    p.phone_number,
    COALESCE(COUNT(CASE WHEN fi.expiration_date < CURRENT_DATE THEN 1 END), 0) as expired_count,
    COALESCE(COUNT(CASE WHEN fi.expiration_date BETWEEN CURRENT_DATE AND CURRENT_DATE + 1 THEN 1 END), 0) as expiring_count
  FROM public.profiles p
  LEFT JOIN public.food_items fi ON p.id = fi.user_id
  WHERE p.phone_number IS NOT NULL 
    AND p.phone_number != ''
    AND LENGTH(p.phone_number) >= 10
  GROUP BY p.id, p.phone_number;
END;
$$;