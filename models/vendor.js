const { knex } = require("../config/database");

class Vendor {
    async createVendor(vendorData) {
        try {
            const result = await knex('VendorInfo').insert(vendorData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getVendorById(vendorId) {
        try {
            const vendor = await knex('VendorInfo').where('VendorId', vendorId).first();
            return vendor;
        } catch (error) {
            throw error;
        }
    }

    async getVendorByEmail(email) {
        try {
            const vendor = await knex('VendorInfo').where('Email', email).first();
            return vendor;
        } catch (error) {
            throw error;
        }
    }

    async changePassword(vendorId, hashedPassword) {
        try {
            const result = await knex('VendorInfo').where('VendorId', vendorId).update({ PasswordHash: hashedPassword });
            return result;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new Vendor();
