const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Test Posts ruta
// @acces   Public
/*router.get("/test", (req, res) => {
  res.json({ msg: "Posts funciona" });
});*/

// @route   POST api/posts
// @desc    Crear post
// @acces   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    //comprobar validacion
    if (!isValid) {
      //retornar errores
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
