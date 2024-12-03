import React, { createContext, useContext, useState, useEffect } from 'react';

const initialIngredients = [
    { id: 1, category: 'Dairy', name: 'Parmesan', image: 'cheese.svg', expiryDate: '2024-12-01' },
    { id: 2, category: 'Produce', name: 'Apple', image: 'apple.svg', expiryDate: '2024-12-05' },
    { id: 3, category: 'Produce', name: 'Carrot', image: 'carrot.svg', expiryDate: '2024-12-10' },
    { id: 4, category: 'Dairy', name: 'Milk', image: 'milk.svg', expiryDate: '2024-12-15' },
    { id: 5, category: 'Dairy', name: 'Butter', image: 'milk.svg', expiryDate: '2024-12-20' },
    { id: 6, category: 'Dairy', name: 'Eggs', image: 'egg.svg', expiryDate: '2024-12-25' },
];

const initialUserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    preferences: {
        dietary: ["IntermediateFasting"],
        allergies: [],
    }
};

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
    // Initialize states with localStorage or default values
    const [ingredients, setIngredients] = useState(() => {
        const savedIngredients = localStorage.getItem('ingredients');
        return savedIngredients ? JSON.parse(savedIngredients) : initialIngredients;
    });

    const [selectedIngredients, setSelectedIngredients] = useState(() => {
        const savedSelected = localStorage.getItem('selectedIngredients');
        return savedSelected ? JSON.parse(savedSelected) : [];
    });

    const [userProfile, setUserProfile] = useState(() => {
        const savedProfile = localStorage.getItem('userProfile');
        return savedProfile ? JSON.parse(savedProfile) : initialUserProfile;
    });

    // Combined useEffect for all localStorage updates
    useEffect(() => {
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }, [ingredients, selectedIngredients, userProfile]);

    const addIngredient = (ingredient) => {
        setIngredients(prev => [...prev, { ...ingredient, id: Date.now() }]);
    };

    const updateIngredient = (id, updatedIngredient) => {
        setIngredients(prev =>
            prev.map(ing => ing.id === id ? { ...updatedIngredient, id } : ing)
        );
    };

    const updateUserPreferences = (preferences) => {
        setUserProfile(prev => ({ ...prev, preferences: preferences }));
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

    const value = {
        ingredients,
        selectedIngredients,
        addIngredient,
        updateIngredient,
        deleteIngredient,
        toggleSelectedIngredient,
        setSelectedIngredients,
        resetToInitialState,
        userProfile,
        setUserProfile,
        updateUserPreferences
    };

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    );
}

export function useDatabase() {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
}