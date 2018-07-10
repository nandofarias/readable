import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts';

const styles = () => ({
  floatingButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
});
class NewPost extends Component {
  state = {
    isDialogOpened: false,
    title: '',
    body: '',
    author: '',
    category: ''
  };

  handleClickOpen = () => {
    this.setState({ isDialogOpened: true });
  };

  handleClose = () => {
    this.setState({ isDialogOpened: false });
  };

  handleSubmitForm = () => {
    this.props.createPost(this.state);
    this.setState({
      title: '',
      body: '',
      author: '',
      category: '',
      isDialogOpened: false
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmitForm}>
        <Button
          variant="fab"
          className={this.props.classes.floatingButton}
          color="secondary"
          aria-label="add"
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.isDialogOpened}
          onClose={this.handleClose}
          aria-labelledby="new-post-dialog-title"
        >
          <DialogTitle id="new-post-dialog-title">New Post</DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new post to your audience.</DialogContentText>
            <TextField
              autoFocus
              id="title"
              name="title"
              label="Title"
              fullWidth
              required
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <TextField
              id="body"
              name="body"
              label="Body"
              fullWidth
              required
              value={this.state.body}
              onChange={this.handleInputChange}
            />
            <TextField
              id="author"
              name="author"
              label="Author"
              fullWidth
              required
              value={this.state.author}
              onChange={this.handleInputChange}
            />
            <TextField
              id="category"
              name="category"
              label="Category"
              fullWidth
              required
              value={this.state.category}
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={this.handleSubmitForm} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

export default withStyles(styles)(
  connect(
    null,
    { createPost }
  )(NewPost)
);
