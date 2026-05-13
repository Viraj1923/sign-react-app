import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Detect from "./pages/Detect";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";


function Layout() {
  const location = useLocation();

  const hideFooter =
    location.pathname === "/detect";

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/detect"
          element={
            <ProtectedRoute>
              <Detect />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      {!hideFooter && <Footer />}
    </>
  );
}


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;