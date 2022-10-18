/// <reference types="react" />
import { ResetPasswordMutationVariables } from "../../../generated/graphql-hooks";
import { NormalizedErrorMap } from "../../../types/NormalizedErrorMap";
interface Props {
    children: (data: {
        submit: (values: ResetPasswordMutationVariables) => Promise<NormalizedErrorMap | null>;
    }) => JSX.Element | null;
}
export declare const ResetPasswordController: (props: Props) => JSX.Element | null;
export {};
