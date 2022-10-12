import { AUTH, LOGOUT } from "../constants/actionTypes";

interface Action {
  type: string;
  data?: any;
}

const authReducer = (state = { authData: null }, action: Action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
