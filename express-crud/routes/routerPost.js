const express=require('express')
const posts=require('../controllers/posts')
const router=express.Router()
router.get('/',(req,res)=>{
    res.send("hello to home page")
}
)
router.post('/posts',posts.ajouter)
router.get('/posts',posts.afficher)
router.get('/posts/:id',posts.afficherParId)
router.put('/posts/:id',posts.modifierPost)
router.delete('/posts/:id',posts.supprimerPost)
module.exports=router;