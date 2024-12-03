import React, { useState } from 'react';
import './RecipeScreen.scss';
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
import { useLocation, useNavigate } from 'react-router-dom';

// Mock database of recipes
const recipeDatabase = [
    {
        id: 1,
        name: "Spaghetti Carbonara",
        ingredients: ["pasta", "eggs", "bacon", "parmesan", "black pepper"],
        image: carbonara,
        cookTime: "20 mins"
    },
    {
        id: 2,
        name: "Chicken Stir Fry",
        ingredients: ["chicken", "broccoli", "carrots", "soy sauce", "rice"],
        image: stirfry,
        cookTime: "25 mins"
    },
    {
        id: 3,
        name: "Greek Salad",
        ingredients: ["cucumber", "tomatoes", "olives", "feta", "red onion", "olive oil"],
        image: greeksalad,
        cookTime: "10 mins"
    },
    {
        id: 4,
        name: "Beef Tacos",
        ingredients: ["beef", "tortillas", "tomatoes", "lime", "cheese", "guacamole", "cilantro", "onion"],
        image: tacos,
        cookTime: "30 mins"
    },
    {
        id: 5,
        name: "Vegetable Curry",
        ingredients: ["chickpeas", "cauliflower", "carrots", "coconut milk", "curry powder", "rice"],
        image: curry,
        cookTime: "35 mins"
    },
    {
        id: 6,
        name: "Mushroom Risotto",
        ingredients: ["arborio rice", "mushrooms", "onion", "white wine", "parmesan", "butter"],
        image: risotto,
        cookTime: "40 mins"
    },
    {
        id: 7,
        name: "Fish and Chips",
        ingredients: ["cod", "potatoes", "flour", "beer", "tartar sauce"],
        image: fishandchips,
        cookTime: "45 mins"
    },
    {
        id: 8,
        name: "Caesar Salad",
        ingredients: ["romaine lettuce", "croutons", "parmesan", "chicken", "caesar dressing"],
        image: caesarsalad,
        cookTime: "15 mins"
    },
    {
        id: 9,
        name: "Margherita Pizza",
        ingredients: ["pizza dough", "tomatoes", "mozzarella", "basil", "olive oil"],
        image: pizza,
        cookTime: "25 mins"
    },
    {
        id: 10,
        name: "Beef Burger",
        ingredients: ["ground beef", "burger buns", "lettuce", "tomatoes", "cheese", "onion"],
        image: burger,
        cookTime: "20 mins"
    },
    {
        id: 11,
        name: "Pad Thai",
        ingredients: ["rice noodles", "shrimp", "tofu", "peanuts", "bean sprouts", "eggs"],
        image: padthai,
        cookTime: "30 mins"
    },
    {
        id: 12,
        name: "Chicken Soup",
        ingredients: ["chicken", "carrots", "celery", "onion", "noodles", "chicken broth"],
        image: chickensoup,
        cookTime: "45 mins"
    }
];

function RecipeScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [filterIngredients, setFilterIngredients] = useState(
        location.state?.filterIngredients || []
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState(() => {
        if (filterIngredients.length > 0) {
            return recipeDatabase.filter(recipe =>
                filterIngredients.every(filterIng =>
                    recipe.ingredients.includes(filterIng.name.toLowerCase())
                )
            );
        }
        return recipeDatabase;
    });

    const removeFilter = (ingredientToRemove) => {
        const updatedFilters = filterIngredients.filter(
            ing => ing.id !== ingredientToRemove.id
        );
        setFilterIngredients(updatedFilters);
        
        navigate('/recipes', { 
            state: { filterIngredients: updatedFilters },
            replace: true 
        });

        // Reapply filters
        let results = recipeDatabase;
        if (updatedFilters.length > 0) {
            results = results.filter(recipe =>
                updatedFilters.every(filterIng =>
                    recipe.ingredients.includes(filterIng.name.toLowerCase())
                )
            );
        }
        if (searchTerm !== '') {
            results = results.filter(recipe =>
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.ingredients.some(ing =>
                    ing.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        setFilteredRecipes(results);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        
        let results = recipeDatabase;
        
        // First apply the filter from selected ingredients
        if (filterIngredients.length > 0) {
            results = results.filter(recipe =>
                filterIngredients.every(filterIng =>
                    recipe.ingredients.includes(filterIng.name.toLowerCase())
                )
            );
        }
        
        // Then apply the search term filter to both recipe names and ingredients
        if (term !== '') {
            const searchLower = term.toLowerCase();
            results = results.filter(recipe =>
                recipe.name.toLowerCase().includes(searchLower) ||
                recipe.ingredients.some(ing =>
                    ing.toLowerCase().includes(searchLower)
                )
            );
        }
        
        setFilteredRecipes(results);
    };

    return (
        <div className="recipe-screen">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by recipe or ingredient..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {filterIngredients.length > 0 && (
                    <div className="active-filters">
                        <p>Filtering by:</p>
                        {filterIngredients.map((ing) => (
                            <div key={ing.id} className="filter-tag">
                                <button 
                                    className="remove-filter"
                                    onClick={() => removeFilter(ing)}
                                >
                                    ×
                                </button>
                                <span className="filter-name">{ing.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="recipes-page">
                <div className="recipes-grid">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map(recipe => (
                            <div key={recipe.id} className="recipe-card">
                                <img src={recipe.image} alt={recipe.name} />
                                <div className="recipe-info">
                                    <h3>{recipe.name}</h3>
                                    <p className="cook-time">{recipe.cookTime}</p>
                                    <div className="ingredients-list">
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <span 
                                                key={index} 
                                                className={`ingredient-tag ${
                                                    filterIngredients.some(fi => 
                                                        fi.name.toLowerCase() === ingredient
                                                    ) ? 'matched' : ''
                                                }`}
                                            >
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No recipes found with these ingredients.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecipeScreen;