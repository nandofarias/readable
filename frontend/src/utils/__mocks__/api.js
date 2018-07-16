const categories = [
  {
    name: 'react',
    path: 'react'
  },
  {
    name: 'redux',
    path: 'redux'
  },
  {
    name: 'udacity',
    path: 'udacity'
  }
];
const posts = [
  { id: 'test01', title: 'test', body: 'test', voteCount: 0 },
  { id: 'test02', title: 'test', body: 'test', voteCount: 0 }
];
const comments = [
  { parentId: 'test01', id: 'test01', title: 'test', voteCount: 0 },
  { parentId: 'test01', id: 'test02', title: 'test', voteCount: 1 }
];

// Categories
export const getCategories = jest.fn().mockReturnValue({ categories });

// Posts
export const getCategoriesPosts = jest.fn().mockReturnValue(posts);
export const getPosts = jest.fn().mockReturnValue(posts);
export const getSinglePost = jest.fn().mockReturnValue(posts[0]);
export const votePost = jest.fn().mockReturnValue(posts[0]);
export const deletePost = jest.fn().mockReturnValue(posts[0]);
export const createPost = jest.fn().mockReturnValue(posts[0]);
export const editPost = jest.fn().mockReturnValue(posts[0]);

// Comments
export const createComment = jest.fn().mockReturnValue(comments[0]);
export const getPostComments = jest.fn().mockReturnValue(comments);
export const voteComment = jest.fn().mockReturnValue(comments[0]);
export const deleteComment = jest.fn().mockReturnValue(comments[0]);
export const editComment = jest.fn().mockReturnValue(comments[0]);

// User
export const login = jest.fn().mockReturnValue({ username: 'test', token: '123' });
