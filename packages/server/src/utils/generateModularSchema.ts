import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import * as path from "path";

export const generateModularSchema = () => {
  const pathToModules = path.join(__dirname, "../modules");
  const typesArray = loadFilesSync(`${pathToModules}/**/*.graphql`);

  const resolversArray = loadFilesSync(`${pathToModules}/**/resolvers.*`);

  const typeDefs = mergeTypeDefs(typesArray);
  const resolvers = mergeResolvers(resolversArray);

  return makeExecutableSchema({ typeDefs, resolvers });
};
