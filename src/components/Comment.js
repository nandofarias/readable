import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { upVote, downVote, deleteComment } from '../actions/comments';

const styles = () => ({
  container: {
    borderLeft: '5px solid rgba(0, 0, 0, 0.12)',
    margin: '0px 15px'
  }
});

const Comment = ({ comment, classes, upVote, downVote, deleteComment }) => (
  <Card className={classes.container}>
    <CardHeader
      action={
        <IconButton aria-label="delete" onClick={() => deleteComment(comment.id)}>
          <DeleteIcon />
        </IconButton>
      }
      title={comment.author}
      subheader={comment.voteScore + ' Votes'}
    />
    <CardContent>
      <Typography paragraph>{comment.body} Votes</Typography>
      <IconButton aria-label="Thumbs Up" onClick={() => upVote(comment.id)}>
        <ThumbUp />
      </IconButton>
      <IconButton aria-label="Thumbs Down" onClick={() => downVote(comment.id)}>
        <ThumbDown />
      </IconButton>
    </CardContent>
  </Card>
);

export default withStyles(styles)(
  connect(
    null,
    { upVote, downVote, deleteComment }
  )(Comment)
);
