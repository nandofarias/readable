import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { upVoteComment, downVoteComment, deleteComment } from '../actions/comments';
import EditComment from './EditComment';

const styles = () => ({
  container: {
    borderLeft: '5px solid rgba(0, 0, 0, 0.12)',
    margin: '0px 15px'
  }
});

class Comment extends Component {
  state = {
    anchorMenu: null,
    editable: false
  };

  handleMenuOpen = event => {
    this.setState({ anchorMenu: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorMenu: null });
  };

  handleEditComment = editable => {
    this.setState({ editable, anchorMenu: false });
  };
  renderComment() {
    const { comment, classes, upVoteComment, downVoteComment, deleteComment } = this.props;
    return (
      <div>
        <Card className={classes.container}>
          <CardHeader
            action={
              <IconButton
                aria-label="More"
                aria-owns={this.state.anchorMenu ? 'comment-menu' : null}
                aria-haspopup="true"
                onClick={this.handleMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={comment.author}
            subheader={comment.voteScore + ' Votes'}
          />
          <CardContent>
            <Typography paragraph>{comment.body}</Typography>
            <IconButton aria-label="Thumbs Up" onClick={() => upVoteComment(comment.id)}>
              <ThumbUp />
            </IconButton>
            <IconButton aria-label="Thumbs Down" onClick={() => downVoteComment(comment.id)}>
              <ThumbDown />
            </IconButton>
          </CardContent>
        </Card>
        <Menu
          id="comment-menu"
          anchorEl={this.state.anchorMenu}
          open={Boolean(this.state.anchorMenu)}
          onClose={this.handleMenuClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem onClick={() => this.handleEditComment(true)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
          <MenuItem onClick={() => deleteComment(comment.id)}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </div>
    );
  }

  render() {
    return this.state.editable ? (
      <EditComment
        comment={this.props.comment}
        didFinishedEditing={() => this.handleEditComment(false)}
      />
    ) : (
      this.renderComment()
    );
  }
}

export default withStyles(styles)(
  connect(
    null,
    { upVoteComment, downVoteComment, deleteComment }
  )(Comment)
);
