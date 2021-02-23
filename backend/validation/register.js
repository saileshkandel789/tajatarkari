const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field be required";
  }
  if (Validator.isEmpty(data.mobileNo)) {
    errors.mobileNo = "mobileNo field be required";
  }
  
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be atleast 6 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "confirm password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "password must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};