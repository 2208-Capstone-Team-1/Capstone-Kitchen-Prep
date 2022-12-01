const express = require('express');
const router = express.Router();
const { User } = require('../db');

/**
 * Get user based on token
 */
router.get('/', async (req, res, next) => {
    try {
        res.send(await User.findByToken(req.headers.authorization));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Authenticate User
 */
router.post('/', async (req, res, next) => {
    try {
        res.send(await User.authenticate(req.body));
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;
