import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router/index.jsx";
import { RouterProvider } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";

const token =
  "c5696d4cccc18aaf93ca449181f0e10cf6575f38503b7c7c86b34fe1f27a3bbe";

const httpLink = new HttpLink({
  uri: "https://gorest.co.in/public/v2/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      limit: 15,
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
