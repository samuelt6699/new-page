// Load environment variables from .env file
require("dotenv").config();
const mysql = require("mysql2");

// Create a MySQL pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const createDatabaseAndTables = `
  CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};
  USE ${process.env.DB_NAME};

  CREATE TABLE IF NOT EXISTS ClientInfo (
    ClientId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Phone VARCHAR(255),
    Email VARCHAR(255),
    PasswordHash CHAR(60) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS Addresses (
    AddressId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Address1 VARCHAR(255) NOT NULL,
    Address2 VARCHAR(255),
    City VARCHAR(255) NOT NULL,
    State VARCHAR(255) NOT NULL,
    PostalCode VARCHAR(255) NOT NULL,
    Country VARCHAR(255) DEFAULT 'USA',
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ClientId BIGINT,
    FOREIGN KEY (ClientId) REFERENCES ClientInfo(ClientId)
  );

  CREATE TABLE IF NOT EXISTS Categories (
    CategoryId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    IsActive BIT,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ParentCategoryId BIGINT,
    SortOrder INT,
    ImageUrl VARCHAR(255),
    MetaTitle VARCHAR(255),
    MetaDescription VARCHAR(255),
    MetaKeywords VARCHAR(255),
    FOREIGN KEY (ParentCategoryId) REFERENCES Categories(CategoryId)
  );
  
  CREATE TABLE IF NOT EXISTS ProductItems (
    ProductId  BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL,
    Image1Url VARCHAR(255),
    Image2Url VARCHAR(255),
    Image3Url VARCHAR(255),
    Image4Url VARCHAR(255),
    Image5Url VARCHAR(255),
    Brand VARCHAR(255),
    Model VARCHAR(255),
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CategoryId BIGINT NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
  );

  CREATE TABLE IF NOT EXISTS CartItems (
    CartId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ClientId BIGINT NOT NULL,
    ProductId BIGINT NOT NULL,
    Quantity INT CHECK (Quantity > 0),
    DateAdded TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DateUpdated TIMESTAMP NULL,
    FOREIGN KEY (ClientId) REFERENCES ClientInfo(ClientId),
    FOREIGN KEY (ProductId) REFERENCES ProductItems(ProductId)
  );

  CREATE TABLE IF NOT EXISTS VendorInfo (
    VendorId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    VendorName VARCHAR(255) NOT NULL,
    ContactName VARCHAR(255),
    Phone VARCHAR(255),
    Email VARCHAR(255),
    PasswordHash CHAR(60) NOT NULL,
    AddressId BIGINT,  -- New reference to the Addresses table
    FOREIGN KEY (AddressId) REFERENCES Addresses(AddressId)
  );

  CREATE TABLE IF NOT EXISTS Orders (
    OrderId BIGINT AUTO_INCREMENT PRIMARY KEY,
    ClientId BIGINT NULL,
    OrderDate DATETIME NULL,
    PaymentMethod VARCHAR(255) NULL,
    ShippingAddressId BIGINT,  -- Reference to the Addresses table for shipping address
    BillingAddressId BIGINT,  -- Optional: Billing address reference
    ShippingPrice DECIMAL(10,2) NULL,
    FinalTotal DECIMAL(10,2) NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS OrderDetails (
    OrderDetailId BIGINT AUTO_INCREMENT PRIMARY KEY,
    OrderId BIGINT NOT NULL,
    ProductId BIGINT NOT NULL,
    Quantity INT NOT NULL,
    PriceAtOrder DECIMAL(10,2) NOT NULL,  -- Store the price at the time of order
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,  -- Ensure order details are deleted when the order is deleted
    FOREIGN KEY (ProductId) REFERENCES ProductItems(ProductId) ON DELETE CASCADE  -- Ensure product details are deleted when the product is deleted
  );
`;

pool.getConnection((err, connection) => {
  if (err) {
    return console.error("Error connecting to MySQL:", err.message);
  }

  console.log("Connected to the MySQL server.");

  connection.query(createDatabaseAndTables, (error, results) => {
    connection.release();

    if (error) {
      console.error("Error executing SQL:", error.message);
    } else {
      console.log("Database and tables have been created.");
    }
  });
});

module.exports = { pool };