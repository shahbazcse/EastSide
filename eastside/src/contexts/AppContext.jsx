import { createContext, useEffect, useState } from "react";
import { fakeFetch } from "../api/fakeFetch";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      setData(response.data.products);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return <AppContext.Provider value={{ data }}>{children}</AppContext.Provider>;
}
