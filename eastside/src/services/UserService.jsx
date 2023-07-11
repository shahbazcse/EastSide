import axios from "axios";
import { toast } from "react-toastify";

export const getAllCategories = async () => {
  const response = await axios.get("/api/categories");
  return response.data.categories;
};

export const getAllProducts = async () => {
  const response = await axios.get("/api/products");
  return response.data.products;
};

export const getProduct = async (productId) => {
  const response = await axios.get(`/api/products/${productId}`);
  return response.data.product;
};

export const getWishlist = async (encodedToken) => {
  const response = await axios.get("/api/user/wishlist", {
    headers: {
      authorization: encodedToken,
    },
  });
  return response.data.wishlist;
};

export const addToWishlist = async (encodedToken, product) => {
  const response = await axios.post(
    "/api/user/wishlist",
    {
      product,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
  toast.success("Added To Wishlist", { position: toast.POSITION.BOTTOM_RIGHT });
  return response.data.wishlist;
};

export const deleteFromWishlist = async (encodedToken, productId) => {
  const response = await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });
  toast.success("Removed From Wishlist", {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  return response.data.wishlist;
};

export const getCart = async (encodedToken) => {
  const response = await axios.get("/api/user/cart", {
    headers: {
      authorization: encodedToken,
    },
  });
  return response.data.cart;
};

export const addToCart = async (encodedToken, product) => {
  const response = await axios.post(
    "/api/user/cart",
    {
      product,
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
  toast.success("Added To Cart", { position: toast.POSITION.BOTTOM_RIGHT });
  return response.data.cart;
};

export const deleteFromCart = async (encodedToken, productId) => {
  const response = await axios.delete(`/api/user/cart/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });
  toast.success("Removed From Cart", { position: toast.POSITION.BOTTOM_RIGHT });
  return response.data.cart;
};

export const updateQuantity = async (encodedToken, updateType, productId) => {
  const response = await axios.post(
    `/api/user/cart/${productId}`,
    {
      action: {
        type: updateType,
      },
    },
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
  updateType === "increment"
    ? toast.success("Quantity Increased", {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    : toast.success("Quantity Decreased", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  return response.data.cart;
};
