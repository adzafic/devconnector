const express = require("express");
const router = express.Router();

// @route   GET api/posts/test
// @desc    Test Posts ruta
// @acces   Public
router.get("/test", (req, res) => {
  res.json({ msg: "Posts funciona" });
});

module.exports = router;
