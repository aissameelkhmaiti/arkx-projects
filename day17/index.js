const express=require('express')
const fs = require('fs');
const app=express()
app.use(express.json())
port=3000
const filePath = 'products.json';


//table data 
let products = [];

try {
  const data = fs.readFileSync(filePath, 'utf8');
  products = JSON.parse(data);
} catch (err) {
  console.error('Error reading or parsing the file:', err.message);
}


app.get('/',(req,res)=>{
  
  res.send("products")

})
app.get('/products',(req,res)=>{
  res.send({products})
})
app.get('/products/search',(req,res)=>{
   const minP=req.query.minprix
   const maxP=req.query.maxPrix
   
  filteredProducts=[...products]
  if (minP) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minP));
  }

  if (maxP) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxP));
  }
  res.send(filteredProducts)
})
app.get('/products/:id',(req,res)=>{
  const idProduct=parseInt(req.params.id)
  const product=products.find(p=>p.id===idProduct)
  if(product){
    res.send(product)
  }
  else {
    res.send("not foud")
  }
})
 
app.post('/products', (req, res) => {
  const product = req.body;

  if (product){
  let   newproduct = {id:products.length+1,...product}

    products.push(newproduct);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    res.send(products);
  } else {
    res.status(400).send('Invalid product data');
  }
});

app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;

  products = products.map(p => (p.id === productId ? { ...p, ...updatedProduct } : p));

  res.json({ message: 'Product updated successfully' });
});
app.delete('/products/:id',(req,res)=>{
  res.send("products deleted")
})
app.listen(port,()=>{
  console.log("server created")
})
