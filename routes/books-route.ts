import * as express from 'express';
const router = express.Router();
import express_validator = require('express-validator');
const { param, query } = express_validator;
import { allBookController, bookDetailCotroller } from '../controller/books-controller';

router.get('/',
    [
        query('limit').notEmpty().withMessage('No limit'),
        query('offset').notEmpty().withMessage('No offset'),
        util.validate
    ], allBookController);

router.get('/:bookId',
    [
        param('bookId').notEmpty().withMessage('No bookId'),
        util.validate,
    ], bookDetailCotroller);

module.exports = router;