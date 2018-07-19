import React from 'react';
import { shallow } from 'enzyme';
import { ListCategories, mapStateToProps } from '../../components/ListCategories';

const props = {
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
  getCategories: jest.fn(),
  getCategoryPosts: jest.fn()
};
describe('/components/ListCategories', () => {
  afterEach(() => {
    props.getCategories.mockClear();
    props.getCategoryPosts.mockClear();
  });

  it('should call all categories', () => {
    shallow(<ListCategories {...props} />);
    expect(props.getCategories).toHaveBeenCalled();
  });

  it('should map all categories', () => {
    const wrapper = shallow(<ListCategories {...props} />);
    expect(wrapper.find('WithStyles(Button)')).toHaveLength(3);
  });

  it('should call getCategoryPosts on a click button', () => {
    const wrapper = shallow(<ListCategories {...props} />);
    wrapper.find('WithStyles(Button)[to="/react"]').simulate('click');
    expect(props.getCategoryPosts).toHaveBeenCalledWith('react');
  });

  it('should map state to props', () => {
    const result = mapStateToProps(props);
    expect(result.categories).toEqual(props.categories);
  });
});
