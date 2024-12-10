import React, { createContext, useContext, useState, useEffect } from 'react';

const initialIngredients = [
    { id: 1, category: 'Dairy', name: 'Parmesan', image: 'cheese.svg', expiryDate: '2024-12-01' },
    { id: 2, category: 'Produce', name: 'Apple', image: 'apple.svg', expiryDate: '2024-12-05' },
    { id: 3, category: 'Produce', name: 'Carrots', image: 'carrot.svg', expiryDate: '2024-12-10' },
    { id: 4, category: 'Dairy', name: 'Milk', image: 'milk.svg', expiryDate: '2024-12-15' },
    { id: 5, category: 'Dairy', name: 'Butter', image: 'milk.svg', expiryDate: '2024-12-20' },
    { id: 6, category: 'Dairy', name: 'Eggs', image: 'egg.svg', expiryDate: '2024-12-25' },
];

const initialUsers = [
    {
        email: "john.doe@example.com",
        password: "password123", 
        profile: {
            name: "John Doe",
            preferences: {
                dietary: ["IntermediateFasting"],
                allergies: [],
            }
        }
    }
];

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
    // Ingredients management
    const [ingredients, setIngredients] = useState(() => {
        const savedIngredients = localStorage.getItem('ingredients');
        return savedIngredients ? JSON.parse(savedIngredients) : initialIngredients;
    });

    const [selectedIngredients, setSelectedIngredients] = useState(() => {
        const savedSelected = localStorage.getItem('selectedIngredients');
        return savedSelected ? JSON.parse(savedSelected) : [];
    });

    // User authentication and profile management
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    });

    const [loggedInUser, setLoggedInUser] = useState(() => {
        const savedUser = localStorage.getItem('loggedInUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Persist data to localStorage
    useEffect(() => {
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }, [ingredients, selectedIngredients, users, loggedInUser]);

    // Ingredient management
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
        setSelectedIngredients(prev => prev.filter(ing => ing.id !== id)); // Remove from selected
    };

    const toggleSelectedIngredient = (ingredient) => {
        setSelectedIngredients(prev => {
            const exists = prev.find(item => item.id === ingredient.id);
            return exists ? prev.filter(item => item.id !== ingredient.id) : [...prev, ingredient];
        });
    };

    const resetToInitialState = () => {
        setIngredients(initialIngredients);
        setSelectedIngredients([]);
        localStorage.setItem('ingredients', JSON.stringify(initialIngredients));
        localStorage.setItem('selectedIngredients', JSON.stringify([]));
    };

    // User preferences
    const updateUserPreferences = (preferences) => {
        if (loggedInUser) {
            const updatedUsers = users.map(user =>
                user.email === loggedInUser.email
                    ? { ...user, profile: { ...user.profile, preferences } }
                    : user
            );
            setUsers(updatedUsers);
            setLoggedInUser({ ...loggedInUser, profile: { ...loggedInUser.profile, preferences } });
        }
    };

    // Authentication
    const signUp = (email, password, name) => {
        if (users.find(user => user.email === email)) {
            throw new Error("Email is already registered");
        }
    
        const newUser = {
            email,
            password,
            profile: {
                name,
                preferences: {
                    dietary: [],
                    allergies: []
                }
            }
        };
    
        setUsers([...users, newUser]);
        setLoggedInUser(newUser);
    };    

    const signIn = (email, password) => {
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            throw new Error("Invalid email or password");
        }

        setLoggedInUser(user);
    };

    const signOut = () => {
        setLoggedInUser(null);
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
        loggedInUser,
        users,
        signUp,
        signIn,
        signOut,
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
