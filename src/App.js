import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
// Importing core components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detect from "./pages/Detect";

function App() {
  return (
    <Router>
      {/* Persistent navigation bar */}
      <Navbar />

      {/* Defining routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detect" element={
          <ProtectedRoute>
            <Detect />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
