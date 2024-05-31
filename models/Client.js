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

  storeVerificationCode(clientId, verificationCode) {
    const query = 'UPDATE ClientInfo SET verification_code = ?, verification_code_expires_at = DATE_ADD(NOW(), INTERVAL 15 MINUTE) WHERE ClientId = ?';
    return new Promise((resolve, reject) => {
      pool.query(query, [verificationCode, clientId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  verifyClient(clientId, verificationCode) {
    const query = 'SELECT * FROM ClientInfo WHERE ClientId = ? AND verification_code = ? AND verification_code_expires_at > NOW() LIMIT 1';
    return new Promise((resolve, reject) => {
      pool.query(query, [clientId, verificationCode], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length) {
          const updateQuery = 'UPDATE ClientInfo SET is_verified = 1 WHERE ClientId = ?';
          pool.query(updateQuery, [clientId], (updateError) => {
            if (updateError) {
              reject(updateError);
            } else {
              resolve(results[0]);
            }
          });
        } else {
          resolve(null);
        }
      });
    });
  }
}

module.exports = {
  Client: new Client(),
  isEmail,
};