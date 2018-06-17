const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
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
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email ya existe" });
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
  const email = req.body.email;
  const password = req.body.password;

  //ecnontrar usuario por email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "Usuario no existe" });
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
        res.status(400).json({ password: "Contraseña incorrecta" });
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
