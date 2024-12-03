import React, { useState, useEffect } from 'react';
import IngredientCard from './IngredientCard';
import AddIngredientModal from './AddIngredientModal';
import Footer from '../components/Footer';
import './HomeScreen.scss';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../DatabaseContext';

function HomeScreen() {
    const { ingredients, selectedIngredients, addIngredient } = useDatabase();
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);

    const handleFilterClick = () => {
        navigate('/recipes', { state: { filterIngredients: selectedIngredients } });
    };

    const handleAddClick = () => {
        setShowAddModal(true);
    };

    const handleAddIngredient = (ingredientData) => {
        const capitalizedName = ingredientData.ingredientName.charAt(0).toUpperCase() + 
                              ingredientData.ingredientName.slice(1);
        
        const newIngredient = {
            id: Date.now(),
            name: capitalizedName,
            category: ingredientData.category,
            expiryDate: ingredientData.expiryDate,
            image: ingredientData.image
        };

        addIngredient(newIngredient);
        setShowAddModal(false);
    };

    useEffect(() => {
        const container = document.querySelector('.items-container');
        
        const updateScrollBar = () => {
            const scrollPercentage = (container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
            container.style.setProperty('--scroll-percentage', `${scrollPercentage}%`);
        };

        container.addEventListener('scroll', updateScrollBar);
        // Initial update
        updateScrollBar();

        return () => container.removeEventListener('scroll', updateScrollBar);
    }, []);

    return (
        <div className="home-screen">
            <header className="header">
                <h1>My Fridge</h1>
                <button onClick={handleAddClick} className="add-button"/>
            </header>
            <div className="content">
                {ingredients.reduce((acc, ingredient) => {
                    const category = acc.find(item => item.category === ingredient.category);
                    if (category) {
                        category.items.push(ingredient);
                    } else {
                        acc.push({ category: ingredient.category, items: [ingredient] });
                    }
                    return acc;
                }, []).map((category, index) => (
                    <div className="section" key={index}>
                        <h3>{category.category}</h3>
                        <div className="items-container">
                            {category.items.map((item) => (
                                <IngredientCard 
                                    key={item.id} 
                                    ingredient={item}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <AddIngredientModal 
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddIngredient}
                    isEdit={false}
                />
            )}

            {selectedIngredients.length > 0 && (
                <button
                    className="filter-button"
                    onClick={handleFilterClick}
                >
                    Filter Recipes
                </button>
            )}
        </div>
    );
}

export default HomeScreen;