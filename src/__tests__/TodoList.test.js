import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ConnectedComponent, { TodoList } from '../TodoList';
import { reduxHelper } from '../reduxHelper';
const initialState = { items: [] }

describe(<TodoList />, () => {

  describe('render', () => {
    let component;
    beforeEach( () => {
      const tree = reduxHelper(ConnectedComponent, initialState).component
      component = mount(tree);
    });

    it('matches snapshot', () => {
      expect(toJson(component)).toMatchSnapshot();
    })
  })

  describe('functionality', () => {
    it('updates state on change', () => {
      let component = shallow(<TodoList items={[]} />)
      let input = component.find('input');
      input.simulate('focus');
      input.simulate('change', { target: { name: 'name', value: 'Hello' } })
      expect(component.state('name')).toEqual('Hello');
    })

    it('submits the form', () => {
      let test = { dispatch: jest.fn() }
      let component = mount(<TodoList dispatch={test.dispatch} items={[]} />)
      component.setState({ name: 'Hello' })
      component.find('form').simulate('submit');
      expect(test.dispatch).toHaveBeenCalledTimes(1)
      expect(component.state('name')).toEqual('')
    })


  })

})