"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthenticatedErrorMessage = exports.formatBadUuidErrorMessage = exports.formatNotFoundWithGivenIdErrorMessage = void 0;
const formatNotFoundWithGivenIdErrorMessage = (type, id) => `No ${type} with ID: ${id}`;
exports.formatNotFoundWithGivenIdErrorMessage = formatNotFoundWithGivenIdErrorMessage;
const formatBadUuidErrorMessage = (idName) => `No such ${idName.split("Id")[0]} exists`;
exports.formatBadUuidErrorMessage = formatBadUuidErrorMessage;
exports.unauthenticatedErrorMessage = "Please log in to use this service";
//# sourceMappingURL=errorMessages.js.map