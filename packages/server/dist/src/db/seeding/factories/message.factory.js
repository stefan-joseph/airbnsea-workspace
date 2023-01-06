"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFactory = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const Message_1 = require("../../../entity/Message");
exports.MessageFactory = (0, typeorm_extension_1.setSeederFactory)(Message_1.Message, (faker) => {
    console.log(faker);
    const message = new Message_1.Message();
    message.text = "Hello";
    return message;
});
//# sourceMappingURL=message.factory.js.map