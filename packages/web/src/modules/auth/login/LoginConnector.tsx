import { LoginController } from "@airbnb-clone/controller";
import { LoginView } from "./LoginView";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../context/context";
import { useMeLazyQuery } from "@airbnb-clone/controller";

export const LoginConnector = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const { dispatch } = useContext(AppContext);

  const [meLazyQuery] = useMeLazyQuery();

  const onFinish = async () => {
    const { data } = await meLazyQuery();

    if (data?.me) {
      const { firstName, avatar } = data.me;
      dispatch({
        type: "SET_USER",
        payload: { authenticated: true, firstName, avatar },
      });
    }

    if (state?.redirect) {
      navigate(state.redirect);
    } else navigate("/");
  };

  return (
    <LoginController>
      {({ submit }) => <LoginView onFinish={onFinish} submit={submit} />}
    </LoginController>
  );
};
