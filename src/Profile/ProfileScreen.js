import React from 'react';
import './ProfileScreen.scss';
import { useNavigate } from 'react-router-dom';
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
    const { loggedInUser, signOut } = useDatabase();
    const navigate = useNavigate();

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

    if (!loggedInUser) return <p>Please log in to view your profile.</p>;

    const { dietary, allergies } = loggedInUser.profile.preferences;

    const getSelectedOptions = (selectedIds, options) =>
        options.filter(option => selectedIds.includes(option.id));

    const selectedDietary = getSelectedOptions(dietary || [], dietOptions);
    const selectedAllergies = getSelectedOptions(allergies || [], allergiesOptions);

    return (
        <div className="profile-screen">
            <div className="header">
                <h1>
                    Hello, {loggedInUser.profile.name}!
                    <div className="action-buttons">
                        <button
                            className="action-btn"
                            onClick={() => navigate('/preferences-setup', { state: { editMode: true } })}
                            title="Edit Preferences"
                        >
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => {
                                signOut();
                                navigate('/');
                            }}
                            title="Sign Out"
                        >
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </h1>
            </div>
            <div className="preferences-section">
                <h2>Dietary Preferences</h2>
                {selectedDietary.length > 0 ? (
                    <ul className="preferences-list">
                        {selectedDietary.map(option => (
                            <li key={option.id} className="preferences-list-item">
                                <div className="preference-icon">
                                    <img src={option.icon} alt={option.label} />
                                </div>
                                <span>{option.label}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-message">No dietary preferences selected.</p>
                )}
            </div>
            <div className="preferences-section">
                <h2>Allergies</h2>
                {selectedAllergies.length > 0 ? (
                    <ul className="preferences-list">
                        {selectedAllergies.map(option => (
                            <li key={option.id} className="preferences-list-item">
                                <div className="preference-icon">
                                    <img src={option.icon} alt={option.label} />
                                </div>
                                <span>{option.label}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-message">No allergies specified.</p>
                )}
            </div>
        </div>
    );
}

export default ProfileScreen;
