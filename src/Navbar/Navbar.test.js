import React from "react";
import { shallow } from "enzyme";

import { findByTestAttribute } from "../testUtils/findAttr";
import Navbar from "./Navbar";

const setup = (props = {}) => {
  return shallow(<Navbar {...props} />);
};
test("render without error", () => {
  const wrapper = setup();
  const component = findByTestAttribute(wrapper, "appbar-component");
  expect(component.length).toBe(1);
});
test("render Loggedout Navbar when not logged in", () => {
  const props = { logedIn: false };
  const wrapper = setup(props);
  const component = findByTestAttribute(wrapper, "appbar-not-loggedIn");
  expect(component.length).toBe(1);
});
test("render LoggedIn when logged in", () => {
  const props = { logedIn: true };
  const wrapper = setup(props);
  const component = findByTestAttribute(wrapper, "appbar-loggedIn");
  expect(component.length).toBe(1);
});
