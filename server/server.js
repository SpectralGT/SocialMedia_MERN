import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
// to config the env file
config();
// app.use() is used to mount middleware functions that handle incoming 
// HTTP requests before they reach your routes and controllers
app.use(express.json());

// if incoming request contains image, we set the size limit
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

mongoose.connect(MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server open in port: ${PORT}`))
  ).catch((error) => console.log(error));
