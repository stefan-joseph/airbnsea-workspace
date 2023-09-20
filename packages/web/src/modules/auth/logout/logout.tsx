import { useContext, useEffect } from "react";
import { useLogoutUserMutation } from "@airbnb-clone/controller";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../../context/context";
import { AuthPageContainer } from "../components/AuthPageContainer";
import { Loader } from "../../../components/Loader";

export const Logout = () => {
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
    <AuthPageContainer>
      <Loader />
    </AuthPageContainer>
  );
};
