const express = require('express');
const router = express.Router();
const { renderPage, renderPageWithTitle, renderPageFromParam, renderPageFromS3, renderCategory, renderCategoryFromParam, renderProductDetail } = require('./helpers');

router.get('/', renderPage('index'));
router.get('/shop', renderPage('shop'));
router.get('/sell', renderPageWithTitle('sell content'));
router.get('/sell/fundraising', renderPageWithTitle('Sell Fundraising'));
router.get('/sell/your-design', renderPageWithTitle('Sell Your Design'));
//router.get('/info/:page', renderPageFromS3());
router.get('/info/myAccount', renderPage('myAccount'));
router.get('/shop/themes', renderCategory('themes'));
router.get('/shop/products', renderCategory('products'));
router.get('/shop/blanks', renderCategory('blanks'));
router.get('/process/checkout', renderPageWithTitle('Checkout'));
router.get('/process/cart', renderPageWithTitle('Cart'));
router.get('/process/my-account', renderPageWithTitle('My Account'));
router.get('/process/thanks', renderPageWithTitle('Thanks'));
router.get('/process/login', renderPageWithTitle('Login'));
router.get('/process/register', renderPageWithTitle('Register'));
router.get('/:category', renderCategoryFromParam());
router.get('/:id/:product', renderProductDetail());

module.exports = router;
