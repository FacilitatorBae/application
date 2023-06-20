import { type Product } from "@prisma/client";
import React, { type PropsWithChildren, createContext, useState } from "react";

interface ContextState {
  favorites: {
    isOpen: boolean;
    items: Product[];
    togglePanel: () => void;
    add: (product: Product) => void;
    remove: (product: Product) => void;
  };
}

const initialContext: ContextState = {
  favorites: {
    isOpen: false,
    items: [],
    togglePanel: () => ({}),
    add: () => ({}),
    remove: () => ({}),
  },
};

export const Context = createContext<ContextState>(initialContext);

const AppContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [favoritesIsOpen, setFavoritesIsOpen] = useState(false);
  const [favoritesItems, setFavoritesItems] = useState<Product[]>([]);

  const addFavorite = (product: Product) => {
    const isAlreadyFaved = favoritesItems.find(
      (item) => item.id === product.id
    );

    if (isAlreadyFaved) return;

    setFavoritesItems((prev) => [...prev, product]);
  };

  const removeFavorite = (product: Product) => {
    setFavoritesItems((prev) => prev.filter((fav) => fav.id !== product.id));
  };

  return (
    <Context.Provider
      value={{
        favorites: {
          isOpen: favoritesIsOpen,
          items: favoritesItems,
          togglePanel: () => setFavoritesIsOpen((prev) => !prev),
          add: addFavorite,
          remove: removeFavorite,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
