import React, { useState } from 'react';
import './RecipeScreen.css';
import carbonara from '../images/carbonara.png';
import stirfry from '../images/stirfry.png';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

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
        name: "Chicken Stir Fry",
        ingredients: ["chicken", "broccoli", "carrots", "soy sauce", "rice"],
        image: stirfry,
        cookTime: "25 mins"
    },
    // Add more recipes as needed
];

function RecipeScreen() {
    const location = useLocation();
    const filterIngredients = location.state?.filterIngredients || [];
    const [searchIngredient, setSearchIngredient] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState(recipeDatabase);

    const handleSearch = (ingredient) => {
        setSearchIngredient(ingredient);
        if (ingredient === '') {
            setFilteredRecipes(recipeDatabase);
        } else {
            const filtered = recipeDatabase.filter(recipe =>
                recipe.ingredients.some(ing =>
                    ing.toLowerCase().includes(ingredient.toLowerCase())
                )
            );
            setFilteredRecipes(filtered);
        }
    };

    return (
        <div className="recipe-screen">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by ingredient..."
                    value={searchIngredient}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="recipes-page">

                <div className="recipes-grid">
                    {filteredRecipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <img src={recipe.image} alt={recipe.name} />
                            <div className="recipe-info">
                                <h3>{recipe.name}</h3>
                                <p className="cook-time">{recipe.cookTime}</p>
                                <div className="ingredients-list">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <span key={index} className="ingredient-tag">
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RecipeScreen;