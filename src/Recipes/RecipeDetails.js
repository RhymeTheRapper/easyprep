import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipeDatabase } from './RecipeDatabase';
import { useDatabase } from '../DatabaseContext';
import './RecipeDetails.scss';

function RecipeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { ingredients } = useDatabase();
    const recipe = recipeDatabase.find((r) => r.id === parseInt(id, 10));

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

    if (!recipe) {
        return (
            <div className="recipe-details">
                <h2>Recipe Not Found</h2>
                <p>The recipe you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="recipe-details">
            <div className="header">
                <button
                    className="action-btn"
                    onClick={() => navigate(-1)}
                    title="Go Back"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1>{recipe.name}</h1>
            </div>

            <div className="recipe-header">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                <p className="cook-time"><strong>Cook Time:</strong> {recipe.cookTime}</p>
            </div>

            <div className="recipe-section">
                <h2>Ingredients</h2>
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

            <div className="recipe-section">
                <h2>Steps</h2>
                <ol className="steps-list">
                    {recipe.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default RecipeDetails;
