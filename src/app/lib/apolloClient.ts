import { uploadProfileImage } from "@/graphql/user.mutation";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import * as dotenv from "dotenv";

dotenv.config();

const graphqlServerURI = process.env.NEXT_PUBLIC_APP_BASE_URL;
const httpLink = new HttpLink({
  uri: graphqlServerURI,
});

const authLink = setContext((_, { headers }) => {
  const data = localStorage.getItem("token");
  const token = data ? JSON.parse(data) : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const uploadLink = new ApolloLink((operation, forward) => {
  if (operation.variables.file) {
    const { file } = operation.variables;
    const data = localStorage.getItem("token");
    const token = data ? JSON.parse(data) : null;

    const formData = new FormData();
    formData.append(
      "operations",
      JSON.stringify({
        query: uploadProfileImage,
        variables: {
          file: null,
        },
      })
    );
    formData.append("map", JSON.stringify({ file: ["variables.file"] }));
    formData.append("file", file);

    return new Observable((observer) => {
      fetch(graphqlServerURI as string, {
        method: "POST",
        body: formData,
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          operation.setContext({ response: result });
          observer.next(result);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.code === "FORBIDDEN") {
        localStorage.removeItem("token");
      }
    }
  }
  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, uploadLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
    mutate: {
      fetchPolicy: "network-only",
    },
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
});
