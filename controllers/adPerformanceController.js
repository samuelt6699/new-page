const adPerformanceModel = require('../models/AdPerformance');
const advertisementModel = require('../models/Advertisement');

exports.addPerformanceData = async (req, res) => {
    try {
        const performanceData = req.body;
        // Check if the associated advertisement exists
        const adExists = await advertisementModel.getAdvertisementById(performanceData.AdId);
        if (!adExists) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        // Add performance data
        const result = await adPerformanceModel.addPerformanceData(performanceData);
        res.status(201).json({ message: 'Performance data added successfully', performanceId: result.insertId });
    } catch (error) {
        console.error('Error adding performance data:', error);
        res.status(500).json({ message: 'Failed to add performance data' });
    }
};

exports.getPerformanceDataById = async (req, res) => {
    try {
        const { performanceId } = req.params;
        const performance = await adPerformanceModel.getPerformanceDataById(performanceId);
        if (!performance) {
            return res.status(404).json({ message: 'Performance data not found' });
        }
        // Get advertisement details
        const adDetails = await advertisementModel.getAdvertisementById(performance.AdId);
        performance.Advertisement = adDetails;
        res.status(200).json(performance);
    } catch (error) {
        console.error('Error getting performance data by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve performance data' });
    }
};

exports.updatePerformanceData = async (req, res) => {
    try {
        const { PerformanceId } = req.params;
        const performanceData = req.body;
        const result = await adPerformanceModel.updatePerformanceData(PerformanceId, performanceData);
        if (result === 0) {
            return res.status(404).json({ message: 'Performance data not found' });
        }
        res.status(200).json({ message: 'Performance data updated successfully' });
    } catch (error) {
        console.error('Error updating performance data:', error);
        res.status(500).json({ message: 'Failed to update performance data' });
    }
};

exports.deletePerformanceData = async (req, res) => {
    try {
        const { PerformanceId } = req.params;
        const result = await adPerformanceModel.deletePerformanceData(PerformanceId);
        if (result === 0) {
            return res.status(404).json({ message: 'Performance data not found' });
        }
        res.status(200).json({ message: 'Performance data deleted successfully' });
    } catch (error) {
        console.error('Error deleting performance data:', error);
        res.status(500).json({ message: 'Failed to delete performance data' });
    }
};

exports.getAllPerformanceData = async (req, res) => {
    try {
        const performances = await adPerformanceModel.getAllPerformanceData();
        // Get advertisement details for each performance
        for (const performance of performances) {
            const adDetails = await advertisementModel.getAdvertisementById(performance.AdId);
            performance.Advertisement = adDetails;
        }
        res.status(200).json(performances);
    } catch (error) {
        console.error('Error getting all performance data:', error);
        res.status(500).json({ message: 'Failed to retrieve performance data' });
    }
};
