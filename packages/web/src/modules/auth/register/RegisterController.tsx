import { RegisterController } from "@airbnb-clone/controller";
import { RegisterView } from "./RegisterView";
import { useNavigate } from "react-router-dom";

export const RegisterConnector = () => {
  let navigate = useNavigate();
  const onFinish = () => {
    navigate("/message/confirm-email", {
      state: { message: "Please check your email to confirm your account." },
    });
  };
  return (
    <RegisterController>
      {({ submit }) => <RegisterView onFinish={onFinish} submit={submit} />}
    </RegisterController>
  );
};
