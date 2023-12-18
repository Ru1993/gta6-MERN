import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyPars from 'body-parser';
import userRegister from './router/user.js';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,DELETE,PUT',
};

app.use(bodyPars.urlencoded({ extended: false }));
app.use(bodyPars.json());
app.use(cors(corsOptions));

app.use(userRegister);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connect DB'))
  .catch(error => console.log(`error: ${error.message}`));

app.listen(process.env.PORT, error => {
  error
    ? console.log(`Error: ${error.message}`)
    : console.log(`Listening on PORT ${process.env.PORT}`);
});
