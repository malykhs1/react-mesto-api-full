export const BASE_URL = 'http://api.malykhs.nomoredomains.rocks';

const chechResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then(chechResponse)
  .catch((err) => {
    console.log(err);
  });


export const authorize = ( email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, password }),
})
.then(chechResponse)
.then((data) => {
  if (data.token) {
    localStorage.setItem('token', data.token);
    return data;
  }
})
.catch((err) => {
  console.log(err);
});

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(data => data)
  .then(chechResponse);
}


