import { useAuthenticationStore } from "../../store/useAuthenticationStore";
import "./navbar.css";

import { ShoppingCart, UserRound } from "lucide-react";

const Navbar = () => {
  const { authUser } = useAuthenticationStore();

  return (
    <nav>
      <h1 className="logoHeader">GeekStore</h1>
      <div className="navButtons">
        <button className="userButton">
          <i className="buttonIcon">
            <UserRound />
          </i>
          <p>Hello, {authUser ? `${authUser.fullName}` : "sign in here"}</p>
        </button>
        <button className="cartButton">
          <i className="buttonIcon">
            <ShoppingCart />
          </i>
          <p>
            Cart
            <br />
            Rs. 00.00
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
