require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authenticateToken = require('./models/authenticateToken');
const clientRoutes = require("./routes/client");
const categoryRoutes = require("./routes/category");
const productItemRoutes = require("./routes/ProductItem");
const cartItemRoute = require('./routes/cartItem');
const searchRoute = require('./routes/search')
const vendorRoutes= require("./routes/vendor")
const path = require('path');
const app = express();



app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

//
app.use("/api/", clientRoutes);
app.use('/api/vendor', vendorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/productItem", productItemRoutes);
app.use("/api/cartItems",authenticateToken, cartItemRoute);
app.use("/api/category", searchRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});