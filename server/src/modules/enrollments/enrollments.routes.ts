import { Router } from 'express';
import { EnrollmentsController } from './enrollments.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

router.get('/my-courses', authenticate, EnrollmentsController.getMyEnrollments);
router.post('/enroll', authenticate, EnrollmentsController.enroll);
router.get('/all', authenticate, authorize('admin'), EnrollmentsController.listAll);

export { router as enrollmentsRoutes };
