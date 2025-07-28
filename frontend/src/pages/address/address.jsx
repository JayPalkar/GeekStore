import { Plus } from "lucide-react";
import AddressBlock from "../../components/address/AddressBlock";
import { useAuthenticationStore } from "../../store/useAuthenticationStore";
import "./address.css";
import AddressModal from "../../components/address/modal/AddressModal";
import { useState } from "react";

const Address = () => {
  const [showModal, setShowModal] = useState(false);

  const { authUser } = useAuthenticationStore();

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <>
      <div className="addressContainer">
        <button
          onClick={(e) => {
            e.preventDefault;
            setShowModal(true);
          }}
          className="addressBlock addAddress"
        >
          <Plus />
        </button>
        {authUser.address.map((address) => (
          <AddressBlock key={address._id} address={address} />
        ))}
      </div>
      {showModal && (
        <div className="modalContianer">
          <AddressModal closeModal={closeModal} />
        </div>
      )}
    </>
  );
};

export default Address;
