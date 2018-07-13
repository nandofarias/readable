import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '15px 0'
  }
};
export default withStyles(styles)(({ icon, text, classes }) => (
  <div className={classes.container}>
    <Icon color="secondary" style={{ fontSize: 128 }}>
      {icon}
    </Icon>
    <Typography variant="display1">{text}</Typography>
  </div>
));
