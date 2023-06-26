import express from 'express';
import {  deleteImage, getAllImages, getImageDetail, uploadImages } from '../controller/imageController.js';
import protectedRoute from '../middleware/authMiddleware.js';

const router=express.Router();

router.route('/').get(protectedRoute,getAllImages);
router.post('/upload',protectedRoute,uploadImages);
router.delete('/delete/:id',deleteImage)
router.post('/:id',protectedRoute,getImageDetail);



export default router; 