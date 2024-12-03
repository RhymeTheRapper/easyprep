import React, { useState } from 'react';
import Footer from '../components/Footer';
import './ProfileScreen.scss';
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

function ProfileScreen() {
    const { userProfile, updateUserPreferences } = useDatabase();
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedDiet, setEditedDiet] = useState(
        new Set(userProfile.preferences?.dietary || [])
    );
    const [editedAllergies, setEditedAllergies] = useState(
        new Set(userProfile.preferences?.allergies || [])
    );

    const diet = userProfile.preferences?.dietary || [];
    const allergies = userProfile.preferences?.allergies || [];
    const dietOptions = [
        { id: "HighProtein", label: "High Protein", icon: HighProtein },
        { id: "GlutenFree", label: "Gluten Free", icon: GlutenFree },
        { id: "Keto", label: "Keto", icon: Keto },
        { id: "LowCalorie", label: "Low Calorie", icon: LowCalorie },
        { id: "LowSugar", label: "Low Sugar", icon: LowSugar },
        { id: "Pescatarian", label: "Pescatarian", icon: Pescatarian },
        { id: "RawFood", label: "Raw Food", icon: RawFood },
        { id: "Vegetarian", label: "Vegetarian", icon: Vegetarian },
        { id: "IntermediateFasting", label: "Intermediate Fasting", icon: IntermediateFasting }
    ];
    const allergiesOptions = [
        { id: "GlutenFree", label: "Gluten Free", icon: GlutenFree },
        { id: "LactoseFree", label: "Lactose Free", icon: LactoseFree },
        { id: "FishFree", label: "Fish Free", icon: FishFree },
        { id: "ShellfishFree", label: "Shellfish Free", icon: ShellfishFree },
        { id: "SodiumFree", label: "Sodium Free", icon: SodiumFree }
    ];

    const handleEdit = () => {
        setShowEditModal(!showEditModal);
    };

    const selectDiet = (diet) => {
        editedDiet.has(diet) ?
            setEditedDiet(prev => new Set([...prev].filter(d => d !== diet))) :
            setEditedDiet(prev => new Set([...prev, diet]));
    };

    const selectAllergies = (allergy) => {
        editedAllergies.has(allergy) ?
            setEditedAllergies(prev => new Set([...prev].filter(a => a !== allergy))) :
            setEditedAllergies(prev => new Set([...prev, allergy]));
    };

    const handleSave = () => {
        const newPreferences = {
            dietary: Array.from(editedDiet),
            allergies: Array.from(editedAllergies)
        };
        updateUserPreferences(newPreferences);
        setShowEditModal(false);
    };

    return (
        <div className="profile-screen">
            <div className="content">
                {showEditModal ? 
                    <div>
                        <div className="edit-preferences">
                            <h2>Select your preferences</h2>
                            <button onClick={handleEdit} className="action-btn">X</button>
                        </div>
                        <div className="preferences">
                            <div className="preferences-content">
                                <h2>Dietary</h2>
                                <ul className="preferences-list">
                                    {dietOptions.map((option) => (
                                        <li
                                            key={option.id}
                                            onClick={() => selectDiet(option.id)}
                                            className={`preferences-list-item ${editedDiet.has(option.id) && "active"}`}
                                        >
                                            <div className="preference-icon">
                                                <img src={option.icon} alt={option.label} />
                                            </div>
                                            <span>{option.label}</span>
                                        </li>
                                    ))}
                                </ul>
                                <br />
                                <h2>Allergies</h2>
                                <ul className="preferences-list">
                                    {allergiesOptions.map((option) => (
                                        <li
                                            key={option.id}
                                            onClick={() => selectAllergies(option.id)}
                                            className={`preferences-list-item ${editedAllergies.has(option.id) && "active"}`}
                                        >
                                            <div className="preference-icon">
                                                <img src={option.icon} alt={option.label} />
                                            </div>
                                            <span>{option.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="save-btn-container">
                            <button onClick={handleSave} className="save-btn">Save</button>
                        </div>
                    </div>
                    :
                    <>
                        <div className="profile-details">
                            <div className="icon profile-icon"></div>
                            <h2>Hello, {userProfile.name}!</h2>
                        </div>
                        <div className="preferences">
                            <div className="preferences-header">
                                <h1>Preferences</h1>
                                <button onClick={handleEdit} className="edit-btn">
                                    <span>✎</span>
                                </button>
                            </div>
                            <div className="preferences-content">
                                <h2>Dietary</h2>
                                <ul>
                                    {diet.map((preference, index) => (
                                        <li className="preferences-list-item" key={index}>
                                            {preference.replace(/([A-Z])/g, ' $1').trim()}
                                        </li>
                                    ))}
                                </ul>
                                <br/>
                                <h2>Allergies</h2>
                                <ul>
                                    {allergies.map((preference, index) => (
                                        <li className="preferences-list-item" key={index}>
                                            {preference.replace(/([A-Z])/g, ' $1').trim()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                }
                
            </div>
        </div>
    );
}

export default ProfileScreen;