import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getCategories } from '../actions/categories';
import { getCategoryPosts } from '../actions/posts';

export class ListCategories extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div>
        {this.props.categories.map(category => (
          <Button
            key={category.path}
            component={Link}
            to={`/${category.path}`}
            color="inherit"
            onClick={() => this.props.getCategoryPosts(category.path)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    );
  }
}

export const mapStateToProps = ({ categories }) => ({ categories });

export default connect(
  mapStateToProps,
  { getCategories, getCategoryPosts }
)(ListCategories);
