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
exports.LoginController = void 0;
const graphql_hooks_1 = require("../../../generated/graphql-hooks");
const LoginController = (props) => {
    const [loginUserMutation, { client }] = (0, graphql_hooks_1.useLoginUserMutation)();
    const submit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield loginUserMutation({ variables: values });
        if (data === null || data === void 0 ? void 0 : data.login) {
            console.log("cahnged this, no longer valid response shape");
        }
        yield client.resetStore();
        return null;
    });
    return props.children({ submit });
};
exports.LoginController = LoginController;
//# sourceMappingURL=loginController.js.map