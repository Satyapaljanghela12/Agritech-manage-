import express from 'express';
import { getLandParcels, createLandParcel, updateLandParcel, deleteLandParcel } from '../controllers/landParcelController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getLandParcels)
  .post(createLandParcel);

router.route('/:id')
  .put(updateLandParcel)
  .delete(deleteLandParcel);

export default router;
