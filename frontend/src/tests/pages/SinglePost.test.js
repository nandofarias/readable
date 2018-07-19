import React from 'react';
import { shallow } from 'enzyme';
import { SinglePost, mapStateToProps } from '../../pages/SinglePost';

const props = {
  match: { params: { postId: 'test01' } },
  getSinglePost: jest.fn(),
  post: { id: 'test01', text: 'test' }
};

describe('/pages/SinglePost', () => {
  it('should render a post', () => {
    const wrapper = shallow(<SinglePost {...props} />);
    expect(wrapper.find('withRouter(WithStyles(Connect(Post)))').props().post).toEqual(props.post);
  });
  it('should render the placeholder if no post exists', () => {
    const newProps = { ...props, post: null };
    const wrapper = shallow(<SinglePost {...newProps} />);
    const placeholder = wrapper.find('WithStyles(Component)');
    expect(placeholder.props().text).toEqual('Post not found :(');
    expect(placeholder.props().icon).toEqual('forum');
  });
  it('should map state to props', () => {
    const posts = [{ id: 'test01', text: 'test' }];
    const result = mapStateToProps({ posts });
    expect(result.post).toBe(posts[0]);
  });
});
