const db = require('../config/database');

class Advertisement {
    async createAdvertisement(advertisementData) {
        try {
            const result = await db('Advertisements').insert(advertisementData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAdvertisementById(adId) {
        try {
            const advertisement = await db('Advertisements').where('AdId', adId).first();
            return advertisement;
        } catch (error) {
            throw error;
        }
    }

    async updateAdvertisement(adId, advertisementData) {
        try {
            const result = await db('Advertisements').where('AdId', adId).update(advertisementData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteAdvertisement(adId) {
        try {
            const result = await db('Advertisements').where('AdId', adId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllAdvertisements() {
        try {
            const advertisements = await db('Advertisements').select('*');
            return advertisements;
        } catch (error) {
            throw error;
        }
    }

    async getAdvertisementsByAdvertiser(advertiserId) {
        try {
            const advertisements = await db('Advertisements').where('AdvertiserId', advertiserId).select('*');
            return advertisements;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Advertisement();
