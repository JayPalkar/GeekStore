import { Plus } from "lucide-react";
import AddressBlock from "../../components/address/AddressBlock";
import { useAuthenticationStore } from "../../store/useAuthenticationStore";
import "./address.css";
import AddressModal from "../../components/address/modal/AddressModal";
import { useEffect, useState } from "react";

const Address = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const { authUser } = useAuthenticationStore();

  useEffect(() => {
    if (authUser?.address) {
      setAddresses(authUser.address);
    }
  }, [authUser]);

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  const handleAddressChange = (newAddress, isUpdate = false) => {
    if (isUpdate) {
      setAddresses((prev) =>
        prev.map((addr) => (addr._id === newAddress._id ? newAddress : addr))
      );
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }
    closeModal();
  };

  const openModalForEdit = (address) => {
    setSelectedAddress(address);
    setShowModal(true);
  };

  return (
    <>
      <div className="addressContainer">
        <button
          onClick={(e) => {
            e.preventDefault;
            setSelectedAddress(null);
            setShowModal(true);
          }}
          className="addressBlock addAddress"
        >
          <Plus />
        </button>
        {addresses.map((address) => (
          <AddressBlock
            key={address._id}
            address={address}
            onEdit={openModalForEdit}
          />
        ))}
      </div>
      {showModal && (
        <div className="modalContianer">
          <AddressModal
            closeModal={closeModal}
            existingAddress={selectedAddress}
            onAddressChange={handleAddressChange}
          />
        </div>
      )}
    </>
  );
};

export default Address;
