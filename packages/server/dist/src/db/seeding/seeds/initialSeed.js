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
const Listing_1 = require("../../../entity/Listing");
class InitialSeeder {
    run(dataSource, factoryManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const listingsRepository = dataSource.getRepository(Listing_1.Listing);
            const listingFactory = factoryManager.get(Listing_1.Listing);
            const listings = yield Promise.all(Array(100)
                .fill("")
                .map(() => __awaiter(this, void 0, void 0, function* () {
                const made = yield listingFactory.make({});
                return made;
            })));
            yield listingsRepository.save(listings);
        });
    }
}
exports.default = InitialSeeder;
//# sourceMappingURL=initialSeed.js.map