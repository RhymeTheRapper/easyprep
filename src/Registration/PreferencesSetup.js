import React, { useState, useEffect } from 'react';
import './PreferencesSetup.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDatabase } from '../DatabaseContext';
import GlutenFree from '../images/GlutenFree.svg';
import HighProtein from '../images/HighProtein.svg';
import Keto from '../images/Keto.svg';
import LowCalorie from '../images/LowCalories.svg';
import LowSugar from '../images/LowSugar.svg';
import Pescatarian from '../images/Pescatarian.svg';
import RawFood from '../images/RawFood.svg';
import Vegetarian from '../images/vegetarian.svg';
import LactoseFree from '../images/LactoseFree.svg';
import FishFree from '../images/FishFree.svg';
import ShellfishFree from '../images/ShellfishFree.svg';
import SodiumFree from '../images/SodiumFree.svg';
import IntermediateFasting from '../images/IntermediateFasting.svg';

function PreferencesSetup({ onComplete }) {
    const navigate = useNavigate();
    const location = useLocation();
    const editMode = location.state?.editMode || false;
    const { loggedInUser, updateUserPreferences } = useDatabase();

    const [editedDiet, setEditedDiet] = useState(new Set());
    const [editedAllergies, setEditedAllergies] = useState(new Set());

    const dietOptions = [
        { id: "HighProtein", label: "High Protein", icon: HighProtein },
        { id: "Keto", label: "Keto", icon: Keto },
        { id: "LowCalorie", label: "Low Calorie", icon: LowCalorie },
        { id: "LowSugar", label: "Low Sugar", icon: LowSugar },
        { id: "Pescatarian", label: "Pescatarian", icon: Pescatarian },
        { id: "RawFood", label: "Raw Food", icon: RawFood },
        { id: "Vegetarian", label: "Vegetarian", icon: Vegetarian },
        { id: "IntermediateFasting", label: "Intermediate Fasting", icon: IntermediateFasting },
    ];

    const allergiesOptions = [
        { id: "GlutenFree", label: "Gluten Free", icon: GlutenFree },
        { id: "LactoseFree", label: "Lactose Free", icon: LactoseFree },
        { id: "FishFree", label: "Fish Free", icon: FishFree },
        { id: "ShellfishFree", label: "Shellfish Free", icon: ShellfishFree },
        { id: "SodiumFree", label: "Sodium Free", icon: SodiumFree },
    ];

    useEffect(() => {
        if (editMode && loggedInUser?.profile.preferences) {
            setEditedDiet(new Set(loggedInUser.profile.preferences.dietary || []));
            setEditedAllergies(new Set(loggedInUser.profile.preferences.allergies || []));
        }
    }, [editMode, loggedInUser]);

    const selectDiet = (diet) => {
        editedDiet.has(diet)
            ? setEditedDiet(prev => new Set([...prev].filter(d => d !== diet)))
            : setEditedDiet(prev => new Set([...prev, diet]));
    };

    const selectAllergies = (allergy) => {
        editedAllergies.has(allergy)
            ? setEditedAllergies(prev => new Set([...prev].filter(a => a !== allergy)))
            : setEditedAllergies(prev => new Set([...prev, allergy]));
    };

    const handleSave = () => {
        if (!loggedInUser) return;

        const newPreferences = {
            dietary: Array.from(editedDiet),
            allergies: Array.from(editedAllergies),
        };

        updateUserPreferences(newPreferences);
        navigate('/profile');
    };

    if (!loggedInUser) return <p>Please sign in to continue.</p>;

    return (
        <div className="preferences-setup">
            <h1>{editMode ? 'Edit Your Preferences' : 'Set Up Your Preferences'}</h1>
            <div className="preferences-section">
                <h2>Dietary Preferences</h2>
                <ul className="preferences-list">
                    {dietOptions.map(option => (
                        <li
                            key={option.id}
                            onClick={() => selectDiet(option.id)}
                            className={`preferences-list-item ${editedDiet.has(option.id) && 'active'}`}
                        >
                            <div className="preference-icon">
                                <img src={option.icon} alt={option.label} />
                            </div>
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="preferences-section">
                <h2>Allergies</h2>
                <ul className="preferences-list">
                    {allergiesOptions.map(option => (
                        <li
                            key={option.id}
                            onClick={() => selectAllergies(option.id)}
                            className={`preferences-list-item ${editedAllergies.has(option.id) && 'active'}`}
                        >
                            <div className="preference-icon">
                                <img src={option.icon} alt={option.label} />
                            </div>
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="save-btn" onClick={handleSave}>
                Save Preferences
            </button>
        </div>
    );
}

export default PreferencesSetup;