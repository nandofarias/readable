import React from 'React';
import { mount } from 'enzyme';
import { EditPost } from '../../components/EditPost';

const props = {
  classes: {},
  post: {
    title: 'test',
    body: 'test'
  },
  editPost: jest.fn(),
  didFinishedEditing: jest.fn()
};

describe('/components/EditPost', () => {
  afterEach(() => {
    props.editPost.mockClear();
    props.didFinishedEditing.mockClear();
  });

  it('should submit with title and body changes', () => {
    const wrapper = mount(<EditPost {...props} />);
    wrapper.find('input#title').simulate('change', {
      target: { name: 'title', value: 'test change' }
    });
    wrapper.find('textarea#body').simulate('change', {
      target: { name: 'body', value: 'test change' }
    });
    wrapper.find('form').simulate('submit');
    expect(props.editPost).toHaveBeenCalledWith({ title: 'test change', body: 'test change' });
    expect(props.didFinishedEditing).toHaveBeenCalled();
  });
  it('should cancel editing without changes', () => {
    const wrapper = mount(<EditPost {...props} />);
    wrapper.find('button#cancel').simulate('click');
    expect(props.didFinishedEditing).toHaveBeenCalled();
  });
});
