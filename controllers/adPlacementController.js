const adPlacementModel = require('../models/AdPlacement');
const advertisementModel = require('../models/Advertisement');

exports.createAdPlacement = async (req, res) => {
    try {
        const placementData = req.body;

        // Check if the referenced advertisement exists
        const adExists = await advertisementModel.getAdvertisementById(placementData.AdId);
        if (!adExists) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        // Create the ad placement
        const result = await adPlacementModel.createAdPlacement(placementData);
        res.status(201).json({ message: 'Ad placement created successfully', placementId: result.insertId });
    } catch (error) {
        console.error('Error creating ad placement:', error);
        res.status(500).json({ message: 'Failed to create ad placement' });
    }
};

exports.getAdPlacementById = async (req, res) => {
    try {
        const { PlacementId } = req.params;
        const placement = await adPlacementModel.getAdPlacementById(PlacementId);

        if (!placement) {
            return res.status(404).json({ message: 'Ad placement not found' });
        }

        // Get details of the advertisement associated with this placement
        const adDetails = await advertisementModel.getAdvertisementById(placement.AdId);
        
        // Combine placement and ad details
        const response = {
            placement,
            advertisement: adDetails
        };

        res.status(200).json(response);
    } catch (error) {
        console.error('Error getting ad placement by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve ad placement' });
    }
};

exports.getAllAdPlacements = async (req, res) => {
    try {
        const placements = await adPlacementModel.getAllAdPlacements();

        // Get ad details for each placement
        const placementsWithAds = await Promise.all(placements.map(async (placement) => {
            const adDetails = await advertisementModel.getAdvertisementById(placement.AdId);
            return {
                ...placement,
                advertisement: adDetails
            };
        }));

        res.status(200).json(placementsWithAds);
    } catch (error) {
        console.error('Error getting all ad placements:', error);
        res.status(500).json({ message: 'Failed to retrieve ad placements' });
    }
};

exports.updateAdPlacement = async (req, res) => {
    try {
        const { PlacementId } = req.params;
        const placementData = req.body;

        // Check if the referenced advertisement exists
        const adExists = await advertisementModel.getAdvertisementById(placementData.AdId);
        if (!adExists) {
            return res.status(404).json({ message: 'Advertisement not found' });
        }

        const result = await adPlacementModel.updateAdPlacement(PlacementId, placementData);
        if (result === 0) {
            return res.status(404).json({ message: 'Ad placement not found' });
        }
        res.status(200).json({ message: 'Ad placement updated successfully' });
    } catch (error) {
        console.error('Error updating ad placement:', error);
        res.status(500).json({ message: 'Failed to update ad placement' });
    }
};

exports.deleteAdPlacement = async (req, res) => {
    try {
        const { PlacementId } = req.params;
        const result = await adPlacementModel.deleteAdPlacement(PlacementId);
        if (result === 0) {
            return res.status(404).json({ message: 'Ad placement not found' });
        }
        res.status(200).json({ message: 'Ad placement deleted successfully' });
    } catch (error) {
        console.error('Error deleting ad placement:', error);
        res.status(500).json({ message: 'Failed to delete ad placement' });
    }
};
