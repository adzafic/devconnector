const express = require("express");
const router = express.Router();

// @route   GET api/perfile/test
// @desc    Test Perfil ruta
// @acces   Public
router.get("/test", (req, res) => {
  res.json({ msg: "Perfil funciona" });
});

module.exports = router;
