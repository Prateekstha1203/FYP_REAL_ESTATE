import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationProvider } from "./context/authentication";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/common/navbar/Navbar";
import Account_Activate from "./pages/authentication/accountActivate";
function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/auth/account-activate/:token"
            element={<Account_Activate />}
          />
        </Routes>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
