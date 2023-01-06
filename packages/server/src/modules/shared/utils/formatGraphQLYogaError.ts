import { GraphQLYogaError } from "@graphql-yoga/node";

export const formatGraphQLYogaError = (message: string) =>
  Promise.reject(new GraphQLYogaError(message));
