require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authenticateToken = require('./models/authenticateToken');
const orderRoutes= require("./routes/orders");
const clientRoutes = require("./routes/client");
const categoryRoutes = require("./routes/category");
const productItemRoutes = require("./routes/ProductItem");
const cartItemRoute = require('./routes/cartItem');
const searchRoute = require('./routes/search');
const vendorRoutes= require("./routes/vendor");
// const advertiserRoutes= require("./routes/advertiser")
// const advertisementRoutes= require("./routes/advertisement")
// const adPlacementRoutes= require("./routes/adPlacement")
// const adPerformanceRoutes= require("./routes/adPerformance")

const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Define Routes
app.use("/api/", clientRoutes);
app.use('/api/vendor', vendorRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/productItem", productItemRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cartItems", authenticateToken, cartItemRoute);
app.use("/api/", searchRoute);
// app.use("/api/advertiser", authenticateToken, advertiserRoutes);
// app.use("/api/advertisement", authenticateToken, advertisementRoutes);
// app.use("/api/ad_placement", authenticateToken, adPlacementRoutes);
// app.use("/api/ad_performance", authenticateToken, adPerformanceRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});