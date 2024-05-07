const Vendor = require('../models/vendor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const { VendorName, ContactName, Phone, Email, Address1, Address2, City, State, PostalCode, Country, Password } = req.body;

    if (!VendorName || !Email || !Password) {
        return res.status(400).json({ message: 'Vendor Name, Email, and Password are required' });
    }

    try {
        // Check if the vendor with the email already exists in the database
        const existingVendor = await Vendor.getVendorByEmail(Email);
        if (existingVendor) {
            return res.status(400).json({ message: 'Vendor with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        // Create vendor data object
        const vendorData = {
            VendorName,
            ContactName,
            Phone,
            Email,
            Address1,
            Address2,
            City,
            State,
            PostalCode,
            Country,
            PasswordHash: hashedPassword
        };

        // Create vendor in the database
        await Vendor.createVendor(vendorData);

        res.status(201).json({ message: 'Vendor signed up successfully' });
    } catch (error) {
        console.error('Error signing up vendor:', error);
        res.status(500).json({ message: 'Failed to sign up vendor' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    try {
        // Check if vendor with the email exists
        const vendor = await Vendor.getVendorByEmail(email);
        if (!vendor) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, vendor.PasswordHash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign({ vendorId: vendor.VendorId }, jwtSecret, { expiresIn: '1d' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in vendor:', error);
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};

exports.changePassword= async (req, res) => {
    try {
        const { VendorId, OldPassword, NewPassword } = req.body;
        // Validate request
        if (!VendorId || !OldPassword || !NewPassword) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Verify old password
        const vendor = await Vendor.getVendorById(VendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const match = await bcrypt.compare(OldPassword, vendor.PasswordHash);
        if (!match) {
            return res.status(403).json({ message: "Old password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(NewPassword, saltRounds);

        // Update password
        await Vendor.changePassword(VendorId, hashedPassword);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to change password' });
    }
}