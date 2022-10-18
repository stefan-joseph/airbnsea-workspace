import {} from "@apollo/client";

import {
  LoginUserMutationVariables,
  useLoginUserMutation,
} from "../../../generated/graphql-hooks";
import { NormalizedErrorMap } from "../../../types/NormalizedErrorMap";
import { normalizeErrors } from "../../../utils/normalizeErrors";

interface Props {
  onSessionId?: (sessionId: string) => void;
  children: (data: {
    submit: (
      values: LoginUserMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
}

export const LoginController = (props: Props) => {
  const [loginUserMutation, { client }] = useLoginUserMutation();
  const submit = async (values: LoginUserMutationVariables) => {
    console.log(values);

    const { data } = await loginUserMutation({ variables: values });
    console.log(data?.login);

    if (data?.login.errors) {
      return normalizeErrors(data.login.errors);
    }
    if (data?.login.sessionId && props.onSessionId) {
      props.onSessionId(data.login.sessionId);
    }
    await client.resetStore();
    return null;
  };

  return props.children({ submit });
};
