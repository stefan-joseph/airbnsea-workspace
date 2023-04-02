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
exports.getLatAndLngFromText = void 0;
const node_1 = require("@graphql-yoga/node");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const client = new google_maps_services_js_1.Client({});
const getLatAndLngFromText = (where) => __awaiter(void 0, void 0, void 0, function* () {
    const findClosestAutocompletePrediction = (input) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield client.placeAutocomplete({
            params: {
                input,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
            timeout: 2000,
        });
        if (result.data.status === "ZERO_RESULTS") {
            result = yield findClosestAutocompletePrediction(input.substring(0, input.length - 1));
        }
        return result;
    });
    const { data } = yield findClosestAutocompletePrediction(where);
    const { place_id } = data.predictions[0];
    if (data.status !== "OK" || !place_id) {
        return Promise.reject(new node_1.GraphQLYogaError(`Could not search with the location: ${where}`));
    }
    const { data: data2 } = yield client.placeDetails({
        params: {
            place_id: place_id,
            fields: ["geometry"],
            key: process.env.GOOGLE_MAPS_API_KEY,
        },
        timeout: 2000,
    });
    const { result: { geometry }, } = data2;
    if (data2.status !== "OK" || !(geometry === null || geometry === void 0 ? void 0 : geometry.location.lat)) {
        return Promise.reject(new node_1.GraphQLYogaError(`Could not search with the location: ${where}`));
    }
    return geometry.location;
});
exports.getLatAndLngFromText = getLatAndLngFromText;
//# sourceMappingURL=getLatAndLngFromText.js.map