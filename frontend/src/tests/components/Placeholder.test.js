import React from 'react';
import { mount } from 'enzyme';
import Placeholder from '../../components/Placeholder';

describe('/components/Placeholder', () => {
  it('should render text properly', () => {
    const wrapper = mount(<Placeholder text="test" />);
    const text = wrapper.find('Typography');
    expect(text.length).toEqual(1);
    expect(text.props().children).toEqual('test');
  });

  it('should render icon properly', () => {
    const wrapper = mount(<Placeholder icon="edit" />);
    const icon = wrapper.find('Icon');
    expect(icon.length).toEqual(1);
    expect(icon.props().children).toEqual('edit');
  });
});
