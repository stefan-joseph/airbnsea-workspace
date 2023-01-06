import { formatGraphQLYogaError } from "./formatGraphQLYogaError";
import { ValidationError } from "yup";

export const formatYupError = (error: ValidationError) =>
  formatGraphQLYogaError(error.errors[0]);
