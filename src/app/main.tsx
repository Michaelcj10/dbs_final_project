import * as React from "react";
import Home from "../routes/home/home";
import Auth from "../routes/auth/auth";
import Header from "../components/navigation/header";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "../store/mainStore";
import { PersistGate } from "redux-persist/integration/react";
import { Route } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  .layout{
    margin-top: 50px;
  }
`;

function App() {

  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <ConnectedRouter history={history}>
        <Header/>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/auth" component={Auth} />
        </ConnectedRouter>
        <GlobalStyle />
      </PersistGate>
    </Provider>
  );
}

export default App;
