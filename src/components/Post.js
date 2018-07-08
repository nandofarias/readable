import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upVote, downVote } from '../actions/posts';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import { formatRelative, subDays } from 'date-fns';
import { getComments } from '../actions/comments';
import Comment from './Comment';

const styles = theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    marginLeft: 'auto'
  },
  avatar: {
    backgroundColor: red[500]
  }
});
class Post extends Component {
  state = { expanded: false };

  componentDidMount() {
    this.props.getComments(this.props.post.id);
  }

  handleExpandClick = postId => {
    if (!this.state.expanded) {
      this.props.getComments(postId);
    }
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    const { post, comments, classes, upVote, downVote } = this.props;
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {post.voteScore.toString()}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.title}
          subheader={formatRelative(subDays(new Date(post.timestamp), 3), new Date(post.timestamp))}
        />

        <CardContent>
          <Typography paragraph variant="body2">
            {post.author}:
          </Typography>
          <Typography paragraph>{post.body}</Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Thumbs Up" onClick={() => upVote(post.id)}>
            <ThumbUp />
          </IconButton>
          <IconButton aria-label="Thumbs Down" onClick={() => downVote(post.id)}>
            <ThumbDown />
          </IconButton>
          <Button color="inherit" onClick={() => this.handleExpandClick(post.id)}>
            {comments.length} Comments
          </Button>
          <IconButton
            className={this.state.expanded ? classes.expandOpen : classes.expand}
            onClick={() => this.handleExpandClick(post.id)}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          {comments.length > 0 ? (
            comments
              .sort((commentA, commentB) => commentB.voteScore - commentA.voteScore)
              .map(comment => <Comment key={comment.id} comment={comment} />)
          ) : (
            <CardContent>
              <Typography paragraph variant="body2">
                No comments found!
              </Typography>
            </CardContent>
          )}
        </Collapse>
      </Card>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    comments: state.comments[props.post.id] || []
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { upVote, downVote, getComments }
  )(Post)
);
