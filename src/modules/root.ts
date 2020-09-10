import { combineReducers } from "redux";
import safehub from "./safehub";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export default combineReducers({
  safehub,
  router: connectRouter(history),
});
