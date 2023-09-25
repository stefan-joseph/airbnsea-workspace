import * as yup from "yup";

export const emailNotLongEnough = "Email must be at least 3 characters";
export const invalidEmail = "Email must be a valid email";
export const passwordNotLongEnough = "Password must be at least 6 characters";

const emailValidation = yup
  .string()
  .required()
  .min(3, emailNotLongEnough)
  .max(255)
  .email(invalidEmail);

const passwordValidation = yup
  .string()
  .required("A password is required")
  .min(6, passwordNotLongEnough)
  .max(255, "Password must not exceed 255 characters");

const password2Validation = yup
  .string()
  .test("matches_password", "Passwords must match", function (value) {
    return value === this.parent.password;
  });

const registrationShapeWithoutPassword2 = {
  email: emailValidation,
  password: passwordValidation,
};

export const registerUserSchema = yup.object().shape({
  ...registrationShapeWithoutPassword2,
});

export const registerUserSchemaWithPassword2 = yup.object().shape({
  ...registrationShapeWithoutPassword2,
  password2: password2Validation,
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email(invalidEmail),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: passwordValidation,
  newPassword2: password2Validation,
});

const invalidLogin = "Invalid login";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .email(invalidEmail)
    .required(),
  password: yup.string().required().min(6, invalidLogin).max(255, invalidLogin),
});
