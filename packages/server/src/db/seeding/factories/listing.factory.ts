import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Listing } from "../../../entity/Listing";
import { Status, VesselType } from "../../../types/types";

const vesselEnumTypes = [VesselType.Sailboat, VesselType.Catamaran];

let mainPhotos = [
  "v1669565214/airbnsea/mzi43hvd6dm40zqbfvrq.jpg",
  "v1669565203/airbnsea/pl9bsdrmtlxcm9zbcz6q.jpg",
  "v1669565174/airbnsea/wuucz05tnvu67kujd5a5.jpg",
  "v1669565166/airbnsea/nbtuabffoymb9bup52st.jpg",
  "v1669565148/airbnsea/zdvqcuwnedtoqil07slt.jpg",
  "v1669565141/airbnsea/r9hoetu9jrwzdjjg6fo2.jpg",
  "v1669565079/airbnsea/g5aepvapbck8ukrzdrjp.jpg",
  "v1669565067/airbnsea/wc85yuoegjznyabymon0.jpg",
  "v1669565028/airbnsea/monmfrsxkrdakt3jonrr.jpg",
  "v1676151454/airbnsea/qpabqf72ezzwabxmoo5u.jpg",
  "v1676151444/airbnsea/qygydkcstbmthtsuwjkx.jpg",
  "v1676151438/airbnsea/r6hxqdpyfdkxmnndojq0.jpg",
  "v1676151793/airbnsea/zoxqdwbgsjtnxc2x7ndw.jpg",
  "v1676151778/airbnsea/f0rzeg0nnkv7dkoxrxog.jpg",
  "v1677170390/airbnsea/fmqzckxz0ctegjgbqqtk.jpg",
  "v1677170356/airbnsea/gvftrf0rbkezsdxus8ki.jpg",
  "v1677170344/airbnsea/yrmewo73mmip6m137pua.jpg",
  "v1677170336/airbnsea/nysajczbp6x5f8jjyslm.jpg",
  "v1677170330/airbnsea/rjwz1jo6irczd30hiwqg.jpg",
  "v1676151770/airbnsea/tpwnxmuvgpulzjibidrk.jpg",
  "v1690992040/airbnsea/6678139_xaifn9.jpg",
];

const refreshMainPhotos = [...mainPhotos];

const secondaryPhotos = [
  "v1677170381/airbnsea/iep9oprr9dzcp3ghxrmf.jpg",
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

const getPhoto = () => {
  // console.log("refreshMainPhotos!!!", refreshMainPhotos);

  if (mainPhotos.length < 1) {
    mainPhotos = [...refreshMainPhotos];
  }
  return mainPhotos.pop();
};

export const ListingFactory = setSeederFactory(Listing, (faker: Faker) => {
  const listing = new Listing();
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
  listing.status = Status.Active;
  listing.photos = [
    getPhoto() as string,
    // mainPhotos[Math.floor(Math.random() * mainPhotos.length)],
    ...secondaryPhotos,
  ];
  listing.userId;

  return listing;
});
