import { Dispatch } from "react";

export interface GlobalStateInterface {
  user: {
    firstName: string;
    avatar: string;
  };
}

export type ActionType = {
  type: string;
  payload?: any;
};

export type ContextType = {
  globalState: GlobalStateInterface;
  dispatch: Dispatch<ActionType>;
};
