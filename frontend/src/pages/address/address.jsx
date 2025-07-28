import { Plus } from "lucide-react";
import AddressBlock from "../../components/address/AddressBlock";
import { useAuthenticationStore } from "../../store/useAuthenticationStore";
import "./address.css";
import AddressModal from "../../components/address/modal/AddressModal";

const Address = () => {
  const { authUser } = useAuthenticationStore();

  console.log(authUser.address);

  return (
    <>
      <div className="addressContainer">
        <button className="addressBlock addAddress">
          <Plus />
        </button>
        {authUser.address.map((address) => (
          <AddressBlock key={address._id} address={address} />
        ))}
      </div>
      <div className="modalContianer">
        <AddressModal />
      </div>
    </>
  );
};

export default Address;
