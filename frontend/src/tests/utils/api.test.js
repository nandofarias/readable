jest.mock('uuid/v4', () => jest.fn().mockReturnValue('test01'));
Date.now = jest.fn().mockReturnValue(1482363367071);
import * as api from '../../utils/api';

describe('/utils/api', () => {
  it('should return a list of categories', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => [1, 2, 3] });
    global.fetch = fetch;
    const response = await api.getCategories();
    expect(response).toEqual([1, 2, 3]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/categories', api.GET);
  });

  it('should return a list of posts filtered by category', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => [1, 2] });
    global.fetch = fetch;
    const response = await api.getCategoriesPosts('test');
    expect(response).toEqual([1, 2]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/test/posts', api.GET);
  });

  it('should return a list of posts', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => [1, 2] });
    global.fetch = fetch;
    const response = await api.getPosts();
    expect(response).toEqual([1, 2]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts', api.GET);
  });

  it('should return a single post', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => ({ name: 'post test' }) });
    global.fetch = fetch;
    const response = await api.getSinglePost('test01');
    expect(response).toEqual({ name: 'post test' });
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts/test01', api.GET);
  });

  it('should return the post after a up vote', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => ({ name: 'post test' }) });
    global.fetch = fetch;
    const response = await api.votePost('test01', 'upVote');
    expect(response).toEqual({ name: 'post test' });
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts/test01', {
      body: '{"option":"upVote"}',
      ...api.POST
    });
  });

  it('should return the post after a down vote', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => ({ name: 'post test' }) });
    global.fetch = fetch;
    const response = await api.votePost('test01', 'downVote');
    expect(response).toEqual({ name: 'post test' });
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts/test01', {
      body: '{"option":"downVote"}',
      ...api.POST
    });
  });

  it('should return a list of post comments', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => [1, 2] });
    global.fetch = fetch;
    const response = await api.getPostComments('test01');
    expect(response).toEqual([1, 2]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts/test01/comments', api.GET);
  });

  it('should return the comment after a up vote', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => ({ name: 'comment test' }) });
    global.fetch = fetch;
    const response = await api.voteComment('test01', 'upVote');
    expect(response).toEqual({ name: 'comment test' });
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/comments/test01', {
      body: '{"option":"upVote"}',
      ...api.POST
    });
  });

  it('should return the comment after a down vote', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => ({ name: 'comment test' }) });
    global.fetch = fetch;
    const response = await api.voteComment('test01', 'downVote');
    expect(response).toEqual({ name: 'comment test' });
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/comments/test01', {
      body: '{"option":"downVote"}',
      ...api.POST
    });
  });

  it('should return the deleted comment', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => ({ deleted: true }) });
    global.fetch = fetch;
    const response = await api.deleteComment('test01');
    expect(response).toEqual({ deleted: true });
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/comments/test01', api.DELETE);
  });

  it('should return the deleted post', async () => {
    const fetch = jest.fn().mockReturnValueOnce({ json: () => ({ deleted: true }) });
    global.fetch = fetch;
    const response = await api.deletePost('test01');
    expect(response).toEqual({ deleted: true });
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts/test01', api.DELETE);
  });

  it('should return the created post', async () => {
    const form = {
      title: 'test',
      body: 'test',
      author: 'test',
      category: 'test'
    };
    const fetch = jest.fn().mockReturnValueOnce({ json: () => form });
    global.fetch = fetch;
    const response = await api.createPost(form);
    expect(response).toEqual(form);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts', {
      body:
        '{"id":"test01","timestamp":1482363367071,"title":"test","body":"test","author":"test","category":"test"}',
      ...api.POST
    });
  });

  it('should return the created comment', async () => {
    const form = {
      body: 'test',
      author: 'test',
      parentId: 'test'
    };
    const fetch = jest.fn().mockReturnValueOnce({ json: () => form });
    global.fetch = fetch;
    const response = await api.createComment(form);
    expect(response).toEqual(form);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/comments', {
      body:
        '{"id":"test01","timestamp":1482363367071,"body":"test","author":"test","parentId":"test"}',
      ...api.POST
    });
  });

  it('should return the edited post', async () => {
    const form = {
      id: 'test',
      title: 'test',
      body: 'test'
    };
    const fetch = jest.fn().mockReturnValueOnce({ json: () => form });
    global.fetch = fetch;
    const response = await api.editPost(form);
    expect(response).toEqual(form);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/posts/test', {
      body: '{"title":"test","body":"test"}',
      ...api.PUT
    });
  });

  it('should return the edited comment', async () => {
    const form = {
      id: 'test',
      body: 'test'
    };
    const fetch = jest.fn().mockReturnValueOnce({ json: () => form });
    global.fetch = fetch;
    const response = await api.editComment(form);
    expect(response).toEqual(form);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/comments/test', {
      body: '{"timestamp":1482363367071,"body":"test"}',
      ...api.PUT
    });
  });

  it('should return the user after login', async () => {
    const user = { username: 'test', token: 'test' };
    const fetch = jest.fn().mockReturnValueOnce({ json: () => user });
    global.fetch = fetch;
    const response = await api.login({ username: 'test', password: 'test' });
    expect(response).toEqual({ username: 'test', token: 'test' });
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/login', {
      body: '{"username":"test","password":"test"}',
      ...api.POST
    });
  });
});
