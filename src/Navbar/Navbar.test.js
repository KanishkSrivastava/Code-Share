import React from 'react';
import { shallow } from 'enzyme';

import Navbar from './Navbar';
import { NavBarNotLogedIn } from './NavBarNotLogedIn';

import { findByTestAttribute } from '../testUtils/utils';
const setup = (Component, props = {}) => {
  return shallow(<Component {...props} />);
};

describe('testing navbar', () => {
  test('render without error', () => {
    const wrapper = setup(Navbar);
    const component = findByTestAttribute(wrapper, 'appbar-component');
    expect(component.length).toBe(1);
  });
  describe('if user loggedOut', () => {
    test('render loggedOut navbar if loggedOut', () => {
      const props = { logedIn: false };
      const wrapper = setup(Navbar, props);
      const component = findByTestAttribute(wrapper, 'appbar-not-loggedIn');
      expect(component.length).toBe(1);
    });
    describe('testing NavBarNotLogedIn component', () => {
      const props = { loginAction: jest.fn() };
      const wrapper = setup(NavBarNotLogedIn, props);
      test('testing login input field', () => {
        const userNameInputComponent = findByTestAttribute(wrapper, 'username-input-field');
        expect(userNameInputComponent.length).toBe(1);
        userNameInputComponent.simulate('change', {
          target: { value: 'USERNAME' }
        });
        expect(wrapper.state('username')).toBe('USERNAME');
      });
      test('testing password input field', () => {
        const userNameInputComponent = findByTestAttribute(wrapper, 'password-input-field');
        expect(userNameInputComponent.length).toBe(1);
        userNameInputComponent.simulate('change', {
          target: { value: 'PASSWORD' }
        });
        expect(wrapper.state('password')).toBe('PASSWORD');
      });
      test('testing login button', () => {
        const loginButon = findByTestAttribute(wrapper, 'login-button');
        loginButon.props().onClick();
        expect(props.loginAction.mock.calls.length).toBe(1);
      });
    });
  });
  describe('if user logged in', () => {
    test('render loggedIn navbar if loggedIn', () => {
      const props = { logedIn: true };
      const wrapper = setup(Navbar, props);
      const component = findByTestAttribute(wrapper, 'appbar-loggedIn');
      expect(component.length).toBe(1);
    });
  });
});
