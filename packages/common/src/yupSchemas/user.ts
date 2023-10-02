import { string, object } from "yup";

export const emailNotLongEnough = "Email must be at least 3 characters.";
export const invalidEmail = "Enter a valid email.";
export const passwordNotLongEnough = "Password must be at least 6 characters.";
export const nameNotLongEnough =
  "First name on account must be at least 2 characters.";
export const nameTooLong =
  "First name on account must not exceed 50 characters.";

const email = string().trim().required("Email is required").email(invalidEmail);

export const checkEmailSchema = object().shape({
  email,
});

const password = string()
  .trim()
  .required("A password is required.")
  .min(6, passwordNotLongEnough)
  .max(255, "Password must not exceed 255 characters.");

const password2 = string().test(
  "matches_password",
  "Passwords must match.",
  function (value) {
    return value === this.parent.password;
  }
);

const firstName = string()
  .trim()
  .required("A first name on the account is required.")
  .min(2, nameNotLongEnough)
  .max(50, nameTooLong);

export const registerUserSchema = object().shape({
  email,
  password,
  firstName,
});

export const registerUserSchemaWithPassword2 = object().shape({
  email,
  password,
  password2,
  firstName,
});

export const registerOAuthUserSchema = object().shape({
  email,
  firstName,
});

export const forgotPasswordSchema = object().shape({
  email: string().email(invalidEmail),
});

export const resetPasswordSchema = object().shape({
  newPassword: password,
  newPassword2: password2,
});

export const loginSchema = object().shape({
  email,
  password,
});
