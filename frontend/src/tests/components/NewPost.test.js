import React from 'react';
import { mount, shallow } from 'enzyme';
import { NewPost, mapStateToProps } from '../../components/NewPost';

const props = {
  classes: {},
  createPost: jest.fn(),
  categories: [
    {
      name: 'react',
      path: 'react'
    },
    {
      name: 'redux',
      path: 'redux'
    },
    {
      name: 'udacity',
      path: 'udacity'
    }
  ],
  author: 'test'
};

describe('/comopnents/NewPost', () => {
  afterEach(() => {
    props.createPost.mockClear();
  });

  it('should open dialog', () => {
    const wrapper = mount(<NewPost {...props} />);
    wrapper.find('Button[aria-label="add"]').simulate('click');
    expect(wrapper.state().isDialogOpened).toEqual(true);
  });

  it('should submit form without errors', () => {
    const wrapper = mount(<NewPost {...props} />);
    wrapper.find('Button[aria-label="add"]').simulate('click');
    wrapper.find('input#title').simulate('change', {
      target: { name: 'title', value: 'test title' }
    });
    wrapper.find('textarea#body').simulate('change', {
      target: { name: 'body', value: 'test body' }
    });
    wrapper
      .find('Select')
      .props()
      .input.props.onChange({ target: { name: 'category', value: 'react' } });
    wrapper.find('form').simulate('submit');
    expect(props.createPost).toHaveBeenCalledWith({
      title: 'test title',
      body: 'test body',
      category: 'react',
      isDialogOpened: true,
      author: 'test'
    });
    expect(wrapper.state()).toEqual({
      title: '',
      body: '',
      category: '',
      isDialogOpened: false
    });
  });
  it('should cancel post creation', () => {
    const wrapper = mount(<NewPost {...props} />);
    wrapper.find('Button[aria-label="add"]').simulate('click');
    wrapper.find('button#cancel').simulate('click');
    expect(wrapper.state().isDialogOpened).toEqual(false);
  });

  it('should test component will receive props', () => {
    const newCategories = [
      {
        name: 'react2',
        path: 'react2'
      },
      {
        name: 'redux2',
        path: 'redux2'
      }
    ];
    const wrapper = shallow(<NewPost {...props} />);
    wrapper.setProps({ ...props, categories: newCategories });
    expect(wrapper.state().category).toEqual('react2');
  });
  it('should map state to props', () => {
    const result = mapStateToProps({ categories: props.categories, user: { username: 'test' } });
    expect(result).toEqual({ categories: props.categories, author: 'test' });
  });
});
