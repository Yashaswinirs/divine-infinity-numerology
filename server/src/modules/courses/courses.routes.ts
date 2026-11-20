import { Router } from 'express';
import { CoursesController } from './courses.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

// Public / student course browsing
router.get('/', CoursesController.list);
router.get('/:id', CoursesController.getById);

// Admin-only management
router.post('/', authenticate, authorize('admin'), CoursesController.create);
router.put('/:id', authenticate, authorize('admin'), CoursesController.update);
router.delete('/:id', authenticate, authorize('admin'), CoursesController.delete);

export { router as coursesRoutes };
