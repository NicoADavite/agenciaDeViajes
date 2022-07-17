// const express = require('express');
import express from "express";
import path from "path";
import {fileURLToPath} from 'url';

import db from "./config/db.js";
import indexRouter from "./routes/index.js";


const app = express();

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");


app.set('view engine', 'pug');

app.use((req, res, next) => {
  const year = new Date();
  
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes"
  
  return next();
})
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

app.use('/', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
    