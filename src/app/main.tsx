import * as React from "react";
import Home from "../routes/home/home";
import Auth from "../routes/auth/auth";
import Privacy from "../routes/privacyPolicy/policy";
import Header from "../components/navigation/header";
import AddMessage from "../routes/messages/addMessage";
import Landing from "../routes/landing/landingPage";
import UserProfile from "../routes/profile/userProfile";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "../store/mainStore";
import { PersistGate } from "redux-persist/integration/react";
import { Route } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  .layout{
    margin: 50px 0px;
  }
`;

function App() {

  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <ConnectedRouter history={history}>
        <Header/>
        <Route exact={true} path="/" component={Landing} />
        <Route exact={true} path="/dashboard" component={Home} />
        <Route exact={true} path="/add-message" component={AddMessage} />
        <Route exact={true} path="/auth" component={Auth} />
        <Route exact={true} path="/privacy-policy" component={Privacy} />
        <Route exact={true} path="/profile" component={UserProfile} />
        </ConnectedRouter>
        <GlobalStyle />
      </PersistGate>
    </Provider>
  );
}

export default App;
