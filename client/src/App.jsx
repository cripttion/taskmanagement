import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/login/Login'; // Import your Login page component
import './App.css';
import Signup from './pages/singup/Signup';
import { Home } from './pages/home/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/Home' element={<Home />}  />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />

          {/* Add other routes/components as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
