import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../pages/Login';

const props = {
  classes: {}
};
describe('/pages/Login', () => {
  it('should render login form', () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper.find('withRouter(Connect(LoginForm))')).toHaveLength(1);
  });
});
