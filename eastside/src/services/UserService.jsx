import axios from "axios";

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
  return response.data.wishlist;
};

export const deleteFromWishlist = async (encodedToken, productId) => {
  const response = await axios.delete(
    `/api/user/wishlist/${productId}`,
    {
      headers: {
        authorization: encodedToken,
      },
    }
  );
  return response.data.wishlist;
};
