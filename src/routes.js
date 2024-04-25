const express = require('express');
const router = express.Router();
const { renderPage, renderPageWithTitle, renderPageFromParam, renderPageFromS3, renderCategory, renderCategoryFromParam, renderProductDetail } = require('./helpers');

router.get('/', renderPage('index'));
router.get('/info/myAccount', renderPage('myAccount'));

module.exports = router;
