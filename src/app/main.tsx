import * as React from "react";
import Header from "../components/navigation/header";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "../store/mainStore";
import { PersistGate } from "redux-persist/integration/react";
import { Route } from "react-router-dom";
import { Suspense } from "react";

const GlobalStyle = createGlobalStyle`
  .layout{
    margin: 50px 0px;
  }
`;

const Landing = React.lazy(() => import("../routes/landing/landingPage"));
const Home = React.lazy(() => import("../routes/home/home"));
const AddMessage = React.lazy(() => import("../routes/messages/addMessage"));
const ViewMessage = React.lazy(() => import("../routes/messages/viewMessage"));
const Auth = React.lazy(() => import("../routes/auth/auth"));
const Privacy = React.lazy(() => import("../routes/privacyPolicy/policy"));
const UserProfile = React.lazy(() => import("../routes/profile/userProfile"));
const Organisations = React.lazy(() => import("../routes/orgs/organisations"));
const ViewOrganisation = React.lazy(() => import("../routes/orgs/viewOrganisation"));
const Notifications = React.lazy(() => import("../routes/notifications/notificationsPage"));

function App() {

  return (
   <Suspense fallback={null}>
    <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <ConnectedRouter history={history}>
          <Header/>
          <Route exact={true} path="/" component={Landing} />
          <Route exact={true} path="/dashboard" component={Home} />
          <Route exact={true} path="/add-message" component={AddMessage} />
          <Route exact={true} path="/view-message" component={ViewMessage} />
          <Route exact={true} path="/auth" component={Auth} />
          <Route exact={true} path="/privacy-policy" component={Privacy} />
          <Route exact={true} path="/profile" component={UserProfile} />
          <Route exact={true} path="/view-organisation" component={ViewOrganisation} />
          <Route exact={true} path="/organisations" component={Organisations} />
          <Route exact={true} path="/notifications" component={Notifications} />
          </ConnectedRouter>
          <GlobalStyle />
        </PersistGate>
      </Provider>
    </Suspense>
  );
}

export default App;
