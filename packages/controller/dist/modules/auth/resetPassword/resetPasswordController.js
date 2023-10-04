"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordController = void 0;
const graphql_hooks_1 = require("../../../generated/graphql-hooks");
const ResetPasswordController = (props) => {
    const [resetPasswordMutation] = (0, graphql_hooks_1.useResetPasswordMutation)();
    const submit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(values);
        const { data } = yield resetPasswordMutation({
            variables: values,
        });
        console.log("response:", data);
        return null;
    });
    return props.children({ submit });
};
exports.ResetPasswordController = ResetPasswordController;
//# sourceMappingURL=resetPasswordController.js.map