import { useContext } from "react";
import { Context } from "../context/AppContext";

export const useNewPost = () => {
  const { newPost } = useContext(Context);

  return newPost;
};
