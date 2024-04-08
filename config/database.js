require('dotenv').config();

const knex = require('knex')({
  client: 'mssql',
  connection: {
    server: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: {
      encrypt: true, // Use this if you're on Windows Azure
      trustServerCertificate: true // Needed for self-signed certificates
    }
  },

});


knex.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to MSSQL database:', err);
  });

module.exports = {knex};