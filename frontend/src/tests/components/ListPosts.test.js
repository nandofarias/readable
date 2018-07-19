import React from 'react';
import { mount, shallow } from 'enzyme';
import { ListPosts, mapStateToProps } from '../../components/ListPosts';

const props = {
  classes: {},
  posts: [
    {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false,
      commentCount: 2
    },
    {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false,
      commentCount: 0
    }
  ]
};
describe('/components/ListPosts', () => {
  it('should list posts', () => {
    const wrapper = shallow(<ListPosts {...props} />);
    expect(wrapper.find('withRouter(WithStyles(Connect(Post)))')).toHaveLength(2);
  });

  it('should render placeholder when no post is found', () => {
    const newProps = { ...props, posts: [] };
    const wrapper = shallow(<ListPosts {...newProps} />);
    const placeholder = wrapper.find('WithStyles(Component)');
    expect(placeholder.props().text).toEqual('No posts found :(');
    expect(placeholder.props().icon).toEqual('forum');
  });

  it('should list posts ordered by vote', () => {
    const wrapper = shallow(<ListPosts {...props} />);
    const posts = wrapper.find('withRouter(WithStyles(Connect(Post)))');
    expect(posts.first().props().post.id).toEqual('8xf0y6ziyjabvozdd253nd');
  });

  it('should list posts order by date', () => {
    const wrapper = shallow(<ListPosts {...props} />);
    const select = wrapper.find('WithStyles(Select)');
    select.simulate('change', { target: { value: 'by-date' } });
    const posts = wrapper.find('withRouter(WithStyles(Connect(Post)))');
    expect(posts.first().props().post.id).toEqual('6ni6ok3ym7mf1p33lnez');
  });

  it('should map state to props', () => {
    const result = mapStateToProps(props);
    expect(result.posts).toEqual(props.posts);
  });
});
