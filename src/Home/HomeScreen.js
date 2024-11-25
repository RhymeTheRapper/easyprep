import React, { useState } from 'react';
import IngredientCard from './IngredientCard';
import AddIngredientModal from './AddIngredientModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HomeScreen.css';

// Create a context for the images
const images = require.context('../images', false, /\.(png|jpe?g|svg)$/);

function HomeScreen() {
    const [ingredients, setIngredients] = useState([
        { category: 'Dairy', name: 'Cheese', image: 'cheese.svg', expiryDate: '2024-12-01' },
        { category: 'Produce', name: 'Apple', image: 'apple.svg', expiryDate: '2024-12-05' },
        { category: 'Produce', name: 'carrot', image: 'carrot.svg', expiryDate: '2024-12-10'},
        { category: 'Dairy', name: 'Milk', image: 'milk.svg', expiryDate: '2024-12-15'},
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
                <div className="menu-item">
                    <div className="icon recipe-icon"></div>
                    <span>Recipes</span>
                </div>
                <div className="menu-item">
                    <div className="icon home-icon"></div>
                    <span>Home</span>
                </div>
                <div className="menu-item">
                    <div className="icon profile-icon"></div>
                    <span>Profile</span>
                </div>
            </footer>
        </div>
    );
}

export default HomeScreen;