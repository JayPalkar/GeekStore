import "../../pages/address/address.css";
import { Pencil } from "lucide-react";

const AddressBlock = ({ address }) => {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault;
          console.log(address._id);
        }}
        className="addressBlock"
      >
        <p>
          {address.street}, {address.city}
        </p>
        <p>{address.state}</p>
        <p>
          {address.country}, {address.zip}
        </p>
        <div className="editOverlay">
          <Pencil />
        </div>
      </button>
    </>
  );
};

export default AddressBlock;
