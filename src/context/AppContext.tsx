import React, { type PropsWithChildren, createContext, useState } from "react";
// TODO: Use Product type generated from prisma types
import { type FakeProduct } from "~/types";

interface ContextState {
  favorites: {
    isOpen: boolean;
    items: FakeProduct[];
    togglePanel: () => void;
    add: (product: FakeProduct) => void;
    remove: (product: FakeProduct) => void;
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
  const [favoritesItems, setFavoritesItems] = useState<FakeProduct[]>([]);

  const addFavorite = (product: FakeProduct) => {
    const isAlreadyFaved = favoritesItems.find(
      (item) => item.id === product.id
    );

    if (isAlreadyFaved) return;

    setFavoritesItems((prev) => [...prev, product]);
  };

  const removeFavorite = (product: FakeProduct) => {
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
