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
exports.sendEmail = void 0;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey;
const sendEmail = (recipient, url, linkText) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: `${recipient}`,
        from: "stefanjoseph.dev@gmail.com",
        subject: "Confirm Airbnsea account",
        html: `<a href=${url}>${linkText}</a>`,
    };
    yield sgMail.send(msg);
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map