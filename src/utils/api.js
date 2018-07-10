const headers = new Headers({ Authorization: '123', 'content-type': 'application/json' });
const URL = 'http://localhost:3001';
const options = { headers: headers, mode: 'cors' };
const GET = { method: 'GET', ...options };
const POST = { method: 'POST', ...options };
// const PUT = { method: 'PUT', ...options };
const DELETE = { method: 'DELETE', ...options };

export async function getCategories() {
  const response = await fetch(`${URL}/categories`, GET);
  return response.json();
}

export async function getCategoriesPosts(category) {
  const response = await fetch(`${URL}/${category}/posts`, GET);
  return response.json();
}

export async function getPosts() {
  const response = await fetch(`${URL}/posts`, GET);
  return response.json();
}

export async function getSinglePost(postId) {
  const response = await fetch(`${URL}/posts/${postId}`, GET);
  return response.json();
}

export async function votePost(id, option) {
  const response = await fetch(`${URL}/posts/${id}`, {
    body: JSON.stringify({ option }),
    ...POST
  });
  return response.json();
}

export async function getPostComments(postId) {
  const response = await fetch(`${URL}/posts/${postId}/comments`, GET);
  return response.json();
}

export async function voteComment(id, option) {
  const response = await fetch(`${URL}/comments/${id}`, {
    body: JSON.stringify({ option }),
    ...POST
  });
  return response.json();
}

export async function deleteComment(id) {
  const response = await fetch(`${URL}/comments/${id}`, DELETE);
  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${URL}/posts/${id}`, DELETE);
  return response.json();
}

export async function createPost({ title, body, author, category }) {
  const bodyForm = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  };
  const response = await fetch(`${URL}/posts`, {
    body: JSON.stringify(bodyForm),
    ...POST
  });
  return response.json();
}

export async function createComment({ body, author, parentId }) {
  const bodyForm = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    body,
    author,
    parentId
  };
  const response = await fetch(`${URL}/comments`, {
    body: JSON.stringify(bodyForm),
    ...POST
  });
  return response.json();
}
