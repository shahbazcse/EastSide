import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "men's clothing",
    description: "Men's Clothing",
  },
  {
    _id: uuid(),
    categoryName: "jewelery",
    description: "Wide range of jewelery",
  },
  {
    _id: uuid(),
    categoryName: "electronics",
    description: "High performance electronics",
  },
  {
    _id: uuid(),
    categoryName: "women's clothing",
    description: "Women's Clothing",
  },
];
