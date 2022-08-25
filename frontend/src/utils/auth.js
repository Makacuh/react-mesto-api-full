const BASE_URL = "https://api.volodka.nomoredomains.sbs";

function _checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Acces-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => _checkResponse(res));
};

export const authorization = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Acces-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => _checkResponse(res));
};

export const deauthorization = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Acces-Control-Allow-Credentials': 'true',
    },
  }).then((res) => _checkResponse(res));
};

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Acces-Control-Allow-Credentials': 'true',
    },
  }).then((res) => _checkResponse(res));
};
