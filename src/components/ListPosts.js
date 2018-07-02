import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllPosts, getCategoryPosts } from '../actions/posts';
import Post from './Post';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class ListPosts extends Component {
  byVoteScore = (postA, postB) => postB.voteScore - postA.voteScore;
  byDate = (postA, postB) => postB.timestamp - postA.timestamp;

  state = {
    sort: 'by-votes'
  };
  componentDidMount() {
    const { match, getAllPosts, getCategoryPosts } = this.props;
    if (match.params.category) {
      getCategoryPosts(match.params.category);
    } else {
      getAllPosts();
    }
  }

  handleChangeSort = ({ target }) => this.setState({ sort: target.value });

  renderPosts = () => {
    const sortFn = this.state.sort === 'by-votes' ? this.byVoteScore : this.byDate;
    const posts = this.props.posts.sort(sortFn);
    console.log(posts);
    return (
      <div>
        {posts.map(post => {
          return <Post post={post} key={post.id} />;
        })}
      </div>
    );
  };

  renderNotFound = () => (
    <Typography paragraph variant="body2">
      No posts found!
    </Typography>
  );
  render() {
    return (
      <div>
        <FormControl>
          <InputLabel>Sort By</InputLabel>
          <Select value={this.state.sort} onChange={this.handleChangeSort}>
            <MenuItem value="by-votes">Vote Score</MenuItem>
            <MenuItem value="by-date">Date</MenuItem>
          </Select>
        </FormControl>
        {this.props.posts.length > 0 ? this.renderPosts() : this.renderNotFound()}
      </div>
    );
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
