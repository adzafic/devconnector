const express = require("express");
const router = express.Router();

// @route   GET api/users/test
// @desc    Test usuario ruta
// @acces   Public
router.get("/test", (req, res) => {
  res.json({ msg: "Usuarios funciona" });
});

module.exports = router;
