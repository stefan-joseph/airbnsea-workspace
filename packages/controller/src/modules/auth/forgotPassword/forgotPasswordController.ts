import {
  SendForgotPasswordEmailMutationVariables,
  useSendForgotPasswordEmailMutation,
} from "../../../generated/graphql-hooks";

interface Props {
  children: (data: {
    submit: (values: SendForgotPasswordEmailMutationVariables) => Promise<null>;
  }) => JSX.Element | null;
}

export const ForgotPasswordController = (props: Props) => {
  const [sendForgotPasswordEmailMutation] =
    useSendForgotPasswordEmailMutation();

  const submit = async (values: SendForgotPasswordEmailMutationVariables) => {
    console.log(values);

    const response = await sendForgotPasswordEmailMutation({
      variables: values,
    });

    console.log("response:", response);

    return null;
  };

  return props.children({ submit });
};
