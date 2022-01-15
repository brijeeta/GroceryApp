const router = require('express').Router();
const {
    saveProduct,
    deleteProduct
} = require('../../controllers/');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveProduct);

router.route('/lists/:productId').delete(authMiddleware, deleteProduct);

// router.route('/login').post(login);

// router.route('/me').get(authMiddleware, getSingleUser);

module.exports = router;
