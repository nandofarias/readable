import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Placeholder from './Placeholder';

const styles = {
  orderBy: {
    margin: '20px 25px'
  },
  placeholder: {
    marginLeft: '25px'
  }
};

export class ListPosts extends Component {
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl className={classes.orderBy}>
          <InputLabel>Sort By</InputLabel>
          <Select value={this.state.sort} onChange={this.handleChangeSort}>
            <MenuItem value="by-votes">Vote Score</MenuItem>
            <MenuItem value="by-date">Date</MenuItem>
          </Select>
        </FormControl>
        {this.props.posts && this.props.posts.length > 0 ? (
          this.renderPosts()
        ) : (
          <Placeholder text="No posts found :(" icon="forum" />
        )}
      </div>
    );
  }
}

export const mapStateToProps = ({ posts }) => ({ posts });

export default withStyles(styles)(connect(mapStateToProps)(ListPosts));
