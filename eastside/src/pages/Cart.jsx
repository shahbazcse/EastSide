import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../contexts/AppContext";

export default function Cart() {
  const { state } = useContext(AppContext);
  const { cart } = state;
  return (
    <div>
      <h1>Cart</h1>
      <div className="list">
        {cart.map((prod) => (
          <ProductCard {...prod} key={prod.id} />
        ))}
      </div>
    </div>
  );
}
