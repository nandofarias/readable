import React, { Component } from 'react';
import ListPosts from '../components/ListPosts';
import NewPost from '../components/NewPost';
import { getAllPosts, getCategoryPosts } from '../actions/posts';
import { connect } from 'react-redux';
export class Home extends Component {
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
        {this.props.isUserLoggedIn && <NewPost />}
      </div>
    );
  }
}

export const mapStateToProps = ({ user }) => ({ isUserLoggedIn: user.isLoggedIn });

export default connect(
  mapStateToProps,
  { getCategoryPosts, getAllPosts }
)(Home);
