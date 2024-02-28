const express=require('express')
const mongoose=require('mongoose')
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken')
const app=express()
app.use(express.json())

// Connexion à la base de donnes
mongoose.connect('mongodb://127.0.0.1:27017/posts');

// Verifier la connexion a la base de donnes
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
    console.log('Connexion à la base de données établie.');
});

//creer un schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: Number},
    password: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null}
  });
// creer un model
const User = mongoose.model('User', userSchema);


const secretKey='raja'

//creer un utilisateur
app.post('/users',async (req,res)=>{
  try{
    const newUser = new User(req.body)
    const result = await newUser.save();
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ error: ' Server Error' });
  }

    
})

//login 
app.post('/login', async (req,res)=>{
let email = req.body.email;
let password = req.body.password;
const user = await User.findOne({ email });

 
if(user && password===user.password){
   const token = jwt.sign({ userId: user.id, email: user.email }, secretKey,{ expiresIn: '1h' } );
res.json({ token });
}
else {
   res.status(401).json({ message: 'Invalid data' });
}
})
//middelware 
function verifierToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }


}

//afficher tous users
app.get('/users',verifierToken,async (req,res)=>{
  try{
     const users =await User.find()
     res.json(users)

  }catch (error) {
    res.status(500).json({ error: ' Server Error' });
  }
    
})
//afficher users by id
app.get('/users/:id',verifierToken,async (req,res)=>{
  try{
      const user=await User.findById(req.params.id)
      if(!user){
        res.status(404).json("user not found")
      }
      res.json(user)

 }catch (error) {
   res.status(500).json({ error: 'Server Error' });
 }
  
})
//modifier users by id
app.put('/users/:id',verifierToken,async (req,res)=>{

  try{
    req.body.updatedAt=new Date()
    
    const userupdated= await User.findByIdAndUpdate(req.params.id, req.body ,{new: true})
    if(!userupdated){
       res.status(404).json("user not found")

    }
    res.json(userupdated)


  }catch (error) {
   res.status(500).json({ error: 'Server Error' });
 }

    
})
 //supprimer user by id 
app.delete('/users/:id',verifierToken, async (req,res)=>{
  try{
  const supprimerUser = await User.findByIdAndDelete(req.params.id)
  if(!supprimerUser){
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(supprimerUser)
  }catch(error){

    res.status(500).json({ error: 'Server Error' });
  }
})

app.listen(3000,()=>{
    console.log("server created")
})
