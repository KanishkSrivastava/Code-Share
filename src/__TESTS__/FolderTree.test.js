import React from 'react';
import { shallow } from 'enzyme';

import FolderTree from '../Profile/FolderTree';
import { findByTestAttribute } from '../testUtils/utils';
const setup = (Component, props = {}) => {
  return shallow(<Component {...props} />);
};
describe('testing folder tree component', () => {
  test('should render folder tree component with no files', () => {
    const props = {
      filePath: []
    };
    const wrapper = setup(FolderTree, props);
    const component = findByTestAttribute(wrapper, 'no-files');
    expect(component.length).toBe(1);
  });
  describe('testing folder tree component with files', () => {
    const props = {
      filePath: [
        'one.js',
        'onefolder/one.js',
        'onefolder/onefolder/two.js',
        'twofolder/two.js',
        'twofolder/three.js',
        'twofolder/twofolder/one.js'
      ]
    };
    const wrapper = setup(FolderTree, props);

    test('should render folder tree component', () => {
      const component = findByTestAttribute(wrapper, 'folder-tree');
      expect(component.length).toBe(1);
    });

    test('should contain "onefolder" in the folder tree', () => {
      const component = findByTestAttribute(wrapper, 'folder-tree').find(`[primary="onefolder"]`);
      expect(component.length).toBe(1);
    });

    test('should contain "one.js" in the folder tree', () => {
      const component = findByTestAttribute(wrapper, 'folder-tree').find(`[primary="one.js"]`);
      expect(component.length).toBe(1);
    });

    test('should change state "currentPath" to "onefolder/" by clicking on "onefolder" ', () => {
      const component = findByTestAttribute(wrapper, 'folder-tree')
        .find('WithStyles(ListItem)')
        .first();
      component.simulate('click');
      expect(wrapper.state('currentPath')).toBe('onefolder/');
    });

    test('should render navigation button', () => {
      const component = findByTestAttribute(wrapper, 'navigation-button');
      expect(component.length).toBe(1);
    });
  });
});
