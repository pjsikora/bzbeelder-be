import React from "react";
import { mount } from "enzyme";
import LoginForm from "../LoginForm";
import Root from "../../../../Root";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <LoginForm />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("has a email / password input and submit button", () => {
  expect(wrapped.find(`input[name="email"]`)).to.have.lengthOf(1);
  expect(wrapped.find(`input[name="password"]`)).to.have.lengthOf(1);
  expect(wrapped.find(`input[type="submit"]`)).to.have.lengthOf(1);
});

