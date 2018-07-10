import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createComment } from '../actions/comments';

class NewComment extends Component {
  state = {
    author: '',
    body: ''
  };

  handleSubmitForm = () => {
    this.props.createComment({
      parentId: this.props.parentId,
      ...this.state
    });
    this.setState({
      body: '',
      author: ''
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
      <form>
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
          id="body"
          name="body"
          label="Body"
          fullWidth
          required
          value={this.state.body}
          onChange={this.handleInputChange}
        />
        <Button variant="contained" onClick={this.handleSubmitForm} color="primary">
          Create
        </Button>
      </form>
    );
  }
}

export default connect(
  null,
  { createComment }
)(NewComment);
