import { GraphQlMiddlewareFunc, Resolver } from "../types/graphql-utils";

export const createMiddleware =
  (middlewareFunc: GraphQlMiddlewareFunc, resolverFunc: Resolver) =>
  (parent: any, args: any, context: any, info: any) =>
    middlewareFunc(resolverFunc, parent, args, context, info);
