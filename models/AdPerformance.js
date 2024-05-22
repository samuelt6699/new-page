const db = require('../config/database');

class AdPerformance {
    async addPerformanceData(performanceData) {
        try {
            const result = await db('AdPerformance').insert(performanceData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getPerformanceDataById(performanceId) {
        try {
            const performance = await db('AdPerformance').where('PerformanceId', performanceId).first();
            return performance;
        } catch (error) {
            throw error;
        }
    }

    async updatePerformanceData(performanceId, performanceData) {
        try {
            const result = await db('AdPerformance').where('PerformanceId', performanceId).update(performanceData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deletePerformanceData(performanceId) {
        try {
            const result = await db('AdPerformance').where('PerformanceId', performanceId).del();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllPerformanceData() {
        try {
            const performances = await db('AdPerformance').select('*');
            return performances;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AdPerformance();
