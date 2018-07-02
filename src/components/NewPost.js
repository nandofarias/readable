import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

export default withStyles(styles)(({ classes }) => (
  <form className={classes.container} noValidate autoComplete="off">
    <TextField id="title" label="Title" className={classes.textField} margin="normal" required />
    <TextField id="body" label="Body" className={classes.textField} margin="normal" required />
    <TextField id="author" label="Author" className={classes.textField} margin="normal" required />
    <TextField
      id="category"
      label="Category"
      className={classes.textField}
      margin="normal"
      required
    />
  </form>
));
