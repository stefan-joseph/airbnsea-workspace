"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingFactory = void 0;
const typeorm_extension_1 = require("typeorm-extension");
const Listing_1 = require("../../../entity/Listing");
const types_1 = require("../../../types/types");
const vesselEnumTypes = [types_1.VesselType.Sailboat, types_1.VesselType.Catamaran];
const mainPhotos = [
    "v1669565214/airbnsea/mzi43hvd6dm40zqbfvrq.jpg",
    "v1669565203/airbnsea/pl9bsdrmtlxcm9zbcz6q.jpg",
    "v1669565174/airbnsea/wuucz05tnvu67kujd5a5.jpg",
    "v1669565166/airbnsea/nbtuabffoymb9bup52st.jpg",
    "v1669565148/airbnsea/zdvqcuwnedtoqil07slt.jpg",
    "v1669565141/airbnsea/r9hoetu9jrwzdjjg6fo2.jpg",
    "v1669565085/airbnsea/lasyqn0qi8bp64zklm2u.jpg",
    "v1669565079/airbnsea/g5aepvapbck8ukrzdrjp.jpg",
    "v1669565073/airbnsea/i5yn1l9y9autovkpqbem.jpg",
    "v1669565067/airbnsea/wc85yuoegjznyabymon0.jpg",
    "v1669565028/airbnsea/monmfrsxkrdakt3jonrr.jpg",
];
const secondaryPhotos = [
    "v1669565060/airbnsea/r6nyijnhbrrflyopwa5t.jpg",
    "v1669565153/airbnsea/vyo2lfnkqrjudbseayde.jpg",
    "v1669565194/airbnsea/rb8zb25dxgtoaab5houl.jpg",
    "v1669565130/airbnsea/pyncxuqs4ernisjd3evb.jpg",
    "v1669565054/airbnsea/ntoplycfyiyafsmkciwm.jpg",
    "v1669565160/airbnsea/nj5qtdc6ybgij7zofq3s.jpg",
    "v1669565208/airbnsea/qk6rcnosnzmrtx8bx1fa.jpg",
    "v1669565135/airbnsea/byneygyzsfgzkgiuh4x2.jpg",
    "v1669565123/airbnsea/ylazxmbjbcdlnhba9upw.jpg",
];
exports.ListingFactory = (0, typeorm_extension_1.setSeederFactory)(Listing_1.Listing, (faker) => {
    const listing = new Listing_1.Listing();
    listing.vesselType = vesselEnumTypes[Math.round(Math.random())];
    listing.street = faker.address.streetAddress();
    listing.apt = null;
    listing.city = faker.address.city();
    listing.state = null;
    listing.country = faker.address.country();
    listing.zipcode = faker.address.zipCode();
    listing.latitude = parseFloat(faker.address.latitude());
    listing.longitude = parseFloat(faker.address.longitude());
    listing.name = faker.lorem.words(3);
    listing.description = faker.lorem.paragraphs(5);
    listing.price = faker.datatype.number({ min: 30, max: 500 });
    const number = faker.datatype.number({ min: 1, max: 16 });
    listing.guests = number;
    listing.beds = number === 1 ? 1 : Math.ceil(number / 2);
    listing.rating = faker.datatype.number({ min: 3.5, max: 5, precision: 0.01 });
    listing.amenities = [
        "Wifi",
        "TV",
        "Air Conditioning",
        "BBQ Grill",
        "Kitchen",
    ];
    listing.status = types_1.Status.Active;
    listing.photos = [
        mainPhotos[Math.floor(Math.random() * mainPhotos.length)],
        ...secondaryPhotos,
    ];
    listing.userId;
    return listing;
});
//# sourceMappingURL=listing.factory.js.map