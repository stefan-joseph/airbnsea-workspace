import * as yup from "yup";

export const emailNotLongEnough = "Email must be at least 3 characters";
export const invalidEmail = "Email must be a valid email";
export const passwordNotLongEnough = "Password must be at least 6 characters";

export const registerPasswordValidation = yup
  .string()
  .required("Required")
  .min(6, "Must be at least 6 characters")
  .max(255, "Must not exceed 255 characters");

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .required()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(invalidEmail),
  password: registerPasswordValidation,
});

const invalidLogin = "invalid login";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .email(invalidEmail)
    .required(),
  password: yup.string().required().min(6, invalidLogin).max(255, invalidLogin),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email(invalidEmail),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation,
});
