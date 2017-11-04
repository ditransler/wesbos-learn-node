const express = require('express');
const router = express.Router();
const stroreController = require('../controllers/storeController');

// Do work here
router.get('/', stroreController.myMiddleware, stroreController.homePage);

module.exports = router;
