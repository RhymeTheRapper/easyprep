import React, { useState } from 'react';
import IngredientCard from './IngredientCard';
import AddIngredientModal from './AddIngredientModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomeScreen.css';

// Create a context for the images
const images = require.context('../images', false, /\.(png|jpe?g|svg)$/);

function HomeScreen() {
    const [ingredients, setIngredients] = useState([
        { category: 'Dairy', name: 'Cheese', image: 'cheese.svg' },
        { category: 'Produce', name: 'Apple', image: 'apple.svg' },
        { category: 'Produce', name: 'carrot', image: 'carrot.svg' },
        { category: 'Dairy', name: 'Milk', image: 'milk.svg' },
        // ... other ingredients
    ]);

    const handleAddIngredient = (newIngredient) => {
        setIngredients([...ingredients, newIngredient]);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <h1>My Fridge</h1>
                <AddIngredientModal onAddIngredient={handleAddIngredient} />
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
                            {category.items.map((item, itemIndex) => (
                                <div className="item" key={itemIndex}>
                                    <img src={images(`./${item.image}`)} alt={item.name} />
                                    <p>{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <footer className="footer">
                <FontAwesomeIcon icon="fa-home" className="menu-icon" />
                <FontAwesomeIcon icon="fa-book" className="menu-icon" />
                <FontAwesomeIcon icon="fa-user" className="menu-icon" />
            </footer>
        </div>
    );
}

export default HomeScreen;