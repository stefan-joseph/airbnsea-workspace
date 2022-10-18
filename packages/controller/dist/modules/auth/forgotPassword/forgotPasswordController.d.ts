/// <reference types="react" />
import { SendForgotPasswordEmailMutationVariables } from "../../../generated/graphql-hooks";
interface Props {
    children: (data: {
        submit: (values: SendForgotPasswordEmailMutationVariables) => Promise<null>;
    }) => JSX.Element | null;
}
export declare const ForgotPasswordController: (props: Props) => JSX.Element | null;
export {};
