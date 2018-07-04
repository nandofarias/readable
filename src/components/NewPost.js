import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

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
class NewPost extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="new-post-dialog-title"
        >
          <DialogTitle id="new-post-dialog-title">New Post</DialogTitle>
          <DialogContent>
            <DialogContentText>Create a new post to your audience.</DialogContentText>
            <TextField autoFocus id="title" label="Title" fullWidth required />
            <TextField id="body" label="Body" fullWidth required />
            <TextField id="author" label="Author" fullWidth required />
            <TextField id="category" label="Category" fullWidth required />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={this.handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(NewPost);
