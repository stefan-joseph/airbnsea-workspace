import { ApolloClient, split, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
  gql,
} from "@apollo/client/core";
import { print, getOperationAST } from "graphql";

const uri =
  (process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_SERVER_URL_DEV
    : process.env.REACT_APP_SERVER_URL_PROD) + "/graphql";

const httpLink = createUploadLink({
  uri,
  credentials: "include",
});

type SSELinkOptions = EventSourceInit & { uri: string };

class SSELink extends ApolloLink {
  constructor(private options: SSELinkOptions) {
    super();
  }

  request(operation: Operation): Observable<FetchResult> {
    const url = new URL(this.options.uri);
    url.searchParams.append("query", print(operation.query as any));
    if (operation.operationName) {
      url.searchParams.append(
        "operationName",
        JSON.stringify(operation.operationName)
      );
    }
    if (operation.variables) {
      url.searchParams.append("variables", JSON.stringify(operation.variables));
    }
    if (operation.extensions) {
      url.searchParams.append(
        "extensions",
        JSON.stringify(operation.extensions)
      );
    }

    return new Observable((sink) => {
      const eventsource = new EventSource(url.toString(), this.options);
      eventsource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        sink.next(data);
        if (eventsource.readyState === 2) {
          sink.complete();
        }
      };
      eventsource.onerror = function (error) {
        sink.error(error);
      };
      return () => eventsource.close();
    });
  }
}

// const uri = "http://localhost:4000/graphql";
const sseLink = new SSELink({ uri });

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  sseLink,
  httpLink
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
