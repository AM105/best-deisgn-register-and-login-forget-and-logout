const express = require('express');
const reuse=require("../controller/user")
const router=express.Router();

router.route("/register").post(reuse.register)
router.route("/Login").post(reuse.login)
router.route("/Verify").get(reuse.Verify)
router.route("/forgetpassword").post(reuse.ForgetPassword)







module.exports=router      