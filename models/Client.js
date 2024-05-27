const { pool } = require('../config/data');


function isEmail(string) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(string);
}

class Client {
  createNewClient(clientData) {
    const insertQuery = 'INSERT INTO ClientInfo SET ?';
    return new Promise((resolve, reject) => {
      pool.query(insertQuery, clientData, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  getClientByLogin(username) {
    const query = isEmail(username)
      ? 'SELECT * FROM ClientInfo WHERE Email = ? LIMIT 1'
      : 'SELECT * FROM ClientInfo WHERE Phone = ? LIMIT 1';
    return new Promise((resolve, reject) => {
      pool.query(query, [username], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length ? results[0] : null);
        }
      });
    });
  }

  getClientById(clientId) {
    const query = 'SELECT * FROM ClientInfo WHERE ClientId = ? LIMIT 1';
    return new Promise((resolve, reject) => {
      pool.query(query, [clientId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results.length ? results[0] : null);
        }
      });
    });
  }

  async changePassword(clientId, hashedPassword) {
    const query = 'UPDATE ClientInfo SET PasswordHash = ? WHERE ClientId = ?';
    const queryValues = [hashedPassword, clientId];
  
    try {
      const [results] = await pool.query(query, queryValues);
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  Client: new Client(),
  isEmail,
};