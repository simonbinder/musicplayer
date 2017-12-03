
export const loginRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/account/login', {
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
        resolve(response.success);
      } else {
        reject(response.error);
      }
    }
    .catch(err => reject(err));
  });
};

export const registerRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => reponse.json())
    .then(response => {
      if(response.success) {
        resolve(response.success);
      } else {
        reject(response.error);
      }
    })
    .catch(err => reject(err));
  });
};
