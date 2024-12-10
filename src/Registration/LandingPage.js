import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';
import Logo from '../images/logo.png';

function LandingPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/auth'); // Navigate to your SignUp/SignIn page
    };

    return (
        <div className="landing-page">
            <div className="top-section">
                <div className="background"></div>
            </div>
            <div className="bottom-section">
                <div className="content">
                    <img src={Logo} alt="App Logo" className="logo" />
                    <p>The future of kitchen management starts here.</p>
                    <button className="get-started-btn" onClick={handleGetStarted}>
                        Get Started →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
