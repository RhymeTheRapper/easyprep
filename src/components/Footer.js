import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../components/Footer.css';

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
            </div>
            <div
                className={`menu-item ${location.pathname === '/home' ? 'active' : ''}`}
                onClick={() => navigate('/home')}
            >
                <div className="icon home-icon"></div>
            </div>
            <div
                className={`menu-item ${location.pathname === '/profile' ? 'active' : ''}`}
                onClick={() => navigate('/profile')}
            >
                <div className="icon profile-icon"></div>
            </div>
        </footer>
    );
}

export default Footer;