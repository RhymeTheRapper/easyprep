import React, { useState } from 'react';
import './AddIngredientModal.css';

function AddIngredientModal({ onAddIngredient }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newIngredient, setNewIngredient] = useState({
        ingredientName: '',
        expiryDate: '',
        quantity: '',
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewIngredient({
            ingredientName: '',
            expiryDate: '',
            quantity: '',
        });
    };

    const handleChange = (event) => {
        setNewIngredient({
            ...newIngredient,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        onAddIngredient(newIngredient);
        handleCloseModal();
    };

    return (
        <div>
            <button className="add-ingredient-button" onClick={handleOpenModal}>
                <span>+</span>
            </button>
            
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add New Ingredient</h2>
                        <div className="input-group">
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="ingredientName" 
                                placeholder="Enter ingredient name" 
                                onChange={handleChange}
                                value={newIngredient.ingredientName}
                            />
                        </div>
                        
                        <div className="input-group">
                            <label>Expiry Date</label>
                            <input 
                                type="date" 
                                name="expiryDate" 
                                onChange={handleChange}
                                value={newIngredient.expiryDate}
                            />
                        </div>
                        
                        <div className="input-group">
                            <label>Quantity</label>
                            <input 
                                type="number" 
                                name="quantity" 
                                placeholder="Enter quantity" 
                                onChange={handleChange}
                                value={newIngredient.quantity}
                            />
                        </div>
                        
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
                            <button className="submit-button" onClick={handleSubmit}>Add Ingredient</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddIngredientModal;