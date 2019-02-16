import { changeAuth } from "../actions";
import { AUTH_LOGIN_SUCCESS } from "../types";

describe("AuthStore", () => {
  it("has the correct type", () => {
    const action = changeAuth();

    expect(action.type).toEqual(AUTH_LOGIN_SUCCESS);
  });
});
