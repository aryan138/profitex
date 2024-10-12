const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const { verifyJwt } = require('../middlewares/authorize');

router.post("/register", userController.register);
router.post("/sign-in", userController.loginUser);
router.get("/logout", userController.logoutUser);
router.post("/update-details", userController.updateUserDetails);
router.get("/get-details", userController.getDetails);
module.exports = router;