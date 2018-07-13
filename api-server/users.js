const jwt = require('jsonwebtoken');
function login({ username }) {
  return new Promise(res => {
    const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
    res({ username, token });
  });
}

module.exports = {
  login
};
