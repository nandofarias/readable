const TOKEN = 'XPTO';
const URL = 'http://localhost:3001';
const headers = new Headers({ Authorization: TOKEN });
const GET = { method: 'GET', headers: headers, mode: 'cors', cache: 'default' };
// const POST = { method: 'POST', headers: headers, mode: 'cors', cache: 'default' };
// const PUT = { method: 'PUT', headers: headers, mode: 'cors', cache: 'default' };
// const DELETE = { method: 'DELETE', headers: headers, mode: 'cors', cache: 'default' };

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
