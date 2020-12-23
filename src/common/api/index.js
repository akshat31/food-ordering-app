const BASE_URL = "http://localhost:8080";

export const getAllRestaurants = () => {
  return fetch(`${BASE_URL}/api/restaurant`).then(res => res.json());
};

export const getRestaurantByName = name => {
  return fetch(`${BASE_URL}/api/restaurant/name/${name}`).then(res =>
    res.json()
  );
};
