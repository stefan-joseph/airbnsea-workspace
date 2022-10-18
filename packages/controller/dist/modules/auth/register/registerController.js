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
exports.RegisterController = void 0;
const graphql_hooks_1 = require("../../../generated/graphql-hooks");
const normalizeErrors_1 = require("../../../utils/normalizeErrors");
const RegisterController = (props) => {
    const [registerUserMutation] = (0, graphql_hooks_1.useRegisterUserMutation)();
    const submit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(values);
        const { data } = yield registerUserMutation({ variables: values });
        console.log(data === null || data === void 0 ? void 0 : data.register);
        if (data === null || data === void 0 ? void 0 : data.register) {
            return (0, normalizeErrors_1.normalizeErrors)(data.register);
        }
        return null;
    });
    return props.children({ submit });
};
exports.RegisterController = RegisterController;
//# sourceMappingURL=registerController.js.map