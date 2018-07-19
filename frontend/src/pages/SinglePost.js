import React, { Component } from 'react';
import Post from '../components/Post';
import { getSinglePost } from '../actions/posts';
import { connect } from 'react-redux';
import Placeholder from '../components/Placeholder';
export class SinglePost extends Component {
  componentDidMount() {
    const { match, getSinglePost } = this.props;
    getSinglePost(match.params.postId);
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {post ? (
          <Post post={post} expandComments />
        ) : (
          <Placeholder text="Post not found :(" icon="forum" />
        )}
      </div>
    );
  }
}

export const mapStateToProps = ({ posts }) => ({ post: posts[0] });

export default connect(
  mapStateToProps,
  { getSinglePost }
)(SinglePost);
