import "./profilePage.css";

import { useNavigate } from "react-router-dom";

import orders from "../../assets/accountsAssets/orders.png";
import address from "../../assets/accountsAssets/address.png";
import seller from "../../assets/accountsAssets/seller.png";
import contactUs from "../../assets/accountsAssets/contactUs.png";
import product from "../../assets/accountsAssets/product.png";
import { useAuthenticationStore } from "../../store/useAuthenticationStore";

const ProfilePage = () => {
  const { authUser } = useAuthenticationStore();
  const navigate = useNavigate();

  return (
    <div className="accountContainer">
      <h1 className="accountHeader">Your Account</h1>
      <div className="accountButtonsContainer">
        <button className="accountButton">
          {" "}
          <span className="buttonImageContainer">
            <img src={orders} alt="" />
          </span>{" "}
          Your Orders
        </button>
        <button
          className="accountButton"
          onClick={() => {
            navigate("/address");
          }}
        >
          {" "}
          <span className="buttonImageContainer">
            <img src={address} alt="" />
          </span>{" "}
          Your Addresses
        </button>
        <button className="accountButton">
          {authUser ? (
            <>
              <span className="buttonImageContainer">
                <img src={product} alt="" />
              </span>{" "}
              Add New Product
            </>
          ) : (
            <>
              {" "}
              <span className="buttonImageContainer">
                <img src={seller} alt="" />
              </span>{" "}
              Become A Seller
            </>
          )}
        </button>
        <button className="accountButton">
          {" "}
          <span className="buttonImageContainer">
            <img src={contactUs} alt="" />
          </span>{" "}
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
