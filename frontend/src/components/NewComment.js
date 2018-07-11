import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createComment } from '../actions/comments';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  container: {
    borderLeft: '5px solid rgba(0, 0, 0, 0.12)',
    margin: '0px 15px'
  },
  submitBtn: {
    margin: '10px 0'
  }
};

class NewComment extends Component {
  state = {
    author: '',
    body: ''
  };

  handleSubmitForm = event => {
    this.props.createComment({
      parentId: this.props.parentId,
      ...this.state
    });
    this.setState({
      body: '',
      author: ''
    });
    event.preventDefault();
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
    const { classes } = this.props;
    return (
      <Card className={classes.container}>
        <CardContent>
          <form onSubmit={this.handleSubmitForm} className={classes.form}>
            <Typography variant="body2">Add a new comment:</Typography>
            <TextField
              id="author"
              name="author"
              label="Author"
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
              multiline
              rowsMax="4"
              margin="normal"
              value={this.state.body}
              onChange={this.handleInputChange}
            />
            <Button variant="contained" type="submit" color="primary" className={classes.submitBtn}>
              Create
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
    { createComment }
  )(NewComment)
);
