const express = require('express');
const router = express.Router();
const { renderPage} = require('./helpers');

router.get('/', renderPage('index'));
router.get('/info/myAccount', renderPage('myAccount'));

module.exports = router;
