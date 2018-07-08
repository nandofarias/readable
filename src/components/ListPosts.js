import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  order: {
    margin: '20px 25px'
  }
};

class ListPosts extends Component {
  byVoteScore = (postA, postB) => postB.voteScore - postA.voteScore;
  byDate = (postA, postB) => postB.timestamp - postA.timestamp;

  state = {
    sort: 'by-votes'
  };

  handleChangeSort = ({ target }) => this.setState({ sort: target.value });

  renderPosts = () => {
    const sortFn = this.state.sort === 'by-votes' ? this.byVoteScore : this.byDate;
    const posts = this.props.posts.sort(sortFn);
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
    const { classes } = this.props;
    return (
      <div>
        <FormControl className={classes.order}>
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

export default withStyles(styles)(connect(mapStateToProps)(ListPosts));
