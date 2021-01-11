import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";

import {
  INIT_HEART_RATE,
  ON_CALCULATE_HEART_RATE,
  FAILED,
  SET_HEART_RATE,
  ON_RECEIVE_ANALYSIS,
  INITIALIZE_ANALYSIS,
} from "@app/actionTypes/heartRate";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type HeartRateStateType = {
  status: AsyncStatusType,
  notification: null,
  heartRate: string | null,
  analysis: null | string,
};

const initialState: HeartRateStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  heartRate: null,
  analysis: null,
};

function heartRateInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

const reducer = (
  state: HeartRateStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case INIT_HEART_RATE:
      return heartRateInit(state);
    case ON_CALCULATE_HEART_RATE:
      return {
        ...state,
        heartRate: payload,
        status: ASYNC_STATUS.SUCCESS,
      };
    case FAILED:
      return {
        ...state,
        status: ASYNC_STATUS.FAILURE,
      };
    case SET_HEART_RATE:
      return {
        ...state,
        heartRate: payload,
      };
    case ON_RECEIVE_ANALYSIS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        analysis:
          payload === "1" ? "You are in risk zone" : "You are in safe zone",
      };
    case INITIALIZE_ANALYSIS:
      return {
        ...state,
        analysis: null,
      };
    default:
      return state;
  }
};

export default reducer;
