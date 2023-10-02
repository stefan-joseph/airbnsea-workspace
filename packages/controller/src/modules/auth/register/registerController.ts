import {
  RegisterUserMutationVariables,
  useRegisterUserMutation,
} from "../../../generated/graphql-hooks";
import { NormalizedErrorMap } from "../../../types/NormalizedErrorMap";
// import { normalizeErrors } from "../../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (
      values: RegisterUserMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
}

export const RegisterController = (props: Props) => {
  const [registerUserMutation] = useRegisterUserMutation();
  const submit = async (values: RegisterUserMutationVariables) => {
    console.log(values);

    const { data } = await registerUserMutation({ variables: values });
    console.log(data?.register);

    if (data?.register) {
      // return normalizeErrors(data.register);
    }

    return null;
  };

  return props.children({ submit });
};
