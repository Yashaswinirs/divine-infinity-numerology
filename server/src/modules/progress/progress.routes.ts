import { Router } from 'express';
import { ProgressController } from './progress.controller';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.get('/course/:courseId', authenticate, ProgressController.getCourseProgress);
router.post('/update', authenticate, ProgressController.updateProgress);

export { router as progressRoutes };
