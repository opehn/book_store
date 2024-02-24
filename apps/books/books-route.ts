import * as express from 'express';
const router = express.Router();
import express_validator = require('express-validator');
const { param, query } = express_validator;
import { getAllBooks, getBookDetail } from './books-controller';
import jwtUtil from '../../shared/lib/jwt';

router.get('/',
    [
        query('limit').notEmpty().withMessage('No limit'),
        query('offset').notEmpty().withMessage('No offset'),
        jwtUtil.validate
    ], getAllBooks);

router.get('/:bookId',
    [
        param('bookId').notEmpty().withMessage('No bookId'),
        jwtUtil.validate,
    ], getBookDetail);

export default router;