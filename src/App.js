import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import HomeScreen from './Home/HomeScreen';
import RecipeScreen from './Recipes/RecipeScreen';
import ProfileScreen from './Profile/ProfileScreen';
import RecipeDetails from './Recipes/RecipeDetails';
import SignUpSignIn from './Registration/SignUpSignIn';
import PreferencesSetup from './Registration/PreferencesSetup';
import LandingPage from './Registration/LandingPage';

import { DatabaseProvider, useDatabase } from './DatabaseContext';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <div className="App">
          <ResetDataButton />
          <div className="phone-frame">
            <Routes>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/recipes" element={<RecipeScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
              <Route path="/auth" element={<SignUpSignIn />} />
              <Route path="/preferences-setup" element={<PreferencesSetup />} />
            </Routes>
            <FooterVisibility />
          </div>
        </div>
      </Router>
    </DatabaseProvider>
  );
}

function ResetDataButton() {
  const { resetToInitialState } = useDatabase();

  return (
    <button 
      className="reset-data-button"
      onClick={() => {
        if (window.confirm('Are you sure you want to reset all data to initial state?')) {
          resetToInitialState();
          window.location.reload();
        }
      }}
    >
      Reset to Initial State
    </button>
  );
}

function FooterVisibility() {
  const location = useLocation();
  const footerVisibleRoutes = ['/home', '/recipes', '/profile'];

  return footerVisibleRoutes.includes(location.pathname) ? <Footer /> : null;
}

export default App;
