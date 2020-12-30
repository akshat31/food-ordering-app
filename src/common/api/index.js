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
    "Basic " + window.btoa(`${data.contactnumber}:${data.password}`);

  return fetch(`${BASE_URL}/api/customer/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: authorization
    }
  }).then(res => {
    let token = res.headers.get("access-token");
    if (token) {
      sessionStorage.setItem("access-token", token);
    }
    return res.json();
  });
};

export const createCustomer = data => {
  return fetch(`${BASE_URL}/api/customer/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
};
