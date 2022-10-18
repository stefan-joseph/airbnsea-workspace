import { ForgotPasswordView } from "./ForgotPasswordView";
import { ForgotPasswordController } from "@airbnb-clone/controller";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordConnector = () => {
  let navigate = useNavigate();
  const onFinish = () => {
    navigate("/message/reset-password", {
      state: { message: "Please check your email to reset your password" },
    });
  };

  return (
    <ForgotPasswordController>
      {({ submit }) => (
        <ForgotPasswordView onFinish={onFinish} submit={submit} />
      )}
    </ForgotPasswordController>
  );
};
