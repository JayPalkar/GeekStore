import { useState } from "react";
import "./addressModal.css";

const AddressModal = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  return (
    <div className="addressModal">
      <input
        type="text"
        placeholder="Street"
        value={address.street}
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        value={address.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
      />
      <input
        type="text"
        placeholder="State"
        value={address.State}
        onChange={(e) => setAddress({ ...address, State: e.target.value })}
      />
      <input
        type="text"
        placeholder="Country"
        value={address.country}
        onChange={(e) => setAddress({ ...address, country: e.target.value })}
      />
      <input
        type="number"
        placeholder="Postal Code"
        value={address.zip}
        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
      />
    </div>
  );
};

export default AddressModal;
