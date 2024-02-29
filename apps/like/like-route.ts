import * as express from 'express';
const router = express.Router();
import { param, query } from 'express-validator';
import jwtUtil from '../../middleware/jwt';
import logger from '../../shared/logger';
import toggleLikeStatus from './like-controller';

router.put('/:bookId',
    [
        param('bookId').isInt().withMessage('No BookID'),
        query('liked').notEmpty().withMessage('No liked'),
        jwtUtil.verifyToken
    ], toggleLikeStatus);

export default router;