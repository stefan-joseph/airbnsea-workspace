"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VesselType = exports.Status = exports.InboxType = exports.AuthorizationServer = void 0;
var AuthorizationServer;
(function (AuthorizationServer) {
    AuthorizationServer["Github"] = "GITHUB";
    AuthorizationServer["Linkedin"] = "LINKEDIN";
})(AuthorizationServer = exports.AuthorizationServer || (exports.AuthorizationServer = {}));
var InboxType;
(function (InboxType) {
    InboxType["Guest"] = "GUEST";
    InboxType["Host"] = "HOST";
})(InboxType = exports.InboxType || (exports.InboxType = {}));
var Status;
(function (Status) {
    Status["Active"] = "active";
    Status["Inactive"] = "inactive";
})(Status = exports.Status || (exports.Status = {}));
var VesselType;
(function (VesselType) {
    VesselType["Catamaran"] = "catamaran";
    VesselType["Sailboat"] = "sailboat";
})(VesselType = exports.VesselType || (exports.VesselType = {}));
//# sourceMappingURL=types.js.map