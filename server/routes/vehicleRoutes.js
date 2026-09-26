import express from 'express';
import { getVehicles, getFeaturedVehicles, getCategories, getVehicle, checkAvailability } from '../controllers/vehicleController.js';

const router = express.Router();

router.get('/', getVehicles);
router.get('/featured', getFeaturedVehicles);
router.get('/categories', getCategories);
router.get('/:id', getVehicle);
router.get('/:id/availability', checkAvailability);

export default router;
