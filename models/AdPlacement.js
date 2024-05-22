const db = require('../config/database');

class AdPlacement {
    async createAdPlacement(placementData) {
        try {
            const result = await db('AdPlacements').insert(placementData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAdPlacementById(placementId) {
        try {
            const placement = await db('AdPlacements').where('PlacementId', placementId).first();
            return placement;
        } catch (error) {
            throw error;
        }
    }

    async updateAdPlacement(placementId, placementData) {
        try {
            const result = await db('AdPlacements').where('PlacementId', placementId).update(placementData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteAdPlacement(placementId) {
        try {
            const result = await db('AdPlacements').where('PlacementId', placementId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllAdPlacements() {
        try {
            const placements = await db('AdPlacements').select('*');
            return placements;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AdPlacement();
