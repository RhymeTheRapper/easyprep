// Import images
import carbonara from '../images/carbonara.png';
import stirfry from '../images/stirfry.png';
import greeksalad from '../images/greeksalad.png';
import tacos from '../images/tacos.png';
import curry from '../images/curry.png';
import risotto from '../images/risotto.png';
import fishandchips from '../images/fishandchips.png';
import caesarsalad from '../images/caesersalad.png';
import pizza from '../images/pizza.png';
import burger from '../images/burger.png';
import padthai from '../images/padthai.png';
import chickensoup from '../images/chickensoup.png';

export const recipeDatabase = [
    {
        id: 1,
        name: "Spaghetti Carbonara",
        ingredients: ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
        image: carbonara,
        cookTime: "20 mins",
        dietary: ["HighProtein", "IntermediateFasting"],
        allergens: ["GlutenFree", "LactoseFree"],
        steps: [
            "Bring a pot of salted water to boil and cook the pasta until al dente.",
            "While pasta cooks, fry the bacon until crispy in a skillet.",
            "Whisk together eggs and grated parmesan in a bowl.",
            "Drain the pasta, reserving some pasta water.",
            "Combine pasta, bacon, and the egg-parmesan mixture in the skillet. Mix well.",
            "Add reserved pasta water as needed to create a creamy sauce.",
            "Season with black pepper and serve immediately."
        ]
    },
    {
        id: 2,
        name: "Chicken Stir Fry",
        ingredients: ["chicken", "broccoli", "carrots", "soy sauce", "rice"],
        image: stirfry,
        cookTime: "25 mins",
        dietary: ["HighProtein", "LowCalorie", "LowSugar", "IntermediateFasting"],
        allergens: ["GlutenFree"],
        steps: [
            "Cook rice according to package instructions and set aside.",
            "Heat oil in a skillet and cook chicken pieces until browned.",
            "Add broccoli and carrots to the skillet and stir fry for 5 minutes.",
            "Mix soy sauce and a splash of water, then pour over the stir fry.",
            "Cook until vegetables are tender and sauce thickens.",
            "Serve the stir fry over cooked rice."
        ]
    },
    {
        id: 3,
        name: "Greek Salad",
        ingredients: ["cucumber", "tomatoes", "olives", "feta", "red onion", "olive oil"],
        image: greeksalad,
        cookTime: "10 mins",
        dietary: ["LowCalorie", "LowSugar", "Vegetarian", "Keto", "RawFood", "IntermediateFasting"],
        allergens: ["LactoseFree"],
        steps: [
            "Chop cucumbers, tomatoes, and red onion into bite-sized pieces.",
            "Combine chopped vegetables with olives in a large bowl.",
            "Crumble feta cheese over the salad.",
            "Drizzle with olive oil and season with salt and pepper.",
            "Toss gently and serve immediately."
        ]
    },
    {
        id: 4,
        name: "Beef Tacos",
        ingredients: ["beef", "tortillas", "tomatoes", "lime", "cheese", "guacamole", "cilantro", "onion"],
        image: tacos,
        cookTime: "30 mins",
        dietary: ["HighProtein", "IntermediateFasting"],
        allergens: ["GlutenFree", "LactoseFree"],
        steps: [
            "Cook ground beef in a skillet until browned and season with taco seasoning.",
            "Warm tortillas in a dry skillet or microwave.",
            "Dice tomatoes and onion, and chop cilantro.",
            "Assemble tacos by layering beef, tomatoes, onion, cheese, guacamole, and cilantro onto tortillas.",
            "Squeeze lime juice over each taco before serving."
        ]
    },
    {
        id: 5,
        name: "Vegetable Curry",
        ingredients: ["chickpeas", "cauliflower", "carrots", "coconut milk", "curry powder", "rice"],
        image: curry,
        cookTime: "35 mins",
        dietary: ["Vegetarian", "LowCalorie", "LowSugar", "IntermediateFasting"],
        allergens: [],
        steps: [
            "Cook rice according to package instructions and set aside.",
            "Heat oil in a pot and sauté onions until translucent.",
            "Add carrots and cauliflower, cooking for 5 minutes.",
            "Stir in curry powder and cook for another minute.",
            "Add coconut milk and chickpeas, then simmer for 20 minutes.",
            "Serve the curry over cooked rice."
        ]
    },
    {
        id: 6,
        name: "Mushroom Risotto",
        ingredients: ["arborio rice", "mushrooms", "onion", "white wine", "parmesan", "butter"],
        image: risotto,
        cookTime: "40 mins",
        dietary: ["Vegetarian", "IntermediateFasting"],
        allergens: ["LactoseFree"],
        steps: [
            "Heat broth in a saucepan and keep warm.",
            "Sauté onions and mushrooms in butter until soft.",
            "Add arborio rice and toast for 2 minutes.",
            "Deglaze the pan with white wine, stirring until absorbed.",
            "Add broth one ladle at a time, stirring constantly until absorbed.",
            "Stir in parmesan cheese and butter before serving."
        ]
    },
    {
        id: 7,
        name: "Fish and Chips",
        ingredients: ["cod", "potatoes", "flour", "beer", "tartar sauce"],
        image: fishandchips,
        cookTime: "45 mins",
        dietary: ["HighProtein", "Pescatarian", "IntermediateFasting"],
        allergens: ["GlutenFree", "FishFree"],
        steps: [
            "Peel and cut potatoes into fries and soak in water for 30 minutes.",
            "Heat oil in a deep fryer or heavy pot to 350°F (175°C).",
            "Dredge fish fillets in flour, then dip in beer batter.",
            "Fry fish until golden brown and cooked through.",
            "Fry potatoes in batches until crispy.",
            "Serve fish and chips with tartar sauce and lemon wedges."
        ]
    },
    {
        id: 8,
        name: "Caesar Salad",
        ingredients: ["romaine lettuce", "croutons", "parmesan", "chicken", "caesar dressing"],
        image: caesarsalad,
        cookTime: "15 mins",
        dietary: ["HighProtein", "LowCalorie", "LowSugar", "IntermediateFasting"],
        allergens: ["GlutenFree", "LactoseFree"],
        steps: [
            "Grill chicken breast until fully cooked and slice into strips.",
            "Chop romaine lettuce into bite-sized pieces.",
            "Toss lettuce with croutons, parmesan cheese, and Caesar dressing.",
            "Top with sliced chicken and serve immediately."
        ]
    },
    {
        id: 9,
        name: "Margherita Pizza",
        ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil", "olive oil"],
        image: pizza,
        cookTime: "25 mins",
        dietary: ["Vegetarian", "IntermediateFasting"],
        allergens: ["GlutenFree", "LactoseFree"],
        steps: [
            "Preheat oven to 475°F (245°C).",
            "Roll out pizza dough and place on a baking sheet or pizza stone.",
            "Spread tomato sauce evenly over the dough.",
            "Top with slices of mozzarella and fresh basil leaves.",
            "Drizzle with olive oil and bake for 10-12 minutes until crust is golden.",
            "Serve hot."
        ]
    },
    {
        id: 10,
        name: "Beef Burger",
        ingredients: ["ground beef", "burger buns", "lettuce", "tomatoes", "cheese", "onion"],
        image: burger,
        cookTime: "20 mins",
        dietary: ["HighProtein", "IntermediateFasting"],
        allergens: ["GlutenFree", "LactoseFree"],
        steps: [
            "Form ground beef into patties and season with salt and pepper.",
            "Grill or pan-fry patties until cooked to desired doneness.",
            "Toast burger buns lightly on the grill or in a toaster.",
            "Assemble burgers with lettuce, tomato slices, cheese, onion, and patties.",
            "Serve immediately with condiments of your choice."
        ]
    },
    {
        id: 11,
        name: "Pad Thai",
        ingredients: ["rice noodles", "shrimp", "tofu", "peanuts", "bean sprouts", "eggs"],
        image: padthai,
        cookTime: "30 mins",
        dietary: ["HighProtein", "Pescatarian", "IntermediateFasting"],
        allergens: ["ShellfishFree"],
        steps: [
            "Soak rice noodles in warm water until softened and drain.",
            "Stir-fry shrimp and tofu in a hot pan with oil until cooked.",
            "Push shrimp and tofu to the side and scramble eggs in the pan.",
            "Add noodles and Pad Thai sauce, stirring to combine.",
            "Toss in bean sprouts and cook for another minute.",
            "Garnish with peanuts and serve hot."
        ]
    },
    {
        id: 12,
        name: "Chicken Soup",
        ingredients: ["chicken", "carrots", "celery", "onion", "noodles", "chicken broth"],
        image: chickensoup,
        cookTime: "45 mins",
        dietary: ["HighProtein", "LowCalorie", "LowSugar", "IntermediateFasting"],
        allergens: ["GlutenFree"],
        steps: [
            "Heat oil in a large pot and sauté onions, carrots, and celery until soft.",
            "Add chicken broth and bring to a boil.",
            "Add chicken pieces and simmer until cooked through.",
            "Remove chicken, shred it, and return to the pot.",
            "Add noodles and cook until tender.",
            "Season with salt and pepper to taste and serve hot."
        ]
    }
];
