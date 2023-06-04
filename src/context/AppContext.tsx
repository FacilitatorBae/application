import { createContext, useState } from "react";

export const Context = createContext({} as ContextState);
interface ContextState {
  favorites: {
    isOpen: boolean;
    items: Array<{
      id: string;
      title: string;
      image: string;
      price: number;
      fee: number;
      isHot: boolean;
      isBusiness: boolean;
      isNew: boolean;
    }>;
  };
  setFavorites: any;
}

const initialValueFavs = {
  isOpen: false,
  items: [],
};

const AppContext = ({ children }: any) => {
  const [favorites, setFavorites] = useState<any>(initialValueFavs);

  return (
    <Context.Provider value={{ favorites, setFavorites }}>
      {children}
    </Context.Provider>
  );
};

export default AppContext;
