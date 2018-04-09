import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TodoList from '../TodoList';

describe(<TodoList />, () => {

  test('renders without crashing', () =>{
    shallow(<TodoList />);
  })

  test('matches snapshot', () => {
    const component = shallow(<TodoList />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot();
  })

})