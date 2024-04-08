const { knex } = require("../config/database");

function isEmail(string) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(string);
}
class Client {
  async createNewClient(clientData) {
    const result = await knex("ClientInfo").insert(clientData);
    return result;
  }

  async getClientByLogin(username) {
    const query = isEmail(username) ? { Email: username } : { Phone: username };
    const queryString = knex("ClientInfo").where(query).first().toString();
    console.log(queryString);
    const client = await knex("ClientInfo").where(query).first();
    return client;
  }

  async getClientById(clientId) {
    const client = await knex("ClientInfo")
      .where({ ClientId: clientId })
      .first();
    return client;
  }

  /*
  async getClientByEmail(email) {
    const client = await knex("ClientInfo").where({ Email: email }).first();
    return client;
  }
  async getClientByPhone(phone) {
    const client = await knex("ClientInfo").where({ Phone: phone }).first();
    return client;
  }
*/
  /*
    async getClientById(clientId) {
        const client = await knex('ClientInfo').where({ ClientId: clientId }).first();
        return client;
    }
    */
}
module.exports = {
    Client: new Client(),
    isEmail,
  };
/*
class Client {
    async createNewClient(clientData) {
        try {
<<<<<<< HEAD
            const result = await knex('ClientInfo').insert(clientData);
            // Knex's 'insert' resolves to an array containing the inserted record ids
            return result;
        } catch (error) {
            // Handle possible errors such as duplication, bad connection, etc.
            throw error;
        }
    }
    /*async createNewClient(clientData) {
        const result = await db.promise().query('INSERT INTO ClientInfo SET ?', clientData);
        return result;

            const result = await db('ClientInfo').insert(clientData);
            return result;
        } catch (error) {
            throw error;
        }

    }
    
      
   
    
    async getClientByUsername(username) {
        try {
            const client = await db('ClientInfo').where('Username', username).first();
            return client;
        } catch (error) {
            throw error;
        }
    }

    async getClientByEmail(email) {
        try {
            const client = await db('ClientInfo').where('Email', email).first();
            return client;
        } catch (error) {
            throw error;
        }
    }

    async getClientById(clientId) {
        try {
            const client = await db('ClientInfo').where('ClientId', clientId).first();
            return client;
        } catch (error) {
            throw error;
        }
    }

    async changePassword(clientId, hashedPassword) {
        try {
            const result = await db('ClientInfo').where('ClientId', clientId).update({ PasswordHash: hashedPassword });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Client();

*/

