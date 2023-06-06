import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Men's Clothing",
  },
  {
    _id: uuid(),
    categoryName: "Women's Clothing",
  },
  {
    _id: uuid(),
    categoryName: "Jewellery",
  },
  {
    _id: uuid(),
    categoryName: "Electronics",
  },
];
