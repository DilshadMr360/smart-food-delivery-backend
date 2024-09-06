import express from 'express';
import { loginUser, registerUser, loginAdmin, updateUserProfile, getAllUsers } from '../controllers/userController.js';
import multer from 'multer';
import authMiddleware from '../middlewere/auth.js';

const userRouter = express.Router();


const storage = multer.diskStorage({
    destination:"profileImages",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
        //by usign this file name become unique 
    }
})

const upload = multer({storage:storage})
//image storage engine end

// Register user
userRouter.post("/register", registerUser);

// Login user
userRouter.post("/login", loginUser);

// Login admin
userRouter.post("/admin/login", loginAdmin);

// userRouter.patch("/profile",upload.single('profileImage'), updateUserProfile);
userRouter.patch("/profile", authMiddleware, upload.single('profileImage'), updateUserProfile);

// Get all users (Admin)
userRouter.get("/users-list", getAllUsers);


export default userRouter;
