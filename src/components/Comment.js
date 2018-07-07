import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  container: {
    borderLeft: '4px solid #000',
    margin: '5px 0 0 15px'
  }
});
export default withStyles(styles)(({ comment, classes }) => (
  <CardContent className={classes.container}>
    <Typography paragraph variant="body2">
      {comment.author}:
    </Typography>
    <Typography paragraph>{comment.body}</Typography>
    <Typography paragraph>{comment.voteScore} Votes</Typography>
  </CardContent>
));
