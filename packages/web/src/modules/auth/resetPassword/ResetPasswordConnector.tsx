import { ResetPasswordController } from "@airbnb-clone/controller";
import { useNavigate } from "react-router-dom";

import { ResetPasswordView } from "./ResetPasswordView";

export const ResetPasswordConnector = () => {
  let navigate = useNavigate();
  const onFinish = () => {
    navigate("/login");
  };

  return (
    <ResetPasswordController>
      {({ submit }) => (
        <ResetPasswordView onFinish={onFinish} submit={submit} />
      )}
    </ResetPasswordController>
  );
};
