"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModularSchema = void 0;
const schema_1 = require("@graphql-tools/schema");
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const path = __importStar(require("path"));
const generateModularSchema = () => {
    const pathToModules = path.join(__dirname, "../modules");
    const typesArray = (0, load_files_1.loadFilesSync)(`${pathToModules}/**/*.graphql`);
    const resolversArray = (0, load_files_1.loadFilesSync)(`${pathToModules}/**/resolvers.*`);
    const typeDefs = (0, merge_1.mergeTypeDefs)(typesArray);
    const resolvers = (0, merge_1.mergeResolvers)(resolversArray);
    return (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers });
};
exports.generateModularSchema = generateModularSchema;
//# sourceMappingURL=generateModularSchema.js.map