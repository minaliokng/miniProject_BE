const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth.mddleware');
const router = Router();
const authController = new AuthController();

router.post('/register', auth.alreadyLoggedIn, authController.register);
router.post('/login', auth.alreadyLoggedIn, authController.userLogin);
router.post('/register/check-id', authController.checkEmail);
router.post('/register/check-nickname', authController.checkNickname);
module.exports = router;
