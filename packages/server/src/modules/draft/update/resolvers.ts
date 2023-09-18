// import * as path from "path";
// import { unlinkSync } from "node:fs";
import cloudinary = require("cloudinary");
import { Resolvers } from "../../../types/types";
import { getTypeormConnection } from "../../../utils/getTypeormConnection";
import { Draft } from "../../../entity/Draft";
import { formatGraphQLYogaError } from "../../shared/utils/formatGraphQLYogaError";
import { uploadFromBuffer } from "./utils/uploadFromBuffer";

export const resolvers: Resolvers = {
  Mutation: {
    updateListing: async (_, { listingId, fields }) => {
      const { vesselType, address, name, photos } = fields;
      let typeormConnection = getTypeormConnection();

      let queryBuilder = typeormConnection
        .createQueryBuilder()
        .update(Draft)
        .where("id = :id", { id: listingId })
        .returning("id");

      if (vesselType) queryBuilder.set({ vesselType });

      if (address) queryBuilder.set({ ...address });

      if (name) queryBuilder.set({ name });

      if (photos) {
        const { photoToAdd, photoToDelete } = photos;

        if (photoToAdd) {
          let [type, ext] = photoToAdd.type.split("/");

          if (type !== "image") {
            return formatGraphQLYogaError(
              `file must be an image, not ${type}.`
            );
          }

          // for ios returning invalid file type issue from mobile app
          if (ext === "octet-stream") ext = "jpeg";

          const { photos: currentPhotos } = await Draft.findOneOrFail({
            where: { id: listingId },
            select: { photos: true },
          });

          if (!photoToAdd.arrayBuffer)
            return formatGraphQLYogaError(
              "The uploaded file is not the proper image format"
            );

          const arrayBuffer = await photoToAdd.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const result = await uploadFromBuffer(buffer);

          queryBuilder.set({
            photos: [...currentPhotos, result.secure_url.split("upload/")[1]],
          });
        } else if (photoToDelete) {
          // make like photoToAdd
          const { photos: currentPhotos } = await Draft.findOneOrFail({
            where: { id: listingId },
            select: { photos: true },
          });

          const publicId =
            "airbnsea/" + photoToDelete.split("airbnsea/")[1].split(".")[0];

          const { result } = await cloudinary.v2.uploader
            .destroy(`${publicId}`)
            .catch((error) => formatGraphQLYogaError(error.message));

          if (result !== "ok") return formatGraphQLYogaError(result);

          const newPhotos = currentPhotos.filter(
            (img) => img !== photoToDelete.split("upload/")[1]
          );

          queryBuilder.set({ photos: newPhotos });
        }
      }

      const {
        raw: [listing],
      } = await queryBuilder.execute();

      return listing.id;
    },
  },
};
