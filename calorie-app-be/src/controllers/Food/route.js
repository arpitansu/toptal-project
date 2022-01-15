var express = require('express');
var router = express.Router();
const { verifyJWT } = require('../../utilities/JWT');
const { isAdmin } = require('../../utilities/middleware');
const {addFood, getFood, updateFoodProduct, deleteFoodProduct, deleteFood, updateFood, report, addFoodAdmin} = require("./controller");

router.get('/', verifyJWT, getFood);
router.post('/', verifyJWT, addFood);
//admin routes
router.post('/add', verifyJWT, isAdmin, addFoodAdmin);
router.put('/:id', verifyJWT, isAdmin, updateFood);
router.delete('/:id', verifyJWT, isAdmin, deleteFood);
router.put('/:id/product', verifyJWT, isAdmin, updateFoodProduct);
router.delete('/:id/product/:productId', verifyJWT, isAdmin, deleteFoodProduct);
router.get('/report', verifyJWT, isAdmin, report);

module.exports = router;
