import * as yup from "yup";

export const emailNotLongEnough = "Email must be at least 3 characters.";
export const invalidEmail = "Enter a valid email.";
export const passwordNotLongEnough = "Password must be at least 6 characters.";
export const nameNotLongEnough =
  "First name on account must be at least 2 characters.";
export const nameTooLong =
  "First name on account must not exceed 50 characters.";

const email = yup.string().required("Email is required").email(invalidEmail);

export const checkEmailSchema = yup.object().shape({
  email,
});

const password = yup
  .string()
  .required("A password is required.")
  .min(6, passwordNotLongEnough)
  .max(255, "Password must not exceed 255 characters.");

const password2 = yup
  .string()
  .test("matches_password", "Passwords must match.", function (value) {
    return value === this.parent.password;
  });

const firstName = yup
  .string()
  .required("A first name on the account is required.")
  .min(2, nameNotLongEnough)
  .max(50, nameTooLong);

export const registerUserSchema = yup.object().shape({
  email,
  password,
  firstName,
});

export const registerUserSchemaWithPassword2 = yup.object().shape({
  email,
  password,
  password2,
  firstName,
});

export const registerOAuthUserSchema = yup.object().shape({
  email,
  firstName,
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email(invalidEmail),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: password,
  newPassword2: password2,
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
