import express from "express";
const router = express.Router();
import {  
    // authUser,
    registerUser,
    // logoutUser,
    // getUserProfile, 
    // updateUserProfile,  
    getUsers,
    // deleteUser,
    // getUserById,
    // updateUser, 
    } from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

    // router.post('/login', authUser);
    // router.post('/logout', logoutUser);
    // router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
    // router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);
    router.route('/').post(registerUser).get(getUsers);

export default router;