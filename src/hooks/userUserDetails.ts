import { useContext } from "react";
import { Context } from "../context/AppContext";

export const useUserDetails = () => {
  const { userDetails } = useContext(Context);

  return userDetails;
};
