/// <reference types="react" />
import { LoginUserMutationVariables } from "../../../generated/graphql-hooks";
import { NormalizedErrorMap } from "../../../types/NormalizedErrorMap";
interface Props {
    onSessionId?: (sessionId: string) => void;
    children: (data: {
        submit: (values: LoginUserMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const LoginController: (props: Props) => JSX.Element | null;
export {};
