import React, { useState } from 'react';
import './RecipeScreen.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDatabase } from '../DatabaseContext';
import { recipeDatabase } from './RecipeDatabase';

function RecipeScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const { loggedInUser, ingredients } = useDatabase();
    const [filterIngredients, setFilterIngredients] = useState(location.state?.filterIngredients || []);
    const [searchTerm, setSearchTerm] = useState('');

    const filterRecipes = () => {
        let results = recipeDatabase;

        // Apply dietary preferences
        if (loggedInUser?.profile.preferences?.dietary?.length > 0) {
            results = results.filter(recipe =>
                loggedInUser.profile.preferences.dietary.some(pref =>
                    recipe.dietary?.includes(pref)
                )
            );
        }

        // Filter out recipes with allergens
        if (loggedInUser?.profile.preferences?.allergies?.length > 0) {
            results = results.filter(recipe =>
                !loggedInUser.profile.preferences.allergies.some(allergy =>
                    recipe.allergens?.includes(allergy)
                )
            );
        }

        // Apply ingredient filters
        if (filterIngredients.length > 0) {
            results = results.filter(recipe =>
                filterIngredients.every(filterIng =>
                    recipe.ingredients.includes(filterIng.name.toLowerCase())
                )
            );
        }

        // Apply search term
        if (searchTerm) {
            const lowerSearchTerm = searchTerm.toLowerCase();
            results = results.filter(recipe =>
                recipe.name.toLowerCase().includes(lowerSearchTerm) ||
                recipe.ingredients.some(ingredient =>
                    ingredient.toLowerCase().includes(lowerSearchTerm)
                )
            );
        }

        return results;
    };

    const filteredRecipes = filterRecipes();

    const getIngredientStatus = (ingredientName) => {
        const ingredient = ingredients.find(ing => ing.name.toLowerCase() === ingredientName.toLowerCase());

        if (!ingredient) return 'unavailable';

        const today = new Date();
        const expiryDate = new Date(ingredient.expiryDate);
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        const timeUntilExpiry = expiryDate - today;

        if (timeUntilExpiry < 0) return 'expired';
        if (timeUntilExpiry <= oneWeek) return 'expiring-soon';
        return 'available';
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const removeFilter = (ingredientToRemove) => {
        const updatedFilters = filterIngredients.filter(ing => ing.id !== ingredientToRemove.id);
        setFilterIngredients(updatedFilters);
    };

    return (
        <div className="recipe-screen">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search recipes or ingredients..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                {filterIngredients.length > 0 && (
                    <div className="active-filters">
                        {filterIngredients.map((ing) => (
                            <div key={ing.id} className="filter-tag">
                                <button 
                                    className="remove-filter"
                                    onClick={() => removeFilter(ing)}
                                >
                                    ×
                                </button>
                                <span>{ing.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="recipes-grid">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="recipe-card"
                            onClick={() => navigate(`/recipes/${recipe.id}`)}
                        >
                            <img src={recipe.image} alt={recipe.name} />
                            <div className="recipe-info">
                                <h3>{recipe.name}</h3>
                                <div className="ingredients-list">
                                    {recipe.ingredients
                                        .map((ingredient) => ({
                                            name: ingredient,
                                            status: getIngredientStatus(ingredient),
                                        }))
                                        .sort((a, b) => {
                                            const order = {
                                                available: 0,
                                                'expiring-soon': 1,
                                                expired: 2,
                                                unavailable: 3,
                                            };
                                            return order[a.status] - order[b.status];
                                        })
                                        .map(({ name, status }, index) => (
                                            <span
                                                key={index}
                                                className={`ingredient-tag ${status}`}
                                            >
                                                {name}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No recipes found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeScreen;
