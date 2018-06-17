const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "El nombre tiene que estar entre 2 y 3 caracteres";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "El campo nombre es obligatorio";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "El campo email es obligatorio";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "El campo email no es valido";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "El campo Contraseña es obligatorio";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "La contraseña tiene que estar entre 6 y 30 caracteres";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "El campo Contraseña 2 es obligatorio";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Las contraseñas deben ser iguales";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
