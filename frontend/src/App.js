import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar'; // Import your Navbar
import AddEmployee from "./AddEmployee";
import ViewProfile from "./ViewProfile";
import Login from './Login';
import Password from './Password';
import Email from './Email';



// Wrapper component to conditionally render the Navbar
const ConditionalNavbar = () => {
  const location = useLocation();

  return (
    <>
      {/* Render Navbar only on the home page */}
      {location.pathname === '/view-profile' && <Navbar />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ConditionalNavbar /> {/* Navbar will only show on the home page */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/password" element={<Password />} />
        <Route path="/home" element={<Home />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/email" element={<Email/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
