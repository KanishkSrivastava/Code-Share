import React from 'react';
import { shallow } from 'enzyme';

import { FolderTree } from '../Profile/FolderTree';
import { findByTestAttribute } from '../testUtils/utils';

const setup = (Component, props = {}) => {
  return shallow(<Component {...props} />);
};

describe('testing folder tree component', () => {
  describe('testing folder tree component with files', () => {
    let wrapper;
    const props = { filePath: ['one.js', 'onefolder/one.js', 'twofolder/twofolder/one.js'], fileContent: jest.fn() };
    beforeEach(() => (wrapper = setup(FolderTree, props)));

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

    test('should call "fileContent" function on file click ', () => {
      const component = findByTestAttribute(wrapper, 'folder-tree')
        .find('WithStyles(ListItem)')
        .at(2);
      component.simulate('click');
      expect(props.fileContent.mock.calls.length).toBe(1);
    });
  });
});
