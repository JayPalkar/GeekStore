import "../../pages/address/address.css";
import { Pencil } from "lucide-react";

const AddressBlock = ({ address, onEdit }) => {
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
        <button
          className="editOverlay"
          onClick={(e) => {
            e.preventDefault();
            onEdit(address);
          }}
        >
          <Pencil />
        </button>
      </button>
    </>
  );
};

export default AddressBlock;
