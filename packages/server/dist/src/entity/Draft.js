"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draft = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("../types/types");
const User_1 = require("./User");
let Draft = class Draft extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Draft.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: types_1.VesselType,
    }),
    __metadata("design:type", String)
], Draft.prototype, "vesselType", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "apt", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "zipcode", void 0);
__decorate([
    (0, typeorm_1.Column)("double precision", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)("double precision", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 100, nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, default: "{}" }),
    __metadata("design:type", Array)
], Draft.prototype, "photos", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "beds", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "guests", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { array: true, nullable: true }),
    __metadata("design:type", Object)
], Draft.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], Draft.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.drafts),
    __metadata("design:type", User_1.User)
], Draft.prototype, "user", void 0);
Draft = __decorate([
    (0, typeorm_1.Entity)("drafts")
], Draft);
exports.Draft = Draft;
//# sourceMappingURL=Draft.js.map