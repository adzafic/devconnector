const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "El campo Texto ha de ser entre 10 y 300 caracteres";
  }
  if (validator.isEmail(data.text)) {
    errors.text = "El campo Texto no es valido";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
