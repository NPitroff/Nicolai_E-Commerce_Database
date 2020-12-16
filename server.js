const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const mysql2 = require('mysql2');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//=========SYNC 'SEQUELIZE' TO THE SERVER AND THEN ACTIVATE=======================//
sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}!`))
});
