import React from 'react';
import { mount } from 'enzyme';
import { LoginForm } from '../../components/LoginForm';

describe('/components/LoginForm', () => {
  it('should submit login', () => {
    const props = {
      login: jest.fn(),
      history: { push: jest.fn() }
    };
    const wrapper = mount(<LoginForm {...props} />);
    wrapper.find('input#username').simulate('change', {
      target: { name: 'username', value: 'test' }
    });
    wrapper.find('input#password').simulate('change', {
      target: { name: 'password', value: 'test' }
    });
    wrapper.find('form').simulate('submit');

    expect(props.login).toHaveBeenCalledWith({ username: 'test', password: 'test' });
    expect(props.history.push).toHaveBeenCalledWith('/');
  });
});
