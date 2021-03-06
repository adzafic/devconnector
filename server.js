const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser midelware
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// DB CONFIG
const db = require("./config/keys").mongoURI;

// CONNECT TO MONGODB

mongoose
  .connect(db)
  .then(() => console.log("mongo db conectado"))
  .catch(err => console.log(err));

//Passpaort midelware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Usar rutas
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Ejecutando en el puerto ${port}`));
