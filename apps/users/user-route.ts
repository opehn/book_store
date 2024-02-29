import * as express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import jwtUtil from '../../shared/lib/jwt';
import userController from './layered-architecture/user-controller';

router.post('/join',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage(`Wrong email`),
        body('password').notEmpty().withMessage('No password'),
        jwtUtil.validate
    ], userController.join)

    .post('/login',
        [
            body('email')
                .notEmpty().withMessage('No email')
                .isEmail().withMessage(`Wrong email`),
            body('password').notEmpty().withMessage('No password'),
            jwtUtil.validate
        ], userController.login)

router.post('/reset',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage(`Wrong email`),
        jwtUtil.validate,
    ], userController.matchEmailForReset)
    .put('/reset',
        [
            body('password').notEmpty().withMessage('No password'),
            jwtUtil.validate,
            jwtUtil.verifyToken
        ], userController.reset)

export default router;