require('dotenv').config();
//const {knex} = require('knex');
//const { knex } = require("../config/database");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const clientRoutes = require('./routes/client');
//const categoryRoutes = require('./routes/catgeory')





const app = express();

// Middleware

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());


app.use('/api', clientRoutes);

//app.use('/api/categories', categoryRoutes)
//app.use('/api/productItem', productItemRoutes)

app.use('/api/client', clientRoutes);



// Start the server

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
