import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import CartItemsCard from "../components/CartItemsCard";
import { getCart } from "../services/UserService";
import { AuthContext } from "../contexts/AuthContext";

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useContext(AppContext);

  const {
    state: { token },
  } = useContext(AuthContext);

  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);

  const totalItems = cart.reduce((acc, { qty }) => acc + qty, 0);

  const itemCount = cart.length > 0;

  useEffect(() => {
    (async () => {
      const cart = await getCart(token);
      dispatch({ type: "updateCart", payload: cart });
    })();
  }, []);

  console.log(cart);

  return (
    <main className="cart-page">
      <h2 className="cart-header">Cart ({cart.length})</h2>
      {itemCount ? (
        <div className="cart-main-container">
          <div className="cart-items-container">
            {cart.map((prod) => (
              <CartItemsCard {...prod} key={prod.id} />
            ))}
          </div>

          <div className="cart-order-details-container">
            <h2 className="order-title">CART PRICE DETAILS</h2>
            <div className="order-details__row">
              <p>
                <b>Total Items:</b>
              </p>
              <p className="order-price">{totalItems}</p>
            </div>
            <div className="order-details__row">
              <p>
                <b>Total Price :</b>{" "}
              </p>
              <p className="order-price">₹ {totalPrice.toFixed()}</p>
            </div>
            <hr />
            <Link to="/checkout">
              <button className="checkout-btn">Checkout</button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="cart-empty">Empty Cart!</p>
      )}
    </main>
  );
}
