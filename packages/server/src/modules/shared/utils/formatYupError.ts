import { ValidationError } from "yup";
import { formatGraphQLYogaError } from "./formatGraphQLYogaError";

export default function formatYupError(error: ValidationError) {
  const { errors, path } = error;
  return { message: errors[0], field: path as string };
}
export const formatYupGraphQLError = (error: ValidationError) =>
  formatGraphQLYogaError(error.errors[0]);
