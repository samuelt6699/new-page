const {Client, isEmail} = require('../models/Client');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;


exports.signup = async (req, res) => {

    const { firstName, lastName, username, password } = req.body;
  
    if (!firstName || !lastName || !username || !password ) {
      return res.status(400).json({
        message:
          "First Name, Last Name, username, and Password are required",
      });
    }
    let existingUser;
    try {
        // Check if email is already registered
        existingUser = await Client.getClientByLogin(username);
        if (existingUser) {
          return res.status(400).json({ message: "Email is already registered." });
        }
      } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred during sign up" });
    }
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const usernameForDb = isEmail(username) ? username : null; 
        const phoneNumberForDb = !isEmail(username) ? username : null; 
      
        const clientData = {
          firstName, 
          lastName,
          email: usernameForDb,
          phone: phoneNumberForDb,
          password: hashedPassword,
          username,
        };
    
        const newClient = await Client.createNewClient(clientData);
    
        // Generate a token
        const token = jwt.sign({ id: newClient._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN || "2h",
        });
    
        // Send the response back with camelCase property names
        res.status(201).json({
          message: "Client created successfully",
          token: token,
          user: {
            firstName: newClient.firstName,
            lastName: newClient.lastName,
            email: newClient.email,
            phone: newClient.phone,
          },
        });
        console.log({token, firstName})
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating client" });
      }
    };

   


exports.login = async (req, res) => {
  try {
    const { username , password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const client = await Client.getClientByLogin(username);

    if (!client) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const passwordMatch = await bcrypt.compare(password, client.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid usename or password" });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(
      { clientId: client.ClientId, firstName: client.FirstName },
      jwtSecret,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token,  user: {
        firstName: client.FirstName,
        lastName: client.LastName,
        email: client.Email,
        phone: client.phone,
        client: client.ClientId,
      } });
      console.log({
        token,
        user: {
          firstName: client.FirstName,
          lastName: client.LastName,
          email: client.Email,
          phone: client.Phone,
          client:client.ClientId
        }
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
