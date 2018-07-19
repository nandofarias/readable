import React from 'react';
import { mount } from 'enzyme';
import { NewComment, mapStateToProps } from '../../components/NewComment';

const props = {
  classes: {},
  parentId: 'test01',
  author: 'test',
  createComment: jest.fn()
};
describe('/components/NewComment', () => {
  it('should create a new comment', () => {
    const wrapper = mount(<NewComment {...props} />);
    wrapper.find('textarea#body').simulate('change', {
      target: { name: 'body', value: 'test' }
    });
    wrapper.find('form').simulate('submit');
    expect(props.createComment).toHaveBeenCalledWith({
      parentId: 'test01',
      author: 'test',
      body: 'test'
    });
  });
  it('should map state to props', () => {
    const result = mapStateToProps({ user: { username: 'test' } });
    expect(result.author).toEqual('test');
  });
});
