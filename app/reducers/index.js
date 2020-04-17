import { combineReducers } from "redux";

import auth, { type AuthStateType } from "./auth";

export type ApplicationState = {
  auth: AuthStateType,
};

export default () => combineReducers({ auth });
