import { Sequelize } from 'sequelize-typescript';
import User from '../database/userModel';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '0714',
  database: 'adminpanels',
  models: [__dirname + '../../database'],
});

export default sequelize;