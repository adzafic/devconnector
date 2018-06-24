const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//cargar modelos
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/perfile/test
// @desc    Test Perfil ruta
// @acces   Public
router.get("/test", (req, res) => {
  res.json({ msg: "Perfil funciona" });
});

// @route   GET api/perfile
// @desc    Perfil actual del usuario
// @acces   Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No hay perfil para este usuario";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
