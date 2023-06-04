import { createContext, useState } from "react";

export const Context = createContext({} as ContextState);
interface ContextState {
  favorites: { isOpen: boolean; setIsOpen: any };
  setFavorites: any;
}

const initialValueCart = {
  isOpen: false,
};

const AppContext = ({ children }: any) => {
  const [favorites, setFavorites] = useState<any>(initialValueCart);

  return (
    <Context.Provider value={{ favorites, setFavorites }}>
      {children}
    </Context.Provider>
  );
};

export default AppContext;
