import "./app.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage";
import SignupPage from "./pages/signup/signupPage";
import LoginPage from "./pages/login/loginPage";
import AllProducts from "./pages/allProducts";
import Navbar from "./components/navbar/Navbar";
import { useAuthenticationStore } from "./store/useAuthenticationStore";
import { useEffect } from "react";

const App = () => {
  const { checkAuthentication, isCheckingAuth } = useAuthenticationStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isCheckingAuth) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<AllProducts />} />
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
