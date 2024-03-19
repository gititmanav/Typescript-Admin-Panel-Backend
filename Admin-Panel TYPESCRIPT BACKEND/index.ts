import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { Sequelize, Model } from 'sequelize';
import sequelize from './src/helper/database';
import adminRoutes from './src/routes/adminroutes';
import dotenv from 'dotenv';

const app = express();
const PORT = 6969;
dotenv.config({ path: __dirname + '/.env' });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the 'uploads' folder
app.use('/src/uploads', express.static(path.join(__dirname, './src/uploads')));

// Routes
app.use(adminRoutes);

// After any activity using Sequelize, syncing the database to the new change 
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`The server is listening to port: ${PORT}`);
      });
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });

