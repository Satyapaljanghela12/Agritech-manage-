import express from 'express';
import { getTools, createTool, updateTool, deleteTool } from '../controllers/toolEquipmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTools)
  .post(createTool);

router.route('/:id')
  .put(updateTool)
  .delete(deleteTool);

export default router;
