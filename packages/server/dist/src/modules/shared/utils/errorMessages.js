"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBadUuidErrorMessage = exports.formatNoListingErrorMessage = void 0;
const formatNoListingErrorMessage = (id) => `No listing with ID: ${id}`;
exports.formatNoListingErrorMessage = formatNoListingErrorMessage;
const formatBadUuidErrorMessage = (idName) => `No such ${idName.split("Id")[0]} exists`;
exports.formatBadUuidErrorMessage = formatBadUuidErrorMessage;
//# sourceMappingURL=errorMessages.js.map