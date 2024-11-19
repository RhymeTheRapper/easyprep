import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Home/HomeScreen';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHome,
  faBook, faUser); // Add your desired icons here
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {/* <Route path="/recipes"
          element={<RecipeBrowserScreen />} /> */}
        {/* <Route path="/profile" element={<ProfileScreen />} /> */}
      </Routes>
    </Router>
  );
}

export default App;