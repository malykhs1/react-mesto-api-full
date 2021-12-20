export const BASE_URL = 'https://api.malykhs.nomoredomains.rocks';


const checkResponse = (res) => {
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
  .then(checkResponse)
  .catch((err) => {
    console.log(err);
  });


export const login = ( email, password) => {
return fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email, password }),
})
.then(checkResponse)
.then((data) => {
  if (data.token) {
    localStorage.setItem('token', data.token);
    return data;
  }
})
.catch((err) => {
  console.log(err);
})
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse);
}


