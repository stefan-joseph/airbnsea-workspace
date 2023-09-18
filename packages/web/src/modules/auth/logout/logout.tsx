import { useContext, useEffect } from "react";
import { useLogoutUserMutation } from "@airbnb-clone/controller";
import { Navigate, useNavigate } from "react-router-dom";

import { AppContext } from "../../../context/context";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { Loader } from "../../../components/Loader";
import { Button } from "@mui/material";
export const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [logoutUserMutation, { data, loading, client }] =
    useLogoutUserMutation();

  useEffect(() => {
    logoutUserMutation().then(() => {
      client.clearStore();
      dispatch({ type: "SET_USER", payload: { firstName: "", avatar: "" } });
      navigate("/login");
    });
  }, []);

  return (
    <AuthPageContainer>
      <div onLoad={() => console.log("loaded")}>
        <Loader></Loader>
      </div>
    </AuthPageContainer>
  );
};
