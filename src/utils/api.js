const headers = new Headers({ Authorization: '123', 'content-type': 'application/json' });
const URL = 'http://localhost:3001';
const options = { headers: headers, mode: 'cors' };
const GET = { method: 'GET', ...options };
const POST = { method: 'POST', ...options };
// const PUT = { method: 'PUT', ...options };
// const DELETE = { method: 'DELETE', ...options };

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

export async function vote(id, option) {
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
