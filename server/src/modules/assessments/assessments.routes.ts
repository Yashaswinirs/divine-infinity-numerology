import { Router } from 'express';
import { AssessmentsController } from './assessments.controller';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.get('/:id', authenticate, AssessmentsController.getQuiz);
router.post('/submit', authenticate, AssessmentsController.submit);

export { router as assessmentsRoutes };
