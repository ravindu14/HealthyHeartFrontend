import {
  FOOD_INIT,
  FOOD_INITIATE,
  PREDICT_FOOD_SUCCESS,
  FOOD_FAILURE,
  RESET_NOTIFICATION,
  MEAL_PLAN_SUCCESS,
} from "@app/actionTypes/food";

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}

export function sendNotification(message) {
  return (dispatch) => {
    dispatch({ type: FOOD_FAILURE, payload: { message } });
  };
}

export function initiateFood() {
  return (dispatch) => {
    dispatch({ type: FOOD_INITIATE });
  };
}

export function getScannedFood(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: FOOD_INIT,
    });

    const foodService = serviceManager.get("FoodService");

    foodService
      .getFoodPrediction(payload)
      .then((res) => {
        dispatch({
          type: PREDICT_FOOD_SUCCESS,
          payload: res.data.result,
        });
      })
      .catch((error) => {
        dispatch({
          type: FOOD_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}
