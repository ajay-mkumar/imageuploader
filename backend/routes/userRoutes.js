import express from 'express';
import { getAllUsers, login, logout, signup } from '../controller/userController.js';

const router=express.Router();
router.route('/login').post(login)
router.route('/signup').post(signup)
router.route('/logout').post(logout)


export default router;