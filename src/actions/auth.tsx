import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin =
  (values: { email: string; password: string }, navigate: any) =>
  async (dispatch: any) => {
    try {
      console.log(values);
      const { data } = await api.signIn(values);

      dispatch({ type: AUTH, data });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

export const signup =
  (values: { email: string; password: string }, navigate: any) =>
  async (dispatch: any) => {
    try {
      const { data } = await api.signUp(values);

      dispatch({ type: AUTH, data });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
