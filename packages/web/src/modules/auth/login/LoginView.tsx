import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import { Field, Formik } from "formik";
import { loginSchema } from "@airbnb-clone/common";
import { InputField } from "../../../components/InputField";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { LoginUserMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";

interface Props {
  submit: (
    values: LoginUserMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const LoginView = ({ onFinish, submit }: Props) => {
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
          password: "",
        }}
        validationSchema={loginSchema}
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
            <Field
              name="password"
              inputType="password"
              placeholder="Password"
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25" }} />}
              component={InputField}
              iconRender={(visible: boolean) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              Not a member? <Link to="/">Register</Link>
            </Form.Item>
            <Form.Item>
              Minds blanking? <Link to="/forgot-password">Forgot Password</Link>
            </Form.Item>
            <Link to="/create-listing">Create Listing</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
