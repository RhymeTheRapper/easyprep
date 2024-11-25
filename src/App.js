import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './Home/HomeScreen';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHome,
  faBook, faUser); // Add your desired icons here
function App() {
  return (
    <div className="App" style={{ width: '100%', height: '100vh' }}>
      <div className="phone-frame" style={{ paddingTop: '75px' }}>
        <div className="app-container">
          <HomeScreen />
        </div>
      </div>
    </div>
  );
}

export default App;