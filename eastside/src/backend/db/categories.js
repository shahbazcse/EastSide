import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Men's Clothing",
    description:
      "Typical men's clothes include trousers, shirts, jeans, suits, sweaters, gloves, jackets, and hats.",
  },
  {
    _id: uuid(),
    categoryName: "Women's Clothing",
    description:
      "Typical men's clothes include salwar suits, saaris, lehnga etc. in Indian tradition and Skirts, shirts, sweaters, trousers, coats, chemises, and jeans.",
  },
  {
    _id: uuid(),
    categoryName: "Jewellery",
    description:
      "Jewelry collection is comprised of a group of pieces that share a similar theme, metal, style, element, or feel.",
  },
  {
    _id: uuid(),
    categoryName: "Electronics",
    description:
      "Mobile Devices, Wearables, TVs, Set Top Boxes, Monitors, Laptops, Tablets, Computers, Computers, Printers, Scanners",
  },
];
