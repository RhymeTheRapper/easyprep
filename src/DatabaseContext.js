import React, { createContext, useContext, useState, useEffect } from 'react';

const initialIngredients = [
    { id: 1, category: 'Dairy', name: 'Cheese', image: 'cheese.svg', expiryDate: '2024-12-01' },
    { id: 2, category: 'Produce', name: 'Apple', image: 'apple.svg', expiryDate: '2024-12-05' },
    { id: 3, category: 'Produce', name: 'Carrot', image: 'carrot.svg', expiryDate: '2024-12-10' },
    { id: 4, category: 'Dairy', name: 'Milk', image: 'milk.svg', expiryDate: '2024-12-15' },
];

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
    const [ingredients, setIngredients] = useState(() => {
        const savedIngredients = localStorage.getItem('ingredients');
        return savedIngredients ? JSON.parse(savedIngredients) : initialIngredients;
    });

    const [selectedIngredients, setSelectedIngredients] = useState(() => {
        const savedSelected = localStorage.getItem('selectedIngredients');
        return savedSelected ? JSON.parse(savedSelected) : [];
    });

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
    }, [ingredients]);

    useEffect(() => {
        localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
    }, [selectedIngredients]);

    const addIngredient = (ingredient) => {
        setIngredients(prev => [...prev, { ...ingredient, id: Date.now() }]);
    };

    const updateIngredient = (id, updatedIngredient) => {
        setIngredients(prev =>
            prev.map(ing => ing.id === id ? { ...updatedIngredient, id } : ing)
        );
    };

    const deleteIngredient = (id) => {
        setIngredients(prev => prev.filter(ing => ing.id !== id));
        // Also remove from selected ingredients if it exists there
        setSelectedIngredients(prev => prev.filter(ing => ing.id !== id));
    };

    const toggleSelectedIngredient = (ingredient) => {
        setSelectedIngredients(prev => {
            const exists = prev.find(item => item.id === ingredient.id);
            if (exists) {
                return prev.filter(item => item.id !== ingredient.id);
            }
            return [...prev, ingredient];
        });
    };

    // Modified reset function
    const resetToInitialState = () => {
        setIngredients(initialIngredients);
        setSelectedIngredients([]);
        localStorage.setItem('ingredients', JSON.stringify(initialIngredients));
        localStorage.setItem('selectedIngredients', JSON.stringify([]));
    };

    return (
        <DatabaseContext.Provider value={{
            ingredients,
            selectedIngredients,
            addIngredient,
            updateIngredient,
            deleteIngredient,
            toggleSelectedIngredient,
            setSelectedIngredients,
            resetToInitialState // Changed from clearAllData
        }}>
            {children}
        </DatabaseContext.Provider>
    );
}

export const useDatabase = () => useContext(DatabaseContext);