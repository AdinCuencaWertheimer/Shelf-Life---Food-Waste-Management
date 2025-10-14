-- Add phone number to profiles table and update trigger
ALTER TABLE public.profiles ADD COLUMN phone_number text;

-- Update the trigger function to handle phone numbers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, phone_number)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.phone
  );
  RETURN NEW;
END;
$$;

-- Create function to get users for daily reminders
CREATE OR REPLACE FUNCTION public.get_users_for_daily_reminder()
RETURNS TABLE(user_id uuid, phone_number text, expired_count bigint, expiring_count bigint)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as user_id,
    p.phone_number,
    COUNT(CASE WHEN fi.expiration_date < CURRENT_DATE THEN 1 END) as expired_count,
    COUNT(CASE WHEN fi.expiration_date = CURRENT_DATE OR fi.expiration_date = CURRENT_DATE + 1 THEN 1 END) as expiring_count
  FROM public.profiles p
  LEFT JOIN public.food_items fi ON p.id = fi.user_id
  WHERE p.phone_number IS NOT NULL
  GROUP BY p.id, p.phone_number
  HAVING COUNT(fi.id) > 0;
END;
$$;