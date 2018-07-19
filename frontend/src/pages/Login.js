import React from 'react';
import LoginForm from '../components/LoginForm';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '30px'
  },
  form: {
    width: '400px'
  }
};
export const Login = ({ classes }) => (
  <div className={classes.container}>
    <div className={classes.form}>
      <LoginForm />
    </div>
  </div>
);
export default withStyles(styles)(Login);
