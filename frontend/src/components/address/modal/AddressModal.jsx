import { useState } from "react";
import "./addressModal.css";
import { X } from "lucide-react";
import { useUserStore } from "../../../store/useUserStore";

const AddressModal = ({ closeModal }) => {
  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const { addUserAddress, isUpdatingUser } = useUserStore();

  const addNewAddress = () => {
    addUserAddress({ address: addressData });
    closeModal();
  };

  return (
    <div className="addressModal">
      <button
        onClick={(e) => {
          e.preventDefault;
          closeModal();
        }}
        className="closeModalButton"
      >
        <X />
      </button>
      <input
        className="formInput"
        type="text"
        placeholder="Street"
        value={addressData.street}
        onChange={(e) =>
          setAddressData({ ...addressData, street: e.target.value })
        }
      />
      <input
        className="formInput"
        type="text"
        placeholder="City"
        value={addressData.city}
        onChange={(e) =>
          setAddressData({ ...addressData, city: e.target.value })
        }
      />
      <input
        className="formInput"
        type="text"
        placeholder="State"
        value={addressData.state}
        onChange={(e) =>
          setAddressData({ ...addressData, state: e.target.value })
        }
      />
      <input
        className="formInput"
        type="text"
        placeholder="Country"
        value={addressData.country}
        onChange={(e) =>
          setAddressData({ ...addressData, country: e.target.value })
        }
      />
      <input
        className="formInput"
        type="text"
        inputMode={"numeric"}
        pattern="\d{6}"
        maxLength="6"
        placeholder="Postal Code"
        value={addressData.zip}
        onChange={(e) =>
          setAddressData({ ...addressData, zip: e.target.value })
        }
        onInput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6)"
      />

      <button onClick={addNewAddress} className="submitAddressFormButton">
        {isUpdatingUser ? "Adding Address..." : "Add Address"}
      </button>
    </div>
  );
};

export default AddressModal;
