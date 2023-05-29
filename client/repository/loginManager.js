const login_url = 'http://localhost:8081/login';
const register_url = 'http://localhost:8081/register';
const forgot_password_url = 'http://localhost:8081/forgot-password';

async function login(email, password) {
  return new Promise((resolve, reject) => {
    fetch(login_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.userId);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function register(firstName, lastName, email, password) {
  return new Promise((resolve, reject) => {
    fetch(register_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data.userId);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
async function forgotPassword(email) {
  return new Promise((resolve, reject) => {
    fetch(forgot_password_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default {
  login,
  register,
  forgotPassword,
};
