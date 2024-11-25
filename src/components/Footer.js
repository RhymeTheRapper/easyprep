import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <footer className="footer">
            <div
                className={`menu-item ${location.pathname === '/recipes' ? 'active' : ''}`}
                onClick={() => navigate('/recipes')}
            >
                <div className="icon recipe-icon"></div>
                <span>Recipes</span>
            </div>
            <div
                className={`menu-item ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => navigate('/')}
            >
                <div className="icon home-icon"></div>
                <span>Home</span>
            </div>
            <div
                className={`menu-item ${location.pathname === '/profile' ? 'active' : ''}`}
                onClick={() => navigate('/profile')}
            >
                <div className="icon profile-icon"></div>
                <span>Profile</span>
            </div>
        </footer>
    );
}

export default Footer;