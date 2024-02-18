const express=require('express')
const router=require('../routes/routerPost')
 app=express()
port=3000
 
app.use(express.json())

app.use('/',router)
app.listen(port,()=>{
    console.log("server created")
})