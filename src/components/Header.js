import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ListCategories from './ListCategories';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../actions/posts';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const Header = ({ title, getAllPosts }) => {
  return (
    <div>
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
              {title || 'Material News'}
            </Typography>
          </Button>
          <ListCategories />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(
  null,
  { getAllPosts }
)(Header);
