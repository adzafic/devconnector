const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
//Cargar validacion inputs
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Test usuario ruta
// @acces   Public
router.get("/test", (req, res) => {
  res.json({ msg: "Usuarios funciona" });
});

// @route   POST api/users/register
// @desc    registrar el usuario en la base de datos
// @acces   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //comporbar la validacion del formulario del registro
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email ya existe";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //tamaño
        r: "pg", //edades
        d: "mm" //por defecto icono usuario
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    LOGIN usuario devuelve token
// @acces   Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //comporbar la validacion del formulario del registro
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //ecnontrar usuario por email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Usuario no existe";
      return res.status(404).json(errors);
    }
    //comprobar contraseña
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //usuario coincide
        // crear jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        };
        //logear token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              succes: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Contraseña incorrecta";
        res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    devuelve el usuario actual
// @acces   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
