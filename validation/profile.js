const validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle tiene que ser entr 2 y 40 caracteres";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "Handle es un campo requerido";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Status es un campo requerido";
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = "Skills es un campo requerido";
  }

  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "URL no Valida";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "URL no Valida";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "URL no Valida";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "URL no Valida";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "URL no Valida";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "URL no Valida";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
