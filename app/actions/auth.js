import { navigateAndReset } from "@app/actions/routes";
import {
  AUTH_INIT,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  RESET_NOTIFICATION,
  GET_USER_SUCCESS,
} from "@app/actionTypes/auth";
import { AUTH_TOKEN_KEY, GENDER_KEY } from "@app/constants/auth";

export function sendNotification(message) {
  return (dispatch) => {
    dispatch({ type: AUTH_FAILURE, payload: { message } });
  };
}

function authSuccess(payload) {
  return {
    type: AUTH_SUCCESS,
    payload,
  };
}

export function getUserData() {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: AUTH_INIT,
    });

    const authService = serviceManager.get("AuthService");

    authService
      .getUserData()
      .then(({ success, data }) => {
        if (success) {
          dispatch({ type: GET_USER_SUCCESS, payload: data });
        } else {
          dispatch({
            type: AUTH_FAILURE,
            payload: { message },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Request failed!" },
        });
      });
  };
}

export function isUserLogged() {
  return (dispatch, getState, serviceManager) => {
    const storageService = serviceManager.get("StorageService");
    storageService.getItems([AUTH_TOKEN_KEY, GENDER_KEY]).then((stores) => {
      const values = {};
      stores.map((result, i, store) => {
        values[store[i][0]] = store[i][1];
      });
      const token = values[AUTH_TOKEN_KEY];
      const gender = values[GENDER_KEY];
      if (token && token !== null) {
        dispatch(authSuccess({ gender }));
        serviceManager.get("ApiService").authToken = token;
        dispatch(navigateAndReset("Dashboard"));
      } else {
        dispatch(navigateAndReset("Sign In"));
      }
    });
  };
}

export function userLogin(payload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    const storageService = serviceManager.get("StorageService");
    dispatch({
      type: AUTH_INIT,
    });
    authService
      .login(payload)
      .then(({ success, message, token, gender }) => {
        if (success) {
          storageService.saveItems([
            [AUTH_TOKEN_KEY, token.key],
            [GENDER_KEY, gender],
          ]);
          serviceManager.get("ApiService").authToken = token.key;
          dispatch(authSuccess({ gender }));
          dispatch(navigateAndReset("Dashboard"));
        } else {
          dispatch({
            type: AUTH_FAILURE,
            payload: { message },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Request failed!" },
        });
      });
  };
}

export function userSignUp(payload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    const storageService = serviceManager.get("StorageService");
    dispatch({
      type: AUTH_INIT,
    });

    authService
      .register({ ...payload })
      .then(({ success, message, token, gender }) => {
        if (success) {
          storageService.saveItems([
            [AUTH_TOKEN_KEY, token.key],
            [GENDER_KEY, gender],
          ]);
          serviceManager.get("ApiService").authToken = token.key;
          dispatch(authSuccess({ gender }));
          dispatch(navigateAndReset("Sign In"));
        } else {
          dispatch({
            type: AUTH_FAILURE,
            payload: { message },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Request failed" },
        });
      });
  };
}

export function updateUser(payload, riskPayload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    dispatch({
      type: AUTH_INIT,
    });

    authService
      .updateUser({ ...payload })
      .then(({ success }) => {
        if (success) {
          dispatch(navigateAndReset("Dashboard"));
        } else {
          dispatch({
            type: AUTH_FAILURE,
            payload: { message },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Request failed" },
        });
      });
  };
}

export function userLogout() {
  return (dispatch, getState, serviceManager) => {
    const storageService = serviceManager.get("StorageService");
    storageService.deleteItem(AUTH_TOKEN_KEY).then((token) => {
      dispatch(navigateAndReset("Sign In"));
    });
  };
}

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}
