"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const User_1 = require("../../../entity/User");
exports.UserFactory = (0, typeorm_extension_1.setSeederFactory)(User_1.User, (faker) => {
    const user = new User_1.User();
    user.email = faker.internet.email().toLowerCase();
    user.password = "secret";
    user.confirmed = true;
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.avatar = faker.internet.avatar();
    return user;
});
//# sourceMappingURL=user.factory.js.map