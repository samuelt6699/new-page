require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  multipleStatements: true // Important to execute multiple statements at once
});

const createDatabaseAndTables = `
  CREATE DATABASE IF NOT EXISTS marketPlace;
  USE marketPlace;

  CREATE TABLE IF NOT EXISTS ClientInfo (
    ClientId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL,
    Phone VARCHAR(255),
    Email VARCHAR(255),
    Address1 VARCHAR(255),
    Address2 VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    PostalCode VARCHAR(255),
    Country VARCHAR(255) DEFAULT 'USA',
    PasswordHash CHAR(60) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS Categories (
    CategoryId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL,
    CategoryDescription TEXT,
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
    ProductName VARCHAR(255) NOT NULL,
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
    Address1 VARCHAR(255),
    Address2 VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    PostalCode VARCHAR(255),
    Country VARCHAR(255),
    PasswordHash CHAR(60) NOT NULL
  );
`;

connection.connect(err => {
  if (err) {
    return console.error('Error connecting to MySQL:', err.message);
  }

  console.log('Connected to the MySQL server.');

  connection.query(createDatabaseAndTables, (error, results, fields) => {
    if (error) {
      console.error('Error executing SQL:', error.message);
    } else {
      console.log('Database and tables have been created.');
    }

    // Not closing the connection after creating the database and tables
    // Leaving it open for further operations

    // The connection.end is removed from here
  });
});

function connectAndCreateDb(callback) {
  // Function that can be used for further operations
  // This function would possibly reconnect and perform an operation on the database
  // For the current context, this function would not be doing much, as we've already connected and created the DB
  // But this function can be a placeholder for when you want to modularize your DB operations
  callback(null, connection);
}

module.exports = { connection };