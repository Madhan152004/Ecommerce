import express from 'express';
import {registerController,loginController,testController,forgetPasswordController} from '../controllers/authController.js';
import { requireSignIn , isAdmin} from "../middlewares/authMiddleware.js";



//router object
const router=express.Router()

// register method post
router.post('/register',registerController)

//login // post method

router.post('/login',loginController)

//Forget password
router.post('/forget-password',forgetPasswordController)

//test route
router.get("/test",requireSignIn,isAdmin,testController)


//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });


  // Protected Admin route Auth
  router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

export default router