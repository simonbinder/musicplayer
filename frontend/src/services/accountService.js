
export const loginRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        resolve(response);
      } else {
        reject(response.error);
      }
    })
    .catch(err => reject(err));
  });
};

export const registerRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        resolve(response);
      } else {
        reject(response.error);
      }
    })
    .catch(err => reject(err));
  });
};

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/account/verifyToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success) {
        resolve(response);
      } else {
        reject(response.error);
      }
    })
    .catch(err => reject(err));
  });
};
