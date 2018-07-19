import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment } from '../actions/comments';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    borderLeft: '5px solid rgba(0, 0, 0, 0.12)',
    margin: '0px 15px'
  },
  button: {
    margin: '10px 10px 0 0'
  }
};
export class EditComment extends Component {
  state = {
    body: this.props.comment.body
  };

  handleSubmitForm = event => {
    this.props.editComment({
      id: this.props.comment.id,
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
    const { classes, didFinishedEditing } = this.props;
    return (
      <Card className={classes.container}>
        <CardContent>
          <form onSubmit={this.handleSubmitForm}>
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
              onClick={didFinishedEditing}
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
    { editComment }
  )(EditComment)
);
