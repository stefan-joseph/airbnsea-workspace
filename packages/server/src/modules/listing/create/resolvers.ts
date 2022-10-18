import * as fs from "fs";
import * as path from "path";
import * as shortid from "shortid";

import { Listing } from "../../../entity/Listing";
import { Resolvers } from "../../../types/types";

export const resolvers: Resolvers = {
  Mutation: {
    createListing: async (_, { input: { img, ...data } }, { session }) => {
      let imgUrl = "";
      if (img) {
        try {
          console.log("img", img);
          const id = shortid.generate();
          console.log("type", img.type);
          console.log("uri", img.uri);

          let ext = img.type.split("/")[1];
          if (ext === "octet-stream") {
            ext = "jpeg";
          }
          const imageName = `${id}.${ext}`;

          const fileStream = img.stream();

          const response = await fs.promises.writeFile(
            path.join(__dirname, `../../../../images/${imageName}`),
            fileStream
          );
          console.log("response", response);
          imgUrl = `${imageName}`;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      await Listing.create({
        ...data,
        imgUrl,
        userId: session.userId,
      }).save();

      return true;
    },
  },
};
