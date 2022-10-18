/// <reference types="react" />
import { RegisterUserMutationVariables } from "../../../generated/graphql-hooks";
import { NormalizedErrorMap } from "../../../types/NormalizedErrorMap";
interface Props {
    children: (data: {
        submit: (values: RegisterUserMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: (props: Props) => JSX.Element | null;
export {};
