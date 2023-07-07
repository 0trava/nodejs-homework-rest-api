const express = require("express");
const router = express.Router();


const {validateBody, authenticate, upload } = require("../../middlewares");
const {schemas} = require('../../models/user');
const {registerSchema, loginSchema, subscriptionSchema} = schemas;

const {register, 
       login, 
       logout, 
       getCurrent, 
       updateSubscription, 
       updateAvatar
    } = require("../../controllers/auth-controllers");

// SignUp
router.post("/register", validateBody(registerSchema), register);

// SignIn
router.post("/login", validateBody(loginSchema), login);

// LogOut
router.post("/logout", authenticate, logout);

// Get User info
router.get("/current", authenticate, getCurrent);

// Get User info
router.patch("/", authenticate, validateBody(subscriptionSchema), updateSubscription);

// Change avatar
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;