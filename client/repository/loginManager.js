const login_url = 'http://localhost:8081/login';
const register_url = 'http://localhost:8081/register';

async function login(email, password) {
  return new Promise((resolve, reject) => {
    let response = fetch(login_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then((response) => response.json())
    .then((object) => {
        if (object.userId) {
            resolve(object.userId)
        } else {
            resolve(false)
        }
    });
  });
}

async function register(firstName, lastName, email, password){
  return new Promise((resolve, reject) => {
    let response = fetch(register_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
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
    .then((object) => {
        if (object.userId) {
            resolve(object.userId)
        } else {
            resolve(false)
        }
    });
  });
}
export default {
  login,
  register,
};
