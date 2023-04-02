import { GraphQLYogaError } from "@graphql-yoga/node";
import { Client } from "@googlemaps/google-maps-services-js";
const client = new Client({});

export const getLatAndLngFromText = async (where: string) => {
  const findClosestAutocompletePrediction = async (input: string) => {
    let result = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.GOOGLE_MAPS_API_KEY as string,
      },
      timeout: 2000,
    });

    if (result.data.status === "ZERO_RESULTS") {
      // if no predictions remove last character and try again recursively until result found
      result = await findClosestAutocompletePrediction(
        input.substring(0, input.length - 1)
      );
    }

    return result;
  };

  const { data } = await findClosestAutocompletePrediction(where);

  const { place_id } = data.predictions[0];

  if (data.status !== "OK" || !place_id) {
    return Promise.reject(
      new GraphQLYogaError(`Could not search with the location: ${where}`)
    );
  }

  const { data: data2 } = await client.placeDetails({
    params: {
      place_id: place_id,
      fields: ["geometry"],
      key: process.env.GOOGLE_MAPS_API_KEY as string,
    },
    timeout: 2000,
  });

  const {
    result: { geometry },
  } = data2;

  if (data2.status !== "OK" || !geometry?.location.lat) {
    return Promise.reject(
      new GraphQLYogaError(`Could not search with the location: ${where}`)
    );
  }

  return geometry.location;
};
