const express = require('express');
const { compileSolidity } = require('../controllers/solidityController');
const { executeMotoko } = require('../controllers/motokoController');
const router = express.Router();

router.post('/solidity', compileSolidity);
router.post('/motoko',executeMotoko);

module.exports = router;
