import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllPosts, getCategoryPosts } from '../actions/posts';
import Post from './Post';
import Typography from '@material-ui/core/Typography';

class ListPosts extends Component {
  componentDidMount() {
    const { match, getAllPosts, getCategoryPosts } = this.props;
    if (match.params.category) {
      getCategoryPosts(match.params.category);
    } else {
      getAllPosts();
    }
  }

  renderPosts = () => (
    <div>
      {this.props.posts.map(post => {
        return <Post post={post} key={post.id} />;
      })}
    </div>
  );

  renderNotFound = () => (
    <Typography paragraph variant="body2">
      No posts found!
    </Typography>
  );
  render() {
    return this.props.posts.length > 0 ? this.renderPosts() : this.renderNotFound();
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllPosts, getCategoryPosts }
  )(ListPosts)
);
