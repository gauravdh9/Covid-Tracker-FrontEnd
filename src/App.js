import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
import Register from "./Components/register";
import ApolloProvider from "./Graphql/client";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import Navbar from "./Components/navbar";
import Container from "./Components/Container";
import { useSelector } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider>
          <MyApp />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

const MyApp = () => {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      {user?.name && <Navbar />}
      <Switch>
        <Route path="/" exact>
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/dashboard/:type" exact>
          <Container />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
