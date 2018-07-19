import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/user';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  handleSubmitForm = () => {
    this.props.login(this.state);
    this.props.history.push('/');
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <Card>
        <CardContent>
          <form onSubmit={this.handleSubmitForm}>
            <TextField
              id="username"
              name="username"
              label="Username"
              required
              fullWidth
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              fullWidth
              required
              margin="normal"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <Button variant="contained" type="submit" color="primary">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(
  connect(
    null,
    { login }
  )(LoginForm)
);
