import React, { Component } from 'react';
import Header from '../components/Header';
import ListPosts from '../components/ListPosts';
import NewPost from '../components/NewPost';
import { getAllPosts, getCategoryPosts } from '../actions/posts';
import { withRouter } from 'react-router-dom';
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
        <Header />
        <ListPosts />
        <NewPost />
      </div>
    );
  }
}

export default connect(
  null,
  { getCategoryPosts, getAllPosts }
)(withRouter(Home));
