import { Router } from 'express';
import { LessonsController } from './lessons.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

router.get('/:id', LessonsController.getById);
router.post('/', authenticate, authorize('admin'), LessonsController.create);
router.put('/:id', authenticate, authorize('admin'), LessonsController.update);
router.delete('/:id', authenticate, authorize('admin'), LessonsController.delete);

export { router as lessonsRoutes };
