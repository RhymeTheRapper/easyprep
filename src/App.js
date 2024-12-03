import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Home/HomeScreen';
import RecipeScreen from './Recipes/RecipeScreen';
import ProfileScreen from './Profile/ProfileScreen';
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
                <Route path="/" element={<HomeScreen />} />
                <Route path="/recipes" element={<RecipeScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </Routes>
              <Footer />
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

export default App;