import { Router } from 'express';
import { NotificationsController } from './notifications.controller';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.get('/', authenticate, NotificationsController.list);
router.patch('/:id/read', authenticate, NotificationsController.markRead);

export { router as notificationsRoutes };
