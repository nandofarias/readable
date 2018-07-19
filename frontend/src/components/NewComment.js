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

export class NewComment extends Component {
  state = {
    body: ''
  };

  handleSubmitForm = event => {
    event.preventDefault();
    this.props.createComment({
      parentId: this.props.parentId,
      author: this.props.author,
      ...this.state
    });
    this.setState({
      body: ''
    });
  };

  handleInputChange = ({ target: { name, value } }) => {
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

export const mapStateToProps = ({ user }) => ({ author: user.username });

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { createComment }
  )(NewComment)
);
