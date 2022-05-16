import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import DashboardScreen from './Screens/DashboardScreen.js';
import PrivateRoute from './PrivateRoute';
import LoginScreen from './Screens/LoginScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute/>}/>
        <Route path="/dashboard" element={<DashboardScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
