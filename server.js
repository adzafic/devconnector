const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB CONFIG
const db = require("./config/keys").mongoURI;

// CONNECT TO MONGODB

mongoose
  .connect(db)
  .then(() => console.log("mongo db conectado"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hola"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Ejecutando en el puerto ${port}`));
