import { type Product, type Category } from "@prisma/client";
import React, { type PropsWithChildren, createContext, useState } from "react";

interface ContextState {
  favorites: {
    isOpen: boolean;
    items: Product[];
    togglePanel: () => void;
    add: (product: Product) => void;
    remove: (product: Product) => void;
  };
  categories: {
    allCategories: Category[];
    setCategories: (categories: Category[]) => void;
  };
  newPost: {
    activeStep: number;
    newPostDetails: {
      title?: string;
      condition?: string;
      price?: string;
      fees?: string;
      description?: string;
      pictures?: string[];
      id?: string;
    };
    updateNewPostDetails: (key: string, value: string | string[]) => void;
    resetNewPostData: () => void;
    pickedCategories: { id: number; name: string; parentId?: number }[];
    addPickedCategory: (item: { id: number; name: string }) => void;
    removePickedCategory: (item: { id: number; name: string }) => void;
    resetPickedCategories: () => void;
    next: () => void;
    prev: () => void;
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
  categories: { allCategories: [], setCategories: () => ({}) },
  newPost: {
    activeStep: 1,
    newPostDetails: {},
    resetNewPostData: () => ({}),
    updateNewPostDetails: () => ({}),
    pickedCategories: [],
    addPickedCategory: () => ({}),
    removePickedCategory: () => ({}),
    resetPickedCategories: () => ({}),
    next: () => ({}),
    prev: () => ({}),
  },
};

export const Context = createContext<ContextState>(initialContext);

const AppContext: React.FC<PropsWithChildren> = ({ children }) => {
  const [favoritesIsOpen, setFavoritesIsOpen] = useState(false);
  const [favoritesItems, setFavoritesItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeStep, setActiveStep] = useState(1);
  const [newPostDetails, setNewPostDetails] = useState({});
  const [pickedCategories, setPickedCategories] = useState<
    { id: number; name: string }[]
  >([]);

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

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const updateNewPostDetails = (key: string, value: string | string[]) => {
    setNewPostDetails((prev) => ({ ...prev, [key]: value }));
  };

  const addPickedCategory = (item: { id: number; name: string }) => {
    setPickedCategories((prev) => [...prev, item]);
  };

  const removePickedCategory = (item: { id: number; name: string }) => {
    setPickedCategories(
      pickedCategories.slice(0, pickedCategories.indexOf(item) + 1)
    );
  };

  const resetPickedCategories = () => {
    setPickedCategories([]);
  };

  const resetNewPostData = () => {
    setActiveStep(1);
    setNewPostDetails({});
    setPickedCategories([]);
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
        categories: { allCategories: categories, setCategories: setCategories },
        newPost: {
          activeStep: activeStep,
          newPostDetails: newPostDetails,
          updateNewPostDetails: updateNewPostDetails,
          pickedCategories: pickedCategories,
          addPickedCategory: addPickedCategory,
          removePickedCategory: removePickedCategory,
          resetPickedCategories: resetPickedCategories,
          resetNewPostData: resetNewPostData,
          next: nextStep,
          prev: prevStep,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
