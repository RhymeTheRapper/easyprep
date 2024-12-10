import React, { useState, useEffect } from 'react';
import IngredientCard from './IngredientCard';
import AddIngredientModal from './AddIngredientModal';
import './HomeScreen.scss';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../DatabaseContext';

function HomeScreen() {
    const { ingredients, selectedIngredients, addIngredient } = useDatabase();
    const navigate = useNavigate();
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

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
        updateScrollBar();

        return () => container.removeEventListener('scroll', updateScrollBar);
    }, []);

    const checkExpiration = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const oneWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        const timeUntilExpiry = expiry - today;

        if (timeUntilExpiry < 0) return 'expired';
        if (timeUntilExpiry <= oneWeek) return 'expiring-soon';
        return 'available';
    };

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    const handleFilterStatus = (status) => {
        setFilterStatus((prevStatus) =>
            prevStatus.includes(status)
                ? prevStatus.filter((s) => s !== status)
                : [...prevStatus, status]
        );
    };

    useEffect(() => {
        let updatedIngredients = ingredients;

        // Apply search filter
        if (searchTerm) {
            updatedIngredients = updatedIngredients.filter((ingredient) =>
                ingredient.name.toLowerCase().includes(searchTerm)
            );
        }

        // Apply availability filter
        if (filterStatus.length > 0) {
            updatedIngredients = updatedIngredients.filter((ingredient) =>
                filterStatus.includes(checkExpiration(ingredient.expiryDate))
            );
        }

        setFilteredIngredients(updatedIngredients);
    }, [searchTerm, filterStatus, ingredients]);

    return (
        <div className="home-screen">
            <header className="header">
                <h1>My Fridge</h1>
                <button onClick={handleAddClick} className="add-button" />
            </header>
            <div className="filter-search-container">
                <input
                    type="text"
                    placeholder="Search ingredients..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filterStatus.includes('available') ? 'active' : ''}`}
                        onClick={() => handleFilterStatus('available')}
                    >
                        Available
                    </button>
                    <button
                        className={`filter-btn ${filterStatus.includes('expiring-soon') ? 'active' : ''}`}
                        onClick={() => handleFilterStatus('expiring-soon')}
                    >
                        Expiring Soon
                    </button>
                    <button
                        className={`filter-btn ${filterStatus.includes('expired') ? 'active' : ''}`}
                        onClick={() => handleFilterStatus('expired')}
                    >
                        Expired
                    </button>
                </div>
            </div>
            <div className="content">
                {filteredIngredients.reduce((acc, ingredient) => {
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
