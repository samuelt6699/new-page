const {Client, isEmail} = require("../models/Client");
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
      } });
      console.log({
        token,
        user: {
          firstName: client.FirstName,
          lastName: client.LastName,
          email: client.Email,
          phone: client.Phone,
        }
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
/*
exports.signup = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
  
    if (!firstName || !lastName || !email || !username || !password) {
      return res.status(400).json({
        message:
          "First Name, Last Name, Email, Username, and Password are required",
      });
    }
  
    try {

      const clientByEmail = await clientModel.getClientByEmail(email);
      console.log(clientByEmail);
      //const clientByUsername = await clientModel.getClientByUsername(username);
  
      if (clientByEmail) {
        return res.status(400).json({ message: "Email is already registered" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred during sign up" });
    }
  
    //Check if the email or username already exists in the database
  
    /*
      if (clientByUsername.length>0) {
          return res.status(400).json({ message: 'Username is already taken' });
      }
  
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const clientData = {
          firstName, // Notice the property names are now camelCase
          lastName,
          email,
          username,
          password: hashedPassword,
        };
    
        const newClient = await clientModel.createNewClient(clientData);
    
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
            username: newClient.username,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating client" });
      }
    };
    
    exports.login = async (req, res) => {
      try {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res
            .status(400)
            .json({ message: "Email and Password are required" });
        }
    
        const client = await clientModel.getClientByEmail(email);
    

        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        const client = await clientModel.getClientByEmail(Email);


        if (!client) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, client.Password);
    

        
        const passwordMatch = await bcrypt.compare(Password, client.PasswordHash);


        if (!passwordMatch) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        const jwtSecret = process.env.JWT_SECRET;

        const token = jwt.sign(
          { clientId: client.ClientId, firstName: client.FirstName },
          jwtSecret,
          {
            expiresIn: "1h",
          }
        );
    
        res.status(200).json({ token, user: {
            firstName: client.FirstName,
            // Include any other user properties you want to return
            // Remember to keep them lowercase
          } });
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
          message: "An unexpected error occurred. Please try again later.",
        });
      }
    };
    */
/*
        const token = jwt.sign({ clientId: client.ClientId }, jwtSecret, { expiresIn: '1d' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};

exports.changePassword= async (req, res) => {
    try {
        const { ClientId, OldPassword, NewPassword } = req.body;
        // Validate request
        if (!ClientId || !OldPassword || !NewPassword) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Verify old password
        const client = await clientModel.getClientById(ClientId);
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        const match = await bcrypt.compare(OldPassword, client.PasswordHash);
        if (!match) {
            return res.status(403).json({ message: "Old password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(NewPassword, saltRounds);

        // Update password
        await clientModel.changePassword(ClientId, hashedPassword);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to change password' });
    }
}
*/
