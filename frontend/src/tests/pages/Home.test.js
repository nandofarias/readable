import React from 'react';
import { shallow } from 'enzyme';
import { Home, mapStateToProps } from '../../pages/Home';

const props = {
  isUserLoggedIn: true,
  match: { params: {} },
  getCategoryPosts: jest.fn(),
  getAllPosts: jest.fn()
};

describe('/pages/Home', () => {
  it('should render home with all posts', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(props.getAllPosts).toHaveBeenCalled();
  });
  it('should render home by category', () => {
    const newProps = { ...props, match: { params: { category: 'test' } } };
    const wrapper = shallow(<Home {...newProps} />);
    expect(props.getCategoryPosts).toHaveBeenCalledWith('test');
  });
  it('should show NewPost if user is logged in', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper.find('WithStyles(Connect(NewPost))')).toHaveLength(1);
  });
  it('should hide NewPost if user is not logged in', () => {
    const newProps = { ...props, isUserLoggedIn: false };
    const wrapper = shallow(<Home {...newProps} />);
    expect(wrapper.find('WithStyles(Connect(NewPost))')).toHaveLength(0);
  });
  it('should map state to props', () => {
    const result = mapStateToProps({ user: { isLoggedIn: true } });
    expect(result.isUserLoggedIn).toEqual(true);
  });
});
