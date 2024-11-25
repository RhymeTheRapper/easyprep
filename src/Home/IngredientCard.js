import React, { useState } from 'react';
import { useDatabase } from '../DatabaseContext';
import AddIngredientModal from './AddIngredientModal';
import './IngredientCard.css';

function IngredientCard({ ingredient }) {
    const [showActions, setShowActions] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const { deleteIngredient, updateIngredient, toggleSelectedIngredient } = useDatabase();
    const images = require.context('../images', false, /\.(png|jpe?g|svg)$/);

    const handleClick = () => {
        setShowActions(!showActions);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setShowEditModal(true);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteIngredient(ingredient.id);
    };

    const handleAdd = (e) => {
        e.stopPropagation();
        toggleSelectedIngredient(ingredient);
    };

    return (
        <>
            <div className="ingredient-card" onClick={handleClick}>
                <img src={images(`./${ingredient.image}`)} alt={ingredient.name} />
                <p>{ingredient.name}</p>
                
                {showActions && (
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
                    onSave={(updatedIngredient) => {
                        updateIngredient(ingredient.id, updatedIngredient);
                        setShowEditModal(false);
                    }}
                    initialValues={ingredient}
                />
            )}
        </>
    );
}

export default IngredientCard;