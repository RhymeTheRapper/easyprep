import React from 'react';

function IngredientCard({ ingredient }) {
    return (
        <div className="ingredient-card">
            <img src={ingredient.imageUrl} alt={ingredient.ingredientName} />
            <p>{ingredient.ingredientName}</p>
            <p>Expires: {ingredient.expiryDate}</p>
        </div>
    );
}

export default IngredientCard;