import { Button, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { Field, Formik } from "formik";
import { InputField } from "../../../components/InputField";
import { resetPasswordSchema } from "@airbnb-clone/common";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { ResetPasswordMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";

interface Props {
  submit: (
    values: ResetPasswordMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const ResetPasswordView = ({ submit, onFinish }: Props) => {
  const { key } = useParams();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Formik
        initialValues={{
          newPassword: "",
        }}
        validationSchema={resetPasswordSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setErrors }) => {
          const error = await submit({
            ...values,
            key: key as string,
          });
          if (error) setErrors(error);
          else onFinish();
        }}
      >
        {({ handleSubmit }) => (
          <Form onFinish={handleSubmit}>
            <Field
              name="newPassword"
              inputType="password"
              placeholder="New Password"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25" }} />}
              iconRender={(visible: boolean) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              component={InputField}
            />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};
