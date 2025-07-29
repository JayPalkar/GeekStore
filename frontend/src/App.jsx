import "./app.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage";
import SignupPage from "./pages/signup/signupPage";
import LoginPage from "./pages/login/loginPage";
import Navbar from "./components/navbar/Navbar";
import { useAuthenticationStore } from "./store/useAuthenticationStore";
import { useEffect } from "react";
import ProfilePage from "./pages/profile/profilePage";
import Address from "./pages/address/address";
import MyProducts from "./pages/myProducts/myProducts";
import CreateProduct from "./pages/myProducts/CreateProduct";

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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/address" element={<Address />} />
        <Route path="/my-products" element={<MyProducts />} />
        <Route path="create-product" element={<CreateProduct />} />
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
