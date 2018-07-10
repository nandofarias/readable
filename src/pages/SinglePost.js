import React, { Component } from 'react';
import Header from '../components/Header';
import Post from '../components/Post';
import { getSinglePost } from '../actions/posts';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
class SinglePost extends Component {
  componentDidMount() {
    const { match, getSinglePost } = this.props;
    getSinglePost(match.params.postId);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.post ? (
          <Post post={this.props.post} />
        ) : (
          <Typography variant="title">Post not found!</Typography>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts[0]
  };
}

export default connect(
  mapStateToProps,
  { getSinglePost }
)(withRouter(SinglePost));
