const advertisementModel = require('../models/Advertisement');
const advertiserModel = require('../models/Advertiser');

exports.createAdvertisement = async (req, res) => {
    try {
        const advertisementData = req.body;
        // Create the advertisement
        const result = await advertisementModel.createAdvertisement(advertisementData);
        res.status(201).json({ message: 'Advertisement created successfully', advertisementId: result.insertId });
    } catch (error) {
        console.error('Error creating advertisement:', error);
        res.status(500).json({ message: 'Failed to create advertisement' });
    }
};

exports.getAdvertisementById = async (req, res) => {
    try {
        const { adId } = req.params;
        const advertisement = await advertisementModel.getAdvertisementById(adId);
        if (!advertisement) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        const advertiser = await advertiserModel.getAdvertiserById(advertisement.advertiserId);
        advertisement.advertiser = advertiser;
        res.status(200).json(advertisement);
    } catch (error) {
        console.error('Error getting advertisement by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve advertisement' });
    }
};

exports.updateAdvertisement = async (req, res) => {
    try {
        const { adId } = req.params;
        const advertisementData = req.body;
        const result = await advertisementModel.updateAdvertisement(adId, advertisementData);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        res.status(200).json({ message: 'Advertisement updated successfully' });
    } catch (error) {
        console.error('Error updating advertisement:', error);
        res.status(500).json({ message: 'Failed to update advertisement' });
    }
};

exports.deleteAdvertisement = async (req, res) => {
    try {
        const { adId } = req.params;
        const result = await advertisementModel.deleteAdvertisement(adId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }
        res.status(200).json({ message: 'Advertisement deleted successfully' });
    } catch (error) {
        console.error('Error deleting advertisement:', error);
        res.status(500).json({ message: 'Failed to delete advertisement' });
    }
};

exports.getAllAdvertisements = async (req, res) => {
    try {
        const advertisements = await advertisementModel.getAllAdvertisements();
        for (const advertisement of advertisements) {
            const advertiser = await advertiserModel.getAdvertiserById(advertisement.advertiserId);
            advertisement.advertiser = advertiser;
        }
        res.status(200).json(advertisements);
    } catch (error) {
        console.error('Error getting all advertisements:', error);
        res.status(500).json({ message: 'Failed to retrieve advertisements' });
    }
};

exports.getAdvertisementsByAdvertiserId = async (req, res) => {
    try {
        const { advertiserId } = req.params;
        const advertisements = await advertisementModel.getAdvertisementsByAdvertiserId(advertiserId);
        for (const advertisement of advertisements) {
            const advertiser = await advertiserModel.getAdvertiserById(advertisement.advertiserId);
            advertisement.advertiser = advertiser;
        }
        res.status(200).json(advertisements);
    } catch (error) {
        console.error('Error getting advertisements by advertiser ID:', error);
        res.status(500).json({ message: 'Failed to retrieve advertisements by advertiser' });
    }
};
