import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './component/Register';
import Login from './component/Login';
import ResetPassword from './component/ResetPassword';
import Home from './component/Home';

function App() {
  const [token, setToken] = useState('');
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<Home/>} />  
          <Route path="/forgetpassd" element={<ResetPassword />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
