
const router = require('express').Router();
const UserController = require('./../controllers/user-controller');
const { verifyToken } = require('./../utils/verify-token');

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.post('/editUser', verifyToken, UserController.editUser)
router.get('/users/:id', verifyToken, UserController.getUserById);

module.exports = router;