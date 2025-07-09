import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { Eye, EyeClosed } from "lucide-react";
import { useAuthenticationStore } from "../../store/useAuthenticationStore";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthenticationStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back</h1>
      <h3 className="login-subtitle">Login using your email and password</h3>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Your E-mail"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <div className="login-password-container">
          <input
            className="login-password-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="your password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            className="toggle-password-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </button>
        </div>

        <Link className="forgot-password-link" to="/login">
          Forgot Password?
        </Link>

        <button type="submit" className="login-button">
          {isLoggingIn ? "Logging in ..." : "Login"}
        </button>

        <Link className="signup-link" to="/signup">
          Create a new account
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
