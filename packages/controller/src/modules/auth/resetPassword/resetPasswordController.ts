import {
  ResetPasswordMutationVariables,
  useResetPasswordMutation,
} from "../../../generated/graphql-hooks";
import { NormalizedErrorMap } from "../../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (
      values: ResetPasswordMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
}

export const ResetPasswordController = (props: Props) => {
  const [resetPasswordMutation] = useResetPasswordMutation();

  const submit = async (values: ResetPasswordMutationVariables) => {
    console.log(values);

    const { data } = await resetPasswordMutation({
      variables: values,
    });

    console.log("response:", data);

    if (data?.resetPassword) {
      return normalizeErrors(data.resetPassword);
    }

    return null;
  };

  return props.children({ submit });
};
