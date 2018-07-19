import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListCategories from './ListCategories';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../actions/posts';
import { logout } from '../actions/user';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};
export const Header = ({ isUserLoggedIn, getAllPosts, logout, classes }) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            component={Link}
            to="/"
            color="inherit"
            onClick={e => {
              e.stopPropagation();
              getAllPosts();
            }}
          >
            <Typography variant="title" color="inherit">
              Readable
            </Typography>
          </Button>
          <div className={classes.flex}>
            <ListCategories />
          </div>
          {!isUserLoggedIn ? (
            <Button id="login" component={Link} to="/login" color="inherit">
              Login
            </Button>
          ) : (
            <Button
              id="logout"
              component={Link}
              to="/login"
              color="inherit"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export const mapStateToProps = ({ user }) => ({ isUserLoggedIn: user.isLoggedIn });

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getAllPosts, logout }
  )(Header)
);
