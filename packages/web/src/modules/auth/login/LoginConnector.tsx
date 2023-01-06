import { LoginController } from "@airbnb-clone/controller";
import { LoginView } from "./LoginView";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const LoginConnector = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const onFinish = async () => {
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
