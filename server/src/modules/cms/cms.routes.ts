import { Router } from 'express';
import { CmsController } from './cms.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();

// Public submission
router.post('/enquiries', CmsController.submitEnquiry);

// Admin-only management
router.get('/enquiries', authenticate, authorize('admin'), CmsController.listEnquiries);
router.patch('/enquiries/:id/status', authenticate, authorize('admin'), CmsController.updateStatus);

export { router as cmsRoutes };
