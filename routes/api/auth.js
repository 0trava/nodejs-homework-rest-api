const express = require("express");
const router = express.Router();


const {validateBody, authenticate, ctrlWrapper, upload } = require("../../middlewares");
const {schemas} = require('../../models/user');
const {registerSchema, loginSchema, subscriptionSchema} = schemas;

const {register, 
       login, 
       logout, 
       getCurrent, 
       updateSubscription, 
       updateAvatar
    } = require("../../controllers/auth");

// SignUp
router.post("/register", validateBody(registerSchema), ctrlWrapper(register));

// SignIn
router.post("/login", validateBody(loginSchema), ctrlWrapper(login));

// LogOut
router.post("/logout", authenticate, ctrlWrapper(logout));

// Get User info
router.get("/current", authenticate, ctrlWrapper(getCurrent));

// Get User info
router.patch("/", authenticate, validateBody(subscriptionSchema), ctrlWrapper(updateSubscription));

// Change avatar
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(updateAvatar));

module.exports = router;