import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../actions/posts';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    margin: '10px 10px 0 0'
  }
};

export class EditPost extends Component {
  state = {
    title: this.props.post.title,
    body: this.props.post.body
  };

  handleSubmitForm = event => {
    this.props.editPost({
      id: this.props.post.id,
      ...this.state
    });
    event.preventDefault();
    this.props.didFinishedEditing();
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardContent>
          <form onSubmit={this.handleSubmitForm}>
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
              multiline
              rowsMax="4"
              margin="normal"
              value={this.state.body}
              onChange={this.handleInputChange}
            />
            <Button
              id="cancel"
              variant="outlined"
              onClick={this.props.didFinishedEditing}
              color="primary"
              className={classes.button}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="primary" className={classes.button}>
              Change
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(
  connect(
    null,
    { editPost }
  )(EditPost)
);
