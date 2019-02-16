import authReducer from "../reducer";
import { AUTH_LOGIN_SUCCESS } from "../types";


describe("authReducer", () => {
  it("handles action of type AUTH_LOGIN_SUCCESS", () => {
    const action = {
      type: AUTH_LOGIN_SUCCESS,
      payload: true
    };

    const newState = authReducer([], action);

    expect(typeof newState).toEqual("object");
    expect(newState.isLoggedIn).toEqual(true);
  });
});
