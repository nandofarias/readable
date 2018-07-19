import React from 'react';
import { mount } from 'enzyme';
import { EditComment } from '../../components/EditComment';

const props = {
  classes: {},
  comment: {
    id: 'test01',
    body: 'test body'
  },
  editComment: jest.fn(),
  didFinishedEditing: jest.fn()
};
describe('/components/EditComment', () => {
  afterEach(() => {
    props.editComment.mockClear();
    props.didFinishedEditing.mockClear();
  });

  it('should submit with body change', () => {
    const wrapper = mount(<EditComment {...props} />);
    wrapper.find('textarea#body').simulate('change', {
      target: { name: 'body', value: 'test change' }
    });

    wrapper.find('form').simulate('submit');

    expect(props.editComment).toHaveBeenCalledWith({ id: 'test01', body: 'test change' });
  });

  it('should cancel editing without change', () => {
    const wrapper = mount(<EditComment {...props} />);
    wrapper.find('button#cancel').simulate('click');
    expect(props.didFinishedEditing).toHaveBeenCalled();
  });
});
