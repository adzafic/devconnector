const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "El campo email no es valido";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "El campo email es obligatorio";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "El campo Contraseña es obligatorio";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
