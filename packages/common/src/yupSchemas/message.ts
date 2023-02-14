import * as yup from "yup";

export const messageRequired = "A message is required";

export const messageSchema = yup.object().shape({
  text: yup.string().required(messageRequired),
});
