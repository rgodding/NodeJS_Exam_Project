const url = 'http://localhost:8081/login';

async function login(email, password) {
  return new Promise((resolve, reject) => {
    let response = fetch(url, {
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

export default {
  login,
};
