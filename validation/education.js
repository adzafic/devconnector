const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "Colegio es un campo requerido";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree es un campo requerido";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "Desde es un campo requerido";
  }

  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy es un campo requerido";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
