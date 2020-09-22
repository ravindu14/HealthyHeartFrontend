import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";

import {
  INIT_HEART_RATE,
  ON_CALCULATE_HEART_RATE,
  FAILED,
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
};

const initialState: HeartRateStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  heartRate: null,
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
    default:
      return state;
  }
};

export default reducer;
