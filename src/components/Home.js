import React from 'react';
import Header from './Header';
import ListPosts from './ListPosts';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = () => ({
  floatingButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }
});
export default withStyles(styles)(({ classes }) => (
  <div>
    <Header />
    <ListPosts />
    <Button
      component={Link}
      to="/new"
      variant="fab"
      className={classes.floatingButton}
      color="primary"
      aria-label="add"
    >
      <AddIcon />
    </Button>
  </div>
));
