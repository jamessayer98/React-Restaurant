import { createAction } from "redux-actions";
import { SET_LOADING } from "../constants";

// Loading
export const setLoading = createAction(SET_LOADING);

export default {
  setLoading
};
