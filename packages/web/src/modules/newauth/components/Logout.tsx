import { useContext, useEffect } from "react";
import { useLogoutUserMutation } from "@airbnb-clone/controller";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";

import { AppContext } from "../../../context/context";
import Loader from "../../../components/Loader";

export default function Logout() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [logoutUserMutation, { client }] = useLogoutUserMutation();

  useEffect(() => {
    client
      .resetStore()
      .then(() => logoutUserMutation())
      .then(() => {
        dispatch({
          type: "SET_USER",
          payload: { authenticated: false, firstName: "", avatar: "" },
        });
        navigate("/login");
      });
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center">
      <Loader />
    </Stack>
  );
}
