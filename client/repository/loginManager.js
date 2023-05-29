const login_url = 'http://localhost:8081/login';
const register_url = 'http://localhost:8081/register';
const forgot_password_url = 'http://localhost:8081/forgot-password';

async function login(email, password) {
  try {
    const response = await fetch(login_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const object = await response.json();
    if (object.userId) {
      return object.userId;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function register(firstName, lastName, email, password) {
  try {
    const response = await fetch(register_url, {
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
    });
    const object = await response.json();
    if (object.userId) {
      return object.userId;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function forgotPassword(email) {
  try {
    const response = await fetch(forgot_password_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    const object = await response.json();

    if (object) {
      return object;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  login,
  register,
  forgotPassword,
};
