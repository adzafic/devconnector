const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//cargar validaciones
const validateProfileInput = require("../../validation/profile");
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
      .populate("user", ["name", "avatar"])
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

// @route   POST api/perfile
// @desc    Crear o editar el prefil de usuario
// @acces   Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //comprobar validacion
    if (!isValid) {
      //retornar errores
      return res.status(400).json(errors);
    }
    // Conseguir campos
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //skills cortar para generar array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Actualizar
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //crear
        //comprobar su el hanlde existe
        Profile.findOne({ handle: profileFields.hanlde }).then(profile => {
          if (profile) {
            errors.hanlde = "El campo Handle ya existe";
            res.status(400).json(errors);
          }

          //guardar perfil
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
