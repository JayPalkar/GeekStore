import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const navigate = useNavigate();
  return (
    <div className="myProductsContainer">
      <button
        onClick={() => {
          navigate("/create-product");
        }}
      >
        ✨ Create New Product
      </button>
    </div>
  );
};

export default MyProducts;
