import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import { Header, mapStateToProps } from '../../components/Header';
jest.mock('../../components/ListCategories');

const props = {
  isUserLoggedIn: false,
  getAllPosts: jest.fn(),
  logout: jest.fn(),
  classes: {}
};

describe('/components/Header', () => {
  it('should render title and list of categories', () => {
    const wrapper = mount(
      <Router>
        <Header {...props} />
      </Router>
    );
    const title = wrapper.find('Typography[variant="title"]').first();
    expect(title.contains('Readable')).toEqual(true);
    expect(wrapper.find('div').contains('ListCategories')).toEqual(true);
  });
  it('should get all posts if title is clicked', () => {
    const wrapper = mount(
      <Router>
        <Header {...props} />
      </Router>
    );
    wrapper.find('Button[to="/"]').simulate('click');
    expect(props.getAllPosts).toHaveBeenCalled();
  });
  it('should render login action if user is not logged in', () => {
    const wrapper = mount(
      <Router>
        <Header {...props} />
      </Router>
    );
    expect(wrapper.find('Button#login')).toHaveLength(1);
  });
  it('should render logout action if user is logged in', () => {
    const newProps = { ...props, isUserLoggedIn: true };
    const wrapper = mount(
      <Router>
        <Header {...newProps} />
      </Router>
    );
    const logoutBtn = wrapper.find('Button#logout');
    expect(logoutBtn).toHaveLength(1);
    logoutBtn.simulate('click');
    expect(props.logout).toHaveBeenCalled();
  });
  it('should map state to props', () => {
    const user = { isLoggedIn: false };
    const result = mapStateToProps({ user });
    expect(result.isUserLoggedIn).toEqual(false);
  });
});
