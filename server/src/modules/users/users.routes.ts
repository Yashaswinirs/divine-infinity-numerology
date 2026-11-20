import { Router } from 'express';
import { UsersController } from './users.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

router.get('/students', authenticate, authorize('admin'), UsersController.listStudents);
router.get('/', authenticate, authorize('admin'), UsersController.listAll);
router.get('/profile/:id?', authenticate, UsersController.getProfile);
router.patch('/:id/status', authenticate, authorize('admin'), UsersController.updateStatus);
router.patch('/:id/role', authenticate, authorize('admin'), UsersController.updateRole);

export { router as usersRoutes };
