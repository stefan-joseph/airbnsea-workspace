import { useLogoutUserMutation } from "@airbnb-clone/controller";
import { Navigate } from "react-router-dom";
export const Logout = () => {
  const [logoutUserMutation, { client }] = useLogoutUserMutation();
  logoutUserMutation();
  client.resetStore();
  return <Navigate to="/login" />;
};
