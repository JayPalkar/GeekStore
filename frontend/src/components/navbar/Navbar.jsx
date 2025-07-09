import { useAuthenticationStore } from "../../store/useAuthenticationStore";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

import {
  ChevronDown,
  CircleUserRound,
  LogOut,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { authUser, logout } = useAuthenticationStore();
  const navigate = useNavigate();

  const handleNavUserButtonEvent = () => {
    if (!authUser) {
      navigate("/login");
    } else {
      setToggleDropdown(!toggleDropdown);
    }
  };

  return (
    <nav>
      <Link to={"/"} className="logoHeader">
        GeekStore
      </Link>
      <div className="navButtons">
        <button onClick={handleNavUserButtonEvent} className="userButton">
          <span className="buttonIcon">
            <UserRound />
          </span>
          <p>Hello, {authUser ? `${authUser.fullName}` : "sign in here"}</p>
          {authUser && (
            <span className={`${toggleDropdown ? "rotateIcon" : ""}`}>
              <ChevronDown />
            </span>
          )}
        </button>
        <button className="cartButton">
          <i className="buttonIcon ">
            <ShoppingCart />
          </i>
          <p>
            Cart
            <br />
            Rs. 00.00
          </p>
        </button>
      </div>
      {toggleDropdown && (
        <div className="dropdownMenu">
          <button
            onClick={() => {
              navigate("/profile");
              setToggleDropdown(false);
            }}
            className="dropdownLink"
          >
            <span>
              <CircleUserRound />
            </span>
            profile
          </button>
          <button
            onClick={() => {
              setToggleDropdown(false);
              logout();
            }}
            className="dropdownLink"
          >
            <span>
              <LogOut />
            </span>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
