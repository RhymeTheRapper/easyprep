import React, { useState } from 'react';

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
            <button onClick={handleOpenModal}>Add Ingredient</button>
            {isModalOpen && (
                <div className="modal-container">
                    <div className="modal-content">
                        <input type="text" name="ingredientName" placeholder="Ingredient Name" onChange={handleChange} />
                        <input type="date" name="expiryDate" onChange={handleChange} />
                        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
                        <button onClick={handleCloseModal}>Cancel</button>
                        <button onClick={handleSubmit}>Add</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddIngredientModal;