export const isValidMobileNumber = number => {
  var patt = /^[0-9]{10}$/;
  return patt.test(number);
};
