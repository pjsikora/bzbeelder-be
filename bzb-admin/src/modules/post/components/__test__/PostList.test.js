import React from "react";
import { mount } from "enzyme";
import PostList from "../PostList";
import Root from "../../../../Root";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <PostList />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

// TODO
it("Init", () => {
  expect(true).toEqual(true);
});
