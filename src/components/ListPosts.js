import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts, getCategoryPosts } from '../actions/posts';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});
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
        return (
          <Paper className={this.props.classes.root} key={post.id} elevation={4}>
            <Badge badgeContent={post.voteScore} color="secondary">
              <Typography variant="title" gutterBottom>
                {post.title}
              </Typography>
            </Badge>
            <Typography component="p">{post.body}</Typography>
            <IconButton aria-label="upVote" color="primary">
              <ThumbUp />
            </IconButton>
            <IconButton aria-label="downVonte" color="primary">
              <ThumbDown />
            </IconButton>
          </Paper>
        );
      })}
    </div>
  );

  renderNotFound = () => <div>Not Found</div>;
  render() {
    return this.props.posts.length > 0 ? this.renderPosts() : this.renderNotFound();
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    { getAllPosts, getCategoryPosts }
  )
)(ListPosts);
