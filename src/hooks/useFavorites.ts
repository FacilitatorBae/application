import { useContext } from "react";
import { Context } from "./../context/AppContext";

export const useFavorites = () => {
  const { favorites } = useContext(Context);

  return favorites;
};
