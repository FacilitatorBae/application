import { createContext, useState } from "react";

export const Context = createContext({} as ContextState);
interface ContextState {
  isAuth: boolean;
  setIsAuth: any;
}

const AppContext = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <Context.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </Context.Provider>
  );
};

export default AppContext;
