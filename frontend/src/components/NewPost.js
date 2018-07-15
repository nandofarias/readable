import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
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
    category: ''
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      category: nextProps.categories[0].path
    });
  }

  handleClickOpen = () => {
    this.setState({ isDialogOpened: true });
  };

  handleClose = () => {
    this.setState({ isDialogOpened: false });
  };

  handleSubmitForm = event => {
    this.props.createPost({ author: this.props.author, ...this.state });
    this.setState({
      title: '',
      body: '',
      category: '',
      isDialogOpened: false
    });
    event.preventDefault();
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
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
          <form onSubmit={this.handleSubmitForm}>
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
                margin="normal"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
              <TextField
                id="body"
                name="body"
                label="Body"
                fullWidth
                required
                multiline
                rowsMax="4"
                margin="normal"
                value={this.state.body}
                onChange={this.handleInputChange}
              />
              <TextField
                id="category"
                name="category"
                label="Category"
                select
                required
                fullWidth
                margin="normal"
                value={this.state.category}
                onChange={this.handleInputChange}
              >
                {this.props.categories.map(category => (
                  <MenuItem key={category.path} value={category.path}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ categories, user }) => ({ categories, author: user.username });

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { createPost }
  )(NewPost)
);
