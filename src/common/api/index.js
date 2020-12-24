import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getAllRestaurants = () => {
  return fetch(`${BASE_URL}/api/restaurant`).then(res => res.json());
};

export const getRestaurantByName = name => {
  return fetch(`${BASE_URL}/api/restaurant/name/${name}`).then(res =>
    res.json()
  );
};

export const login = data => {
  let authorization =
    "Basic " + window.btoa(`${data.contactNumber}:${data.password}`);
  return axios.post(`${BASE_URL}/api/customer/login`, null, {
    headers: {
      authorization: authorization
    }
  });
};

export const createCustomer = data => {
  return fetch(`${BASE_URL}/api/customer/signup`, {
    method: "POST",
    body: JSON.parse(data)
  }).then(res => res.json());
};
