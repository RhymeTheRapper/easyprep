import React, { useState, useEffect } from 'react';
import './AddIngredientModal.scss';

const CATEGORIES = [
    'Dairy',
    'Produce',
    'Meat and Seafood',
    'Pantry'
];

function AddIngredientModal({ onClose, onSave, initialValues, isEdit }) {
    const [ingredient, setIngredient] = useState({
        ingredientName: '',
        category: '',
        expiryDate: '',
        image: '',
    });
    const [showIconSelect, setShowIconSelect] = useState(false);
    const images = require.context('../images/ingredients', false, /\.(svg)$/);
    const imageOptions = images.keys().map(key => ({
        name: key.replace('./', ''),
        path: images(key)
    }));

    useEffect(() => {
        if (initialValues) {
            setIngredient({
                ingredientName: initialValues.name || '',
                category: initialValues.category || '',
                expiryDate: initialValues.expiryDate || '',
                image: initialValues.image || '',
            });
        }
    }, [initialValues]);

    const handleChange = (event) => {
        setIngredient({
            ...ingredient,
            [event.target.name]: event.target.value,
        });
    };

    const handleIconSelect = (imageName) => {
        setIngredient(prev => ({
            ...prev,
            image: imageName
        }));
        setShowIconSelect(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isEdit ? 'Edit Ingredient' : 'Add New Ingredient'}</h2>
                <div className="input-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="ingredientName" 
                        placeholder="Enter ingredient name" 
                        onChange={handleChange}
                        value={ingredient.ingredientName}
                    />
                </div>

                <div className="input-group">
                    <label>Category</label>
                    <select 
                        name="category"
                        onChange={handleChange}
                        value={ingredient.category}
                        required
                    >
                        <option value="">Select a category</option>
                        {CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <label>Icon</label>
                    <div className="custom-select">
                        <div 
                            className="select-trigger"
                            onClick={() => setShowIconSelect(!showIconSelect)}
                        >
                            {ingredient.image ? (
                                <img 
                                    src={images(`./${ingredient.image}`)} 
                                    alt="Selected icon"
                                    className="selected-icon"
                                />
                            ) : (
                                <span>Select an icon</span>
                            )}
                        </div>
                        {showIconSelect && (
                            <div className="select-options">
                                {imageOptions.map((image) => (
                                    <div 
                                        key={image.name}
                                        className="select-option"
                                        onClick={() => handleIconSelect(image.name)}
                                        title={image.name.replace('.svg', '')}
                                    >
                                        <img 
                                            src={image.path} 
                                            alt={image.name.replace('.svg', '')}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="input-group">
                    <label>Expiry Date</label>
                    <input 
                        type="date" 
                        name="expiryDate" 
                        onChange={handleChange}
                        value={ingredient.expiryDate}
                    />
                </div>
                
                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                    <button 
                        className="submit-button" 
                        onClick={() => onSave(ingredient)}
                        disabled={!ingredient.category || !ingredient.ingredientName || !ingredient.image || !ingredient.expiryDate}
                    >
                        {isEdit ? 'Save Changes' : 'Add Ingredient'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddIngredientModal;