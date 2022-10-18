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
exports.TestClient = void 0;
const rp = require("request-promise");
class TestClient {
    constructor(endpoint) {
        this.url = process.env.TEST_HOST + endpoint;
        this.options = {
            withCredentials: true,
            jar: rp.jar(),
            json: true,
        };
    }
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          mutation {
            register (email: "${email}", password: "${password}") {
              path
              message
            } 
          }
        `,
                } }));
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          mutation {
            login(email: "${email}", password: "${password}") {
              errors {
                path
                message
              }
              sessionId
            }
          }
        `,
                } }));
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          mutation {
            logout 
          }
        `,
                } }));
        });
    }
    resetPassword(newPassword, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          mutation {
            resetPassword(newPassword: "${newPassword}", key: "${key}") {
              path
              message
            }
          }
        `,
                } }));
        });
    }
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          {
            me {
              id
              email
            }
          }
        `,
                } }));
        });
    }
}
exports.TestClient = TestClient;
//# sourceMappingURL=TestClient.js.map