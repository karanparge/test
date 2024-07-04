const express = require("express");
const router = express.Router();

const { signup } = require("../controller/signUp");
const { login } = require("../controller/Login");
const { auth } = require("../middlewares/auth");
const updatePassword = require("../controller/updatePassword");
const uploadImage = require("../controller/uploadImage");
const sendOTP = require("../controller/sendOTP");
const {verifyOtp} = require("../controller/verifyOtp");
const { Resetpassword } = require("../controller/Resetpassword");
const {verfiyEmail} = require("../controller/verfiyEmail");
const {verifyEmailOtp} = require("../controller/verifyEmailOtp");




//route for signup for the new Clients
router.post("/signup", signup);

//route for doing login in the website
router.post("/login", login);

// updating the password
router.put("/updatepassword",updatePassword);

// uplaod image to the cloudinary
router.put("/upload-image",uploadImage);

// otp send request
router.post("/send-otp",sendOTP);

// verifify the otp.
router.post("/verifyotp",verifyOtp);

// reset password
router.put("/resetpassword",Resetpassword);

router.post("/verify-mail",verfiyEmail);

router.post("/verifyemailotp",verifyEmailOtp);



module.exports = router;