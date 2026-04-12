import express from 'express';
import { getInventory, createInventoryItem, updateInventoryItem, deleteInventoryItem } from '../controllers/inventoryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getInventory)
  .post(createInventoryItem);

router.route('/:id')
  .put(updateInventoryItem)
  .delete(deleteInventoryItem);

export default router;
