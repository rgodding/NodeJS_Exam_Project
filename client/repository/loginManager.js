import dotenv from 'dotenv/config';
const login_url = `${process.env.SERVER_URL}/login`;
const register_url = `${process.env.SERVER_URL}/register`;
const forgot_password_url = `${process.env.SERVER_URL}/forgot-password`;

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
