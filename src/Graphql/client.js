import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider as Provider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let httpLink = createHttpLink({
  uri: "https://covid-trackerbackend.herokuapp.com/graphql",
});
const authLink = setContext((_, { headers }) => {
  let token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});
httpLink = authLink.concat(httpLink);

export const Client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function ApolloProvider(props) {
  return <Provider client={Client} {...props} />;
}
