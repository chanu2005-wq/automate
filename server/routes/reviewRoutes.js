import express from 'express';
import { createReview, getVehicleReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/vehicle/:vehicleId', getVehicleReviews);

router.use(protect);
router.post('/', createReview);

export default router;
