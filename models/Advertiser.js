const db = require('../config/database');

class Advertiser {
    async createAdvertiser(advertiserData) {
        try {
            const result = await db('Advertisers').insert(advertiserData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAdvertiserById(advertiserId) {
        try {
            const advertiser = await db('Advertisers').where('AdvertiserId', advertiserId).first();
            return advertiser;
        } catch (error) {
            throw error;
        }
    }

    async updateAdvertiser(advertiserId, advertiserData) {
        try {
            const result = await db('Advertisers').where('AdvertiserId', advertiserId).update(advertiserData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteAdvertiser(advertiserId) {
        try {
            const result = await db('Advertisers').where('AdvertiserId', advertiserId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllAdvertisers() {
        try {
            const advertisers = await db('Advertisers').select('*');
            return advertisers;
        } catch (error) {
            throw error;
        }
    }

    async getAdvertiserByEmail(email) {
        try {
            const advertiser = await db('Advertisers').where('ContactEmail', email).first();
            return advertiser;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new Advertiser();
