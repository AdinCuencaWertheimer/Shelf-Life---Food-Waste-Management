# Welcome to Shelf Life

# Shelf Life MVP
**Shelf Life** is a food inventory management app designed to reduce food waste by helping users track their grocery expiration dates and use them before they expire.

## Core Features:

**Food Inventory Management**
- Add food items with expiration dates
- Visual status tracking (fresh, expiring soon, expired)
- Easy editing and removal of items

**Smart Expiration Tracking**
- Automatic status calculation based on expiration dates
- Color-coded system for quick visual identification
- Statistics dashboard showing food waste metrics

**AI-Powered Recipe Suggestions**
- Generate recipes using ingredients you already have
- Prioritize expiring items to reduce waste
- Multiple recipe options based on your inventory

**Receipt Scanning**
- Scan grocery receipts to automatically add items
- Extract food items and expiration dates
- Streamline the inventory input process

**Notifications & Reminders**
- SMS reminders for expiring food

The main value proposition is **reducing food waste** by making it easy to track what you have, know when it expires, and get creative recipe ideas to use ingredients before they go bad.

## This project is built with:

- Typescript

**Please briefly describe what your app does?**
ShelfLife keeps track of grocery expiration dates in your kitchen so you know what’s about to expire before it is too late. Grocery stores have systems that alert them when items expire and need to be taken off the shelves; ShelfLife brings this concept to the user's kitchen. Grocery items are added through the AI-powered receipt scanning feature, eliminating tedious data entry. ShelfLife's dashboard organizes groceries into categories such as fresh, expiring soon, and expired, with clear visual indicators. Users receive timely text notifications for groceries approaching their expiration date, putting an end to unnecessary waste. Beyond tracking expiration dates, ShelfLife includes an AI-driven recipe generator that suggests healthy, personalized recipes based on expiring ingredients. This turns food you worked hard to pay for, into delicious meals, instead of money down the drain. ShelfLife helps users save money and promotes sustainability. By combining AI technology, intuitive design, and real world practicality, ShelfLife solves a known problem in every household.

**What inspired you to create this app?**
I was inspired to create ShelfLife after my dad complained about having to throw away chicken, because he forgot to use it and it expired. He said, "It's like I took $25, and threw it in the trash". It wasn’t the first time this happened and he was frustrated. We had to order delivery, because what he planned to make our family for dinner, was now in the trash. That small moment made me think about how much food we were wasting in our house, and how much money that waste represented. But before telling my dad that I had an idea that might help him, I scanned the internet to see if there was any data related to this concept, and what I found was eye-opening. My research revealed that a family of four throws away about $1,500 per year of expired food, with some studies estimating that amount to be $2,900 or more. A 2020 study by the American Journal of Agricultural Economics found that the average American household wastes 31.9% of their food, worth $240 billion. The data also reveals the loss is more than just financial. Each discarded item required water and energy to be produced in the first place, and when thrown out, those items now generate methane emissions in landfills. My research found that there was no real platform available to help consumers stop wasting the food they bought. I initially just wanted to help my own family, but once I realized how big the problem was, I thought I could do even more. So, I created ShelfLife as a solution to a problem that many families have accepted as part of life. As a result, ShelfLife has the potential to save families real money, with an opportunity to profoundly reduce food waste on massive scale.

**What technical diﬃculties did you face programming your app?**
One of the biggest challenges in developing ShelfLife was making receipt scanning reliable enough to accurately extract data and estimate expiration dates. Integrating OpenAI's Vision API required careful prompt engineering to accurately identify perishable items, while filtering out non-food products and long shelf life packaged goods. I leveraged experience from my summer internship at a VC-backed startup company, MAI Home Inc, to fine tune these prompts for ShelfLife. The complexity increased when developing algorithms to estimate expiration dates. I had to design algorithms that could determine the expiration date from numerous factors. After extensive testing by family and friends, the system now performs consistently and accurately. The AI recipe generation feature demanded sophisticated prompt engineering to suggest relevant meals based on available ingredients. To make this feature cost effective, I implemented intelligent caching and request optimization strategies, ensuring the system remained practical and efficient. All data is securely stored and synchronized across devices using Supabase, an open-source platform that functions as a backend for the website. Integrating authentication with Supabase and ensuring proper data isolation between users also presented challenges, requiring careful application of security best practices. Overcoming these challenges involved combining AI, algorithm design, security best practices, and prompt engineering in creative ways. Each obstacle lead me to experiment and refine ShelfLife, resulting in a powerful, easy to use platform.

**What improvements would you make if you were to create a 2.0 version of your app?**
In a 2.0 version of ShelfLife, I would incorporate advanced AI capabilities to enhance the user experience. I would develop machine learning models that learn user's consumption patterns, to provide predictive insights on purchasing habits. By analyzing trends over time, this would help users make smarter shopping decisions. I would also integrate grocery store APIs, which would allow the app to automatically and seamlessly update the users' account based on purchases, eliminating the receipt scanning step. To make meal planning smarter, I would build features that account for dietary goals and family preferences, which allows users to receive tailored meal suggestions that fit their unique needs. Additionally, I want users to be able to integrate the app with smart home appliances, such as smart refrigerators, providing a seamless user experience across devices. Every feature would be designed with usability and impact in mind, ensuring the app remains both innovative and practical, while helping users save money and reduce waste.
