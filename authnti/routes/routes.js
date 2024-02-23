const express=require('express')
const logic=require('../controllers/logic')
const {verifierToken,sanitizationData}=require('../middleware/middlware')
const router=express.Router()
 

router.post('/login', sanitizationData,logic.loginJwt)
router.get('/dashboard',verifierToken,logic.afficher)
 
module.exports=router;