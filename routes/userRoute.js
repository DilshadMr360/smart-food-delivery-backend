import express from 'express';
import { loginUser, registerUser, loginAdmin } from '../controllers/userController.js';

const userRouter = express.Router();

// Register user
userRouter.post("/register", registerUser);

// Login user
userRouter.post("/login", loginUser);

// Login admin
userRouter.post("/admin/login", loginAdmin);

export default userRouter;
