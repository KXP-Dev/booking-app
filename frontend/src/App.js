import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHomePage from './pages/UserHomePage'; // Make sure to import UserHomePage
import AuthPage from './pages/AuthPage'; // Assuming you have an AuthPage for login/register

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<UserHomePage />} />
        {/* ... any other routes */}
      </Routes>
    </Router>
  );
}

export default App;
