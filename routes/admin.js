const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// products
router.get('/home', adminController.getHome);
router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

// offers
router.get('/add-offer', adminController.getAddOffer);
router.get('/offers', adminController.getOffers);
router.post('/add-offer', adminController.postAddOffer);
router.get('/edit-offer/:offerId', adminController.getEditOffer);
router.post('/edit-offer', adminController.postEditOffer);
router.post('/delete-offer', adminController.postDeleteOffer);

// categories
router.get('/add-category', adminController.getAddCategory);
router.get('/categories', adminController.getCategories);
router.post('/add-category', adminController.postAddCategory);
router.get('/edit-category/:categoryId', adminController.getEditCategory);
router.post('/edit-category', adminController.postEditCategory);
router.post('/delete-category', adminController.postDeleteCategory);


module.exports = router;
