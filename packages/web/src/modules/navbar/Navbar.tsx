import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { useMediaQuery } from "@mui/material";

import { ActionType } from "../../context/types";
import { BackdropButton } from "./components/desktop/components/BackdropButton";
import { NavbarContainer } from "./components/NavbarContainer";
import { MobileNavbar } from "./components/mobile/MobileNavbar";
import { DesktopNavbar } from "./components/desktop/DesktopNavbar";
import { desktopMinWidth } from "../../constants/constants";

export interface NavbarStateInterface {
  subSearch: number;
}

export type ContextType = {
  navbarState: NavbarStateInterface;
  dispatch: Dispatch<ActionType>;
};

const initialState = {
  subSearch: 0,
};

export const NavbarContext = createContext<ContextType>({
  navbarState: initialState,
  dispatch: () => null,
});

const Reducer = (state: NavbarStateInterface, action: ActionType): any => {
  switch (action.type) {
    case "SET_SUB_SEARCH":
      return {
        ...state,
        subSearch: action.payload,
      };
    default:
      return state;
  }
};

const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [navbarState, dispatch] = useReducer(Reducer, initialState);

  return (
    <NavbarContext.Provider value={{ navbarState, dispatch }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const Navbar = () => {
  const matches = useMediaQuery(desktopMinWidth);
  // 0 --> closed
  // 1-3 --> sub search tabs
  // -1 --> no sub search menu selected but expanded view remains open

  return (
    <>
      <NavbarProvider>
        <NavbarContainer>
          {matches ? <DesktopNavbar /> : <MobileNavbar />}
        </NavbarContainer>
        <BackdropButton />
      </NavbarProvider>
    </>
  );
};
