import * as express from 'express';
const router = express.Router();
import { param, query } from 'express-validator';
import util from '../shared/lib/index';
import logger from '../shared/logger';
import likeController from '../controller/like-controller';

router.put('/:bookId',
    [
        param('bookId').isInt().withMessage('No BookID'),
        query('liked').notEmpty().withMessage('No liked'),
        util.verifyToken
    ], likeController);

export default router;