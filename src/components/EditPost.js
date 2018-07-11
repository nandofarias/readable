import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPost } from '../actions/posts';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class EditPost extends Component {
  state = {
    title: '',
    body: ''
  };

  handleSubmitForm = event => {
    this.props.editPost({
      id: this.props.post.id,
      ...this.state
    });
    event.preventDefault();
    this.props.didFinishedEditing();
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
        <Button variant="outlined" onClick={this.props.didFinishedEditing} color="primary">
          Cancel
        </Button>
        <Button variant="contained" type="submit" color="primary">
          Change
        </Button>
      </form>
    );
  }
}

export default connect(
  null,
  { editPost }
)(EditPost);
