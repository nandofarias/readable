import React, { Component } from 'react';
import ListPosts from '../components/ListPosts';
import NewPost from '../components/NewPost';
import { getAllPosts, getCategoryPosts } from '../actions/posts';
import { connect } from 'react-redux';
class Home extends Component {
  componentDidMount() {
    const { match, getCategoryPosts, getAllPosts } = this.props;
    if (match.params.category) {
      getCategoryPosts(match.params.category);
    } else {
      getAllPosts();
    }
  }

  render() {
    return (
      <div>
        <ListPosts />
        <NewPost />
      </div>
    );
  }
}

export default connect(
  null,
  { getCategoryPosts, getAllPosts }
)(Home);
