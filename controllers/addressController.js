import addressModel from "../models/addressModel.js";

// Add a new address
const addAddress = async (req, res) => {
    try {
        const newAddress = new addressModel({ ...req.body, userId: req.body.userId });
        await newAddress.save();
        res.json({ success: true, data: newAddress });
    } catch (error) {
        res.json({ success: false, message: 'Error adding address' });
    }
};

// Get all addresses for a user
const getAddresses = async (req, res) => {
    try {
        console.log("User ID:", req.body.userId); // Log the userId for debugging

        // const addresses = await addressModel.find({ userId: req.body.userId });
         // Sort addresses by creation date in descending order
         const addresses = await addressModel.find({ userId: req.body.userId }).sort({ createdAt: -1 });
        
        console.log("Addresses found:", addresses); // Log the addresses found

        res.json({ success: true, data: addresses });
    } catch (error) {
        console.log("Error fetching addresses:", error);
        res.json({ success: false, message: 'Error fetching addresses' });
    }
};  

// Update an address
const updateAddress = async (req, res) => {
    try {
        const { id } = req.params; // Address ID from request parameters
        const updates = req.body; // Address details to be updated

        // Find and update the address
        const updatedAddress = await addressModel.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedAddress) {
            return res.json({ success: false, message: 'Address not found' });
        }

        res.json({ success: true, data: updatedAddress });
    } catch (error) {
        console.log("Error updating address:", error);
        res.json({ success: false, message: 'Error updating address' });
    }
};




export { addAddress, getAddresses, updateAddress,   }; 