import React, { useState } from 'react';
import { useDatabase } from '../DatabaseContext';
import { useNavigate } from 'react-router-dom';
import './SignUpSignIn.scss';
import Logo from '../images/logo.png'; // Assuming the same logo as in your landing page

function SignUpSignIn() {
    const navigate = useNavigate();
    const { signUp, signIn, loggedInUser, signOut } = useDatabase();
    const [isSigningUp, setIsSigningUp] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '' // Only for sign-up
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSigningUp) {
                await signUp(formData.email, formData.password, formData.name);
                navigate('/preferences-setup'); // Redirect new user to preferences setup
            } else {
                await signIn(formData.email, formData.password);
                navigate('/profile'); // Redirect existing user to their profile
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (loggedInUser) {
        return (
            <div className="signed-in-container">
                <h1>Welcome, {loggedInUser.profile.name}!</h1>
                <button onClick={signOut}>Sign Out</button>
            </div>
        );
    }

    return (
        <div className="sign-up-sign-in">
            <div className="logo-container">
                <img src={Logo} alt="App Logo" className="logo" />
            </div>
            <h1>{isSigningUp ? "Sign Up" : "Sign In"}</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                {isSigningUp && (
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    {isSigningUp ? "Sign Up" : "Sign In"}
                </button>
            </form>
            <button className="switch-btn" onClick={() => setIsSigningUp(!isSigningUp)}>
                {isSigningUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
}

export default SignUpSignIn;
