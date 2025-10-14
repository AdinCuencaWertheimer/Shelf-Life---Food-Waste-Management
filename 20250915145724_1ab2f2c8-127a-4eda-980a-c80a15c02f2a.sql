-- Add comprehensive recipes for dairy, meat, pantry items, and other common foods
INSERT INTO public.recipes (name, description, ingredients, instructions, prep_time_minutes, cook_time_minutes, servings, difficulty, cuisine_type, meal_type, protein_grams, carbs_grams, fat_grams, calories, fiber_grams, sugar_grams, sodium_mg) VALUES

-- Dairy-based recipes
('Creamy Alfredo Pasta', 'Rich pasta with cream and parmesan cheese', 
 ARRAY['pasta', 'cream', 'parmesan', 'butter', 'garlic'], 
 ARRAY['Cook pasta according to package directions', 'Heat cream and butter in pan', 'Add minced garlic', 'Stir in parmesan cheese', 'Toss with cooked pasta'],
 10, 15, 4, 'easy', 'Italian', 'dinner', 18, 55, 28, 520, 2, 4, 950),

('Greek Yogurt Parfait', 'Healthy breakfast with Greek yogurt and berries',
 ARRAY['greek yogurt', 'honey', 'granola', 'berries', 'nuts'],
 ARRAY['Layer Greek yogurt in glass', 'Drizzle with honey', 'Add granola and berries', 'Top with nuts'],
 5, 0, 1, 'easy', 'Greek', 'breakfast', 15, 35, 8, 280, 6, 25, 120),

('Cheese Quesadilla', 'Simple quesadilla with melted cheese',
 ARRAY['tortillas', 'shredded cheese', 'butter'],
 ARRAY['Heat pan over medium heat', 'Butter one side of tortilla', 'Add cheese to unbuttered side', 'Fold and cook until golden', 'Flip and cook other side'],
 5, 8, 2, 'easy', 'Mexican', 'lunch', 12, 28, 16, 300, 2, 1, 650),

('Cottage Cheese Bowl', 'Protein-rich cottage cheese with fruit',
 ARRAY['cottage cheese', 'fruit', 'nuts', 'honey'],
 ARRAY['Place cottage cheese in bowl', 'Top with fresh fruit', 'Add chopped nuts', 'Drizzle with honey'],
 3, 0, 1, 'easy', 'American', 'breakfast', 20, 18, 6, 200, 3, 15, 400),

-- Egg recipes
('Scrambled Eggs with Cream', 'Fluffy scrambled eggs with cream',
 ARRAY['eggs', 'cream', 'butter', 'salt', 'pepper'],
 ARRAY['Beat eggs with cream', 'Heat butter in pan', 'Add egg mixture', 'Scramble gently over low heat', 'Season with salt and pepper'],
 5, 8, 2, 'easy', 'American', 'breakfast', 14, 3, 18, 220, 0, 3, 350),

('Egg Salad Sandwich', 'Classic egg salad on bread',
 ARRAY['eggs', 'mayonnaise', 'bread', 'mustard', 'celery'],
 ARRAY['Hard boil eggs and cool', 'Mash eggs with mayonnaise', 'Add mustard and diced celery', 'Spread on bread', 'Make sandwich'],
 15, 0, 2, 'easy', 'American', 'lunch', 16, 24, 18, 320, 3, 2, 580),

-- Meat and poultry recipes
('Grilled Chicken Breast', 'Simple seasoned grilled chicken',
 ARRAY['chicken breast', 'olive oil', 'salt', 'pepper', 'herbs'],
 ARRAY['Season chicken with salt, pepper, and herbs', 'Brush with olive oil', 'Preheat grill to medium-high', 'Grill 6-7 minutes per side', 'Rest before slicing'],
 10, 15, 4, 'easy', 'American', 'dinner', 35, 0, 8, 220, 0, 0, 320),

('Bacon and Eggs', 'Classic breakfast with crispy bacon',
 ARRAY['bacon', 'eggs', 'butter'],
 ARRAY['Cook bacon in pan until crispy', 'Remove bacon, keep some fat in pan', 'Crack eggs into pan', 'Cook to desired doneness', 'Serve with bacon'],
 5, 10, 2, 'easy', 'American', 'breakfast', 20, 1, 22, 280, 0, 0, 680),

('Turkey Sandwich', 'Deli turkey sandwich with fixings',
 ARRAY['deli turkey', 'bread', 'lettuce', 'tomato', 'mayonnaise'],
 ARRAY['Toast bread if desired', 'Spread mayonnaise on bread', 'Layer turkey, lettuce, and tomato', 'Close sandwich and slice'],
 5, 0, 1, 'easy', 'American', 'lunch', 22, 26, 8, 280, 3, 4, 850),

('Ground Beef Tacos', 'Seasoned ground beef in soft tortillas',
 ARRAY['ground beef', 'tortillas', 'onion', 'garlic', 'spices'],
 ARRAY['Brown ground beef with onion and garlic', 'Season with taco spices', 'Warm tortillas', 'Fill tortillas with beef mixture', 'Add desired toppings'],
 10, 15, 4, 'easy', 'Mexican', 'dinner', 24, 15, 18, 320, 2, 2, 720),

-- Seafood recipes
('Baked Salmon Fillet', 'Herb-crusted baked salmon',
 ARRAY['salmon fillet', 'lemon', 'herbs', 'olive oil', 'garlic'],
 ARRAY['Preheat oven to 400°F', 'Season salmon with herbs and garlic', 'Drizzle with olive oil and lemon', 'Bake 12-15 minutes', 'Serve immediately'],
 8, 15, 4, 'easy', 'Mediterranean', 'dinner', 35, 2, 18, 320, 0, 1, 400),

('Shrimp Scampi', 'Garlic butter shrimp with pasta',
 ARRAY['shrimp', 'pasta', 'garlic', 'butter', 'white wine'],
 ARRAY['Cook pasta according to directions', 'Sauté garlic in butter', 'Add shrimp and cook until pink', 'Add wine and reduce', 'Toss with pasta'],
 15, 20, 4, 'medium', 'Italian', 'dinner', 28, 45, 12, 380, 2, 3, 650),

('Tuna Salad', 'Classic tuna salad with mayonnaise',
 ARRAY['canned tuna', 'mayonnaise', 'celery', 'onion', 'crackers'],
 ARRAY['Drain tuna and flake', 'Mix with mayonnaise', 'Add diced celery and onion', 'Season with salt and pepper', 'Serve with crackers'],
 10, 0, 2, 'easy', 'American', 'lunch', 22, 8, 12, 240, 1, 2, 520),

-- Bread and grain recipes
('French Toast', 'Classic French toast with eggs and cream',
 ARRAY['bread', 'eggs', 'cream', 'butter', 'maple syrup'],
 ARRAY['Beat eggs with cream', 'Dip bread slices in mixture', 'Cook in buttered pan until golden', 'Flip and cook other side', 'Serve with maple syrup'],
 10, 12, 4, 'easy', 'French', 'breakfast', 12, 35, 14, 320, 2, 18, 420),

('Peanut Butter Toast', 'Simple peanut butter on toasted bread',
 ARRAY['bread', 'peanut butter', 'honey'],
 ARRAY['Toast bread until golden', 'Spread peanut butter evenly', 'Drizzle with honey if desired'],
 3, 2, 1, 'easy', 'American', 'breakfast', 8, 22, 12, 220, 3, 8, 280),

('Pasta Salad', 'Cold pasta salad with vegetables',
 ARRAY['pasta', 'vegetables', 'olive oil', 'vinegar', 'herbs'],
 ARRAY['Cook pasta and cool completely', 'Chop vegetables', 'Make dressing with oil and vinegar', 'Combine pasta, vegetables, and dressing', 'Chill before serving'],
 20, 15, 6, 'easy', 'Italian', 'lunch', 8, 45, 12, 320, 4, 5, 380),

('Rice Bowl', 'Simple seasoned rice with vegetables',
 ARRAY['rice', 'vegetables', 'soy sauce', 'sesame oil'],
 ARRAY['Cook rice according to package directions', 'Steam or stir-fry vegetables', 'Season rice with soy sauce', 'Top with vegetables', 'Drizzle with sesame oil'],
 10, 25, 4, 'easy', 'Asian', 'dinner', 6, 58, 4, 280, 3, 4, 650),

('Bagel with Cream Cheese', 'Toasted bagel with cream cheese spread',
 ARRAY['bagel', 'cream cheese'],
 ARRAY['Slice bagel in half', 'Toast until golden', 'Spread cream cheese generously'],
 3, 3, 1, 'easy', 'American', 'breakfast', 12, 42, 16, 340, 2, 4, 580),

-- Pantry staple recipes
('Pancakes from Mix', 'Quick pancakes using pancake mix',
 ARRAY['pancake mix', 'eggs', 'milk', 'butter', 'maple syrup'],
 ARRAY['Combine pancake mix with eggs and milk', 'Heat griddle and add butter', 'Pour batter to form pancakes', 'Cook until bubbles form, then flip', 'Serve with maple syrup'],
 5, 15, 4, 'easy', 'American', 'breakfast', 8, 45, 8, 280, 2, 12, 450),

('Bean and Rice Bowl', 'Hearty bowl with canned beans and rice',
 ARRAY['canned beans', 'rice', 'onion', 'garlic', 'spices'],
 ARRAY['Cook rice according to directions', 'Sauté onion and garlic', 'Add beans and warm through', 'Season with spices', 'Serve beans over rice'],
 10, 25, 4, 'easy', 'Latin', 'dinner', 12, 65, 2, 320, 12, 3, 580),

('Peanut Butter Crackers', 'Crackers topped with peanut butter',
 ARRAY['crackers', 'peanut butter'],
 ARRAY['Spread peanut butter on crackers', 'Serve immediately'],
 2, 0, 1, 'easy', 'American', 'snack', 6, 18, 10, 180, 2, 4, 320),

-- Frozen food recipes
('Loaded Frozen Pizza', 'Frozen pizza with added toppings',
 ARRAY['frozen pizza', 'cheese', 'vegetables', 'herbs'],
 ARRAY['Preheat oven according to pizza instructions', 'Add extra cheese and vegetables to pizza', 'Bake according to package directions', 'Sprinkle with fresh herbs before serving'],
 5, 18, 2, 'easy', 'Italian', 'dinner', 16, 38, 14, 340, 3, 6, 920),

('Smoothie Bowl', 'Frozen fruit blended into thick smoothie',
 ARRAY['frozen fruit', 'yogurt', 'granola', 'honey'],
 ARRAY['Blend frozen fruit with yogurt until thick', 'Pour into bowl', 'Top with granola', 'Drizzle with honey'],
 5, 0, 1, 'easy', 'American', 'breakfast', 8, 35, 4, 200, 6, 28, 80),

-- Condiment-based recipes
('Ranch Chicken Salad', 'Chicken salad with ranch dressing',
 ARRAY['cooked chicken', 'ranch dressing', 'lettuce', 'vegetables'],
 ARRAY['Chop cooked chicken', 'Toss with ranch dressing', 'Serve over lettuce', 'Add chopped vegetables'],
 10, 0, 2, 'easy', 'American', 'lunch', 25, 8, 18, 280, 3, 4, 720),

('Honey Mustard Glaze', 'Sweet and tangy glaze for proteins',
 ARRAY['honey', 'mustard', 'chicken', 'olive oil'],
 ARRAY['Mix honey and mustard', 'Brush chicken with olive oil', 'Coat with honey mustard mixture', 'Bake or grill until cooked through'],
 5, 20, 4, 'easy', 'American', 'dinner', 30, 12, 8, 240, 0, 10, 480);