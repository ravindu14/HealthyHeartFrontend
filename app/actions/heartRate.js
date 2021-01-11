import {
  INIT_HEART_RATE,
  ON_CALCULATE_HEART_RATE,
  FAILED,
} from "@app/actionTypes/heartRate";
import { BTManager } from "../helpers/helpers/reactNative";

export function getHeartRate(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: INIT_HEART_RATE,
    });

    const authService = serviceManager.get("AuthService");

    authService
      .getHeartRateFromBT()
      .then(() => {
        let heatRate = BTManager();
        dispatch({
          type: ON_CALCULATE_HEART_RATE,
          payload: heatRate.toString(),
        });
      })
      .catch(() => {
        dispatch({ type: FAILED });
      });
  };
}

export function getRiskAnalysis(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: INIT_HEART_RATE,
    });

    const authService = serviceManager.get("AuthService");

    authService
      .getRiskAnalysis(payload)
      .then((response) => {
        dispatch({
          type: ON_RECEIVE_ANALYSIS,
          payload: response.data.Result,
        });
      })
      .catch(() => {
        dispatch({ type: FAILED });
      });
  };
}

export function initializeAnalysis() {
  return (dispatch) => {
    dispatch({ type: INITIALIZE_ANALYSIS });
  };
}
