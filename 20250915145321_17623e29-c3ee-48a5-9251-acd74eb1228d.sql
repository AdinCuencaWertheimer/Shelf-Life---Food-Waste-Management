-- Add nutritional information columns to recipes table
ALTER TABLE public.recipes 
ADD COLUMN protein_grams INTEGER,
ADD COLUMN carbs_grams INTEGER,
ADD COLUMN fat_grams INTEGER,
ADD COLUMN calories INTEGER,
ADD COLUMN fiber_grams INTEGER,
ADD COLUMN sugar_grams INTEGER,
ADD COLUMN sodium_mg INTEGER;

-- Update existing recipes with nutritional information
UPDATE public.recipes SET 
  protein_grams = 25, carbs_grams = 15, fat_grams = 8, calories = 220, fiber_grams = 4, sugar_grams = 8, sodium_mg = 800
WHERE name = 'Chicken Stir Fry';

UPDATE public.recipes SET 
  protein_grams = 30, carbs_grams = 8, fat_grams = 12, calories = 250, fiber_grams = 2, sugar_grams = 3, sodium_mg = 600
WHERE name = 'Chicken Caesar Salad';

UPDATE public.recipes SET 
  protein_grams = 20, carbs_grams = 25, fat_grams = 6, calories = 220, fiber_grams = 3, sugar_grams = 4, sodium_mg = 900
WHERE name = 'Chicken Soup';

UPDATE public.recipes SET 
  protein_grams = 12, carbs_grams = 2, fat_grams = 14, calories = 180, fiber_grams = 0, sugar_grams = 2, sodium_mg = 300
WHERE name = 'Scrambled Eggs';

UPDATE public.recipes SET 
  protein_grams = 15, carbs_grams = 8, fat_grams = 18, calories = 260, fiber_grams = 3, sugar_grams = 5, sodium_mg = 400
WHERE name = 'Vegetable Omelet';

UPDATE public.recipes SET 
  protein_grams = 14, carbs_grams = 45, fat_grams = 10, calories = 320, fiber_grams = 2, sugar_grams = 3, sodium_mg = 700
WHERE name = 'Egg Fried Rice';

UPDATE public.recipes SET 
  protein_grams = 22, carbs_grams = 12, fat_grams = 15, calories = 260, fiber_grams = 4, sugar_grams = 6, sodium_mg = 600
WHERE name = 'Beef Tacos';

UPDATE public.recipes SET 
  protein_grams = 28, carbs_grams = 18, fat_grams = 12, calories = 280, fiber_grams = 5, sugar_grams = 8, sodium_mg = 700
WHERE name = 'Beef Stir Fry';

UPDATE public.recipes SET 
  protein_grams = 35, carbs_grams = 2, fat_grams = 18, calories = 320, fiber_grams = 0, sugar_grams = 1, sodium_mg = 400
WHERE name = 'Baked Salmon';

UPDATE public.recipes SET 
  protein_grams = 25, carbs_grams = 30, fat_grams = 8, calories = 280, fiber_grams = 6, sugar_grams = 4, sodium_mg = 500
WHERE name = 'Fish Tacos';

UPDATE public.recipes SET 
  protein_grams = 18, carbs_grams = 65, fat_grams = 20, calories = 480, fiber_grams = 3, sugar_grams = 2, sodium_mg = 800
WHERE name = 'Spaghetti Carbonara';

UPDATE public.recipes SET 
  protein_grams = 32, carbs_grams = 55, fat_grams = 25, calories = 520, fiber_grams = 2, sugar_grams = 3, sodium_mg = 900
WHERE name = 'Chicken Alfredo';

UPDATE public.recipes SET 
  protein_grams = 12, carbs_grams = 58, fat_grams = 8, calories = 340, fiber_grams = 3, sugar_grams = 4, sodium_mg = 600
WHERE name = 'Fried Rice';

UPDATE public.recipes SET 
  protein_grams = 8, carbs_grams = 62, fat_grams = 6, calories = 320, fiber_grams = 4, sugar_grams = 8, sodium_mg = 750
WHERE name = 'Spanish Rice';

UPDATE public.recipes SET 
  protein_grams = 6, carbs_grams = 20, fat_grams = 8, calories = 160, fiber_grams = 8, sugar_grams = 12, sodium_mg = 400
WHERE name = 'Vegetable Stir Fry';

UPDATE public.recipes SET 
  protein_grams = 4, carbs_grams = 25, fat_grams = 10, calories = 180, fiber_grams = 6, sugar_grams = 15, sodium_mg = 200
WHERE name = 'Roasted Vegetables';