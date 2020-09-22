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
