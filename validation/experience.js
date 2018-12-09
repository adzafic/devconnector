const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  if (validator.isEmpty(data.title)) {
    errors.title = "Trabaja es un campo requerido";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "Empresa es un campo requerido";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "Desde es un campo requerido";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
