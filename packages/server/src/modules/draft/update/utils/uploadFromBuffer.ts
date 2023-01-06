import { GraphQLYogaError } from "@graphql-yoga/node";
import cloudinary = require("cloudinary");
import streamifier = require("streamifier");

export const uploadFromBuffer = async (buffer: Buffer) => {
  return new Promise(
    (resolve: (value: cloudinary.UploadApiResponse) => void, reject) => {
      let uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "airbnsea",
          allowed_formats: ["jpg"],
          format: "jpg",
          width: "1200",
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            console.log("errorrrr", error);
            reject(
              new GraphQLYogaError(
                error?.message || "Could not upload selected image"
              )
            );
          }
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    }
  );
};
