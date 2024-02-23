const express=require('express')
const jwt=require('jsonwebtoken')

const users=[
    {id:1,username:"aissame",password:"aissame0000"},
    {id:2,username:"naim",password:"naim2014"}

]
const secretKey='raja'

const loginJwt = (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    const user=users.find(u=>u.username===username && u.password===password)
    if(user){
        const token = jwt.sign({ userId: user.id, username: user.username }, secretKey,{ expiresIn: '1h' } );
    res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Invalid data' });
    }
}
const afficher = (req,res)=>{
    jwt.verify(req.token,secretKey, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({ data });
      }
    });
  
  }
module.exports={
    loginJwt,
    afficher,

}