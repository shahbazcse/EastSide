import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import {
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  getProduct,
} from "../services/UserService";
import { AuthContext } from "../contexts/AuthContext";
import { ThreeDots } from "react-loader-spinner";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [prod, setProduct] = useState({});
  const { _id, title, price, category, image, rating } = prod;

  const {
    state: { token },
  } = useContext(AuthContext);

  const {
    state: { cart, wishlist },
    dispatch,
  } = useContext(AppContext);

  const handleAddCart = async () => {
    if (token) {
      const cart = await addToCart(token, prod);
      dispatch({ type: "updateCart", payload: cart });
    } else {
      navigate("/login");
    }
  };

  const handleAddWishlist = async () => {
    if (token) {
      const wishlist = await addToWishlist(token, prod);
      dispatch({ type: "updateWishlist", payload: wishlist });
    } else {
      navigate("/login");
    }
  };

  const handleRemoveWishlist = async () => {
    const wishlist = await deleteFromWishlist(token, _id);
    dispatch({ type: "updateWishlist", payload: wishlist });
  };

  const inCart = cart.find(({ _id }) => _id === prod._id);
  const inWishlist = wishlist.find(({ _id }) => _id === prod._id);

  useEffect(() => {
    (async () => {
      const prod = await getProduct(productId);
      setProduct(prod);
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <main className="product-detail-page">
      {loading ? (
        <div className="flex mx-auto items-center left-[50%] bottom-[46%]">
          <ThreeDots
            height="90"
            width="90"
            radius="9"
            color="#424242"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="product-detail-card">
          <div className="product-img">
            <img src={image} alt="Sample" />
          </div>
          <div className="product-detail">
            <div className="product-detail__info">
              <div className="product-detail__info-header">
                <h2 className="product-detail__info-header_name">{title}</h2>
                <span className="product-detail__info-header-rating">
                  {rating?.rate.toFixed(1)}
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                      ></path>
                    </svg>
                  </div>
                </span>
              </div>
              <div className="product-detail__info-price">
                <div className="product-detail__info-price-main">
                  <p className="product-detail__info-price__final">₹{price}</p>
                </div>
              </div>
              <hr />
              <div className="product-detail__info-main">
                <div className="product-detail__info-main__row">
                  <p>
                    <b>Category :</b>
                  </p>
                  <p>{category}</p>
                </div>
                <div className="product-detail__info-main__row">
                  <p>
                    <b>Available In Stock :</b>
                  </p>
                  <p>{rating?.count}</p>
                </div>
              </div>
            </div>
            <div className="product-detail__btn-group">
              <button
                className="product-card__btn `"
                onClick={() =>
                  !inWishlist ? handleAddWishlist() : handleRemoveWishlist()
                }
              >
                {!inWishlist ? "Add to Wishlist" : "Remove from wishlist"}
              </button>
              {!inCart ? (
                <button className="product-card__btn" onClick={handleAddCart}>
                  Add To Cart
                </button>
              ) : (
                <button className="product-card__btn in-cart-btn">
                  <Link
                    to="/cart"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Go to Cart
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
