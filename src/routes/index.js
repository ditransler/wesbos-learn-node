const express = require('express');
const router = express.Router();
const stroreController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(stroreController.getStores));
router.get('/stores', catchErrors(stroreController.getStores));
router.get('/add', stroreController.addStore);
router.post('/add', catchErrors(stroreController.createStore));

module.exports = router;
