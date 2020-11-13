import React from 'react';
import { shallow } from 'enzyme';
import Sample from './sample.jsx';

it('should render greetings for our application.', () => {
  const wrapper = shallow(<Sample />);
  const span = wrapper.find('span');
  const result = span.text();

  expect(result).toBe('Welcome to Team Donauwelle!');
});
