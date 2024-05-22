const advertiserModel = require('../models/Advertiser');

exports.createAdvertiser = async (req, res) => {
    try {
        const advertiserData = req.body;
        
        // Check if the email already exists
        const existingAdvertiser = await advertiserModel.getAdvertiserByEmail(advertiserData.ContactEmail);
        if (existingAdvertiser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Create the advertiser
        const result = await advertiserModel.createAdvertiser(advertiserData);
        res.status(201).json({ message: 'Advertiser created successfully', advertiserId: result.insertId });
    } catch (error) {
        console.error('Error creating advertiser:', error);
        res.status(500).json({ message: 'Failed to create advertiser' });
    }
};


exports.getAdvertiserById = async (req, res) => {
    try {
        const { advertiserId } = req.params;
        const advertiser = await advertiserModel.getAdvertiserById(advertiserId);
        if (!advertiser) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        res.status(200).json(advertiser);
    } catch (error) {
        console.error('Error getting advertiser by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve advertiser' });
    }
};

exports.updateAdvertiser = async (req, res) => {
    try {
        const { advertiserId } = req.params;
        const advertiserData = req.body;
        const result = await advertiserModel.updateAdvertiser(advertiserId, advertiserData);
        if (result === 0) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        res.status(200).json({ message: 'Advertiser updated successfully' });
    } catch (error) {
        console.error('Error updating advertiser:', error);
        res.status(500).json({ message: 'Failed to update advertiser' });
    }
};

exports.deleteAdvertiser = async (req, res) => {
    try {
        const { advertiserId } = req.params;
        const result = await advertiserModel.deleteAdvertiser(advertiserId);
        if (result === 0) {
            return res.status(404).json({ message: 'Advertiser not found' });
        }
        res.status(200).json({ message: 'Advertiser deleted successfully' });
    } catch (error) {
        console.error('Error deleting advertiser:', error);
        res.status(500).json({ message: 'Failed to delete advertiser' });
    }
};

exports.getAllAdvertisers = async (req, res) => {
    try {
        const advertisers = await advertiserModel.getAllAdvertisers();
        res.status(200).json(advertisers);
    } catch (error) {
        console.error('Error getting all advertisers:', error);
        res.status(500).json({ message: 'Failed to retrieve advertisers' });
    }
};
