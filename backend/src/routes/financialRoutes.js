import express from 'express';
import { getFinancialRecords, createFinancialRecord, updateFinancialRecord, deleteFinancialRecord } from '../controllers/financialController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getFinancialRecords)
  .post(createFinancialRecord);

router.route('/:id')
  .put(updateFinancialRecord)
  .delete(deleteFinancialRecord);

export default router;
