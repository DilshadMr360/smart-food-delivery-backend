import express from 'express';
import authMiddlewere from '../middlewere/auth.js'
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js'

const orderRouter = express.Router();

orderRouter.post("/place",authMiddlewere,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders", authMiddlewere, userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter;