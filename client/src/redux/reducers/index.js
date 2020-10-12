import { combineReducers } from "redux";

import auth from "./auth";
import user from "./user";
import toast from "./toast";
import progress from "./progress";

const appReducer = combineReducers({
  auth,
  toast,
  progress,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT' || action.type === 'REMOVE_PROFILE') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;