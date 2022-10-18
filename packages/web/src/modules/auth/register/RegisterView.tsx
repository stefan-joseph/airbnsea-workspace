import { Link } from "react-router-dom";
import { Button, Form } from "antd";
import { Field, Formik } from "formik";
import { validUserSchema } from "@airbnb-clone/common";
import { InputField } from "../../../components/InputField";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { RegisterUserMutationVariables } from "@airbnb-clone/controller";
import { NormalizedErrorMap } from "@airbnb-clone/controller/dist/types/NormalizedErrorMap";

interface Props {
  submit: (
    values: RegisterUserMutationVariables
  ) => Promise<NormalizedErrorMap | null>;
  onFinish: () => void;
}

export const RegisterView = ({ submit, onFinish }: Props) => {
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
        validationSchema={validUserSchema}
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
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              Already a member? <Link to="/login">Login</Link>
            </Form.Item>
            <Form.Item>
              Minds blanking? <Link to="/forgot-password">Forgot Password</Link>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};
