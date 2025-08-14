import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
// Importing core components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detect from "./pages/Detect";
import Footer from "./components/footer";

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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Footer></Footer>
    </Router>
  );
}

export default App;
