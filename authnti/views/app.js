const express=require('express')
const router=require('../routes/routes')
const validationErreur=require('../middleware/middlware')
 app=express()
 app.use(express.json())
port=3000
/*
app.use(validationErreur)
*/
app.use('/',router)

app.listen(port,()=>{
    console.log("server created")
})