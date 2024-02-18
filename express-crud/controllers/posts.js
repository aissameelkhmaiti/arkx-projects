const express=require('express')
const fs=require('fs')
filePath='../models/posts.json'
let posts=[]
try {
    const data = fs.readFileSync(filePath, 'utf8');
    posts = JSON.parse(data);
  } catch (err) {
    console.error('Error lecture de fichier :', err.message);
  }

 
  
const afficher = (req, res) => {
  res.send(posts);
};

const ajouter=(req,res)=>{
    const post = req.body;

  if (post){
  let   newpost = {id:posts.length+1,...post}

    posts.push(newpost);
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
    console.log("bien")

    res.send(posts);
  } else {
    res.status(400).send('pas de donnes');
  }
}
const afficherParId=(req,res)=>{
  const idPost=parseInt(req.params.id)
  const post=posts.find(p=>p.id===idPost)
  if(post){
    res.send(post)
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
    console.log("bien")
  }
  else {
    res.send("not foud")
  }
}
const modifierPost=(req,res)=>{
  const idPost=parseInt(req.params.id)
  const postModifier = req.body;
  posts=posts.map(p=>(p.id===idPost ? {...p,...postModifier} : p))
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  console.log("bien")
  res.send("post modifier ")


}
const supprimerPost=(req,res)=>{
  const idPost=parseInt(req.params.id)
  posts=posts.filter((p)=>p.id !== idPost)
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  console.log("bien")
  res.send("post a ete supprimer")
}
module.exports={
    afficher,
    ajouter,
    afficherParId,
    modifierPost,
    supprimerPost,
 
};