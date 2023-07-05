const express = require("express");
const router = express.Router();


const {validateBody} = require("../../middlewares");
const {schemas} = require('../../models/user');
const {registerSchema, loginSchema} = schemas;

const {register, login} = require("../../controllers/auth-controllers");

// SignUp
router.post("/register", validateBody(registerSchema), register);

// SignIn
router.post("/login", validateBody(loginSchema), login);

module.exports = router;