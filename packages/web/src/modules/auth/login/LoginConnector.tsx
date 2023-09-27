import { LoginController } from "@airbnb-clone/controller";
import { LoginView } from "./LoginView";
import useSetUserAndRedirect from "../../../hooks/useSetUserAndRedirect";

export const LoginConnector = () => {
  const setUserAndRedirect = useSetUserAndRedirect();

  const onFinish = async () => {
    setUserAndRedirect();
  };

  return (
    <LoginController>
      {({ submit }) => <LoginView onFinish={onFinish} submit={submit} />}
    </LoginController>
  );
};
