import React from 'react';
import { shallow } from 'enzyme';
import NoMatch from '../../pages/NoMatch';

describe('/pages/NoMatch', () => {
  it('should render placeholder', () => {
    const wrapper = shallow(<NoMatch />);
    const placeholder = wrapper.find('WithStyles(Component)');
    expect(placeholder.props().icon).toEqual('location_off');
    expect(placeholder.props().text).toEqual('Location not found :(');
  });
});
