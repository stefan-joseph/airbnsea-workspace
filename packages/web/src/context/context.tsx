import { createContext, ReactNode, useReducer } from "react";
import Reducer from "./reducer";
import { ContextType } from "./types";

const initialState = {
  user: {
    authenticated: false,
    firstName: "",
    avatar: "",
  },
};

const AppContext = createContext<ContextType>({
  globalState: initialState,
  dispatch: () => null,
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, dispatch] = useReducer(Reducer, initialState);

  return (
    <AppContext.Provider value={{ globalState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
