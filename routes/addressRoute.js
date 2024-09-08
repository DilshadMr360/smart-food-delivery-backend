import express from 'express';
import { addAddress, getAddresses, updateAddress } from '../controllers/addressController.js';
import authMiddlewere from '../middlewere/auth.js';

const addressRouter = express.Router();

addressRouter.post('/add', authMiddlewere, addAddress);
addressRouter.get('/get-address', authMiddlewere, getAddresses);
addressRouter.put('/update-address/:id', authMiddlewere, updateAddress); 

export default addressRouter;
