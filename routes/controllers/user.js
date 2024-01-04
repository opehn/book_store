const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.use(express.json());

router.get('/', (req, res) => {
    res.json({
        message: 'I got it!',
    })
})