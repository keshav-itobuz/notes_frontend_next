"use client";

import { ReactNode } from "react";
import { client } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
