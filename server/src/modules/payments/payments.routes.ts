import { Router } from 'express';
import { PaymentsController } from './payments.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

router.post('/create-order', authenticate, PaymentsController.createOrder);
router.post('/verify', authenticate, PaymentsController.verifyPayment);
router.get('/my-orders', authenticate, PaymentsController.getMyOrders);
router.get('/all', authenticate, authorize('admin'), PaymentsController.getAllOrders);

export { router as paymentsRoutes };
