import React from 'react';
import Footer from '../components/Footer';
import './ProfileScreen.css';
import { useDatabase } from '../DatabaseContext';

function ProfileScreen() {
    const { userProfile } = useDatabase();

    return (
        <div className="profile-screen">
            <header className="header">
                <h1>My Profile</h1>
            </header>
            <div className="content">
                <div className="profile-details">
                    <h2>User Information</h2>
                    <p><strong>Name:</strong> {userProfile.name}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                </div>
                <div className="preferences">
                    <h2>Preferences</h2>
                    <ul>
                        {userProfile.preferences.map((preference, index) => (
                            <li key={index}>{preference}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfileScreen;