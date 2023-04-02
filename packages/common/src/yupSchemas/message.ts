import * as yup from "yup";

export const messageRequired = "Please add a message.";

export const messageSchema = yup.object().shape({
  text: yup.string().required(messageRequired),
});
