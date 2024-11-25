import React from 'react';
import IngredientCard from './IngredientCard';
import AddIngredientModal from './AddIngredientModal';
import Footer from '../components/Footer';
import './HomeScreen.css';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../DatabaseContext';

function HomeScreen() {
    const { ingredients, selectedIngredients } = useDatabase();
    const navigate = useNavigate();

    const handleFilterClick = () => {
        navigate('/recipes', { state: { filterIngredients: selectedIngredients } });
    };

    return (
        <div className="home-screen">
            <header className="header">
                <h1>My Fridge</h1>
                <AddIngredientModal />
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
            {selectedIngredients.length > 0 && (
                <button
                    className="filter-button"
                    onClick={handleFilterClick}
                >
                    Find Recipes
                </button>
            )}
        </div>
    );
}

export default HomeScreen;