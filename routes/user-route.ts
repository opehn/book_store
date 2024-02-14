import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import util from '../shared/lib';
import userController from '../controller/user-controller';

router.post('/join',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage(`Wrong email`),
        body('password').notEmpty().withMessage('No password'),
        body('name').notEmpty().withMessage('No name'),
        util.validate
    ], userController.join)

    .post('/login',
        [
            body('email')
                .notEmpty().withMessage('No email')
                .isEmail().withMessage(`Wrong email`),
            body('password').notEmpty().withMessage('No password'),
            util.validate
        ], userController.login)

router.post('/reset',
    [
        body('email')
            .notEmpty().withMessage('No email')
            .isEmail().withMessage(`Wrong email`),
        util.validate
    ], userController.matchEmailForReset)
    .put('/reset',
        [
            body('password').notEmpty().withMessage('No password'),
            util.validate,
            util.verifyToken,
        ], userController.reset)

export default router;