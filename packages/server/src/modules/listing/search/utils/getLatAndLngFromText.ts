import { GraphQLYogaError } from "@graphql-yoga/node";
import { Client, PlaceInputType } from "@googlemaps/google-maps-services-js";
const client = new Client({});

export const getLatAndLngFromText = async (where: string) => {
  const { data } = await client.findPlaceFromText({
    params: {
      input: where,
      inputtype: PlaceInputType.textQuery,
      key: process.env.GOOGLE_MAPS_API_KEY as string,
    },
    timeout: 2000,
  });

  if (data.status !== "OK" || !data.candidates[0].place_id) {
    return Promise.reject(
      new GraphQLYogaError(`Could not search with the location: ${where}`)
    );
  }

  const { data: data2 } = await client.placeDetails({
    params: {
      place_id: data.candidates[0].place_id,
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
