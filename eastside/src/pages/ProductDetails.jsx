import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { productId } = useParams();

  const { state } = useContext(AppContext);

  const allProducts = [...state.products];

  const prod = allProducts.find(({ id }) => id === Number(productId));

  return (
    <div className="list" style={{ alignSelf: "center" }}>
      <ProductCard {...prod} />
    </div>
  );
}
