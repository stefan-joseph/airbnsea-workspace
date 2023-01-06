import { useContext } from "react";
import { useLogoutUserMutation } from "@airbnb-clone/controller";
import { Navigate } from "react-router-dom";

import { AppContext } from "../../../context/context";
export const Logout = () => {
  const { dispatch } = useContext(AppContext);
  const [logoutUserMutation, { client }] = useLogoutUserMutation();
  logoutUserMutation();
  client.resetStore();
  dispatch({ type: "SET_USER", payload: { firstName: "", avatar: "" } });
  return <Navigate to="/login" />;
};
