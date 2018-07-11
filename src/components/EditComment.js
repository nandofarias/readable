import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../actions/comments';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class EditComment extends Component {
  state = {
    body: ''
  };

  handleSubmitForm = event => {
    this.props.editComment({
      id: this.props.comment.id,
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
  { editComment }
)(EditComment);
