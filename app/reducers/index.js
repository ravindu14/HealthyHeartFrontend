import { combineReducers } from "redux";

import auth, { type AuthStateType } from "./auth";
import exercise, { type ExerciseStateType } from "./exercise";
import food, { type FoodStateType } from "./food";
import heart, { type HeartRateStateType } from "./heartRate";

export type ApplicationState = {
  auth: AuthStateType,
  exercise: ExerciseStateType,
  food: FoodStateType,
  heart: HeartRateStateType,
};

export default () => combineReducers({ auth, exercise, food, heart });
