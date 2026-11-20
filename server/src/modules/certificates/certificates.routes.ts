import { Router } from 'express';
import { CertificatesController } from './certificates.controller';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.get('/my', authenticate, CertificatesController.getMyCertificates);
router.post('/claim', authenticate, CertificatesController.claimCertificate);
router.get('/verify/:certNumber', CertificatesController.verify);

export { router as certificatesRoutes };
