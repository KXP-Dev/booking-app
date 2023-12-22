import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import UserHomePage from './pages/UserHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<UserHomePage />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
}

export default App;
