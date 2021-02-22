const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  //   console.log(data);
  let errors = {};

  data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.mobileNo)) {
    errors.mobileNo = "mobileNo field be required";
  }
  // if (!Validator.isEmail(data.email)) {
  //   errors.email = "mobileNo is invalid";
  // }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be atleast 6 characters";
  }
  //   console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
