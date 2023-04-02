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
              firstName
              avatar
            }
          }
        `,
                } }));
        });
    }
    viewListing(listingId) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          query {
            viewListing(listingId: "${listingId}") {
              id
              userId
              name
              vesselType
              price
              description
              guests
              beds
              rating
              amenities
              street
              apt
              city
              state
              country
              zipcode
              longitude
              latitude
              photos
              owner {
                firstName
                lastName
                avatar
              }
            }
          }
        `,
                } }));
        });
    }
    createBooking(listingId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          mutation {
            createBooking(listingId: "${listingId}",
            input: {start: "${input.start}", end: "${input.end}", guests: ${input.guests}})
          }
        `,
                } }));
        });
    }
    createConversation(listingId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          mutation {
            createConversation(listingId: "${listingId}", text: "${text}"){
              ... on ConversationId {
                conversationId
              }
              ... on Redirect {
                redirect
              }
            }
          }
        `,
                } }));
        });
    }
    createMessage(conversationId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          mutation {
            createMessage(conversationId: "${conversationId}",
            text: "${text}")
          }
        `,
                } }));
        });
    }
    populateInbox(inboxType) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          query {
            populateInbox(inboxType: ${inboxType}) {
              id
              text
              fromHost
              createdDate
              conversationId
              interlocutorId
              interlocutor {
                avatar
                firstName
                lastName
              }
            }
          }
        `,
                } }));
        });
    }
    populateConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return rp.post(this.url, Object.assign(Object.assign({}, this.options), { body: {
                    query: `
          query {
            populateConversation(conversationId: "${conversationId}") {
              interlocutorId
              interlocutor {
                avatar
                firstName
                lastName
              }
              listingId
              listing {
                name
                img
              }
              messages {
                id
                text
                fromHost
                createdDate
              }
            }
          }
        `,
                } }));
        });
    }
}
exports.TestClient = TestClient;
//# sourceMappingURL=TestClient.js.map