import { combineReducers } from "redux";
import counter from "./counter";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export default combineReducers({
  counter,
  router: connectRouter(history),
});
