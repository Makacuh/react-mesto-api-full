const BASE_URL = "https://api.makacuh.nomoredomains.sbs";

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = ({email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
   
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password,
      email: email,}),
  }).then((res) => _checkResponse(res));
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
   
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email,
      password: password,}),
  }).then((res) => _checkResponse(res));
};

export const deauthorization = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => _checkResponse(res));
};

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => _checkResponse(res));
};
