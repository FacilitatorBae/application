import { useContext } from "react";
import { Context } from "../context/AppContext";

export const useCategories = () => {
  const { categories } = useContext(Context);

  return categories;
};
