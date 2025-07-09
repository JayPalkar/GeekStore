import { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { Eye, EyeClosed } from "lucide-react";
import { useAuthenticationStore } from "../../store/useAuthenticationStore";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const { register, isSigningUp } = useAuthenticationStore();

  const validateFormData = (formData) => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please Enter a valid email";
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 10 digit";
    }

    const password = formData.password;
    if (!password) {
      errors.password = "Password is required";
    } else {
      if (password.length < 8) {
        errors.password = "Password must contain at least 8 characters";
      } else if (!/[A-Z]/.test(password)) {
        errors.password = "Password must include an uppercase letter";
      } else if (!/[!@#$%^&*(),.?:{}|<>]/.test(password)) {
        errors.password = "Password must include a special character";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFormData(formData)) {
      console.log(formData);
      register(formData);
    } else {
      console.log("form has errors:", formErrors);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Welcome to GeekStore</h1>
      <h3 className="signup-subtitle">
        One stop Market for all the{" "}
        <strong>
          <em>GAMING & COMPUTER</em>
        </strong>{" "}
        GEEKS out there
      </h3>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          className="signup-input"
          type="text"
          name="fullName"
          placeholder="Your full name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        {formErrors.fullName && (
          <p className="errorText">{formErrors.fullName}</p>
        )}
        <input
          className="signup-input"
          type="email"
          name="email"
          placeholder="Your E-mail"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {formErrors.email && <p className="errorText">{formErrors.email}</p>}
        <input
          className="signup-input"
          type="text"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {formErrors.phone && <p className="errorText">{formErrors.phone}</p>}
        <div className="signup-password-container">
          <input
            className="signup-password-input"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="your password"
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
        {formErrors.password && (
          <p className="errorText">{formErrors.password}</p>
        )}

        <button type="submit" className="signup-button">
          {isSigningUp ? "signing in ..." : "Sign Up"}
        </button>

        <Link className="login-link" to="/login">
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
