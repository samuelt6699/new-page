const db = require('../config/data');

class ShippingInfo {
    async createShippingInfo(shippingData) {
        try {
            const result = await db('ShippingInfo').insert(shippingData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getShippingInfoById(shippingId) {
        try {
            const shippingInfo = await db('ShippingInfo').where('ShippingId', shippingId).first();
            return shippingInfo;
        } catch (error) {
            throw error;
        }
    }

    async updateShippingInfo(shippingId, shippingData) {
        try {
            const result = await db('ShippingInfo').where('ShippingId', shippingId).update(shippingData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteShippingInfo(shippingId) {
        try {
            const result = await db('ShippingInfo').where('ShippingId', shippingId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllShippingInfo() {
        try {
            const shippingInfo = await db('ShippingInfo').select('*');
            return shippingInfo;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ShippingInfo();
