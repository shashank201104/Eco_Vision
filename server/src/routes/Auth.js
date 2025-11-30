//Author- Shahsank

import express from 'express'
import {Loginauth,Signuptauth,Logoutauth,checkAuth} from "../controllers/Auth.controller.js"
import { secureRoute } from '../middleware/auth.middleware.js';
const router=express.Router()


//===== defining routes and thier Handlers ======

router.post('/login',Loginauth)
router.post('/Signup',Signuptauth)
router.post('/Logout',Logoutauth)
router.get('/check',secureRoute,checkAuth)

export default router