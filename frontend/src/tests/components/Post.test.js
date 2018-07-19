import React from 'react';
import { mount } from 'enzyme';
import { Post, styles, mapStateToProps } from '../../components/Post';

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
    author: 'Test',
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
  it('should render a post', () => {
    const wrapper = mount(<Post {...props} />);
    expect(wrapper.find('Avatar').contains('1')).toEqual(true);
    expect(wrapper.find('CardHeader').props().title).toEqual('Test');
    expect(wrapper.find('CardHeader').props().subheader).toEqual('last Thursday at 2:11 PM');
  });
  it('should render post comments if user is logged in');
  it('should render a message in comments to login if user is not already logged in');
  it('should handle menu open');
  it('should handle menu close');
  it('should render edit post');
  it('should delete post');
  it('should handle up vote if user is logged in');
  it('should handle down vote if user is logged in');
  it('should show snackbar to login if visitant try up vote and is not logged in');
  it('should show snackbar to login if visitant try down vote and is not logged in');
  it('should handle snackbar close');
});
