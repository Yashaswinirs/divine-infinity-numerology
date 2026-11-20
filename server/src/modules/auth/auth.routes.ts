import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middleware/validate';
import { authenticate } from '../../middleware/authenticate';
import { loginSchema, registerSchema } from './auth.validation';

const router = Router();

router.post('/login', validate(loginSchema), AuthController.login);
router.post('/register', validate(registerSchema), AuthController.register);
router.post('/refresh', AuthController.refresh);
router.get('/me', authenticate, AuthController.me);

export { router as authRoutes };
