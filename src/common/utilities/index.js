export const isValidMobileNumber = number => {
  var patt = /^[0-9]{10}$/;
  return patt.test(number);
};

export const isValidEmail = email => {
  const patt = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return patt.test(String(email).toLowerCase());
};

export const isValidPassword = password => {
  const patt = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return patt.test(password);
};

export const getApiToken = () => {
  let token = sessionStorage.getItem("access-token");
  if (token) {
    return token;
  }
  return null;
};
