import React, { useState } from 'react';
import { useDatabase } from '../DatabaseContext';
import AddIngredientModal from './AddIngredientModal';
import './IngredientCard.scss';

function IngredientCard({ ingredient }) {
    const [showActions, setShowActions] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const { deleteIngredient, updateIngredient, toggleSelectedIngredient, selectedIngredients } = useDatabase();
    const images = require.context('../images/ingredients', false, /\.(png|jpe?g|svg)$/);

    const isSelected = selectedIngredients.some(item => item.id === ingredient.id);

    const handleClick = () => {
        if (!isSelected) {
            setShowActions(!showActions);
        } else {
            toggleSelectedIngredient(ingredient);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setShowEditModal(true);
        setShowActions(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteIngredient(ingredient.id);
        setShowActions(false);
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        toggleSelectedIngredient(ingredient);
        setShowActions(false);
    };

    const handleUpdateIngredient = (updatedIngredient) => {
        updateIngredient(ingredient.id, {
            name: updatedIngredient.ingredientName,
            category: updatedIngredient.category,
            expiryDate: updatedIngredient.expiryDate,
            image: updatedIngredient.image,
        });
        setShowEditModal(false);
    };

    const checkExpiration = () => {
        const today = new Date();
        const expiryDate = new Date(ingredient.expiryDate);
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const timeUntilExpiry = expiryDate - today;

        if (timeUntilExpiry < 0) {
            return 'expired';
        } else if (timeUntilExpiry <= oneWeek) {
            return 'warning';
        }
        return 'ok';
    };

    return (
        <>
            <div className="ingredient-card" onClick={handleClick}>
                <div className="image-container">
                    <img src={images(`./${ingredient.image}`)} alt={ingredient.name} />
                    {checkExpiration() !== 'ok' && (
                        <div className={`expiry-warning ${checkExpiration()}`}>
                            <span>!</span>
                        </div>
                    )}
                </div>
                <p>{ingredient.name}</p>
                
                {isSelected && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleSelectedIngredient(ingredient);
                        }} 
                        className="action-btn add"
                        style={{ position: 'absolute', top: '-10px', right: '-10px' }}
                    >
                        <span>✓</span>
                    </button>
                )}

                {showActions && !isSelected && (
                    <div className="ingredient-actions">
                        <button onClick={handleEdit} className="action-btn edit">
                            <span>✎</span>
                        </button>
                        <button onClick={handleAdd} className="action-btn add">
                            <span>+</span>
                        </button>
                        <button onClick={handleDelete} className="action-btn delete">
                            <span>-</span>
                        </button>
                    </div>
                )}
            </div>

            {showEditModal && (
                <AddIngredientModal 
                    onClose={() => setShowEditModal(false)}
                    onSave={handleUpdateIngredient}
                    initialValues={ingredient}
                    isEdit={true}
                />
            )}
        </>
    );
}

export default IngredientCard;