import { Button, Form } from "antd";
import { Field, Formik } from "formik";
import { InputField } from "../../../components/InputField";
import { UserOutlined } from "@ant-design/icons";
import { forgotPasswordSchema } from "@airbnb-clone/common";
import { SendForgotPasswordEmailMutationVariables } from "@airbnb-clone/controller";

interface Props {
  submit: (values: SendForgotPasswordEmailMutationVariables) => Promise<null>;
  onFinish: () => void;
}

export const ForgotPasswordView = ({ submit, onFinish }: Props) => {
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
          email: "",
        }}
        validationSchema={forgotPasswordSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setErrors }) => {
          const error = await submit(values);
          if (error) setErrors(error);
          else onFinish();
        }}
      >
        {({ handleSubmit }) => (
          <Form onFinish={handleSubmit}>
            <Field
              name="email"
              placeholder="Email"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25" }} />}
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
