import React from 'react';
import { mount, shallow } from 'enzyme';
import { Post, styles, mapStateToProps } from '../../components/Post';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter as Router } from 'react-router-dom';

const props = {
  classes: {},
  getComments: jest.fn(),
  deletePost: jest.fn(),
  location: { pathname: '/' },
  history: { push: jest.fn() },
  upVotePost: jest.fn(),
  downVotePost: jest.fn(),
  user: { username: 'test', isLoggedIn: true },
  post: {
    id: 1530666282,
    timestamp: 1530666282,
    title: 'Test',
    body: 'Test',
    author: 'test',
    category: 'udacity',
    voteScore: 1,
    deleted: false,
    commentCount: 0
  },
  comments: [
    {
      id: '894tuq4ut84ut8v4t8wun89g',
      parentId: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1468166872634,
      body: 'Hi there! I am a COMMENT.',
      author: 'thingtwo',
      voteScore: 6,
      deleted: false,
      parentDeleted: false
    },
    {
      id: '8tu4bsun805n8un48ve89',
      parentId: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1469479767190,
      body: 'Comments. Are. Cool.',
      author: 'thingone',
      voteScore: -5,
      deleted: false,
      parentDeleted: false
    }
  ]
};

describe('/components/Post', () => {
  afterEach(() => {
    props.getComments.mockClear();
    props.deletePost.mockClear();
    props.history.push.mockClear();
    props.upVotePost.mockClear();
    props.downVotePost.mockClear();
  });
  it('should construct styles based in the theme', () => {
    const theme = {
      transitions: {
        create: jest.fn(),
        duration: { shortest: 100 }
      }
    };
    styles(theme);
    expect(theme.transitions.create).toHaveBeenCalledWith('transform', { duration: 100 });
  });

  it('should render a post', () => {
    const wrapper = mount(<Post {...props} />);
    expect(wrapper.find('Avatar').contains('1')).toEqual(true);
    expect(wrapper.find('CardHeader').props().title).toEqual('Test');
    expect(wrapper.find('CardHeader').props().subheader).toEqual('last Thursday at 2:11 PM');
  });

  it('should render post comments if expandComments is true and user is logged in', () => {
    const newProps = { ...props, expandComments: true };
    shallow(<Post {...newProps} />);
    expect(props.getComments).toHaveBeenCalledWith(1530666282);
  });
  it('should render post comments if user is logged in clicking on IconButton', () => {
    const store = configureStore([])({ user: props.user });
    const wrapper = mount(
      <Provider store={store}>
        <Post {...props} />
      </Provider>
    );
    const post = wrapper.find('Post').instance();
    wrapper.find('IconButton[aria-label="Show more"]').simulate('click');
    expect(props.getComments).toHaveBeenCalledWith(1530666282);
    expect(post.state.expanded).toEqual(true);
    expect(wrapper.find('Comment')).toHaveLength(2);
    wrapper.find('IconButton[aria-label="Show more"]').simulate('click');
    expect(post.state.expanded).toEqual(false);
  });

  it('should render post comments if user is logged in clicking on Button comments count', () => {
    const store = configureStore([])({ user: props.user });
    const wrapper = mount(
      <Provider store={store}>
        <Post {...props} />
      </Provider>
    );
    const post = wrapper.find('Post').instance();
    wrapper.find('Button#comments-count').simulate('click');
    expect(props.getComments).toHaveBeenCalledWith(1530666282);
    expect(post.state.expanded).toEqual(true);
    expect(wrapper.find('Comment')).toHaveLength(2);
  });
  it('should render a message to be the first to comment if there is no comments', () => {
    const store = configureStore([])({ user: props.user });
    const newProps = { ...props, comments: [] };
    const wrapper = mount(
      <Provider store={store}>
        <Post {...newProps} />
      </Provider>
    );
    wrapper.find('IconButton[aria-label="Show more"]').simulate('click');
    expect(wrapper.find('Comment')).toHaveLength(0);
    expect(wrapper.find('Typography').contains('Be the first to comment in this post.')).toEqual(
      true
    );
  });
  it('should render a message in comments to login if user is not already logged in', () => {
    const store = configureStore([])({ user: props.user });
    const newProps = { ...props, user: { isLoggedIn: false } };
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Post {...newProps} />
        </Router>
      </Provider>
    );
    wrapper.find('IconButton[aria-label="Show more"]').simulate('click');
    expect(wrapper.find('Comment')).toHaveLength(0);
    expect(
      wrapper
        .find('Typography#no-comments-placeholder')
        .contains(' to comment on this post and see the others comments.')
    ).toEqual(true);
  });
  it('should handle menu open close', () => {
    const wrapper = mount(
      <Router>
        <Post {...props} />
      </Router>
    );
    const post = wrapper.find('Post').instance();
    wrapper.find('IconButton#menu').simulate('click');
    expect(post.state.anchorMenu).not.toBeNull();
    expect(wrapper.find('MenuItem')).toHaveLength(3);
    post.handleMenuClose();
    expect(post.state.anchorMenu).toBeNull();
  });
  it('should render only one option in menu if user is not the same as the author', () => {
    const newProps = { ...props, user: { username: 'test02', isLoggedIn: true } };
    const wrapper = mount(
      <Router>
        <Post {...newProps} />
      </Router>
    );
    const post = wrapper.find('Post').instance();
    wrapper.find('IconButton#menu').simulate('click');
    expect(post.state.anchorMenu).not.toBeNull();
    expect(wrapper.find('MenuItem')).toHaveLength(1);
  });
  it('should render edit post', () => {
    const store = configureStore([])({ user: props.user });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Post {...props} />
        </Router>
      </Provider>
    );
    const post = wrapper.find('Post').instance();
    wrapper.find('IconButton#menu').simulate('click');
    wrapper.find('MenuItem#edit').simulate('click');
    expect(post.state.editable).toEqual(true);
    expect(post.state.anchorMenu).toEqual(false);
    expect(wrapper.find('EditPost')).toHaveLength(1);
  });
  it('should delete post in home', () => {
    const wrapper = mount(
      <Router>
        <Post {...props} />
      </Router>
    );
    wrapper.find('IconButton#menu').simulate('click');
    wrapper.find('MenuItem#delete').simulate('click');
    expect(props.deletePost).toHaveBeenCalledWith(1530666282);
  });
  it('should delete post in page single post and sent to home', () => {
    const newProps = { ...props, location: { pathname: '/udacity/1530666282' } };
    const wrapper = mount(
      <Router>
        <Post {...newProps} />
      </Router>
    );
    wrapper.find('IconButton#menu').simulate('click');
    wrapper.find('MenuItem#delete').simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/');
    expect(props.deletePost).toHaveBeenCalledWith(1530666282);
  });
  it('should handle up vote if user is logged in', () => {
    const wrapper = mount(<Post {...props} />);
    wrapper.find('IconButton[aria-label="Thumbs Up"]').simulate('click');
    expect(props.upVotePost).toHaveBeenCalledWith(1530666282);
  });
  it('should handle down vote if user is logged in', () => {
    const wrapper = mount(<Post {...props} />);
    wrapper.find('IconButton[aria-label="Thumbs Down"]').simulate('click');
    expect(props.downVotePost).toHaveBeenCalledWith(1530666282);
  });
  it('should show snackbar to login if visitant try up vote and is not logged in', () => {
    const newProps = { ...props, user: { isLoggedIn: false } };
    const wrapper = mount(
      <Router>
        <Post {...newProps} />
      </Router>
    );
    wrapper.find('IconButton[aria-label="Thumbs Up"]').simulate('click');
    expect(wrapper.find('Post').instance().state.openSnackbar).toEqual(true);
  });
  it('should show snackbar to login if visitant try down vote and is not logged in', () => {
    const newProps = { ...props, user: { isLoggedIn: false } };
    const wrapper = mount(
      <Router>
        <Post {...newProps} />
      </Router>
    );
    wrapper.find('IconButton[aria-label="Thumbs Down"]').simulate('click');
    expect(wrapper.find('Post').instance().state.openSnackbar).toEqual(true);
  });
  it('should handle snackbar close', () => {
    const newProps = { ...props, user: { isLoggedIn: false } };
    const wrapper = mount(
      <Router>
        <Post {...newProps} />
      </Router>
    );
    const post = wrapper.find('Post').instance();
    wrapper.find('IconButton[aria-label="Thumbs Up"]').simulate('click');
    expect(post.state.openSnackbar).toEqual(true);
    post.handleSnackbarClose();
    expect(post.state.openSnackbar).toEqual(false);
  });

  it('should map state to props when there are comments', () => {
    const state = { user: props.user, comments: { [props.post.id]: props.comments } };
    const result = mapStateToProps(state, props);
    expect(result).toEqual({ user: props.user, comments: props.comments });
  });
  it('should map state to props whe there are no comments', () => {
    const state = { user: props.user, comments: {} };
    const result = mapStateToProps(state, props);
    expect(result).toEqual({ user: props.user, comments: [] });
  });

  it('should handle finish editing', () => {
    const wrapper = shallow(<Post {...props} />);
    wrapper.instance().handleFinishEditPost();
    expect(wrapper.state().anchorMenu).toEqual(false);
    expect(wrapper.state().editable).toEqual(false);
  });
});
