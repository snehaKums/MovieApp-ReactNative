import React from 'react';
import List from '../src/List';
import renderer from 'react-test-renderer';

fetch = jest.fn(() => Promise.resolve());

test('renders correctly', () => {
  const tree = renderer.create(<List />).toJSON();
  expect(tree).toMatchSnapshot();
});
