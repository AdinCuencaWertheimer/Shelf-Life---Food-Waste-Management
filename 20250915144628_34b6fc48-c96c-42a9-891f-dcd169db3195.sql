-- Fix security warning by setting proper search_path for the function
CREATE OR REPLACE FUNCTION public.find_recipes_by_ingredients(user_ingredients TEXT[])
RETURNS TABLE(
  recipe_id UUID,
  recipe_name TEXT,
  recipe_description TEXT,
  matching_ingredients TEXT[],
  missing_ingredients TEXT[],
  match_percentage NUMERIC
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.name,
    r.description,
    ARRAY(
      SELECT unnest(r.ingredients) 
      INTERSECT 
      SELECT unnest(user_ingredients)
    ) as matching_ingredients,
    ARRAY(
      SELECT unnest(r.ingredients) 
      EXCEPT 
      SELECT unnest(user_ingredients)
    ) as missing_ingredients,
    ROUND(
      (SELECT COUNT(*) FROM unnest(r.ingredients) 
       WHERE unnest IN (SELECT unnest(user_ingredients))) * 100.0 / 
      array_length(r.ingredients, 1), 2
    ) as match_percentage
  FROM public.recipes r
  WHERE EXISTS (
    SELECT 1 FROM unnest(r.ingredients) ingredient
    WHERE ingredient = ANY(user_ingredients)
  )
  ORDER BY match_percentage DESC, array_length(r.ingredients, 1) ASC;
END;
$$;