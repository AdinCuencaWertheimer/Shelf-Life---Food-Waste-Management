-- Create recipes table with ingredients and recipe details
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL,
  instructions TEXT[] NOT NULL,
  prep_time_minutes INTEGER,
  cook_time_minutes INTEGER,
  servings INTEGER DEFAULT 4,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'easy',
  cuisine_type TEXT,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack', 'dessert')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to recipes
CREATE POLICY "Recipes are viewable by everyone" 
ON public.recipes 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_recipes_updated_at
BEFORE UPDATE ON public.recipes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert common recipes with their ingredients
INSERT INTO public.recipes (name, description, ingredients, instructions, prep_time_minutes, cook_time_minutes, servings, difficulty, cuisine_type, meal_type) VALUES
-- Chicken recipes
('Chicken Stir Fry', 'Quick and healthy chicken stir fry with vegetables', 
 ARRAY['chicken breast', 'bell peppers', 'onion', 'garlic', 'soy sauce', 'oil'], 
 ARRAY['Cut chicken into strips', 'Heat oil in pan', 'Cook chicken until golden', 'Add vegetables and stir fry', 'Add soy sauce and serve'],
 15, 10, 4, 'easy', 'Asian', 'dinner'),

('Chicken Caesar Salad', 'Classic caesar salad with grilled chicken',
 ARRAY['chicken breast', 'lettuce', 'parmesan cheese', 'croutons', 'caesar dressing'],
 ARRAY['Grill chicken and slice', 'Wash and chop lettuce', 'Combine ingredients', 'Toss with dressing'],
 10, 15, 2, 'easy', 'American', 'lunch'),

('Chicken Soup', 'Comforting homemade chicken soup',
 ARRAY['chicken', 'carrots', 'celery', 'onion', 'chicken broth', 'noodles'],
 ARRAY['Boil chicken in broth', 'Add vegetables', 'Simmer until tender', 'Add noodles and cook until done'],
 20, 45, 6, 'medium', 'American', 'lunch'),

-- Egg recipes
('Scrambled Eggs', 'Fluffy scrambled eggs for breakfast',
 ARRAY['eggs', 'butter', 'milk', 'salt', 'pepper'],
 ARRAY['Beat eggs with milk', 'Heat butter in pan', 'Add eggs and scramble gently', 'Season with salt and pepper'],
 5, 5, 2, 'easy', 'American', 'breakfast'),

('Vegetable Omelet', 'Healthy omelet packed with vegetables',
 ARRAY['eggs', 'bell peppers', 'onion', 'cheese', 'mushrooms', 'oil'],
 ARRAY['Beat eggs', 'Sauté vegetables', 'Pour eggs into pan', 'Add vegetables and cheese', 'Fold omelet'],
 10, 8, 2, 'medium', 'French', 'breakfast'),

('Egg Fried Rice', 'Simple and satisfying fried rice with eggs',
 ARRAY['eggs', 'rice', 'soy sauce', 'green onions', 'oil', 'garlic'],
 ARRAY['Cook rice ahead of time', 'Scramble eggs', 'Fry rice with garlic', 'Add eggs and soy sauce', 'Garnish with green onions'],
 10, 15, 4, 'easy', 'Asian', 'dinner'),

-- Beef recipes
('Beef Tacos', 'Delicious ground beef tacos',
 ARRAY['ground beef', 'taco shells', 'lettuce', 'tomatoes', 'cheese', 'onion'],
 ARRAY['Brown ground beef', 'Season with spices', 'Warm taco shells', 'Assemble tacos with toppings'],
 15, 10, 4, 'easy', 'Mexican', 'dinner'),

('Beef Stir Fry', 'Tender beef strips with vegetables',
 ARRAY['beef', 'broccoli', 'carrots', 'soy sauce', 'garlic', 'ginger'],
 ARRAY['Slice beef thinly', 'Heat oil in wok', 'Cook beef quickly', 'Add vegetables and sauce'],
 20, 10, 4, 'medium', 'Asian', 'dinner'),

-- Fish recipes
('Baked Salmon', 'Healthy baked salmon with herbs',
 ARRAY['salmon', 'lemon', 'herbs', 'olive oil', 'garlic'],
 ARRAY['Preheat oven to 400°F', 'Season salmon', 'Bake for 12-15 minutes', 'Serve with lemon'],
 10, 15, 4, 'easy', 'Mediterranean', 'dinner'),

('Fish Tacos', 'Light and fresh fish tacos',
 ARRAY['white fish', 'tortillas', 'cabbage', 'lime', 'cilantro', 'avocado'],
 ARRAY['Season and cook fish', 'Warm tortillas', 'Assemble with cabbage and avocado', 'Squeeze lime on top'],
 15, 10, 4, 'medium', 'Mexican', 'lunch'),

-- Pasta recipes
('Spaghetti Carbonara', 'Classic Italian pasta dish',
 ARRAY['spaghetti', 'eggs', 'bacon', 'parmesan cheese', 'black pepper'],
 ARRAY['Cook pasta', 'Fry bacon until crispy', 'Beat eggs with cheese', 'Combine hot pasta with egg mixture'],
 10, 15, 4, 'medium', 'Italian', 'dinner'),

('Chicken Alfredo', 'Creamy pasta with chicken',
 ARRAY['pasta', 'chicken breast', 'heavy cream', 'parmesan cheese', 'garlic', 'butter'],
 ARRAY['Cook pasta', 'Sauté chicken', 'Make alfredo sauce', 'Combine all ingredients'],
 15, 20, 4, 'medium', 'Italian', 'dinner'),

-- Rice recipes
('Fried Rice', 'Classic vegetable fried rice',
 ARRAY['rice', 'eggs', 'vegetables', 'soy sauce', 'garlic', 'oil'],
 ARRAY['Use day-old rice', 'Scramble eggs', 'Stir fry vegetables', 'Add rice and seasonings'],
 10, 15, 4, 'easy', 'Asian', 'dinner'),

('Spanish Rice', 'Flavorful tomato-based rice',
 ARRAY['rice', 'tomatoes', 'onion', 'bell peppers', 'chicken broth', 'spices'],
 ARRAY['Sauté vegetables', 'Add rice and toast', 'Add broth and simmer', 'Cook until tender'],
 15, 25, 6, 'medium', 'Spanish', 'dinner'),

-- Vegetable dishes
('Vegetable Stir Fry', 'Colorful mixed vegetable stir fry',
 ARRAY['broccoli', 'carrots', 'bell peppers', 'snap peas', 'soy sauce', 'ginger'],
 ARRAY['Cut vegetables uniformly', 'Heat oil in wok', 'Stir fry vegetables', 'Add sauce and serve'],
 15, 8, 4, 'easy', 'Asian', 'dinner'),

('Roasted Vegetables', 'Simple roasted seasonal vegetables',
 ARRAY['mixed vegetables', 'olive oil', 'herbs', 'salt', 'pepper'],
 ARRAY['Preheat oven', 'Toss vegetables with oil and seasonings', 'Roast until caramelized'],
 10, 30, 4, 'easy', 'Mediterranean', 'dinner');

-- Create function to find recipes by ingredients
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